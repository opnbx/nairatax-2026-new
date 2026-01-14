'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';

export default function ContactPage() {
  // Set page title
  useEffect(() => {
    document.title = 'Contact Us - NairaTax';
  }, []);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [status, setStatus] = useState<'idle' | 'success'>('idle');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // For now, just show success message
    // In production, you'd send this to your backend
    setStatus('success');
    setFormData({ name: '', email: '', subject: '', message: '' });

    // Reset success message after 5 seconds
    setTimeout(() => setStatus('idle'), 5000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <main className="min-h-screen bg-white">
      <div className="max-w-6xl mx-auto px-4 py-16">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            📬 Contact Us
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Have questions, feedback, or found a bug? We'd love to hear from you.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div>
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">Get in Touch</h2>
            <p className="text-gray-700 mb-8">
              Have questions about Nigerian taxes or our calculators? We're here to help!
            </p>

            <div className="space-y-6">
              {/* Email */}
              <div className="flex items-start gap-4">
                <span className="text-3xl flex-shrink-0" aria-hidden="true">📧</span>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Email</h3>
                  <a
                    href="mailto:webchief@nairatax.ng"
                    className="text-blue-600 hover:text-blue-700 hover:underline"
                  >
                    webchief@nairatax.ng
                  </a>
                </div>
              </div>
            </div>

            {/* What we can help with */}
            <div className="mt-12 bg-blue-50 rounded-lg p-6 border-2 border-blue-100">
              <h3 className="font-semibold text-gray-900 mb-4">We can help with:</h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-2">
                  <span className="text-green-600 text-xl flex-shrink-0" aria-hidden="true">✅</span>
                  <span className="text-gray-700">Questions about tax calculations</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600 text-xl flex-shrink-0" aria-hidden="true">✅</span>
                  <span className="text-gray-700">Feedback on the calculator</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600 text-xl flex-shrink-0" aria-hidden="true">✅</span>
                  <span className="text-gray-700">Bug reports</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600 text-xl flex-shrink-0" aria-hidden="true">✅</span>
                  <span className="text-gray-700">Partnership inquiries</span>
                </li>
              </ul>
            </div>

            {/* Disclaimer */}
            <div className="mt-8 bg-yellow-50 border-l-4 border-yellow-400 rounded p-4">
              <div className="flex items-start gap-2">
                <span className="text-xl flex-shrink-0" aria-hidden="true">ℹ️</span>
                <div>
                  <p className="text-sm text-gray-700">
                    <strong>Please Note:</strong> NairaTax.ng provides tax estimates for educational purposes only.
                    For professional tax advice, please consult a qualified tax advisor or contact FIRS directly.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div>
            <div className="bg-white border-2 border-gray-200 rounded-lg p-6 md:p-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-6">Send us a Message</h2>

              {status === 'success' && (
                <div className="mb-6 bg-green-50 border-2 border-green-200 rounded-lg p-4">
                  <div className="flex items-start gap-2">
                    <span className="text-green-600 text-xl">✓</span>
                    <p className="text-green-800">
                      Thank you for your message! We'll get back to you soon at <strong>{formData.email}</strong>.
                    </p>
                  </div>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Name */}
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="John Doe"
                  />
                </div>

                {/* Email */}
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="john@example.com"
                  />
                </div>

                {/* Subject */}
                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                    Subject *
                  </label>
                  <select
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
                  >
                    <option value="">Select a subject</option>
                    <option value="question">Question about tax calculations</option>
                    <option value="feedback">Feedback on the calculator</option>
                    <option value="bug">Bug report</option>
                    <option value="partnership">Partnership inquiry</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                {/* Message */}
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                    placeholder="Tell us how we can help you..."
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="w-full bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 transition"
                >
                  Send Message
                </button>
              </form>
            </div>

            {/* Alternative Contact */}
            <div className="mt-6 text-center text-sm text-gray-600">
              <p>
                Or email us directly at{' '}
                <a
                  href="mailto:webchief@nairatax.ng"
                  className="text-blue-600 hover:text-blue-700 hover:underline font-medium"
                >
                  webchief@nairatax.ng
                </a>
              </p>
            </div>
          </div>
        </div>

        {/* Back to Homepage */}
        <div className="mt-12 text-center">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium"
          >
            ← Back to Homepage
          </Link>
        </div>
      </div>
    </main>
  );
}
