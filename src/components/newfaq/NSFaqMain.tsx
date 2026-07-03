"use client";

// Full FAQ page body. Mirrors the visual language of /new-courses and
// /new-blogs (white bg, orange accents, pill + big heading hero, rounded
// cards, framer-motion reveals) while reusing the shared `faqSections`
// content that also powers the on-home <NSFAQ/> accordion.
import React, { useMemo, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Plus, MessageCircle, GraduationCap } from "lucide-react";
import { faqSections, type FaqItem } from "./faqPageData";

export default function NSFaqMain() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeSection, setActiveSection] = useState(0);
  // Open accordion is keyed by the question text (unique) so it stays correct
  // whether we're showing a single tab or flattened search results.
  const [openKey, setOpenKey] = useState<string | null>(null);

  const query = searchQuery.trim().toLowerCase();
  const isSearching = query.length > 0;

  // When searching, flatten every section and match on question/answer.
  // Otherwise just show the active tab's questions.
  const visibleFaqs = useMemo<FaqItem[]>(() => {
    if (!isSearching) return faqSections[activeSection].faqs;
    return faqSections
      .flatMap((s) => s.faqs)
      .filter(
        (f) =>
          f.question.toLowerCase().includes(query) ||
          f.answer.toLowerCase().includes(query)
      );
  }, [isSearching, query, activeSection]);

  const toggle = (key: string) =>
    setOpenKey((prev) => (prev === key ? null : key));

  return (
    <div className="min-h-screen bg-white text-gray-900 font-sans pt-32 md:pt-40 pb-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero */}
        <header className="mb-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex flex-col items-center"
          >
            <span className="text-orange-600 px-4 py-1 rounded-full text-sm font-bold uppercase tracking-wider mb-4 border border-orange-200">
              Help Center
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-6 text-gray-900 tracking-tight">
              Frequently Asked{" "}
              <span className="relative inline-block">
                <span className="relative z-10 text-orange-600">Questions</span>
                <span className="absolute bottom-1 left-0 w-full h-3 bg-orange-100 -z-10 rounded-sm" />
              </span>
            </h1>
            <p className="text-gray-600 max-w-2xl mx-auto text-lg md:text-xl leading-relaxed">
              Everything you need to know about our classes, teachers, and
              support. Can&apos;t find an answer? Reach out and we&apos;ll help.
            </p>
          </motion.div>
        </header>

        {/* Search */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="relative group max-w-xl mx-auto mb-8"
        >
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400 group-focus-within:text-orange-500 transition-colors" />
          </div>
          <input
            type="text"
            placeholder="Search questions..."
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setOpenKey(null);
            }}
            className="block w-full pl-12 pr-4 py-3.5 border border-gray-200 rounded-2xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all text-base shadow-sm"
          />
        </motion.div>

        {/* Section tabs — hidden while searching (results are cross-section) */}
        {!isSearching && (
          <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-10">
            {faqSections.map((section, idx) => (
              <button
                key={section.title}
                onClick={() => {
                  setActiveSection(idx);
                  setOpenKey(null);
                }}
                className={`px-5 sm:px-6 py-2 rounded-full font-bold transition-all duration-300 text-sm sm:text-base transform hover:scale-105 ${
                  activeSection === idx
                    ? "bg-orange-600 text-white shadow-lg shadow-orange-500/30"
                    : "bg-white text-gray-600 border border-gray-200 hover:bg-gray-100 hover:border-orange-200"
                }`}
              >
                {section.title}
              </button>
            ))}
          </div>
        )}

        {/* Active section subtitle */}
        {!isSearching && (
          <motion.p
            key={activeSection}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center text-gray-500 font-medium mb-8 -mt-4"
          >
            {faqSections[activeSection].subtitle}
          </motion.p>
        )}

        {/* Search result count */}
        {isSearching && (
          <p className="text-center text-sm text-gray-500 font-medium mb-8">
            {visibleFaqs.length}{" "}
            {visibleFaqs.length === 1 ? "result" : "results"} for &ldquo;
            {searchQuery.trim()}&rdquo;
          </p>
        )}

        {/* Accordion */}
        <div className="space-y-4 min-h-[200px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={isSearching ? `search-${query}` : `section-${activeSection}`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="space-y-4"
            >
              {visibleFaqs.map((item, index) => {
                const isActive = openKey === item.question;
                return (
                  <motion.div
                    key={item.question}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.05 }}
                    className={`group rounded-[2rem] transition-all duration-300 border ${
                      isActive
                        ? "bg-orange-50 border-orange-300 shadow-md"
                        : "bg-white border-gray-100 shadow-sm hover:border-orange-200 hover:bg-orange-50/40"
                    }`}
                  >
                    <button
                      onClick={() => toggle(item.question)}
                      className="w-full text-left px-5 sm:px-8 py-5 flex items-center gap-4 focus:outline-none"
                    >
                      <span
                        className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-colors duration-300 ${
                          isActive
                            ? "bg-orange-500 text-white"
                            : "bg-orange-100 text-orange-600 group-hover:bg-orange-500 group-hover:text-white"
                        }`}
                      >
                        <motion.span
                          animate={{ rotate: isActive ? 45 : 0 }}
                          transition={{ duration: 0.3, ease: "easeInOut" }}
                          className="flex items-center justify-center"
                        >
                          <Plus size={18} strokeWidth={3} />
                        </motion.span>
                      </span>
                      <span
                        className={`text-base sm:text-lg font-bold flex-1 ${
                          isActive ? "text-orange-900" : "text-gray-800"
                        }`}
                      >
                        {item.question}
                      </span>
                    </button>

                    <AnimatePresence initial={false}>
                      {isActive && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3, ease: "easeInOut" }}
                          className="overflow-hidden"
                        >
                          <div className="px-5 sm:px-8 pb-6 sm:pl-[4.5rem] text-gray-600 leading-relaxed text-sm sm:text-base">
                            {item.answer}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                );
              })}
            </motion.div>
          </AnimatePresence>

          {/* Empty search state */}
          {isSearching && visibleFaqs.length === 0 && (
            <div className="text-center py-16">
              <p className="text-gray-400 text-lg">
                No questions match your search.
              </p>
              <button
                onClick={() => setSearchQuery("")}
                className="mt-4 text-orange-600 font-semibold hover:underline"
              >
                Clear search
              </button>
            </div>
          )}
        </div>

        {/* Still have questions CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-16 rounded-[2.5rem] bg-orange-50 border border-orange-100 px-6 sm:px-10 py-10 text-center"
        >
          <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 mb-3">
            Still have <span className="text-orange-600">questions?</span>
          </h2>
          <p className="text-gray-600 max-w-xl mx-auto mb-8 text-base sm:text-lg">
            Our team is here to help. Chat with us directly or book a free trial
            class to see how SuperSheldon works.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-3">
            <Link
              href="https://wa.me/917974695618"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-8 rounded-full transition-all duration-300 shadow-lg shadow-orange-200 transform hover:scale-105"
            >
              <MessageCircle size={18} />
              Contact Us
            </Link>
            <Link
              href="/demo"
              className="inline-flex items-center justify-center gap-2 bg-white hover:bg-orange-100 text-orange-800 font-bold py-3 px-8 rounded-full transition-all duration-300 shadow-sm border border-orange-200 transform hover:scale-105"
            >
              <GraduationCap size={18} />
              Try a Free Class
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
