"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight, ChevronDown } from "lucide-react";
import localFont from "next/font/local";
import content from "@/data/content.json";
import ContactModal from "@/components/contact-modal";

const aptos = localFont({
  src: [
    {
      path: "../../public/fonts/Aptos.ttf",
      weight: "400",
      style: "normal",
    },
  ],
  variable: "--font-aptos",
});

export default function LandingPage() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  const navItemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 },
  };

  const scrollToBottom = () => {
    const contactSection = document.getElementById("contact");
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className={`min-h-screen text-gray-800 ${aptos.className}`}>
      <main>
        <section
          id="hero"
          className="min-h-screen flex items-center justify-center bg-gradient-to-r from-purple-100 to-orange-100 py-20 relative"
        >
          <div className="container mx-auto px-6 text-center">
            <motion.h1
              className="text-5xl md:text-7xl font-bold mb-6"
              initial="hidden"
              animate={isLoaded ? "visible" : "hidden"}
              variants={fadeIn}
              transition={{ duration: 0.6 }}
            >
              {content.hero.title}
            </motion.h1>
            <motion.p
              className="text-xl md:text-2xl mb-8"
              initial="hidden"
              animate={isLoaded ? "visible" : "hidden"}
              variants={fadeIn}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              {content.hero.subtitle}
            </motion.p>
            <motion.div
              className="flex justify-center"
              initial="hidden"
              animate={isLoaded ? "visible" : "hidden"}
              variants={fadeIn}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <motion.a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  scrollToBottom();
                }}
                className="bg-white text-black px-8 py-3 rounded-full font-bold hover:bg-gray-100 transition-colors inline-flex items-center border border-black"
                initial="hidden"
                animate={isLoaded ? "visible" : "hidden"}
                variants={fadeIn}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                {content.hero.cta.text} <ChevronRight className="ml-2" />
              </motion.a>
            </motion.div>
          </div>
          <div className="absolute bottom-8 flex justify-center items-center transform -translate-x-1/2 animate-bounce">
            <ChevronDown size={32} />
          </div>
        </section>

        <section id="about" className="py-20 bg-white">
          <div className="container mx-auto px-6">
            <motion.h2
              className="text-4xl font-bold mb-6 text-center"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeIn}
            >
              {content.about.title}
            </motion.h2>
            <motion.p
              className="text-lg mb-6 max-w-3xl mx-auto text-center"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeIn}
            >
              {content.about.description}
            </motion.p>
            <div className="grid md:grid-cols-3 gap-8">
              {content.about.items.map((item, index) => (
                <motion.div
                  key={index}
                  className="bg-gray-50 rounded-2xl p-6 shadow-lg hover:shadow-xl hover:scale-110 transition-all duration-300"
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={fadeIn}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                >
                  <h3 className="text-2xl font-bold mb-4">{item.title}</h3>
                  <p>{item.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section id="contact" className="py-20 bg-gray-50">
          <div className="container mx-auto px-6">
            <motion.h2
              className="text-4xl font-bold mb-8 text-center"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeIn}
            >
              {content.contact.title}
            </motion.h2>
            <motion.p
              className="text-xl mb-8 text-center"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeIn}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              {content.contact.description}
            </motion.p>
            <motion.div
              className="flex justify-center"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeIn}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <ContactModal />
            </motion.div>
          </div>
        </section>
      </main>

      <footer className="bg-white border-t border-black py-6">
        <div className="flex flex-row items-center mx-auto px-6">
          <img src="/logo.svg" alt="IPMS Logo" className="h-16 w-auto mx-6" />
          <p className="text-center">{content.footer.copyright}</p>
        </div>
      </footer>
    </div>
  );
}
