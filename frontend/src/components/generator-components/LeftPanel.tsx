import { useState } from "react";
import { ChevronDown } from "lucide-react";
import AspectRatioSlector from "./AspectRatioSlector";
import StyleSelector from "./StyleSelector";
import ColorSchemeSelector from "./ColorSchemeSelector";

type LeftPanelProps = {
  title: string;
  setTitle: (value: string) => void;
  prompt: string;
  setPrompt: (value: string) => void;
};

const LeftPanel = ({ title, setTitle, prompt, setPrompt }: LeftPanelProps) => {
  const [model, setModel] = useState("basic");
  const [modelOpen, setModelOpen] = useState(false);

  return (
    <div className="p-6 rounded-2xl bg-white/8 border border-white/12 space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-xl font-bold text-white">Create Your Thumbnail</h2>
        <p className="text-sm text-gray-400">
          Describe your vision and let AI bring it to life
        </p>
      </div>

      {/* Title */}
      <div>
        <label className="text-sm font-medium text-white">Title or Topic</label>
        <input
          maxLength={100}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="e.g., 10 Tips for Better Sleep"
          className="mt-2 w-full px-4 py-3 rounded-lg bg-black/30 border border-white/12 text-white focus:ring-2 focus:ring-blue-500 outline-none"
        />
        <div className="text-right text-xs text-gray-400">
          {title.length}/100
        </div>
      </div>

      

      {/* Aspect Ratio */}
      <AspectRatioSlector></AspectRatioSlector>

      {/* Thumbnail Style */}
      <StyleSelector></StyleSelector>

      {/* Color Scheme */}
      <ColorSchemeSelector></ColorSchemeSelector>

      {/* Model */}
      <div className="relative">
        <label className="text-sm font-medium text-white">Model</label>
        <button
          type="button"
          onClick={() => setModelOpen((v) => !v)}
          className="mt-2 w-full px-4 py-3 rounded-lg bg-black/30 border border-white/12 flex justify-between items-center"
        >
          <span className="text-white">
            {model} <span className="text-xs text-gray-400">(5 credits)</span>
          </span>
          <ChevronDown />
        </button>

        {modelOpen && (
          <div className="absolute z-20 mt-2 w-full bg-black rounded-xl border border-white/10">
            {["basic", "pro"].map((m) => (
              <button
                key={m}
                onClick={() => {
                  setModel(m);
                  setModelOpen(false);
                }}
                className="w-full px-4 py-3 text-left text-white hover:bg-blue-500/20"
              >
                {m}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Additional Prompt */}
      <div>
        <label className="text-sm font-medium text-white">
          Additional Prompts{" "}
          <span className="text-gray-400">(optional)</span>
        </label>
        <textarea
          rows={3}
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Add mood, elements, lighting, style..."
          className="mt-2 w-full px-4 py-3 rounded-lg bg-white/6 border border-white/10 text-white resize-none"
        />
      </div>
    </div>
  );
};

export default LeftPanel;
