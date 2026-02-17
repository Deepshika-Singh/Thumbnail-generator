import { footerLinks } from "../assets/dummy-data";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <motion.footer
      className="bg-white/6 border-t border-white/6 pt-10 text-gray-300"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ type: "spring", duration: 0.5 }}
    >
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex flex-col md:flex-row items-start justify-between gap-10 py-10 border-b border-white/10">
          
          {/* Brand Section */}
          <div>
            <Link to="/" className="flex items-center gap-2">
              <span className="font-semibold text-white text-lg">
                Thumbnail<span className="text-purple-400">AI</span>
              </span>
            </Link>

            <p className="max-w-[410px] mt-6 text-sm leading-relaxed">
              ThumbnailAI helps creators generate eye-catching thumbnails using
              AI. Boost clicks, save time, and create professional designs for
              YouTube, Instagram, and more — in seconds.
            </p>
          </div>

          {/* Links */}
          <div className="flex flex-wrap justify-between w-full md:w-[45%] gap-5">
            {footerLinks.map((section, index) => (
              <div key={index}>
                <h3 className="font-semibold text-base text-white md:mb-5 mb-2">
                  {section.title}
                </h3>
                <ul className="text-sm space-y-1">
                  {section.links.map(
                    (link: { name: string; url: string }, i) => (
                      <li key={i}>
                        <a
                          href={link.url}
                          className="hover:text-white transition"
                        >
                          {link.name}
                        </a>
                      </li>
                    )
                  )}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Copyright */}
        <p className="py-4 text-center text-sm text-gray-400">
          © {new Date().getFullYear()}{" "}
          <span className="text-white">ThumbnailAI</span>.  
          All rights reserved.
        </p>
      </div>
    </motion.footer>
  );
}
