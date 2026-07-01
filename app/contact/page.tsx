'use client';

import { useState } from 'react';
import { PageShell } from '@/components/site/PageShell';
import { Eyebrow, Callout } from '@/components/calc/ui';

const INPUT_CLASS =
  'w-full rounded-input border border-inputborder bg-white px-3.5 py-3 text-[15px] text-ink-heading outline-none focus:border-navy-800 placeholder:text-placeholder';

export default function ContactPage() {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'success'>('idle');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('success');
    setFormData({ name: '', email: '', subject: '', message: '' });
    setTimeout(() => setStatus('idle'), 5000);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <PageShell variant="sub" page="Contact">
      <section className="tx-security">
        <div className="mx-auto max-w-[1280px] px-6 pb-28 pt-14 lg:px-14">
          <Eyebrow tone="navy">Get in touch</Eyebrow>
          <h1 className="mt-4 max-w-2xl font-serif text-[36px] font-bold leading-[1.05] tracking-[-0.02em] text-white sm:text-[46px]">
            Questions or feedback?
          </h1>
          <p className="mt-4 max-w-xl text-[15.5px] leading-relaxed text-onnavy-1">
            Found a bug, have a question about a calculation, or want to suggest an estimator? We&apos;d
            love to hear from you.
          </p>
        </div>
      </section>

      <div className="relative z-10 mx-auto -mt-20 max-w-[1280px] px-6 pb-16 lg:px-14">
        <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          {/* Info */}
          <div className="rounded-calc bg-white p-7 shadow-calc ring-1 ring-hairline">
            <h2 className="text-[18px] font-bold text-ink-heading">Reach us directly</h2>
            <a
              href="mailto:webchief@nairatax.ng"
              className="mt-3 inline-block font-mono text-[15px] text-gold-light hover:underline"
            >
              webchief@nairatax.ng
            </a>
            <h3 className="eyebrow mt-8 text-[11px] tracking-[0.16em] text-gold-eyebrow">We can help with</h3>
            <ul className="mt-4 space-y-3">
              {[
                'Questions about tax calculations',
                'Feedback on the calculators',
                'Bug reports',
                'Partnership inquiries',
              ].map((item) => (
                <li key={item} className="flex items-start gap-2.5 text-[14.5px] text-ink-body">
                  <span className="mt-0.5 flex h-[20px] w-[20px] shrink-0 items-center justify-center rounded-[5px] bg-navy-800 text-[11px] text-gold-fill" aria-hidden="true">✓</span>
                  {item}
                </li>
              ))}
            </ul>
            <div className="mt-8">
              <div className="rounded-input bg-fieldsoft px-3.5 py-3 text-[12.5px] leading-relaxed text-muted">
                <strong className="text-ink-body">Please note:</strong> NairaTax provides estimates for
                educational purposes only. For professional advice, consult a qualified tax advisor or
                the Nigeria Revenue Service.
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="rounded-calc bg-white p-7 shadow-calc ring-1 ring-hairline">
            <h2 className="text-[18px] font-bold text-ink-heading">Send us a message</h2>

            {status === 'success' && (
              <div className="mt-5">
                <Callout tone="green">
                  <span className="mr-1 font-bold">✓</span>
                  Thanks for your message — we&apos;ll get back to you soon.
                </Callout>
              </div>
            )}

            <form onSubmit={handleSubmit} className="mt-5 space-y-5">
              <div>
                <label htmlFor="name" className="block text-[13px] font-semibold text-ink-body">Your name *</label>
                <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required placeholder="John Doe" className={`mt-2 ${INPUT_CLASS}`} />
              </div>
              <div>
                <label htmlFor="email" className="block text-[13px] font-semibold text-ink-body">Email address *</label>
                <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required placeholder="john@example.com" className={`mt-2 ${INPUT_CLASS}`} />
              </div>
              <div>
                <label htmlFor="subject" className="block text-[13px] font-semibold text-ink-body">Subject *</label>
                <select id="subject" name="subject" value={formData.subject} onChange={handleChange} required className={`mt-2 ${INPUT_CLASS}`}>
                  <option value="">Select a subject</option>
                  <option value="question">Question about tax calculations</option>
                  <option value="feedback">Feedback on the calculator</option>
                  <option value="bug">Bug report</option>
                  <option value="partnership">Partnership inquiry</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <div>
                <label htmlFor="message" className="block text-[13px] font-semibold text-ink-body">Message *</label>
                <textarea id="message" name="message" value={formData.message} onChange={handleChange} required rows={6} placeholder="Tell us how we can help you..." className={`mt-2 resize-none ${INPUT_CLASS}`} />
              </div>
              <button type="submit" className="w-full rounded-btn bg-navy-800 px-6 py-3 text-[14px] font-semibold text-white transition-opacity hover:opacity-90">
                Send message
              </button>
            </form>
          </div>
        </div>
      </div>
    </PageShell>
  );
}
