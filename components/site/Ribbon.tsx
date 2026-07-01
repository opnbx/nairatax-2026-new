import { SealDiamond } from './Logo';

/** Full-width navy top ribbon with the Tax Act alignment statement. */
export function Ribbon() {
  return (
    <div className="w-full bg-navy-900 py-2.5">
      <div className="flex items-center justify-center gap-2 px-4 text-center">
        <SealDiamond className="h-[6px] w-[6px]" />
        <span className="eyebrow text-[11px] tracking-[0.08em] text-gold-onnavy sm:text-[12px]">
          Aligned with the Nigeria Tax Act 2025 · Effective 1 January 2026
        </span>
      </div>
    </div>
  );
}
