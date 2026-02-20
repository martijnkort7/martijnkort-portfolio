"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

const navItems = [
  { label: "Over mij", href: "#about" },
  { label: "Ervaring", href: "#experience" },
  { label: "Projecten", href: "#projects" },
  { label: "Contact", href: "#contact" },
];

export default function MobileNav() {
  const [isOpen, setIsOpen] = useState(false);

  // Lock body scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setIsOpen(false);
    // Small delay to let the menu close before scrolling
    setTimeout(() => {
      const el = document.querySelector(href);
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }, 300);
  };

  return (
    <div className="lg:hidden">
      {/* Header bar */}
      <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 backdrop-blur-md bg-navy/80 border-b border-navy-light/50">
        <span className="font-heading text-lg font-bold text-lightest">
          MK
        </span>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="text-slate-light transition-colors duration-200 hover:text-accent"
          aria-label={isOpen ? "Menu sluiten" : "Menu openen"}
          aria-expanded={isOpen}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </header>

      {/* Fullscreen overlay menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 z-40 flex items-center justify-center bg-navy/95 backdrop-blur-lg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <nav aria-label="Mobiele navigatie">
              <ul className="flex flex-col items-center gap-8">
                {navItems.map((item, i) => (
                  <motion.li
                    key={item.href}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{
                      duration: 0.3,
                      delay: i * 0.07,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                  >
                    <a
                      href={item.href}
                      onClick={(e) => handleClick(e, item.href)}
                      className="font-heading text-2xl font-semibold text-lightest transition-colors duration-200 hover:text-accent"
                    >
                      {item.label}
                    </a>
                  </motion.li>
                ))}
              </ul>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
