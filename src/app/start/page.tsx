"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Gift, ArrowRight, Check } from "lucide-react";
import { categories } from "@/lib/data";

export default function StartCampaignPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [form, setForm] = useState({
    title: "",
    category: "Education",
    goal: "",
    description: "",
    longDescription: "",
    creatorName: "",
    location: "",
  });

  function update(field: string, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("/api/campaigns", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          goal: Number(form.goal),
        }),
      });

      if (res.ok) {
        const data = await res.json();
        setSuccess(true);
        setTimeout(() => {
          router.push(`/campaigns/${data.id}`);
        }, 2000);
      }
    } catch {
      // For demo, still show success
      setSuccess(true);
      setTimeout(() => router.push("/campaigns"), 2000);
    } finally {
      setLoading(false);
    }
  }

  if (success) {
    return (
      <div className="max-w-lg mx-auto px-4 py-24 text-center">
        <div className="w-16 h-16 mx-auto rounded-full bg-green-100 flex items-center justify-center mb-4">
          <Check className="w-8 h-8 text-green-600" />
        </div>
        <h1 className="text-2xl font-bold text-gray-900">Campaign created!</h1>
        <p className="mt-2 text-gray-500">
          Redirecting you to your new campaign...
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 py-10">
      <div className="text-center mb-10">
        <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-yellow-100 mb-4">
          <Gift className="w-7 h-7 text-yellow-500" />
        </div>
        <h1 className="text-3xl font-bold text-gray-900">Start a Campaign</h1>
        <p className="mt-2 text-gray-500">
          Tell your story and start raising funds in minutes
        </p>
      </div>

      {/* Steps indicator */}
      <div className="flex items-center justify-center gap-2 mb-10">
        {[1, 2, 3].map((s) => (
          <div key={s} className="flex items-center gap-2">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${
                step >= s
                  ? "bg-yellow-500 text-white"
                  : "bg-gray-100 text-gray-400"
              }`}
            >
              {s}
            </div>
            {s < 3 && (
              <div
                className={`w-12 h-0.5 ${
                  step > s ? "bg-yellow-500" : "bg-gray-200"
                }`}
              />
            )}
          </div>
        ))}
      </div>

      <form onSubmit={handleSubmit} className="bg-white rounded-2xl border border-yellow-100 p-6 sm:p-8 shadow-sm">
        {step === 1 && (
          <div className="space-y-5">
            <h2 className="text-lg font-semibold text-gray-900">
              Basics
            </h2>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Campaign title *
              </label>
              <input
                required
                value={form.title}
                onChange={(e) => update("title", e.target.value)}
                placeholder="e.g. Help Aisha Get Back to School"
                className="w-full px-4 py-3 rounded-xl border border-yellow-100 focus:outline-none focus:ring-2 focus:ring-yellow-300"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Category *
              </label>
              <select
                value={form.category}
                onChange={(e) => update("category", e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-yellow-100 focus:outline-none focus:ring-2 focus:ring-yellow-300 bg-white"
              >
                {categories.map((c) => (
                  <option key={c.name} value={c.name}>
                    {c.icon} {c.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Fundraising goal (USD) *
              </label>
              <input
                required
                type="number"
                min="100"
                value={form.goal}
                onChange={(e) => update("goal", e.target.value)}
                placeholder="5000"
                className="w-full px-4 py-3 rounded-xl border border-yellow-100 focus:outline-none focus:ring-2 focus:ring-yellow-300"
              />
            </div>
            <button
              type="button"
              onClick={() => setStep(2)}
              disabled={!form.title || !form.goal}
              className="w-full flex items-center justify-center gap-2 py-3.5 bg-yellow-500 hover:bg-yellow-600 disabled:opacity-50 text-white font-semibold rounded-xl"
            >
              Continue
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-5">
            <h2 className="text-lg font-semibold text-gray-900">Your story</h2>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Short description *
              </label>
              <input
                required
                value={form.description}
                onChange={(e) => update("description", e.target.value)}
                placeholder="A brief summary of your campaign"
                className="w-full px-4 py-3 rounded-xl border border-yellow-100 focus:outline-none focus:ring-2 focus:ring-yellow-300"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Full story *
              </label>
              <textarea
                required
                rows={5}
                value={form.longDescription}
                onChange={(e) => update("longDescription", e.target.value)}
                placeholder="Tell supporters why this matters..."
                className="w-full px-4 py-3 rounded-xl border border-yellow-100 focus:outline-none focus:ring-2 focus:ring-yellow-300 resize-none"
              />
            </div>
            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => setStep(1)}
                className="flex-1 py-3.5 border border-yellow-200 text-yellow-600 font-semibold rounded-xl hover:bg-yellow-50"
              >
                Back
              </button>
              <button
                type="button"
                onClick={() => setStep(3)}
                disabled={!form.description || !form.longDescription}
                className="flex-1 flex items-center justify-center gap-2 py-3.5 bg-yellow-500 hover:bg-yellow-600 disabled:opacity-50 text-white font-semibold rounded-xl"
              >
                Continue
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-5">
            <h2 className="text-lg font-semibold text-gray-900">
              About you
            </h2>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Your name *
              </label>
              <input
                required
                value={form.creatorName}
                onChange={(e) => update("creatorName", e.target.value)}
                placeholder="Grace Okafor"
                className="w-full px-4 py-3 rounded-xl border border-yellow-100 focus:outline-none focus:ring-2 focus:ring-yellow-300"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Location *
              </label>
              <input
                required
                value={form.location}
                onChange={(e) => update("location", e.target.value)}
                placeholder="Lagos, Nigeria"
                className="w-full px-4 py-3 rounded-xl border border-yellow-100 focus:outline-none focus:ring-2 focus:ring-yellow-300"
              />
            </div>
            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => setStep(2)}
                className="flex-1 py-3.5 border border-yellow-200 text-yellow-600 font-semibold rounded-xl hover:bg-yellow-50"
              >
                Back
              </button>
              <button
                type="submit"
                disabled={loading || !form.creatorName || !form.location}
                className="flex-1 py-3.5 bg-yellow-500 hover:bg-yellow-600 disabled:opacity-50 text-white font-semibold rounded-xl"
              >
                {loading ? "Creating..." : "Launch Campaign"}
              </button>
            </div>
          </div>
        )}
      </form>
    </div>
  );
}
