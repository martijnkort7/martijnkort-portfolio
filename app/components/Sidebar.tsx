"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Github, Linkedin, Mail } from "lucide-react";

const navItems = [
  { label: "Over mij", href: "#about" },
  { label: "Ervaring", href: "#experience" },
  { label: "Projecten", href: "#projects" },
  { label: "Contact", href: "#contact" },
];

const sectionIds = navItems.map((item) => item.href.slice(1));

export default function Sidebar() {
  const [activeSection, setActiveSection] = useState<string>("about");

  useEffect(() => {
    const handleScroll = () => {
      // If at the bottom of the page, activate the last section
      const atBottom =
        window.innerHeight + window.scrollY >= document.body.scrollHeight - 50;
      if (atBottom) {
        setActiveSection(sectionIds[sectionIds.length - 1]);
        return;
      }

      // Find the section closest to the top of the viewport
      const offset = window.innerHeight * 0.3;
      let current = sectionIds[0];

      for (const id of sectionIds) {
        const el = document.getElementById(id);
        if (el) {
          const top = el.getBoundingClientRect().top;
          if (top <= offset) {
            current = id;
          }
        }
      }

      setActiveSection(current);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <aside className="hidden lg:flex lg:w-1/2 lg:max-w-[600px] lg:flex-col lg:justify-between lg:py-24 lg:pr-8 lg:sticky lg:top-0 lg:h-screen">
      <motion.div
        initial={{ opacity: 0, x: -30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      >
        <h1 className="font-heading text-5xl font-bold tracking-tight text-lightest">
          Martijn Kort
        </h1>
        <h2 className="mt-3 font-heading text-lg font-medium text-slate-light">
          Process Owner · AI-specialist · Utrecht
        </h2>

        <nav className="mt-16" aria-label="Navigatie">
          <ul className="flex flex-col gap-1">
            {navItems.map((item, i) => {
              const isActive = activeSection === item.href.slice(1);
              return (
                <motion.li
                  key={item.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{
                    duration: 0.4,
                    delay: 0.3 + i * 0.08,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                >
                  <a
                    href={item.href}
                    onClick={(e) => handleClick(e, item.href)}
                    className="group flex items-center gap-3 py-2 transition-all duration-300"
                    aria-current={isActive ? "location" : undefined}
                  >
                    <span
                      className={`block h-px transition-all duration-300 ${
                        isActive
                          ? "w-16 bg-accent"
                          : "w-8 bg-slate group-hover:w-16 group-hover:bg-lightest"
                      }`}
                    />
                    <span
                      className={`text-xs font-semibold uppercase tracking-widest transition-colors duration-300 ${
                        isActive
                          ? "text-accent"
                          : "text-slate group-hover:text-lightest"
                      }`}
                    >
                      {item.label}
                    </span>
                  </a>
                </motion.li>
              );
            })}
          </ul>
        </nav>
      </motion.div>

      <motion.div
        className="flex items-center gap-5"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.8 }}
      >
        <a
          href="https://github.com/martijnkort7"
          target="_blank"
          rel="noopener noreferrer"
          className="text-slate transition-colors duration-200 hover:text-accent"
          aria-label="GitHub"
        >
          <Github size={20} />
        </a>
        <a
          href="https://linkedin.com/in/martijnkort07"
          target="_blank"
          rel="noopener noreferrer"
          className="text-slate transition-colors duration-200 hover:text-accent"
          aria-label="LinkedIn"
        >
          <Linkedin size={20} />
        </a>
        <a
          href="mailto:martijn.kort@hotmail.com"
          className="text-slate transition-colors duration-200 hover:text-accent"
          aria-label="E-mail"
        >
          <Mail size={20} />
        </a>
      </motion.div>
    </aside>
  );
}
