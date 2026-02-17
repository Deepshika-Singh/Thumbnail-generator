import { useState } from "react";
const colors = [
  // 🔥 Warm / Attention
  {
    name: "Sunset",
    colors: ["#FF8C42", "#FF3C38", "#A23B72"],
  },

  // 🌊 Cool / Professional
  {
    name: "Ocean",
    colors: ["#0077B6", "#00B4D8", "#90E0EF"],
  },

  // 💜 Creative / AI
  {
    name: "Purple Dream",
    colors: ["#7B2CBF", "#9D4EDD", "#C77DFF"],
  },

  // 🧠 Dark / Tech
  {
    name: "Midnight",
    colors: ["#0B132B", "#1C2541", "#3A506B"],
  },

  // 🌿 Natural / Calm
  {
    name: "Forest",
    colors: ["#2D6A4F", "#40916C", "#95D5B2"],
  },

  // ✨ Soft / Pastel
  {
    name: "Lavender Soft",
    colors: ["#E6E6FA", "#D8BFD8", "#CDB4DB"],
  },
];

const ColorSchemeSelector = () => {
  const [color, setColor] = useState(colors[0]);
  return (
    <>
    <div>
        <label className="text-sm font-medium text-white">Color Scheme</label>
        <div className="grid grid-cols-6 gap-3 mt-2">
          {colors.map((c) => (
            <button
              key={c.name}
              onClick={() => setColor(c)}
              className={`rounded-lg overflow-hidden border ${
                color.name === c.name
                  ? "ring-2 ring-blue-500"
                  : "border-white/10"
              }`}
            >
              <div className="flex h-8">
                {c.colors.map((clr) => (
                  <div
                    key={clr}
                    className="flex-1"
                    style={{ backgroundColor: clr }}
                  />
                ))}
              </div>
            </button>
          ))}
        </div>
        <p className="text-xs text-gray-400 mt-1">
          Selected: {color.name}
        </p>
      </div>
    </>
  )
}

export default ColorSchemeSelector
