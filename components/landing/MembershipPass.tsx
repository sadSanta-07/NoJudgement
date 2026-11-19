"use client";

import React, { useState } from "react";
import { useSession, signIn } from "next-auth/react";
import AnimateIn from "@/components/ui/AnimateIn";

interface Plan {
  k: string;
  name: string;
  price: string;
  per: string;
  short: string;
  bill: string;
  valid: string;
  cta: string;
  best?: boolean;
}

const PLANS: Plan[] = [
  {
    k: "monthly",
    name: "Monthly",
    price: "$19",
    per: "/ month",
    short: "/mo",
    bill: "Billed monthly. Cancel any time.",
    valid: "Renews monthly",
    cta: "Start monthly membership",
  },
  {
    k: "quarterly",
    name: "Quarterly",
    price: "$14",
    per: "/ month",
    short: "/mo",
    bill: "$42 every 3 months. Save 25%.",
    valid: "Renews quarterly",
    cta: "Start quarterly membership",
  },
  {
    k: "annual",
    name: "Annual",
    price: "$9",
    per: "/ month",
    short: "/mo",
    bill: "$108 a year. Save 50%.",
    valid: "Renews yearly",
    cta: "Start annual membership",
    best: true,
  },
  {
    k: "lifetime",
    name: "Lifetime",
    price: "$199",
    per: "once",
    short: " once",
    bill: "Pay once. Yours for good.",
    valid: "Valid forever",
    cta: "Get lifetime access",
  },
];

const PROMISES = [
  {
    svg: '<path d="M6 21V3h12v18"/><path d="M6 3l7 2.5V21"/><path class="ps-lit" d="M10.6 12.5h.01"/><path d="M3.5 21h17"/>',
    text: "Start free, no card needed",
  },
  {
    svg: '<rect x="3" y="5.5" width="18" height="13" rx="2.5"/><path d="M6.5 14.5h4.5"/><rect x="14.5" y="11.5" width="3.5" height="3" rx=".8"/>',
    text: "One pass opens every arena",
  },
  {
    svg: '<path d="M20 12a8 8 0 1 1-2.34-5.66"/><path d="M20 4v4.5h-4.5"/>',
    text: "30-day refund, no questions",
  },
];

export default function MembershipPass() {
  const { data: session } = useSession();
  const [pick, setPick] = useState<string>("annual");
  const currentPlan = PLANS.find((p) => p.k === pick) || PLANS[2];

  const holderName = session?.user?.name
    ? session.user.name.toUpperCase().slice(0, 22)
    : "YOUR NAME HERE";

  const renderOdometer = (priceStr: string) => {
    return [...priceStr].map((ch, idx) => {
      if (/\d/.test(ch)) {
        return (
          <span key={idx} className="od-w">
            <span
              className="od-s"
              style={{ "--n": ch } as React.CSSProperties}
            >
              {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((d) => (
                <i key={d}>{d}</i>
              ))}
            </span>
          </span>
        );
      }
      return (
        <span key={idx} className="od-c">
          {ch}
        </span>
      );
    });
  };

  return (
    <section className="lp-sec" id="plans">
      <AnimateIn direction="up" distance={20} duration={0.6}>
        <div className="lp-head is-center">
          <h2 className="lp-h2">
            Get your <i>pass</i>.
          </h2>
        </div>
      </AnimateIn>

      <AnimateIn direction="up" distance={30} duration={0.75} delay={0.15}>
        <div className="ps" data-plan={pick}>
        {/* PLAN SELECTOR SWITCH */}
        <div className="ps-switch" role="radiogroup" aria-label="How you'd like to pay">
          {PLANS.map((r) => {
            const isChecked = r.k === pick;
            return (
              <button
                key={r.k}
                className="ps-opt"
                role="radio"
                type="button"
                aria-checked={isChecked}
                onClick={() => setPick(r.k)}
                aria-label={`${r.name}, ${r.price} ${r.per === "once" ? "once" : "a month"}${r.best ? ", most people pick this" : ""}`}
              >
                <b>{r.name}</b>
                <small>
                  {r.price}
                  <wbr />
                  {r.short}
                </small>
                {r.best && (
                  <span className="ps-best" aria-hidden="true">
                    Most pick this
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* 3D CARDS: FRONT AND BACK */}
        <div className="ps-cards">
          {/* FRONT */}
          <div className="ps-stage">
            <div className={`ps-card ${pick === "lifetime" ? "is-lifetime" : ""}`} aria-hidden="true">
              {/* Banknote Guilloche Pattern */}
              <svg className="ps-lines" viewBox="0 0 420 265" preserveAspectRatio="none" aria-hidden="true">
                {Array.from({ length: 16 }, (_, i) => (
                  <path
                    key={i}
                    d={`M-10 ${40 + i * 13} C 90 ${10 + i * 13}, 200 ${80 + i * 13}, 430 ${30 + i * 13}`}
                  />
                ))}
              </svg>

              <div className="ps-top">
                <span className="ps-mark">
                  <svg viewBox="4 4 92 92" aria-hidden="true" focusable="false">
                    <path
                      d="M52.2 50L52.2 9A20.5 20.5 0 0 1 52.2 50ZM50 52.2L91 52.2A20.5 20.5 0 0 1 50 52.2ZM47.8 50L47.8 91A20.5 20.5 0 0 1 47.8 50ZM50 47.8L9 47.8A20.5 20.5 0 0 1 50 47.8Z"
                      fill="currentColor"
                    />
                  </svg>
                  <span>
                    no<i>judgment</i>
                  </span>
                </span>
                <span className="ps-kind">MEMBER'S PASS</span>
              </div>

              <div className="ps-mid">
                <div className="ps-price">
                  <span className="od">{renderOdometer(currentPlan.price)}</span>
                  <span className="ps-per">{currentPlan.per}</span>
                </div>
                <div className="ps-what">Full access. Every arena & live room.</div>
              </div>

              <div className="ps-foot">
                <span className="ps-holder">
                  <small>HOLDER</small>
                  {holderName}
                </span>
                <span className="ps-valid">
                  <small>VALID</small>
                  <b>{currentPlan.valid}</b>
                </span>
                <span className="ps-chip" />
              </div>

              <span className="ps-sheen" />
            </div>
            <span className="ps-shadow" />
          </div>

          {/* BACK */}
          <div className="ps-back">
            <span className="ps-stripe" />
            <ul className="ps-terms">
              {PROMISES.map((p, idx) => (
                <li key={idx}>
                  <svg
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                    dangerouslySetInnerHTML={{ __html: p.svg }}
                  />
                  <span>{p.text}</span>
                </li>
              ))}
            </ul>
            <div className="ps-sign">
              <div>
                <small>MEMBER'S SIGNATURE</small>
                <span>{session?.user?.name || "Your name here"}</span>
              </div>
              <b>NOJUDGMENT.COM</b>
            </div>
          </div>
        </div>

        {/* CTA ACTION */}
        <div className="ps-act">
          <button
            className="ps-go cursor-pointer active:translate-y-[1px]"
            type="button"
            onClick={() => {
              if (!session) {
                signIn("google");
              } else {
                window.location.href = "/dashboard";
              }
            }}
          >
            {currentPlan.cta}
          </button>
          <p className="ps-bill">{currentPlan.bill}</p>
        </div>
      </div>
      </AnimateIn>
    </section>
  );
}
