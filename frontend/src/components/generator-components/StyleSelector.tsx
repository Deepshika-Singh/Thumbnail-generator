import { useState } from "react";
import {Sparkles,ChevronDown} from "lucide-react";
const styles = [
  {
    name: "Bold & Graphic",
    desc: "High contrast, bold typography, striking visuals",
  },
  {
    name: "Minimal Clean",
    desc: "Simple layout, clean text, subtle visuals",
  },
  {
    name: "Cinematic",
    desc: "Dramatic lighting, depth and mood",
  },
];
const StyleSelector = () => {
  const [style, setStyle] = useState(styles[0]);
    const [styleOpen, setStyleOpen] = useState(false);
  return (
    <>
    <div className="relative">
        <label className="text-sm font-medium text-white">Thumbnail Style</label>
        <button
          type="button"
          onClick={() => setStyleOpen((v) => !v)}
          className="mt-2 w-full flex justify-between items-center px-4 py-3 rounded-lg bg-white/8 border border-white/10"
        >
          <div>
            <div className="flex items-center gap-2 font-medium text-white">
              <Sparkles className="w-4 h-4 text-blue-400" />
              {style.name}
            </div>
            <p className="text-xs text-gray-400">{style.desc}</p>
          </div>
          <ChevronDown
            className={`transition-transform ${
              styleOpen ? "rotate-180" : ""
            }`}
          />
        </button>

        {styleOpen && (
          <div className="absolute z-20 mt-2 w-full bg-black rounded-xl border border-white/10 overflow-hidden">
            {styles.map((s) => (
              <button
                key={s.name}
                onClick={() => {
                  setStyle(s);
                  setStyleOpen(false);
                }}
                className="w-full px-4 py-3 text-left hover:bg-blue-500/20"
              >
                <div className="font-medium text-white">{s.name}</div>
                <p className="text-xs text-gray-400">{s.desc}</p>
              </button>
            ))}
          </div>
        )}
      </div>
    </>
  )
}

export default StyleSelector
