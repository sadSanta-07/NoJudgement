"use client";

import { ShieldCheck, AlertTriangle, FileText, X, ChevronDown, Loader2, CheckCircle2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

const REASON_OPTIONS = [
  { value: "inappropriate_language", label: "Inappropriate Language" },
  { value: "harassment", label: "Harassment or Disrespect" },
  { value: "not_speaking_english", label: "Refusal to Speak English" },
  { value: "spam", label: "Spam or Commercial Solicitation" },
  { value: "other", label: "Other Code of Conduct Violation" },
] as const;

type Reason = typeof REASON_OPTIONS[number]["value"];
type ReportStatus = "idle" | "loading" | "success" | "error";

interface ReportState {
  reportedUserId: string;
  reason: Reason | "";
  sessionId: string;
}

interface ReportLog {
  id: string;
  userId: string;
  reason: string;
  timestamp: Date;
}

export default function Reports() {
  const [showModal, setShowModal] = useState(false);
  const [reportState, setReportState] = useState<ReportState>({
    reportedUserId: "",
    reason: "",
    sessionId: "",
  });
  const [status, setStatus] = useState<ReportStatus>("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [logs, setLogs] = useState<ReportLog[]>([]);
  const [pendingCount, setPendingCount] = useState(0);

  const handleSubmit = async () => {
    if (!reportState.reportedUserId || !reportState.reason) return;

    setStatus("loading");
    setErrorMessage("");

    try {
      const body: Record<string, string> = {
        reportedUserId: reportState.reportedUserId,
        reason: reportState.reason,
      };
      if (reportState.sessionId) body.sessionId = reportState.sessionId;

      const res = await fetch("/api/report", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.message || "Failed to submit report.");
      }

      const newLog: ReportLog = {
        id: crypto.randomUUID(),
        userId: reportState.reportedUserId,
        reason: REASON_OPTIONS.find((o) => o.value === reportState.reason)?.label ?? reportState.reason,
        timestamp: new Date(),
      };
      setLogs((prev) => [newLog, ...prev]);
      setPendingCount((prev) => prev + 1);

      setStatus("success");
      setTimeout(() => {
        setShowModal(false);
        setStatus("idle");
        setReportState({ reportedUserId: "", reason: "", sessionId: "" });
      }, 1600);
    } catch (err: unknown) {
      setErrorMessage(err instanceof Error ? err.message : "Something went wrong.");
      setStatus("error");
    }
  };

  const pendingLabel = pendingCount === 0 ? "No Pending Reports" : `${pendingCount} Under Investigation`;

  return (
    <div className="max-w-3xl mx-auto space-y-8">
      {/* ── SAFETY CONTAINER ── */}
      <div className="rounded-[22px] bg-[#fcfbf8] border border-[#e8e6e1] p-6 sm:p-10 shadow-[0_1px_2px_rgba(60,48,30,.07),0_4px_8px_rgba(60,48,30,.07)] space-y-8">
        
        {/* HEADER */}
        <div className="border-b border-[#e8e6e1] pb-5">
          <h1 className="font-display text-3xl font-normal text-[#1d1c1a] tracking-tight">
            Safety & Community Moderation
          </h1>
          <p className="font-mono text-xs text-[#6a625a] mt-1">
            Zero-intimidation policy for respectful, encouraging English conversations
          </p>
        </div>

        {/* SECTION 1: SYSTEM HEALTH */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <ShieldCheck size={18} className="text-[#1e5d36]" />
            <span className="font-mono text-xs uppercase tracking-wider text-[#1d1c1a] font-semibold">
              Live Monitoring System
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 font-mono text-xs">
            <div className="p-4 rounded-[8px] bg-[#f5f3ee] border border-[#e8e6e1] flex justify-between items-center">
              <span className="text-[#6a625a]">AI Speech Filter</span>
              <span className="px-2 py-0.5 rounded-[4px] bg-[#d8eedf] text-[#1e5d36] font-semibold border border-[#b7dfc3]">
                ● Active
              </span>
            </div>
            <div className="p-4 rounded-[8px] bg-[#f5f3ee] border border-[#e8e6e1] flex justify-between items-center">
              <span className="text-[#6a625a]">Room Encryption</span>
              <span className="text-[#1d1c1a] font-semibold">P2P WebRTC DTLS</span>
            </div>
          </div>
        </div>

        {/* SECTION 2: REPORT AN ISSUE */}
        <div className="space-y-4 pt-4 border-t border-[#e8e6e1]">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <AlertTriangle size={18} className="text-[#b4400f]" />
              <span className="font-mono text-xs uppercase tracking-wider text-[#1d1c1a] font-semibold">
                Report a Concern
              </span>
            </div>
            <span className="font-mono text-xs text-[#6a625a]">{pendingLabel}</span>
          </div>

          <p className="text-sm text-[#5e5b55] leading-relaxed">
            If a peer was disrespectful, refused to speak English, or used offensive language, submit a report. Moderation reviews room logs within 24 hours.
          </p>

          <div>
            <button
              onClick={() => setShowModal(true)}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-[5px] bg-[#1d1c1a] text-[#fbfaf7] text-xs font-mono font-medium shadow-sm hover:bg-[#2c2a26] transition-all cursor-pointer active:translate-y-[1px]"
            >
              + File Incident Report
            </button>
          </div>
        </div>

        {/* SECTION 3: RECENT LOGS */}
        <div className="space-y-4 pt-4 border-t border-[#e8e6e1]">
          <div className="flex items-center gap-2">
            <FileText size={18} className="text-[#1d1c1a]" />
            <span className="font-mono text-xs uppercase tracking-wider text-[#1d1c1a] font-semibold">
              Recent Activity & Reports
            </span>
          </div>

          {logs.length === 0 ? (
            <div className="p-4 rounded-[8px] bg-[#f5f3ee] border border-[#e8e6e1] text-center font-mono text-xs text-[#6a625a]">
              No incident reports filed in this session. All clear!
            </div>
          ) : (
            <div className="space-y-2">
              {logs.map((log) => (
                <div
                  key={log.id}
                  className="p-3 rounded-[8px] bg-[#f5f3ee] border border-[#e8e6e1] flex items-center justify-between text-xs font-mono"
                >
                  <span className="text-[#1d1c1a]">
                    Reported user <span className="font-bold">{log.userId}</span> · {log.reason}
                  </span>
                  <span className="text-[#a39a8e]">
                    {log.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>

      {/* ── REPORT MODAL ── */}
      <AnimatePresence>
        {showModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#1d1c1a]/40 backdrop-blur-sm">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-[#fcfbf8] rounded-[22px] border border-[#e8e6e1] shadow-2xl w-full max-w-md p-6 sm:p-8 space-y-5"
            >
              <div className="flex items-center justify-between border-b border-[#e8e6e1] pb-3">
                <h3 className="font-display text-2xl font-normal text-[#1d1c1a]">
                  File Incident Report
                </h3>
                <button
                  onClick={() => setShowModal(false)}
                  className="w-7 h-7 rounded-[5px] bg-[#f1efea] border border-[#e8e6e1] text-[#1d1c1a] flex items-center justify-center"
                >
                  <X size={15} />
                </button>
              </div>

              {status === "success" ? (
                <div className="py-8 text-center space-y-2 font-mono text-xs">
                  <CheckCircle2 size={36} className="text-[#1e5d36] mx-auto" />
                  <p className="text-sm font-semibold text-[#1d1c1a]">Report filed successfully.</p>
                  <p className="text-[#6a625a]">Our moderation team has received the transcript.</p>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="space-y-1.5">
                    <label className="block text-xs font-mono uppercase text-[#6a625a]">
                      Reported User Name or ID *
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. David M. or user_123"
                      value={reportState.reportedUserId}
                      onChange={(e) => setReportState((s) => ({ ...s, reportedUserId: e.target.value }))}
                      className="w-full px-3.5 py-2.5 rounded-[5px] bg-[#fcfbf8] border border-[#e8e6e1] text-sm text-[#1d1c1a] focus:outline-none focus:ring-2 focus:ring-[#1d1c1a]"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="block text-xs font-mono uppercase text-[#6a625a]">
                      Reason *
                    </label>
                    <div className="relative">
                      <select
                        value={reportState.reason}
                        onChange={(e) => setReportState((s) => ({ ...s, reason: e.target.value as Reason }))}
                        className="w-full appearance-none px-3.5 py-2.5 rounded-[5px] bg-[#fcfbf8] border border-[#e8e6e1] text-sm text-[#1d1c1a] focus:outline-none focus:ring-2 focus:ring-[#1d1c1a] cursor-pointer"
                      >
                        <option value="" disabled>Select reason...</option>
                        {REASON_OPTIONS.map((o) => (
                          <option key={o.value} value={o.value}>{o.label}</option>
                        ))}
                      </select>
                      <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-[#6a625a] pointer-events-none" />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="block text-xs font-mono uppercase text-[#6a625a]">
                      Session ID (Optional)
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. room_abc..."
                      value={reportState.sessionId}
                      onChange={(e) => setReportState((s) => ({ ...s, sessionId: e.target.value }))}
                      className="w-full px-3.5 py-2.5 rounded-[5px] bg-[#fcfbf8] border border-[#e8e6e1] text-sm text-[#1d1c1a] focus:outline-none focus:ring-2 focus:ring-[#1d1c1a]"
                    />
                  </div>

                  {errorMessage && (
                    <p className="text-xs text-red-600 font-mono">{errorMessage}</p>
                  )}

                  <div className="flex gap-3 pt-2">
                    <button
                      onClick={() => setShowModal(false)}
                      className="flex-1 py-2.5 rounded-[5px] bg-[#f1efea] border border-[#e8e6e1] text-xs font-mono text-[#1d1c1a]"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleSubmit}
                      disabled={!reportState.reportedUserId || !reportState.reason || status === "loading"}
                      className="flex-1 py-2.5 rounded-[5px] bg-[#1d1c1a] text-[#fbfaf7] text-xs font-mono font-medium disabled:opacity-40"
                    >
                      {status === "loading" ? "Submitting..." : "Submit Report"}
                    </button>
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
