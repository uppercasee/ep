'use client'

import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { motion } from 'framer-motion'
import { CheckCircle, XCircle } from 'lucide-react'

export default function Pricing() {
  const tiers = [
    {
      title: 'Free Tier',
      price: 'Free',
      features: [
        'View available courses',
        'Access public discussions',
        'Basic email support',
      ],
      unavailable: [
        'Add and create your own courses',
        'Priority support',
        'Exclusive content & tutorials',
      ],
    },
    {
      title: 'Premium Tier',
      price: '$19.99/month',
      features: [
        'View available courses',
        'Access public discussions',
        'Basic email support',
        'Add and create your own courses',
        'Priority support',
        'Exclusive content & tutorials',
      ],
    },
  ]

  return (
    <div className="max-w-7xl mx-auto px-4 py-16">
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-12"
      >
        <h2 className="text-4xl font-extrabold text-foreground">
          Pricing Plans
        </h2>
        <p className="text-muted-foreground mt-2">
          Choose the plan that’s right for you and start your journey today.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {tiers.map((tier, index) => (
          <motion.div
            key={tier.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.2 }}
            className="relative"
          >
            <Card className="border-border bg-card hover:shadow-lg transition-shadow duration-200">
              <CardHeader>
                <CardTitle className="text-xl font-bold">
                  {tier.title}
                </CardTitle>
                <CardDescription className="text-muted-foreground">
                  {tier.price}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-4">
                  {tier.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-2">
                      <CheckCircle className="text-green-500 h-5 w-5" />
                      <span>{feature}</span>
                    </li>
                  ))}

                  {tier.unavailable?.map((feature) => (
                    <li key={feature} className="flex items-center gap-2">
                      <XCircle className="text-red-500 h-5 w-5" />
                      <span className="text-muted-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              <div className="p-4">
                <Button
                  className={`w-full ${
                    tier.title === 'Free Tier'
                      ? 'bg-muted text-muted-foreground'
                      : 'bg-primary text-primary-foreground'
                  }`}
                >
                  {tier.title === 'Free Tier' ? 'Get Started' : 'Upgrade Now'}
                </Button>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
