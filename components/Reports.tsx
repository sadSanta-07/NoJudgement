"use client";

import { ShieldCheck, AlertTriangle, FileText, X, ChevronDown, Loader2, CheckCircle2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

const sectionVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
};

const REASON_OPTIONS = [
  { value: "inappropriate_language", label: "Inappropriate Language" },
  { value: "harassment", label: "Harassment" },
  { value: "not_speaking_english", label: "Not Speaking English" },
  { value: "spam", label: "Spam" },
  { value: "other", label: "Other" },
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
      }, 1800);
    } catch (err: unknown) {
      setErrorMessage(err instanceof Error ? err.message : "Something went wrong.");
      setStatus("error");
    }
  };

  const pendingLabel = pendingCount === 0 ? "No Pending Reports" : `${pendingCount} Pending`;
  const issuesLabel = logs.length === 0 ? "None" : `${logs.length} Reported`;
  const sessionsLabel = logs.length === 0 ? "All Clear" : "Under Review";

  return (
    <>
      <motion.div
        initial="hidden"
        animate="visible"
        className="w-full max-w-2xl mx-auto space-y-8 px-3 sm:px-6 lg:px-0"
      >
        <div className="bg-white rounded-2xl sm:rounded-3xl border border-gray-100 shadow-sm overflow-hidden text-sm uppercase font-bold text-gray-400">
          <div className="p-4 sm:p-5 md:p-8 space-y-5 sm:space-y-6 md:space-y-8">

            {/* Safe Conversations Section */}
            <motion.div variants={sectionVariants} className="space-y-3 sm:space-y-4">
              <label className="flex items-center text-gray-900 border-b border-gray-50 pb-3 sm:pb-4 text-xs sm:text-sm">
                <ShieldCheck size={16} className="mr-2 sm:mr-3 text-green-500 shrink-0" /> Safe Conversations
              </label>
              <div className="flex items-center justify-between py-2.5 sm:py-3">
                <span className="text-gray-500 text-xs sm:text-sm">AI Monitoring</span>
                <span className="text-green-600 text-xs sm:text-sm">Active</span>
              </div>
              <div className="flex items-center justify-between py-2.5 sm:py-3">
                <span className="text-gray-500 text-xs sm:text-sm">Environment</span>
                <span className="text-gray-900 normal-case font-medium sm:font-bold sm:uppercase text-xs sm:text-sm">
                  Respectful &amp; Helpful
                </span>
              </div>
            </motion.div>

            {/* Report an Issue Section */}
            <motion.div variants={sectionVariants} className="space-y-3 sm:space-y-4">
              <label className="flex items-center text-gray-900 border-b border-gray-50 pb-3 sm:pb-4 text-xs sm:text-sm">
                <AlertTriangle size={16} className="mr-2 sm:mr-3 text-orange-500 shrink-0" /> Report an Issue
              </label>
              <div className="flex items-center justify-between py-2.5 sm:py-3">
                <span className="text-gray-500 text-xs sm:text-sm">Status</span>
                <span className={`normal-case font-medium sm:font-bold sm:uppercase text-xs sm:text-sm ${pendingCount > 0 ? "text-orange-500" : "text-gray-900"}`}>
                  {pendingLabel}
                </span>
              </div>
              <div className="flex items-center justify-between py-2.5 sm:py-3">
                <span className="text-gray-500 text-xs sm:text-sm">Last Reviewed</span>
                <span className="text-gray-900 text-xs sm:text-sm">Today</span>
              </div>
              {/* Report Button */}
              <div className="pt-1">
                <button
                  onClick={() => setShowModal(true)}
                  className="w-full sm:w-auto px-4 sm:px-5 py-2 sm:py-2.5 rounded-xl bg-orange-500 hover:bg-orange-600 active:scale-95 transition-all text-white normal-case font-semibold text-xs sm:text-sm tracking-normal shadow-sm"
                >
                  + File a Report
                </button>
              </div>
            </motion.div>

            {/* Recent Safety Logs Section */}
            <motion.div variants={sectionVariants} className="space-y-3 sm:space-y-4">
              <label className="flex items-center text-gray-900 border-b border-gray-50 pb-3 sm:pb-4 text-xs sm:text-sm">
                <FileText size={16} className="mr-2 sm:mr-3 text-blue-500 shrink-0" /> Recent Safety Logs
              </label>
              <div className="flex items-center justify-between py-2.5 sm:py-3">
                <span className="text-gray-500 text-xs sm:text-sm">Issues Detected</span>
                <span className={`text-xs sm:text-sm ${logs.length > 0 ? "text-orange-500" : "text-green-600"}`}>{issuesLabel}</span>
              </div>
              <div className="flex items-center justify-between py-2.5 sm:py-3">
                <span className="text-gray-500 text-xs sm:text-sm">Sessions Reviewed</span>
                <span className={`normal-case font-medium sm:font-bold sm:uppercase text-xs sm:text-sm ${logs.length > 0 ? "text-orange-500" : "text-gray-900"}`}>
                  {sessionsLabel}
                </span>
              </div>

              {/* Log entries */}
              <AnimatePresence>
                {logs.map((log) => (
                  <motion.div
                    key={log.id}
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="flex items-start sm:items-center justify-between gap-2 py-2.5 sm:py-3 px-3 sm:px-4 rounded-2xl bg-black/[0.02] border border-black/[0.04]"
                  >
                    <span className="text-gray-400 normal-case font-normal tracking-normal text-xs sm:text-sm leading-snug">
                      User <span className="font-mono text-xs text-gray-600">{log.userId}</span> — {log.reason}
                    </span>
                    <span className="text-gray-400 normal-case font-normal text-[10px] sm:text-xs shrink-0">
                      {log.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                    </span>
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>

          </div>
        </div>
      </motion.div>

      {/* Report Modal */}
      <AnimatePresence>
        {showModal && (
          <motion.div
            className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/40 backdrop-blur-xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={(e) => { if (e.target === e.currentTarget && status !== "loading") setShowModal(false); }}
          >
            <motion.div
              className="bg-white/90 backdrop-blur-2xl rounded-t-[2rem] sm:rounded-[2rem] border border-white/50 shadow-[0_10px_50px_rgba(0,0,0,0.12)] w-full sm:max-w-md overflow-hidden"
              initial={{ scale: 1, opacity: 0, y: 40 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 1, opacity: 0, y: 40 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
            >
              {/* Modal Header */}
              <div className="flex items-center justify-between px-5 sm:px-6 pt-5 sm:pt-6 pb-4 border-b border-black/[0.04]">
                <div className="flex items-center gap-2">
                  <AlertTriangle size={17} className="text-orange-500" />
                  <h2 className="text-sm sm:text-base font-semibold text-gray-900">File a Report</h2>
                </div>
                <button
                  onClick={() => { if (status !== "loading") { setShowModal(false); setStatus("idle"); setErrorMessage(""); } }}
                  className="text-gray-400 hover:text-gray-600 transition-colors p-1"
                >
                  <X size={17} />
                </button>
              </div>

              {/* Success state */}
              <AnimatePresence mode="wait">
                {status === "success" ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex flex-col items-center justify-center py-10 sm:py-12 px-6 gap-3"
                  >
                    <CheckCircle2 size={38} className="text-green-500" />
                    <p className="text-gray-700 font-medium text-sm">Report submitted successfully.</p>
                  </motion.div>
                ) : (
                  <motion.div key="form" className="px-5 sm:px-6 py-4 sm:py-5 space-y-3 sm:space-y-4">

                    {/* User ID */}
                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold uppercase tracking-wider text-gray-400">
                        Reported User ID <span className="text-orange-500">*</span>
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. user_abc123"
                        value={reportState.reportedUserId}
                        onChange={(e) => setReportState((s) => ({ ...s, reportedUserId: e.target.value }))}
                        className="w-full px-3 sm:px-4 py-2 sm:py-2.5 rounded-xl border border-black/[0.06] bg-black/[0.03] focus:border-orange-400 focus:ring-2 focus:ring-orange-100 outline-none text-sm text-gray-800 transition-all font-normal normal-case tracking-normal"
                        disabled={status === "loading"}
                      />
                    </div>

                    {/* Reason */}
                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold uppercase tracking-wider text-gray-400">
                        Reason <span className="text-orange-500">*</span>
                      </label>
                      <div className="relative">
                        <select
                          value={reportState.reason}
                          onChange={(e) => setReportState((s) => ({ ...s, reason: e.target.value as Reason }))}
                          className="w-full appearance-none px-3 sm:px-4 py-2 sm:py-2.5 pr-9 rounded-xl border border-black/[0.06] bg-black/[0.03] focus:border-orange-400 focus:ring-2 focus:ring-orange-100 outline-none text-sm text-gray-800 bg-white transition-all font-normal normal-case tracking-normal"
                          disabled={status === "loading"}
                        >
                          <option value="" disabled>Select a reason…</option>
                          {REASON_OPTIONS.map((o) => (
                            <option key={o.value} value={o.value}>{o.label}</option>
                          ))}
                        </select>
                        <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                      </div>
                    </div>

                    {/* Session ID (optional) */}
                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold uppercase tracking-wider text-gray-400">
                        Session ID <span className="text-gray-300 normal-case font-normal">(optional)</span>
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. sess_xyz789"
                        value={reportState.sessionId}
                        onChange={(e) => setReportState((s) => ({ ...s, sessionId: e.target.value }))}
                        className="w-full px-3 sm:px-4 py-2 sm:py-2.5 rounded-xl border border-black/[0.06] bg-black/[0.03] focus:border-orange-400 focus:ring-2 focus:ring-orange-100 outline-none text-sm text-gray-800 transition-all font-normal normal-case tracking-normal"
                        disabled={status === "loading"}
                      />
                    </div>

                    {/* Error */}
                    <AnimatePresence>
                      {status === "error" && errorMessage && (
                        <motion.p
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          className="text-xs text-red-500 normal-case font-normal tracking-normal"
                        >
                          {errorMessage}
                        </motion.p>
                      )}
                    </AnimatePresence>

                    {/* Actions */}
                    <div className="flex gap-2 sm:gap-3 pt-1 pb-1 sm:pb-0">
                      <button
                        onClick={() => { if (status !== "loading") { setShowModal(false); setStatus("idle"); setErrorMessage(""); } }}
                        className="flex-1 px-3 sm:px-4 py-2 sm:py-2.5 rounded-xl border border-black/[0.06] bg-black/[0.03] text-xs sm:text-sm text-gray-500 hover:bg-gray-50 transition-all font-semibold normal-case tracking-normal"
                        disabled={status === "loading"}
                      >
                        Cancel
                      </button>
                      <button
                        onClick={handleSubmit}
                        disabled={!reportState.reportedUserId || !reportState.reason || status === "loading"}
                        className="flex-1 px-3 sm:px-4 py-2 sm:py-2.5 rounded-xl bg-orange-500 hover:bg-orange-600 disabled:opacity-40 disabled:cursor-not-allowed text-white text-xs sm:text-sm font-semibold normal-case tracking-normal transition-all flex items-center justify-center gap-2"
                      >
                        {status === "loading" ? (
                          <><Loader2 size={14} className="animate-spin" /> Submitting…</>
                        ) : "Submit Report"}
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}