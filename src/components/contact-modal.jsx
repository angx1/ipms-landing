"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseAnonKey);

const isValidEmail = (email) => {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return emailRegex.test(email);
};

const MAX_MESSAGE_LENGTH = 2000;

export default function ContactModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [message, setMessage] = useState("");
  const [messageError, setMessageError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const [formKey, setFormKey] = useState(Date.now());

  const handleSubmit = async (event) => {
    event.preventDefault();

    const form = event.currentTarget;

    const formData = new FormData(form);
    const name = formData.get("name");
    const email = formData.get("email");

    setSuccessMessage(""); // Clear messages at start
    setErrorMessage("");

    if (!name || !email || !message) {
      setErrorMessage("Please fill in all fields.");
      return;
    }

    if (!isValidEmail(email)) {
      setEmailError("Please enter a valid email address.");
      return;
    } else {
      setEmailError("");
    }

    if (message.length > MAX_MESSAGE_LENGTH) {
      setMessageError(
        `Message exceeds the maximum length of ${MAX_MESSAGE_LENGTH} characters.`
      );
      return;
    } else {
      setMessageError("");
    }

    setIsLoading(true);

    try {
      const { data, error } = await supabase
        .from("contact_submissions")
        .insert([{ name, email, message }]);

      if (error) {
        console.error("Supabase insert error:", error);
        setErrorMessage(
          "There was an error submitting your form. Please try again."
        );
      } else {
        setSuccessMessage(
          "Message sent! We'll get back to you as soon as possible."
        );

        //Hide model after a successful send
        /*setTimeout(() => {
          setIsOpen(false);
          setSuccessMessage("");
          setFormKey(Date.now());
        }, 3000);*/
      }

      form.reset();
      setMessage("");
      setIsLoading(false);
    } catch (err) {
      console.error("Unexpected error:", err);
      setErrorMessage("An unexpected error occurred. Please try again later.");
      setIsLoading(false);
    } finally {
      setIsLoading(false);
      setFormKey(Date.now());
    }
  };

  const handleMessageChange = (event) => {
    const text = event.target.value;
    if (text.length <= MAX_MESSAGE_LENGTH) {
      setMessage(text);
      setMessageError("");
    } else {
      setMessageError(
        `Message exceeds the maximum length of ${MAX_MESSAGE_LENGTH} characters.`
      );
    }
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="bg-white text-black px-6 py-3 rounded-full font-bold hover:bg-gray-100 transition-colors border border-black shadow-md hover:shadow-lg"
      >
        Contact Us
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-2xl p-8 max-w-md w-full shadow-2xl"
            >
              <h2 className="text-3xl font-bold mb-6 text-center">
                Contact IPMS
              </h2>
              {successMessage && (
                <div className="text-green-500 mb-4 border rounded-xl p-4 bg-green-50">
                  {successMessage}
                </div>
              )}
              {errorMessage && (
                <div className="text-red-500 mb-4 border rounded-xl p-4 bg-red-50">
                  {errorMessage}
                </div>
              )}
              <form onSubmit={handleSubmit} className="space-y-6" key={formKey}>
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Name
                  </label>
                  <input
                    id="name"
                    name="name"
                    required
                    className="w-full px-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent transition"
                  />
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Email
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    className="w-full px-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent transition"
                  />
                  {emailError && (
                    <p className="text-red-500 text-sm">{emailError}</p>
                  )}
                </div>
                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={4}
                    className="w-full px-4 py-2 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent transition"
                    value={message}
                    onChange={handleMessageChange}
                  ></textarea>
                  <div className="text-gray-500 text-sm text-right">
                    {message.length}/{MAX_MESSAGE_LENGTH}
                  </div>
                  {messageError && (
                    <p className="text-red-500 text-sm">{messageError}</p>
                  )}
                </div>
                <button
                  type="submit"
                  disabled={isLoading || messageError}
                  className="w-full bg-black text-white px-6 py-3 rounded-full font-bold hover:bg-gray-800 transition-colors shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? "Sending..." : "Send Message"}
                </button>
              </form>
              <button
                onClick={() => setIsOpen(false)}
                className="mt-6 text-sm text-gray-500 hover:text-gray-700 transition-colors"
              >
                Close
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
