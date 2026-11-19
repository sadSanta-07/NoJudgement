"use client";

import React from "react";
import AnimateIn, { StaggerContainer, StaggerItem } from "@/components/ui/AnimateIn";

const FAQS = [
  {
    q: "What is nojudgment?",
    a: "An AI-powered and peer-to-peer English speaking arena designed specifically for engineers and ambitious builders. You practice real discussions, technical interviews, and impromptu speaking with zero anxiety and instant tactile acoustic feedback.",
    defaultOpen: true,
  },
  {
    q: "Who is it for?",
    a: "Software engineers, product leaders, architects, and ambitious professionals who know their craft but want to express their ideas with clarity, authority, and natural conversational cadence.",
  },
  {
    q: "Where do I start?",
    a: "Pick Conversational Fluency, Pronunciation & Clarity, or Behavioral Interviews, and tap Start Speaking. You can start solo with our AI speech partner or hop into a judgment-free 1-on-1 audio call.",
  },
  {
    q: "What's free?",
    a: "Daily solo practice runs and community matchmaking rooms are 100% free with no credit card required. A free account saves your streak, audio metrics, and pace history across devices.",
  },
  {
    q: "What does the Member's Pass add?",
    a: "Unlimited AI speech analysis, instant filler-word detection reports, technical & executive interview mock rounds, and personalized pacing drills.",
  },
  {
    q: "How does matchmaking work?",
    a: "When you tap 'Match with peer', our system pairs you with another verified engineer who wants to practice the same topic. Calls are audio-only, low-pressure, and structured with conversational prompts.",
  },
  {
    q: "Does it work on my phone?",
    a: "Yes. All daily practice modules, matchmaking calls, and AI coaching sessions work smoothly on any modern smartphone browser without installing an app.",
  },
  {
    q: "What does Pro cost?",
    a: "$9 a month, billed yearly, plus applicable taxes. You can also pay monthly, quarterly, or once for lifetime access, and cancel any time.",
  },
];

export default function FAQAccordion() {
  return (
    <section className="lp-sec" id="faq">
      <div className="st-faqs is-stack">
        <AnimateIn direction="up" distance={20} duration={0.6}>
          <div className="st-faq-side">
            <h2 className="st-h2">
              Frequently asked <i>questions</i>
            </h2>
          </div>
        </AnimateIn>
        <StaggerContainer stagger={0.06} className="st-faq">
          {FAQS.map((item, idx) => (
            <StaggerItem key={idx}>
              <details open={item.defaultOpen}>
                <summary>
                  <span>{item.q}</span>
                  <i className="st-faq-ic" aria-hidden="true" />
                </summary>
                <p>{item.a}</p>
              </details>
            </StaggerItem>
          ))}
        </StaggerContainer>
        <AnimateIn direction="up" distance={10} duration={0.5} delay={0.2}>
          <p className="st-faq-mail">
            Something else? Write to us at{" "}
            <a href="mailto:help@nojudgment.com">help@nojudgment.com</a>
          </p>
        </AnimateIn>
      </div>
    </section>
  );
}
