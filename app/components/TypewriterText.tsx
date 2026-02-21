/**
 * TypewriterText — karakter-voor-karakter typanimatie met knipperende cursor.
 * Pure React implementatie zonder externe dependencies.
 */
"use client";

import { useState, useEffect } from "react";

interface TypewriterTextProps {
  text: string;
  delay?: number;
  speed?: number;
  className?: string;
  showCursor?: boolean;
}

function useTypewriter(text: string, speed: number, delay: number) {
  const [displayedText, setDisplayedText] = useState("");
  const [isDone, setIsDone] = useState(false);

  useEffect(() => {
    setDisplayedText("");
    setIsDone(false);

    const timeout = setTimeout(() => {
      let i = 0;
      const interval = setInterval(() => {
        i++;
        setDisplayedText(text.slice(0, i));
        if (i >= text.length) {
          clearInterval(interval);
          setIsDone(true);
        }
      }, speed);

      return () => clearInterval(interval);
    }, delay);

    return () => clearTimeout(timeout);
  }, [text, speed, delay]);

  return { displayedText, isDone };
}

export default function TypewriterText({
  text,
  delay = 0,
  speed = 60,
  className,
  showCursor = true,
}: TypewriterTextProps) {
  const { displayedText, isDone } = useTypewriter(text, speed, delay);
  const [cursorVisible, setCursorVisible] = useState(true);
  useEffect(() => {
    if (!showCursor) return;

    const blink = setInterval(() => {
      setCursorVisible((v) => !v);
    }, 530);

    return () => clearInterval(blink);
  }, [showCursor]);

  return (
    <span className={className}>
      {displayedText}
      {showCursor && (
        <span
          className="inline-block w-[2px] h-[1em] align-middle bg-current ml-[1px]"
          style={{ opacity: cursorVisible ? (isDone ? 0.4 : 1) : 0 }}
          aria-hidden="true"
        />
      )}
    </span>
  );
}
