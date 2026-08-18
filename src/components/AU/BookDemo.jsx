// components/BookDemo.jsx
"use client";
import { useEffect, useState } from 'react';
import GlossyButton from './GlossyButton';
import axiosClient from '@/components/utils/axios';
import PhoneField from './demo/PhoneField';
import CountrySelect from './demo/CountrySelect';
import { DEFAULT_COUNTRY, findByIso } from './demo/countries';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function BookDemo() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    residenceCountry: '',
    grade: '',
    subject: '',
  });
  // Phone is handled separately: country (dial code) + national digits.
  const [country, setCountry] = useState(DEFAULT_COUNTRY);
  const [nationalNumber, setNationalNumber] = useState('');

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isRegistered, setIsRegistered] = useState(false);
  const [submitError, setSubmitError] = useState('');
  // 'idle' | 'checking' | 'valid' | 'invalid'
  const [emailStatus, setEmailStatus] = useState('idle');

  // ── Auto-detect the visitor's country once, to preset the dial code. ──
  useEffect(() => {
    let active = true;
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 3000);
    (async () => {
      try {
        const res = await fetch('https://ipapi.co/json/', { signal: controller.signal });
        const data = await res.json();
        const detected = findByIso(data?.country_code);
        if (active && detected) {
          setCountry(detected);
          setFormData((prev) => (prev.residenceCountry ? prev : { ...prev, residenceCountry: detected.iso }));
        }
      } catch {
        /* keep default (Australia) */
      } finally {
        clearTimeout(timer);
      }
    })();
    return () => {
      active = false;
      controller.abort();
      clearTimeout(timer);
    };
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: '' }));
    if (submitError) setSubmitError('');
    if (name === 'email') setEmailStatus('idle');
  };

  // ── Verify the email really exists (format + domain MX) via our API. ──
  const checkEmail = async (email) => {
    const value = (email || '').trim();
    if (!value) return { valid: false, message: 'Email is required' };
    if (!EMAIL_RE.test(value)) return { valid: false, message: 'Please enter a valid email address.' };
    try {
      const res = await fetch('/api/validate-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: value }),
      });
      const data = await res.json();
      if (data.valid) return { valid: true };
      return { valid: false, message: data.message || "This email doesn't look valid." };
    } catch {
      // If our own check fails (network), don't hard-block a format-valid email.
      return { valid: true, soft: true };
    }
  };

  const handleEmailBlur = async () => {
    const email = formData.email.trim();
    if (!email) return;
    if (!EMAIL_RE.test(email)) {
      setEmailStatus('invalid');
      setErrors((prev) => ({ ...prev, email: 'Please enter a valid email address.' }));
      return;
    }
    setEmailStatus('checking');
    const r = await checkEmail(email);
    if (r.valid) {
      setEmailStatus('valid');
      setErrors((prev) => ({ ...prev, email: '' }));
    } else {
      setEmailStatus('invalid');
      setErrors((prev) => ({ ...prev, email: r.message }));
    }
  };

  const validateSync = () => {
    const e = {};
    if (!formData.fullName.trim()) e.fullName = 'Full name is required';
    else if (formData.fullName.trim().length < 3) e.fullName = 'Full name must be at least 3 characters';
    else if (formData.fullName.length > 20) e.fullName = 'Full name must be less than 20 characters';

    if (!formData.email.trim()) e.email = 'Email is required';
    else if (!EMAIL_RE.test(formData.email)) e.email = 'Please enter a valid email address.';

    const nat = nationalNumber.replace(/\D/g, '');
    if (!nat) e.mobile = 'Mobile number is required';
    else if (nat.length < 6 || nat.length > 14) e.mobile = 'Please enter a valid mobile number';

    if (!formData.residenceCountry) e.residenceCountry = 'Country is required';

    if (!formData.grade.trim()) e.grade = 'Grade is required';
    else if (formData.grade.length > 8) e.grade = 'Grade must be less than 8 characters';

    if (!formData.subject.trim()) e.subject = 'Subject is required';
    else if (formData.subject.trim().length < 3) e.subject = 'Subject must be at least 3 characters';
    else if (formData.subject.length > 15) e.subject = 'Subject must be less than 15 characters';

    return e;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitError('');

    const syncErrors = validateSync();
    setErrors(syncErrors);
    if (Object.keys(syncErrors).length > 0) return;

    setIsSubmitting(true);

    // Confirm the email exists before booking (skip if already verified on blur).
    if (emailStatus !== 'valid') {
      setEmailStatus('checking');
      const r = await checkEmail(formData.email);
      if (!r.valid) {
        setEmailStatus('invalid');
        setErrors((prev) => ({ ...prev, email: r.message }));
        setIsSubmitting(false);
        return;
      }
      setEmailStatus('valid');
    }

    try {
      const nat = nationalNumber.replace(/\D/g, '');
      const requestData = {
        fullName: formData.fullName.trim(),
        email: formData.email.toLowerCase().trim(),
        // Full international number (country code + national) so the Slack
        // notification shows the dial code, e.g. 61XXXXXXXXX.
        mobile: Number(country.dial + nat),
        country: findByIso(formData.residenceCountry)?.name || '',
        grade: formData.grade.trim(),
        subject: formData.subject.trim(),
      };

      const response = await axiosClient.post('/user/bookDemo', requestData);
      if (response.status === 200 || response.status === 201) {
        setIsRegistered(true);
      }
    } catch (error) {
      if (error?.response) {
        if (error.response.status === 400) {
          setSubmitError(error.response.data || 'Please check all fields are filled correctly.');
        } else {
          setSubmitError(error.response.data?.message || `Server error: ${error.response.status}`);
        }
      } else if (error?.request) {
        setSubmitError('Network error. Please try again in a moment.');
      } else {
        setSubmitError(error?.message || 'An unexpected error occurred.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setIsRegistered(false);
    setFormData({ fullName: '', email: '', residenceCountry: '', grade: '', subject: '' });
    setNationalNumber('');
    setEmailStatus('idle');
    setErrors({});
    setSubmitError('');
  };

  // ─────────────────────────── Thanks screen ───────────────────────────
  if (isRegistered) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-50 via-white to-blue-50 p-4">
        <div className="w-full max-w-md rounded-3xl bg-white p-8 text-center shadow-2xl ring-1 ring-black/5">
          <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-green-100">
            <svg className="h-11 w-11 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="mb-2 text-3xl font-extrabold text-gray-900">Thank you! 🎉</h2>
          <p className="text-gray-600">
            Your free demo is booked{formData.fullName ? `, ${formData.fullName.split(' ')[0]}` : ''}.
          </p>
          <p className="mt-1 text-gray-600">Our team will contact you shortly to confirm the details.</p>

          <div className="mt-6 flex flex-col gap-3">
            <a
              href="/au"
              className="w-full rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 px-4 py-3 font-semibold text-white shadow-md transition-transform hover:scale-[1.02]"
            >
              Back to Home
            </a>
            <button
              onClick={resetForm}
              className="w-full rounded-xl border border-gray-200 px-4 py-3 font-medium text-gray-700 transition-colors hover:bg-gray-50"
            >
              Book Another Demo
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ─────────────────────────────── Form ────────────────────────────────
  return (
    <div className="min-h-screen py-8 px-4">
      <div className="mx-auto max-w-2xl overflow-hidden rounded-xl bg-white/95 shadow-xl">
        <div className="rounded-2xl bg-white/20 p-6 md:p-8">
          <header className="mb-2 rounded-xl">
            <img src="/demoheaderv2.jpeg" alt="Book a free demo" />
          </header>

          <div className="my-6 h-px bg-gray-200" />

          <main className="mt-6">
            <h2 className="mb-4 text-xl font-semibold text-[#e66e37]">Book a Demo Session</h2>
            <div className="mb-6 rounded-lg bg-orange-100 p-4">
              <h3 className="font-medium text-gray-800">Student Demo Booking</h3>
              <p className="mt-1 font-semibold text-gray-700">Ace your next class with a free demo</p>
              <p className="mt-2 text-gray-600">Pick your subject and grade. We'll match you with the right tutor.</p>
              <div className="mt-3 flex items-center font-medium text-red-500">
                <span className="mr-2">📌</span>
                Limited slots today
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5" noValidate>
              <div className="flex items-center justify-between border-b border-gray-200 pb-3">
                <span className="font-medium text-gray-700">Awaiting submission</span>
                <span className="text-sm text-red-500">All fields are required</span>
              </div>

              {submitError && (
                <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-red-700">
                  <strong>Error: </strong>
                  {submitError}
                </div>
              )}

              {/* Full name */}
              <div>
                <label htmlFor="fullName" className="mb-1 block text-sm font-medium text-gray-700">Full Name *</label>
                <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  placeholder="Enter your full name (3-20 characters)"
                  className={`w-full rounded-lg border px-4 py-3 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 ${errors.fullName ? 'border-red-500' : 'border-gray-300'}`}
                />
                {errors.fullName && <p className="mt-1 text-sm text-red-600">{errors.fullName}</p>}
              </div>

              {/* Email with live verification */}
              <div>
                <label htmlFor="email" className="mb-1 block text-sm font-medium text-gray-700">Email *</label>
                <div className="relative">
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    onBlur={handleEmailBlur}
                    placeholder="name@example.com"
                    className={`w-full rounded-lg border px-4 py-3 pr-10 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 ${
                      errors.email ? 'border-red-500' : emailStatus === 'valid' ? 'border-green-500' : 'border-gray-300'
                    }`}
                  />
                  <span className="absolute right-3 top-1/2 -translate-y-1/2">
                    {emailStatus === 'checking' && (
                      <svg className="h-5 w-5 animate-spin text-gray-400" viewBox="0 0 24 24" fill="none">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                      </svg>
                    )}
                    {emailStatus === 'valid' && (
                      <svg className="h-5 w-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
                      </svg>
                    )}
                  </span>
                </div>
                {errors.email ? (
                  <p className="mt-1 text-sm text-red-600">{errors.email}</p>
                ) : emailStatus === 'valid' ? (
                  <p className="mt-1 text-sm text-green-600">Email verified ✓</p>
                ) : emailStatus === 'checking' ? (
                  <p className="mt-1 text-sm text-gray-500">Verifying email…</p>
                ) : null}
              </div>

              {/* Mobile with country code */}
              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">Mobile *</label>
                <PhoneField
                  country={country}
                  onCountryChange={(c) => {
                    setCountry(c);
                    if (errors.mobile) setErrors((prev) => ({ ...prev, mobile: '' }));
                  }}
                  nationalNumber={nationalNumber}
                  onNationalChange={(v) => {
                    setNationalNumber(v);
                    if (errors.mobile) setErrors((prev) => ({ ...prev, mobile: '' }));
                  }}
                  error={errors.mobile}
                />
                <p className="mt-1 text-xs text-gray-500">
                  We detect your country automatically — just enter your number.
                </p>
                {errors.mobile && <p className="mt-1 text-sm text-red-600">{errors.mobile}</p>}
              </div>

              {/* Country of residence */}
              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">Country *</label>
                <CountrySelect
                  value={formData.residenceCountry}
                  onChange={(iso) => {
                    setFormData((prev) => ({ ...prev, residenceCountry: iso }));
                    if (errors.residenceCountry) setErrors((prev) => ({ ...prev, residenceCountry: '' }));
                  }}
                  error={errors.residenceCountry}
                />
                {errors.residenceCountry && <p className="mt-1 text-sm text-red-600">{errors.residenceCountry}</p>}
              </div>

              {/* Grade */}
              <div>
                <label htmlFor="grade" className="mb-1 block text-sm font-medium text-gray-700">Grade *</label>
                <input
                  type="text"
                  id="grade"
                  name="grade"
                  value={formData.grade}
                  onChange={handleChange}
                  placeholder="e.g., 10th Grade (max 8 characters)"
                  className={`w-full rounded-lg border px-4 py-3 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 ${errors.grade ? 'border-red-500' : 'border-gray-300'}`}
                />
                {errors.grade && <p className="mt-1 text-sm text-red-600">{errors.grade}</p>}
              </div>

              {/* Subject */}
              <div>
                <label htmlFor="subject" className="mb-1 block text-sm font-medium text-gray-700">Subject *</label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="e.g., Mathematics (3-15 characters)"
                  className={`w-full rounded-lg border px-4 py-3 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 ${errors.subject ? 'border-red-500' : 'border-gray-300'}`}
                />
                {errors.subject && <p className="mt-1 text-sm text-red-600">{errors.subject}</p>}
              </div>

              <GlossyButton
                type="submit"
                disabled={isSubmitting}
                className="w-full rounded-lg bg-[#e66e37] px-4 py-3 font-medium text-white transition duration-300 hover:bg-[#e68355] disabled:cursor-not-allowed disabled:opacity-70"
              >
                {isSubmitting ? (
                  <span className="flex items-center justify-center">
                    <svg className="-ml-1 mr-3 h-5 w-5 animate-spin text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    Submitting…
                  </span>
                ) : (
                  'Submit Booking'
                )}
              </GlossyButton>

              <p className="mt-4 text-center text-sm text-gray-500">
                By submitting, you agree to be contacted about your demo.
              </p>
            </form>
          </main>
        </div>
      </div>
    </div>
  );
}
