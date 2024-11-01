'use client'

import { useState } from "react"
import { motion, AnimatePresence } from 'framer-motion'

export default function ContactModal() {
  const [isOpen, setIsOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (event) => {
    event.preventDefault()
    setIsLoading(true)

    // Get form data
    const formData = new FormData(event.currentTarget)
    const name = formData.get("name") 
    const email = formData.get("email") 
    const message = formData.get("message") 

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Reset form and show success message
    event.currentTarget.reset()
    setIsLoading(false)
    setIsOpen(false)
    alert("Message sent! We'll get back to you as soon as possible.")
  }

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
              <h2 className="text-3xl font-bold mb-6 text-center">Contact IPMS</h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                  <input
                    id="name"
                    name="name"
                    required
                    className="w-full px-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent transition"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    className="w-full px-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent transition"
                  />
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={4}
                    className="w-full px-4 py-2 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent transition"
                  ></textarea>
                </div>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-black text-white px-6 py-3 rounded-full font-bold hover:bg-gray-800 transition-colors shadow-md hover:shadow-lg disabled:opacity-50"
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
  )
}