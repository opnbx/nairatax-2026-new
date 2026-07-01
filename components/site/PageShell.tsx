import { Ribbon } from './Ribbon';
import { Header } from './Header';
import { Footer } from './Footer';

/** Ribbon + Header + main + Footer wrapper shared by every page. */
export function PageShell({
  children,
  variant = 'home',
  page,
}: {
  children: React.ReactNode;
  variant?: 'home' | 'sub';
  page?: string;
}) {
  return (
    <div className="flex min-h-screen flex-col bg-white">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-btn focus:bg-navy-800 focus:px-4 focus:py-2 focus:text-white"
      >
        Skip to main content
      </a>
      <Ribbon />
      <Header variant={variant} page={page} />
      <main id="main-content" className="flex-1">
        {children}
      </main>
      <Footer variant={variant} />
    </div>
  );
}
