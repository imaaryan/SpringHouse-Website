"use client";
import React, { useState } from "react";
import "./faqs.css";

// Helper function to format multiline text and basic bullets coming from API/JSON
const formatAnswer = (answer) => {
  if (!answer) return null;
  const trimmed = answer.trim();

  // Check for bullet points or dashes
  if (/[•\-\*]\s+/.test(trimmed)) {
    const parts = trimmed.split(/\n\s*[•\-\*]\s+/);
    const intro = parts[0].trim();
    const items = parts.slice(1).filter(Boolean);

    return (
      <div className="faq-answer-content">
        {intro && <p className="mb-3">{intro}</p>}
        <ul className="mb-0 faq-list">
          {items.map((item, idx) => (
            <li key={idx} className="mb-2">
              {item.trim()}
            </li>
          ))}
        </ul>
      </div>
    );
  }

  // Check for multiple paragraphs (separated by double newlines)
  const paragraphs = trimmed.split(/\n\s*\n+/).filter((p) => p.trim());

  if (paragraphs.length > 1) {
    return (
      <div className="faq-answer-content">
        {paragraphs.map((para, idx) => (
          <p key={idx} className="mb-3">
            {para.trim()}
          </p>
        ))}
      </div>
    );
  }

  // Single paragraph - handle line breaks within
  const lines = trimmed.split("\n").filter((line) => line.trim());
  if (lines.length > 1) {
    return (
      <p className="mb-0 faq-answer-content">
        {lines.map((line, idx) => (
          <span key={idx}>
            {line.trim()}
            {idx < lines.length - 1 && <br />}
          </span>
        ))}
      </p>
    );
  }

  // Simple text
  return <p className="mb-0 faq-answer-content">{trimmed}</p>;
};

export default function FaqAccordion({ faqData }) {
  // Track which accordion item is currently open (null = all closed)
  const [activeQuestionId, setActiveQuestionId] = useState(null);

  const toggleAccordion = (questionId) => {
    setActiveQuestionId((prev) => (prev === questionId ? null : questionId));
  };

  if (!faqData || faqData.length === 0) {
    return (
      <section className="faq-section pt-lg-2 pt-md-5 pb-lg-5 pb-md-5 pb-3 pt-0">
        <div className="container">
          <div className="text-center py-5">
            <p className="text-muted">No FAQs available.</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="faq-section pt-lg-2 pt-md-5 pb-lg-5 pb-md-5 pb-3 pt-0">
      <div className="container">
        <div className="accordion" id="faqAccordion">
          {faqData.map((section, sectionIndex) => (
            <div key={section._id || section.sectionName}>
              {/* Category Header */}
              <h3 className="mt-4 mb-3 text-dark">{section.sectionName}</h3>

              {/* Questions within the Category */}
              {section.questions.map((item, questionIndex) => {
                const isExpanded = activeQuestionId === item._id;
                // Generate a unique ID format matching the old layout if necessary,
                // though React state handles the actual logic now.
                const itemId = `faq-${section.sectionName.replace(/\s+/g, "-").toLowerCase()}-${sectionIndex}-${questionIndex}`;

                return (
                  <div
                    key={item._id}
                    className="accordion-item mb-3 border rounded"
                  >
                    <h2 className="accordion-header" id={`${itemId}-heading`}>
                      <button
                        className={`accordion-button ${isExpanded ? "" : "collapsed"}`}
                        onClick={() => toggleAccordion(item._id)}
                        type="button"
                        aria-expanded={isExpanded}
                      >
                        {item.question}
                      </button>
                    </h2>

                    {/* Collapsible Answer Body */}
                    <div
                      id={`${itemId}-collapse`}
                      className={`accordion-collapse collapse ${isExpanded ? "show" : ""}`}
                      aria-labelledby={`${itemId}-heading`}
                    >
                      <div className="accordion-body">
                        {formatAnswer(item.answer)}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
