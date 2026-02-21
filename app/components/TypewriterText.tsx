/**
 * TypewriterText — karakter-voor-karakter typanimatie met knipperende cursor.
 * Pure React implementatie zonder externe dependencies.
 */
"use client";

import { useState, useEffect, useRef } from "react";

interface TypewriterTextProps {
  text: string;
  delay?: number;
  speed?: number;
  className?: string;
  showCursor?: boolean;
  onComplete?: () => void;
}

function useTypewriter(text: string, speed: number, delay: number) {
  const [displayedText, setDisplayedText] = useState("");
  const [isDone, setIsDone] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout>>();

  useEffect(() => {
    setDisplayedText("");
    setIsDone(false);

    let cancelled = false;

    function typeChar(i: number) {
      if (cancelled) return;
      if (i >= text.length) {
        setIsDone(true);
        return;
      }
      timeoutRef.current = setTimeout(() => {
        setDisplayedText(text.slice(0, i + 1));
        typeChar(i + 1);
      }, speed);
    }

    timeoutRef.current = setTimeout(() => {
      typeChar(0);
    }, delay);

    return () => {
      cancelled = true;
      clearTimeout(timeoutRef.current);
    };
  }, [text, speed, delay]);

  return { displayedText, isDone };
}

export default function TypewriterText({
  text,
  delay = 0,
  speed = 60,
  className,
  showCursor = true,
  onComplete,
}: TypewriterTextProps) {
  const { displayedText, isDone } = useTypewriter(text, speed, delay);
  const [cursorVisible, setCursorVisible] = useState(true);

  useEffect(() => {
    if (isDone && onComplete) onComplete();
  }, [isDone, onComplete]);

  useEffect(() => {
    if (!showCursor) return;

    const blink = setInterval(() => {
      setCursorVisible((v) => !v);
    }, 900);

    return () => clearInterval(blink);
  }, [showCursor]);

  return (
    <span className={className}>
      {displayedText}
      {showCursor && (
        <>
          {" "}
          <span
            className="inline-block w-[2px] h-[0.7em] align-middle bg-current"
            style={{ opacity: cursorVisible ? 0.4 : 0 }}
            aria-hidden="true"
          />
        </>
      )}
    </span>
  );
}
