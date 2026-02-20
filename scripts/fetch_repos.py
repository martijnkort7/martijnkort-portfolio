#!/usr/bin/env python3
"""
fetch_repos.py — Haal publieke GitHub repos op voor martijnkort7.

Wat doet dit script?
  1. Haalt alle publieke repos op via de GitHub API
  2. Per repo: README samenvatting, topics, talen, activiteitsstatus
  3. Schrijft het resultaat naar app/data/repos.json
  4. Commit en pusht de update automatisch naar origin main

Gebruik:
    python3 scripts/fetch_repos.py

Output:
    app/data/repos.json

Geen dependencies nodig — gebruikt alleen de standaard library.
"""

import base64
import json
import ssl
import subprocess
import urllib.request
import urllib.error
from datetime import datetime, timezone, timedelta
from pathlib import Path

GITHUB_USER = "martijnkort7"
API_BASE = "https://api.github.com"
REPOS_URL = f"{API_BASE}/users/{GITHUB_USER}/repos?type=public&sort=pushed&per_page=100"
OUTPUT_PATH = Path(__file__).resolve().parent.parent / "app" / "data" / "repos.json"

# SSL context — macOS Python may lack default certs
_ssl_ctx = None


def get_ssl_context() -> ssl.SSLContext:
    global _ssl_ctx
    if _ssl_ctx is not None:
        return _ssl_ctx
    ctx = ssl.create_default_context()
    try:
        urllib.request.urlopen(
            urllib.request.Request("https://api.github.com", method="HEAD"),
            context=ctx,
            timeout=5,
        )
        _ssl_ctx = ctx
    except urllib.error.URLError:
        _ssl_ctx = ssl._create_unverified_context()
    return _ssl_ctx


def api_get(url: str) -> dict | list | None:
    """GET request to GitHub API. Returns parsed JSON or None on error."""
    req = urllib.request.Request(
        url,
        headers={
            "Accept": "application/vnd.github.mercy-preview+json",
            "User-Agent": "martijnkort-portfolio",
        },
    )
    try:
        with urllib.request.urlopen(req, context=get_ssl_context()) as resp:
            return json.loads(resp.read().decode("utf-8"))
    except (urllib.error.HTTPError, urllib.error.URLError):
        return None


def get_readme_summary(owner: str, repo: str) -> str | None:
    """Fetch README.md and extract the first meaningful paragraph."""
    data = api_get(f"{API_BASE}/repos/{owner}/{repo}/readme")
    if not data or "content" not in data:
        return None

    try:
        content = base64.b64decode(data["content"]).decode("utf-8")
    except Exception:
        return None

    for line in content.splitlines():
        stripped = line.strip()
        # Skip empty lines, headers, badges, HTML tags, and horizontal rules
        if not stripped:
            continue
        if stripped.startswith("#"):
            continue
        if stripped.startswith(("![", "[![", "<", "---", "***", "___")):
            continue
        # Found a text paragraph
        return stripped

    return None


def get_languages(owner: str, repo: str) -> list[str]:
    """Fetch all languages used in a repo."""
    data = api_get(f"{API_BASE}/repos/{owner}/{repo}/languages")
    if not data or not isinstance(data, dict):
        return []
    return list(data.keys())


def is_recently_active(pushed_at: str) -> bool:
    """Check if pushed_at is within the last 6 months."""
    pushed = datetime.fromisoformat(pushed_at.replace("Z", "+00:00"))
    cutoff = datetime.now(timezone.utc) - timedelta(days=180)
    return pushed >= cutoff


def fetch_repos() -> list[dict]:
    print(f"Fetching repos for {GITHUB_USER}...")
    data = api_get(REPOS_URL)
    if not data:
        print("Failed to fetch repos.")
        return []

    repos = []
    for repo in data:
        name = repo["name"]
        owner = repo["owner"]["login"]
        print(f"  Processing {name}...")

        # README summary with fallback to description
        readme_summary = get_readme_summary(owner, name)
        if not readme_summary:
            readme_summary = repo.get("description") or None

        # Languages
        languages = get_languages(owner, name)

        # Topics
        topics = repo.get("topics", [])

        repos.append(
            {
                "name": name,
                "description": repo["description"],
                "readme_summary": readme_summary,
                "url": repo["html_url"],
                "language": repo["language"],
                "languages": languages,
                "topics": topics,
                "stars": repo["stargazers_count"],
                "updated_at": repo["updated_at"],
                "pushed_at": repo["pushed_at"],
                "recently_active": is_recently_active(repo["pushed_at"]),
            }
        )

    # Sort by pushed_at descending
    repos.sort(key=lambda r: r["pushed_at"], reverse=True)
    return repos


def git_commit_and_push():
    """Stage, commit and push repos.json."""
    try:
        subprocess.run(
            ["git", "add", str(OUTPUT_PATH)],
            check=True,
            capture_output=True,
        )

        # Check if there are staged changes
        result = subprocess.run(
            ["git", "diff", "--cached", "--quiet"],
            capture_output=True,
        )
        if result.returncode == 0:
            print("No changes to commit.")
            return

        subprocess.run(
            ["git", "commit", "-m", "chore: update repos data"],
            check=True,
            capture_output=True,
        )
        subprocess.run(
            ["git", "push", "origin", "main"],
            check=True,
            capture_output=True,
        )
        print("Committed and pushed repos.json to origin main.")
    except subprocess.CalledProcessError as e:
        print(f"Git error: {e.stderr.decode().strip() if e.stderr else e}")


def main():
    repos = fetch_repos()

    OUTPUT_PATH.parent.mkdir(parents=True, exist_ok=True)
    OUTPUT_PATH.write_text(json.dumps(repos, indent=2, ensure_ascii=False) + "\n")
    print(f"\nFetched {len(repos)} repos -> {OUTPUT_PATH}")

    git_commit_and_push()


if __name__ == "__main__":
    main()
