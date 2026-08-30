'use client';

import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';

const LINKS = [
  { label: 'Calculators', href: '/#calculators' },
  { label: 'Tax brackets', href: '/#brackets' },
  { label: 'FAQ', href: '/#faq' },
  { label: 'Contact', href: '/contact/' },
];

/** Hamburger menu shown below the `sm` breakpoint, where the inline nav hides. */
export function MobileNav() {
  const [open, setOpen] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  // Move focus into the panel when it opens; restore it to the toggle on close.
  useEffect(() => {
    if (!open) return;
    const links = panelRef.current?.querySelectorAll<HTMLElement>('a[href]');
    links?.[0]?.focus();

    function onKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') {
        e.preventDefault();
        setOpen(false);
        buttonRef.current?.focus();
        return;
      }
      if (e.key === 'Tab' && links && links.length > 0) {
        // Trap focus within the open menu.
        const first = links[0];
        const last = links[links.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    }

    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [open]);

  return (
    <div className="relative sm:hidden">
      <button
        ref={buttonRef}
        type="button"
        aria-label={open ? 'Close menu' : 'Open menu'}
        aria-expanded={open}
        aria-controls="mobile-nav-panel"
        onClick={() => setOpen((v) => !v)}
        className="flex h-9 w-9 items-center justify-center rounded-[8px] border border-hairline text-navy-800"
      >
        <span className="text-[18px] leading-none" aria-hidden="true">{open ? '✕' : '☰'}</span>
      </button>

      {open && (
        <>
          {/* Click-away backdrop */}
          <button
            type="button"
            tabIndex={-1}
            aria-hidden="true"
            onClick={() => setOpen(false)}
            className="fixed inset-0 z-40 cursor-default"
          />
          <div
            ref={panelRef}
            id="mobile-nav-panel"
            className="absolute right-0 top-11 z-50 w-52 overflow-hidden rounded-card border border-hairline bg-white py-1 shadow-board"
          >
            {LINKS.map((l) => (
              <Link
                key={l.label}
                href={l.href}
                onClick={() => setOpen(false)}
                className="block px-4 py-2.5 text-[15px] text-ink-body2 hover:bg-tint hover:text-navy-800"
              >
                {l.label}
              </Link>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
