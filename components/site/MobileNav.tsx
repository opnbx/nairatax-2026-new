'use client';

import Link from 'next/link';
import { useState } from 'react';

const LINKS = [
  { label: 'Calculators', href: '/#calculators' },
  { label: 'Tax brackets', href: '/#brackets' },
  { label: 'FAQ', href: '/#faq' },
  { label: 'Contact', href: '/contact/' },
];

/** Hamburger menu shown below the `sm` breakpoint, where the inline nav hides. */
export function MobileNav() {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative sm:hidden">
      <button
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
