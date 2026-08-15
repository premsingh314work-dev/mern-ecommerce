import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Phone, Mail, ChevronDown } from "lucide-react";

// TODO: replace with your real support contact details
const SUPPORT_PHONE = "+91 98765 43210";
const SUPPORT_EMAIL = "support@smartshop.com";

const FAQS = [
  {
    question: "How do I track my order?",
    answer:
      "Once your order ships, you'll get a tracking link by email. You can also see order status anytime from your account under 'My Orders'.",
  },
  {
    question: "What is your return policy?",
    answer:
      "Most items can be returned within 7 days of delivery if unused and in original packaging. Go to 'My Orders' and select 'Return Item' to start a return.",
  },
  {
    question: "How long does delivery take?",
    answer:
      "Standard delivery usually takes 3-5 business days depending on your location. You'll see an estimated delivery date at checkout before you place the order.",
  },
  {
    question: "What payment methods do you accept?",
    answer:
      "We accept UPI, major debit and credit cards, and net banking. Cash on delivery is available for select locations.",
  },
  {
    question: "Can I cancel or change my order after placing it?",
    answer:
      "You can cancel an order from 'My Orders' as long as it hasn't shipped yet. Once it's shipped, cancellation isn't possible, but you can return it after delivery.",
  },
  {
    question: "How do I become a seller on this platform?",
    answer:
      "Sign up for an account and select 'Seller' during registration, or contact our support team to have an existing account upgraded.",
  },
  {
    question: "I forgot my password. What do I do?",
    answer:
      "Click 'Forgot password' on the login page and follow the instructions sent to your registered email to reset it.",
  },
];

function FaqItem({ question, answer }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-neutral-200 py-4">
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className="flex w-full items-center justify-between gap-4 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-neutral-900"
        aria-expanded={isOpen}
      >
        <span className="text-sm font-medium text-neutral-900">{question}</span>
        <ChevronDown
          className={`h-4 w-4 shrink-0 text-neutral-500 transition-transform ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>
      {isOpen && (
        <p className="mt-3 text-sm leading-6 text-neutral-600">{answer}</p>
      )}
    </div>
  );
}

function SupportPage() {
  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-[#06070867] mx-auto max-w-4xl px-6 py-14 sm:px-8 lg:px-10">
        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-neutral-500">
          Support
        </p>
        <h1 className="mt-2 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
          How can we help?
        </h1>
        <p className="mt-3 max-w-xl text-sm leading-6 text-neutral-600">
          Check the answers below for common questions, or reach out to our team
          directly if you can't find what you're looking for.
        </p>

        {/* Contact */}
        <section className="mt-10 grid gap-4 sm:grid-cols-2">
          <a
            href={`tel:${SUPPORT_PHONE.replace(/\s/g, "")}`}
            className="flex items-center gap-4 rounded-lg border border-neutral-200 bg-white p-5 transition hover:border-neutral-400"
          >
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-neutral-100">
              <Phone className="h-4 w-4 text-neutral-700" />
            </span>
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-neutral-500">
                Call us
              </p>
              <p className="mt-0.5 text-sm font-medium text-neutral-900">
                {SUPPORT_PHONE}
              </p>
            </div>
          </a>

          <a
            href={`mailto:${SUPPORT_EMAIL}`}
            className="flex items-center gap-4 rounded-lg border border-neutral-200 bg-white p-5 transition hover:border-neutral-400"
          >
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-neutral-100">
              <Mail className="h-4 w-4 text-neutral-700" />
            </span>
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-neutral-500">
                Email us
              </p>
              <p className="mt-0.5 text-sm font-medium text-neutral-900">
                {SUPPORT_EMAIL}
              </p>
            </div>
          </a>
        </section>

        {/* FAQs */}
        <section className="mt-14">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-neutral-500">
            FAQs
          </p>
          <h2 className="mt-2 text-2xl font-semibold text-white">
            Frequently asked questions
          </h2>

          <div className="mt-6 rounded-lg border border-neutral-200 bg-white px-6">
            {FAQS.map((faq) => (
              <FaqItem
                key={faq.question}
                question={faq.question}
                answer={faq.answer}
              />
            ))}
          </div>
        </section>
      </main>
    </>
  );
}

export default SupportPage;
