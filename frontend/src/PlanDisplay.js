import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { ArrowLeft, Share2, Download } from "lucide-react";
import "./PlanDisplay.css";

export default function PlanDisplay({ plan, onBack, type }) {
  const handleDownload = () => {
    const blob = new Blob([plan], { type: "text/markdown" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${type === "diet" ? "DietPlan" : "WorkoutPlan"}.md`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleShare = () => {
    navigator.clipboard.writeText(plan);
    alert(`${type === "diet" ? "Diet" : "Workout"} plan copied to clipboard!`);
  };

  return (
  <div className="plan-container">
    {/* Top Controls Row */}
    <div className="flex items-center justify-between mb-6 flex-wrap gap-3 w-full max-w-4xl">
      <button
        className="flex items-center gap-2 px-4 py-2 border rounded-md text-gray-700 hover:bg-gray-100 transition"
        onClick={onBack}
      >
        <ArrowLeft size={16} />
        Back to Form
      </button>

      <div className="flex gap-2">
        <button
          onClick={handleShare}
          title="Share"
          className="flex items-center gap-2 px-4 py-2 border rounded-md text-gray-700 hover:bg-gray-100 transition"
        >
          <Share2 size={18} />
          Share
        </button>
        <button
          onClick={handleDownload}
          title="Download"
          className="flex items-center gap-2 px-4 py-2 rounded-md text-white bg-gray-700 hover:bg-gray-800 transition"
        >
          <Download size={18} />
          Download
        </button>
      </div>
    </div>

    {/* Plan Box */}
    <div className="plan-box">
      <div className="markdown-content">
        <ReactMarkdown remarkPlugins={[remarkGfm]}>
          {plan}
        </ReactMarkdown>
      </div>
    </div>
  </div>
);
}
