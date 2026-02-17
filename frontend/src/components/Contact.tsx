// "use client";

// import { MailIcon, UserIcon } from "lucide-react";
// import { PrimaryButton } from "./Buttons";
// import { motion } from "framer-motion";

// export default function Contact() {
//   return (
//     <section id="contact" className="py-20 2xl:pb-32 px-4">
//       <div className="container mx-auto max-w-4xl">
//         <div className="relative overflow-hidden rounded-3xl border border-blue-500/20 bg-linear-to-b from-blue-900/20 to-blue-900/5 p-10 md:p-16">
          
//           {/* Noise overlay */}
//           <div className="absolute inset-0 bg-[url('/noise.svg')] opacity-20" />

//           <div className="relative z-10 text-center">
//             {/* Heading */}
//             <motion.h2
//               className="mb-4 text-2xl font-semibold sm:text-4xl"
//               initial={{ y: 60, opacity: 0 }}
//               whileInView={{ y: 0, opacity: 1 }}
//               viewport={{ once: true }}
//               transition={{ type: "spring", stiffness: 250, damping: 70 }}
//             >
//               Get in Touch
//             </motion.h2>

//             <motion.p
//               className="mx-auto mb-12 max-w-xl text-slate-400"
//               initial={{ y: 60, opacity: 0 }}
//               whileInView={{ y: 0, opacity: 1 }}
//               viewport={{ once: true }}
//               transition={{ delay: 0.2, type: "spring", stiffness: 250 }}
//             >
//               Share your name, email, and message below. We’ll reach out to you shortly.
//             </motion.p>

//             {/* Contact Form */}
//             <form
//               onSubmit={(e) => e.preventDefault()}
//               className="mx-auto grid max-w-2xl gap-4 text-slate-300 sm:grid-cols-2"
//             >
//               {/* Name */}
//               <div className="flex items-center rounded-lg border border-slate-700 pl-3 focus-within:border-blue-500">
//                 <UserIcon className="h-5 w-5 text-slate-400" />
//                 <input
//                   type="text"
//                   placeholder="Your name"
//                   className="w-full bg-transparent p-3 outline-none"
//                 />
//               </div>

//               {/* Email */}
//               <div className="flex items-center rounded-lg border border-slate-700 pl-3 focus-within:border-blue-500">
//                 <MailIcon className="h-5 w-5 text-slate-400" />
//                 <input
//                   type="email"
//                   placeholder="Your email ID"
//                   className="w-full bg-transparent p-3 outline-none"
//                 />
//               </div>

//               {/* Message */}
//               <div className="sm:col-span-2">
//                 <textarea
//                   rows={6}
//                   placeholder="Your message"
//                   className="w-full resize-none rounded-lg border border-slate-700 bg-transparent p-3 outline-none focus:border-blue-500"
//                 />
//               </div>

//               {/* Button */}
//               <div className="sm:col-span-2 flex justify-center">
//                 <PrimaryButton
//                   type="submit"
//                   className="hidden sm:inline-block"
//                 >
//                   Send Message
//                 </PrimaryButton>
//               </div>
//             </form>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }
import { MailIcon, UserIcon, SendIcon } from "lucide-react";
import { PrimaryButton } from "./Buttons";
import { motion } from "framer-motion";
import { useState } from "react";
import { apiFetch } from "../config/api";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<{
    type: "success" | "error" | null;
    message: string;
  }>({ type: null, message: "" });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.message) {
      setStatus({ type: "error", message: "Please fill in all fields" });
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setStatus({ type: "error", message: "Please enter a valid email" });
      return;
    }

    setLoading(true);
    try {
      const response = await apiFetch("/contact/send", {
        method: "POST",
        body: JSON.stringify(formData),
      });

      if (response.success) {
        setStatus({ type: "success", message: "Message sent successfully!" });
        setFormData({ name: "", email: "", message: "" });
      }
    } catch (error) {
      setStatus({ type: "error", message: "Failed to send message" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="py-20 px-4">
      <div className="container mx-auto max-w-4xl">
        <div className="relative overflow-hidden rounded-3xl border border-blue-500/20 bg-gradient-to-b from-blue-900/20 to-blue-900/5 p-10 md:p-16">
          <div className="absolute inset-0 bg-[url('/noise.svg')] opacity-20" />
          <div className="relative z-10 text-center">
            <motion.h2 className="mb-4 text-2xl font-semibold sm:text-4xl">
              Get in Touch
            </motion.h2>
            <motion.p className="mx-auto mb-12 max-w-xl text-slate-400">
              Share your name, email, and message below. We'll reach out to you shortly.
            </motion.p>

            {status.type && (
              <div className={`mb-6 p-4 rounded-lg ${
                status.type === "success" 
                  ? "bg-green-500/20 border border-green-500/50 text-green-300" 
                  : "bg-red-500/20 border border-red-500/50 text-red-300"
              }`}>
                {status.message}
              </div>
            )}

            <form onSubmit={handleSubmit} className="mx-auto grid max-w-2xl gap-4 sm:grid-cols-2">
              <div className="flex items-center rounded-lg border border-slate-700 pl-3 focus-within:border-blue-500">
                <UserIcon className="h-5 w-5 text-slate-400" />
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Your name"
                  className="w-full bg-transparent p-3 outline-none"
                  disabled={loading}
                />
              </div>
              <div className="flex items-center rounded-lg border border-slate-700 pl-3 focus-within:border-blue-500">
                <MailIcon className="h-5 w-5 text-slate-400" />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Your email"
                  className="w-full bg-transparent p-3 outline-none"
                  disabled={loading}
                />
              </div>
              <div className="sm:col-span-2">
                <textarea
                  name="message"
                  rows={6}
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Your message"
                  className="w-full resize-none rounded-lg border border-slate-700 bg-transparent p-3 outline-none focus:border-blue-500"
                  disabled={loading}
                />
              </div>
              <div className="sm:col-span-2 flex justify-center">
                <PrimaryButton type="submit" disabled={loading} className="inline-flex items-center gap-2">
                  {loading ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <SendIcon className="w-4 h-4" />
                      Send Message
                    </>
                  )}
                </PrimaryButton>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}