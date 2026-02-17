import { useState } from "react";
import {
  RectangleHorizontal,
  RectangleVertical,
  Square,
} from "lucide-react";
const AspectRatioSlector = () => {
  const [ratio, setRatio] = useState("16:9");
  const iconMap = [
  { v: "16:9", icon: <RectangleHorizontal /> },
  { v: "1:1", icon: <Square /> },
  { v: "9:16", icon: <RectangleVertical /> },
];
  return (
    <>
    <div>
        <label className="text-sm font-medium text-white">Aspect Ratio</label>
        <div className="flex gap-2 mt-2">
          {iconMap.map((r) => (
            <button
              key={r.v}
              onClick={() => setRatio(r.v)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg border transition ${
                ratio === r.v
                  ? "bg-blue-500/20 border-blue-400"
                  : "border-white/10 hover:bg-white/10"
              }`}
            >
              {r.icon}
              {r.v}
            </button>
          ))}
        </div>
      </div>
    </>
  )
}

export default AspectRatioSlector
