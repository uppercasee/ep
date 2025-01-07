'use client'

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'

const placeholder =
  'It can’t help but hear a pin drop from over half a mile away, so it lives deep in the mountains where there aren’t many people or Pokémon.It was born from sludge on the ocean floor. In a sterile environment, the germs within its body can’t multiply, and it dies.It has no eyeballs, so it can’t see. It checks its surroundings via the ultrasonic waves it emits from its mouth.'

export default function Faq() {
  return (
    <div className="mx-4 md:mx-24 px-4 py-8" id="faq">
      <div className="text-center mb-8">
        <h2 className="text-4xl font-extrabold">Frequently Asked Questions</h2>
      </div>
      <Accordion type="single" collapsible>
        <AccordionItem className="" value="reset-password">
          <AccordionTrigger>How can I reset my password?</AccordionTrigger>
          <AccordionContent>{placeholder}</AccordionContent>
        </AccordionItem>

        <AccordionItem className="" value="another-account">
          <AccordionTrigger>
            Can I create more that one account?
          </AccordionTrigger>
          <AccordionContent>{placeholder}</AccordionContent>
        </AccordionItem>

        <AccordionItem className="" value="newsletter">
          <AccordionTrigger>
            How can I subscribe to monthly newsletter?
          </AccordionTrigger>
          <AccordionContent>{placeholder}</AccordionContent>
        </AccordionItem>

        <AccordionItem className="" value="credit-card">
          <AccordionTrigger>
            Do you store credit card information securely?
          </AccordionTrigger>
          <AccordionContent>{placeholder}</AccordionContent>
        </AccordionItem>

        <AccordionItem className="" value="payment">
          <AccordionTrigger>
            What payment systems to you work with?
          </AccordionTrigger>
          <AccordionContent>{placeholder}</AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  )
}
