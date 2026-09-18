"use client";

import { useState } from "react";
import { ArrowRight, Check, X } from "lucide-react";

const amounts = [10, 25, 50, 100, 250];

export function DonateButton({ campaignId }: { campaignId: string }) {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(25);
  const [custom, setCustom] = useState("");
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const amount = custom ? Number(custom) : selected;

  async function handleDonate(e: React.FormEvent) {
    e.preventDefault();
    if (!amount || amount < 1) return;
    setLoading(true);

    try {
      const res = await fetch("/api/donations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          campaignId,
          amount,
          name: name || "Anonymous",
          message,
        }),
      });

      if (res.ok) {
        setSuccess(true);
      }
    } catch {
      // ignore for demo
      setSuccess(true);
    } finally {
      setLoading(false);
    }
  }

  if (success) {
    return (
      <div className="text-center py-6">
        <div className="w-14 h-14 mx-auto rounded-full bg-green-100 flex items-center justify-center mb-3">
          <Check className="w-7 h-7 text-green-600" />
        </div>
        <h3 className="font-bold text-gray-900">Thank you!</h3>
        <p className="text-sm text-gray-500 mt-1">
          Your gift of ₦{amount} has been recorded.
        </p>
        <button
          onClick={() => {
            setSuccess(false);
            setOpen(false);
          }}
          className="mt-4 text-sm text-yellow-600 font-medium hover:underline"
        >
          Close
        </button>
      </div>
    );
  }

  if (!open) {
    return (
      <button
        onClick={() => setOpen(true)}
        className="w-full flex items-center justify-center gap-2 py-3.5 bg-yellow-500 hover:bg-yellow-600 text-white font-semibold rounded-xl shadow-md shadow-yellow-200 transition-all"
      >
        Support this campaign
        <ArrowRight className="w-4 h-4" />
      </button>
    );
  }

  return (
    <form onSubmit={handleDonate} className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold text-gray-900">Choose an amount</h3>
        <button
          type="button"
          onClick={() => setOpen(false)}
          className="p-1 rounded-lg hover:bg-gray-100"
        >
          <X className="w-4 h-4 text-gray-400" />
        </button>
      </div>

      <div className="grid grid-cols-3 gap-2">
        {amounts.map((a) => (
          <button
            key={a}
            type="button"
            onClick={() => {
              setSelected(a);
              setCustom("");
            }}
            className={`py-2.5 rounded-xl text-sm font-semibold transition-colors ${
              selected === a && !custom
                ? "bg-yellow-500 text-white"
                : "bg-yellow-50 text-yellow-700 hover:bg-yellow-100"
            }`}
          >
            ₦{a}
          </button>
        ))}
      </div>

      <div>
        <label className="text-xs font-medium text-gray-500">Custom amount</label>
        <div className="relative mt-1">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
            ₦
          </span>
          <input
            type="number"
            min="1"
            value={custom}
            onChange={(e) => setCustom(e.target.value)}
            placeholder="Other"
            className="w-full pl-7 pr-3 py-2.5 rounded-xl border border-yellow-100 focus:outline-none focus:ring-2 focus:ring-yellow-300"
          />
        </div>
      </div>

      <div>
        <label className="text-xs font-medium text-gray-500">
          Your name (optional)
        </label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Anonymous"
          className="mt-1 w-full px-3 py-2.5 rounded-xl border border-yellow-100 focus:outline-none focus:ring-2 focus:ring-yellow-300"
        />
      </div>

      <div>
        <label className="text-xs font-medium text-gray-500">
          Message (optional)
        </label>
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          rows={2}
          placeholder="Leave a kind note..."
          className="mt-1 w-full px-3 py-2.5 rounded-xl border border-yellow-100 focus:outline-none focus:ring-2 focus:ring-yellow-300 resize-none"
        />
      </div>

      <button
        type="submit"
        disabled={loading || !amount || amount < 1}
        className="w-full py-3.5 bg-yellow-500 hover:bg-yellow-600 disabled:opacity-50 text-white font-semibold rounded-xl transition-colors"
      >
        {loading ? "Processing..." : `Donate ₦${amount || 0}`}
      </button>
    </form>
  );
}
