'use client'
import { motion } from "framer-motion";

export default function CTASection() {
  return (
    <div className="flex justify-center px-4 mb-32 md:mb-40"> {/* Added bottom margin */}
      <motion.div
        className="
          w-full max-w-6xl
          flex flex-col md:flex-row items-center justify-between
          gap-6
          rounded-3xl
          bg-linear-to-r from-blue-800 via-blue-900 to-blue-950
          px-10 py-12
          text-white
        "
        initial={{ y: 120, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ type: "spring", stiffness: 280, damping: 60 }}
      >
        {/* Left Content */}
        <div className="max-w-2xl text-center md:text-left">
          <h2 className="text-3xl md:text-4xl font-semibold">
            Create <span className="text-blue-300">thumbnails</span> that get clicks
          </h2>
          <p className="mt-3 text-blue-200 text-base md:text-lg">
            Generate high-impact, click-optimized thumbnails in seconds using AI.
          </p>
        </div>

        {/* Right Button */}
        <button
          className="
            mt-4 md:mt-0
            shrink-0
            rounded-full
            bg-white
            px-8 py-3
            text-sm font-medium
            text-slate-900
            hover:bg-slate-200
            transition
          "
        >
          Generate Thumbnail
        </button>
      </motion.div>
    </div>
  );
}
