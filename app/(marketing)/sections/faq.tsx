'use client'

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { motion } from 'framer-motion'
import { FAQItem } from './faqitem'

const faqData = [
  {
    question: 'How can I reset my password?',
    answer:
      "To reset your password, click on the 'Forgot Password' link on the login page. Follow the instructions to receive a password reset link in your email.",
  },
  {
    question: 'Can I create more than one account?',
    answer:
      'Yes, but we recommend using a single account to track your progress and achievements across the platform efficiently.',
  },
  {
    question: 'Can I access the platform on mobile devices?',
    answer:
      'Yes, our platform is fully responsive and accessible on mobile devices via a browser or our dedicated app.',
  },
  {
    question: 'Do you store credit card information securely?',
    answer:
      'Yes, we use industry-standard encryption and secure payment gateways to ensure your credit card information is safe.',
  },
  {
    question: 'What payment systems do you work with?',
    answer:
      'We accept payments via major credit cards, PayPal, and other regional payment gateways depending on your location.',
  },
  {
    question: 'Is there a free trial available?',
    answer:
      'We don’t offer a free trial, but we have a free tier that allows you to explore essential features of the platform.',
  },
  {
    question: 'How do gamified elements enhance learning?',
    answer:
      'Gamified elements like quizzes, badges, and leaderboards make learning interactive and engaging, helping you stay motivated and achieve your goals.',
  },
]
export default function Faq() {
  return (
    <motion.div
      className="mx-4 md:mx-24 py-8"
      id="faq"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        className="text-center mb-8 px-4"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-3xl font-bold md:text-4xl lg:text-5xl text-foreground">
          Frequently Asked Questions
        </h2>
        <p className="text-muted-foreground mt-2 text-sm md:text-base">
          Everything you need to know about our platform
        </p>
      </motion.div>
      {faqData.map((faq, index) => (
        <FAQItem key={faq.question} {...faq} index={index} />
      ))}
    </motion.div>
  )
}
