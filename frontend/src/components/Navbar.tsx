import { MenuIcon, XIcon } from "lucide-react";
import { PrimaryButton } from "./Buttons";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { isAuthenticated, logout } = useAuth();

  // Handle hash navigation when coming from different page
  useEffect(() => {
    // Check if there's a hash in the URL
    if (location.hash) {
      const section = location.hash.replace('#', '');
      // Wait a bit for the page to load
      setTimeout(() => {
        const element = document.getElementById(section);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    } else if (location.pathname === "/") {
      // If on home page with no hash, scroll to top
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [location]);

  const handleNavigation = (path: string, section?: "faq" | "contact") => {
    // Close mobile menu
    setIsOpen(false);

    if (path === "/" && !section) {
      // Home without section - go to top
      if (location.pathname === "/") {
        // Already on home, just scroll to top
        window.scrollTo({ top: 0, behavior: "smooth" });
      } else {
        // Navigate to home and scroll to top
        navigate("/");
        // The useEffect will handle scrolling to top
      }
      return;
    }

    if (!section) {
      // Regular page navigation
      navigate(path);
      return;
    }

    if (location.pathname === "/") {
      // Already on home page, just scroll to section
      const element = document.getElementById(section);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    } else {
      // Navigate to home page with hash
      navigate(`/#${section}`);
    }
  };

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <motion.nav
      className="fixed top-5 left-0 right-0 z-50 px-4"
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      viewport={{ once: true }}
      transition={{ type: "spring", stiffness: 250, damping: 70, mass: 1 }}
    >
      <div className="max-w-6xl mx-auto flex items-center justify-between bg-black/50 backdrop-blur-md border border-white/4 rounded-2xl p-3">
        <button 
          onClick={() => handleNavigation("/")} 
          className="flex items-center gap-2 sm:gap-3"
        >
          <img
            src="/favicon.png"
            alt="ThumbnailGen logo"
            className="h-6 sm:h-9 md:h-10 lg:h-12 w-auto object-contain"
          />
          <span className="text-white font-semibold tracking-wide text-xs sm:text-sm md:text-base lg:text-lg">
            Thumbnail<span className="text-blue-400">Gen</span>
          </span>
        </button>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-300">
          <button
            type="button"
            onClick={() => handleNavigation("/")}
            className="hover:text-purple-500 transition"
          >
            Home
          </button>
          
          <Link to="/generate" className="hover:text-purple-500 transition">
            Generate
          </Link>

          {isAuthenticated && (
            <Link
              to="/my-generation"
              className="hover:text-purple-500 transition"
            >
              My Generations
            </Link>
          )}

          <button
            type="button"
            onClick={() => handleNavigation("/", "faq")}
            className="hover:text-purple-500 transition"
          >
            FAQ
          </button>

          <button
            type="button"
            onClick={() => handleNavigation("/", "contact")}
            className="hover:text-purple-500 transition"
          >
            Contact us
          </button>
        </div>

        {/* Desktop Auth Buttons */}
        <div className="hidden md:flex items-center gap-3">
          {isAuthenticated ? (
            <PrimaryButton
              onClick={handleLogout}
              className="max-sm:text-xs hidden sm:inline-block"
            >
              Logout
            </PrimaryButton>
          ) : (
            <PrimaryButton
              onClick={() => navigate("/login")}
              className="max-sm:text-xs hidden sm:inline-block"
            >
              Get Started
            </PrimaryButton>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button onClick={() => setIsOpen(!isOpen)} className="md:hidden">
          <MenuIcon className="h-6 w-6 text-white" />
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`flex flex-col items-center justify-center gap-6 text-lg font-medium fixed inset-0 bg-black/95 backdrop-blur-md z-50 transition-all duration-300 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <button
          type="button"
          onClick={() => handleNavigation("/")}
          className="text-white hover:text-purple-500 transition"
        >
          Home
        </button>
        
        <button
          type="button"
          onClick={() => {
            setIsOpen(false);
            navigate("/generate");
          }}
          className="text-white hover:text-purple-500 transition"
        >
          Generate
        </button>

        {isAuthenticated && (
          <button
            type="button"
            onClick={() => {
              setIsOpen(false);
              navigate("/my-generation");
            }}
            className="text-white hover:text-purple-500 transition"
          >
            My Generations
          </button>
        )}

        <button
          type="button"
          onClick={() => handleNavigation("/", "faq")}
          className="text-white hover:text-purple-500 transition"
        >
          FAQ
        </button>

        <button
          type="button"
          onClick={() => handleNavigation("/", "contact")}
          className="text-white hover:text-purple-500 transition"
        >
          Contact us
        </button>

        <PrimaryButton
          onClick={() => {
            setIsOpen(false);
            if (isAuthenticated) {
              handleLogout();
            } else {
              navigate("/login");
            }
          }}
          className="mt-4"
        >
          {isAuthenticated ? "Logout" : "Get Started"}
        </PrimaryButton>

        <button
          onClick={() => setIsOpen(false)}
          className="absolute top-6 right-6 rounded-md bg-white/10 p-2 text-white hover:bg-white/20 transition"
        >
          <XIcon className="h-6 w-6" />
        </button>
      </div>
    </motion.nav>
  );
}