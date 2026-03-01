"use client";

interface ContactFormLabels {
  firstName: string;
  lastName: string;
  email: string;
  mobile: string;
  consultationType: string;
  consultationPlaceholder: string;
  consultationOptions: {
    investment: string;
    insurance: string;
    iepf: string;
    education: string;
    general: string;
  };
  preferredTime: string;
  preferredTimePlaceholder: string;
  timeOptions: {
    morning: string;
    afternoon: string;
    evening: string;
  };
  message: string;
  messagePlaceholder: string;
  consent: string;
  privacyPolicy: string;
  submit: string;
  submitNote: string;
}

interface ContactFormProps {
  dict?: ContactFormLabels;
}

export default function ContactForm({ dict }: ContactFormProps) {
  const d = dict ?? {
    firstName: "First Name",
    lastName: "Last Name",
    email: "Email Address",
    mobile: "Mobile Number",
    consultationType: "I want to discuss...",
    consultationPlaceholder: "Select consultation type",
    consultationOptions: {
      investment: "Investment Advisory",
      insurance: "Insurance Review",
      iepf: "IEPF / Recovery",
      education: "Financial Education",
      general: "General Financial Planning",
    },
    preferredTime: "Preferred Time Slot",
    preferredTimePlaceholder: "Any time is fine",
    timeOptions: {
      morning: "Morning (9 AM – 12 PM)",
      afternoon: "Afternoon (12 PM – 4 PM)",
      evening: "Evening (4 PM – 7 PM)",
    },
    message: "Briefly describe your situation (optional)",
    messagePlaceholder:
      "E.g. I inherited physical share certificates from my grandfather and want to dematerialise them and check if any dividends are unclaimed...",
    consent:
      "I agree to be contacted by Saarthi Finance regarding my consultation request. I understand this is not a commitment to any financial product or service. My data will be handled in accordance with our ",
    privacyPolicy: "Privacy Policy",
    submit: "Request Free Consultation",
    submitNote:
      "We'll confirm your slot within 1 business day. The first session is always free — no credit card required.",
  };

  return (
    <form
      aria-label="Consultation booking form"
      className="space-y-5"
      noValidate
      onSubmit={(e) => e.preventDefault()}
    >
      {/* Name row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label
            htmlFor="first-name"
            className="block text-sm font-medium text-navy-900 mb-1.5"
          >
            {d.firstName}{" "}
            <span className="text-red-500" aria-hidden="true">
              *
            </span>
          </label>
          <input
            id="first-name"
            name="firstName"
            type="text"
            required
            autoComplete="given-name"
            placeholder="Rahul"
            className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm text-navy-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-navy-300 focus:border-navy-300"
            aria-required="true"
          />
        </div>
        <div>
          <label
            htmlFor="last-name"
            className="block text-sm font-medium text-navy-900 mb-1.5"
          >
            {d.lastName}{" "}
            <span className="text-red-500" aria-hidden="true">
              *
            </span>
          </label>
          <input
            id="last-name"
            name="lastName"
            type="text"
            required
            autoComplete="family-name"
            placeholder="Sharma"
            className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm text-navy-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-navy-300 focus:border-navy-300"
            aria-required="true"
          />
        </div>
      </div>

      {/* Email */}
      <div>
        <label
          htmlFor="email"
          className="block text-sm font-medium text-navy-900 mb-1.5"
        >
          {d.email}{" "}
          <span className="text-red-500" aria-hidden="true">
            *
          </span>
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          autoComplete="email"
          placeholder="rahul@example.com"
          className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm text-navy-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-navy-300 focus:border-navy-300"
          aria-required="true"
        />
      </div>

      {/* Phone */}
      <div>
        <label
          htmlFor="phone"
          className="block text-sm font-medium text-navy-900 mb-1.5"
        >
          {d.mobile}{" "}
          <span className="text-red-500" aria-hidden="true">
            *
          </span>
        </label>
        <div className="flex gap-2">
          <span className="inline-flex items-center px-3 py-3 rounded-xl border border-gray-200 bg-gray-50 text-sm text-gray-500">
            +91
          </span>
          <input
            id="phone"
            name="phone"
            type="tel"
            required
            autoComplete="tel"
            placeholder="98765 43210"
            className="flex-1 px-4 py-3 rounded-xl border border-gray-200 text-sm text-navy-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-navy-300 focus:border-navy-300"
            aria-required="true"
          />
        </div>
      </div>

      {/* Consultation type */}
      <div>
        <label
          htmlFor="consultation-type"
          className="block text-sm font-medium text-navy-900 mb-1.5"
        >
          {d.consultationType}
        </label>
        <select
          id="consultation-type"
          name="consultationType"
          className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm text-navy-900 focus:outline-none focus:ring-2 focus:ring-navy-300 focus:border-navy-300 bg-white"
        >
          <option value="">{d.consultationPlaceholder}</option>
          <option value="investment">{d.consultationOptions.investment}</option>
          <option value="insurance">{d.consultationOptions.insurance}</option>
          <option value="iepf">{d.consultationOptions.iepf}</option>
          <option value="education">{d.consultationOptions.education}</option>
          <option value="general">{d.consultationOptions.general}</option>
        </select>
      </div>

      {/* Preferred time */}
      <div>
        <label
          htmlFor="preferred-time"
          className="block text-sm font-medium text-navy-900 mb-1.5"
        >
          {d.preferredTime}
        </label>
        <select
          id="preferred-time"
          name="preferredTime"
          className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm text-navy-900 focus:outline-none focus:ring-2 focus:ring-navy-300 focus:border-navy-300 bg-white"
        >
          <option value="">{d.preferredTimePlaceholder}</option>
          <option value="morning">{d.timeOptions.morning}</option>
          <option value="afternoon">{d.timeOptions.afternoon}</option>
          <option value="evening">{d.timeOptions.evening}</option>
        </select>
      </div>

      {/* Message */}
      <div>
        <label
          htmlFor="message"
          className="block text-sm font-medium text-navy-900 mb-1.5"
        >
          {d.message}
        </label>
        <textarea
          id="message"
          name="message"
          rows={4}
          placeholder={d.messagePlaceholder}
          className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm text-navy-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-navy-300 focus:border-navy-300 resize-none"
        />
      </div>

      {/* Consent */}
      <div className="flex items-start gap-3">
        <input
          id="consent"
          name="consent"
          type="checkbox"
          required
          className="mt-0.5 w-4 h-4 rounded accent-navy-700"
          aria-required="true"
        />
        <label
          htmlFor="consent"
          className="text-xs text-gray-600 leading-relaxed"
        >
          {d.consent}{" "}
          <a href="/compliance#privacy" className="text-navy-700 underline">
            {d.privacyPolicy}
          </a>
          .
        </label>
      </div>

      {/* Submit */}
      <button type="submit" className="btn-accent w-full justify-center">
        {d.submit}
        <svg
          className="w-4 h-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
          />
        </svg>
      </button>

      <p className="text-xs text-gray-400 text-center">
        {d.submitNote}
      </p>
    </form>
  );
}
