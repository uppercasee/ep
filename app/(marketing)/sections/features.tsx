'use client'
import { cn } from '@/lib/utils'
import { motion } from 'framer-motion'
import {
  BarChart,
  Gamepad,
  MessageSquare,
  Settings,
  Shield,
  Star,
  Trophy,
  Users,
} from 'lucide-react'

export default function Features() {
  const features = [
    {
      title: 'Engaging Game Mechanics',
      description:
        'Turn learning into a fun, competitive experience with achievements, points, and levels.',
      icon: <Gamepad />,
    },
    {
      title: 'Collaborative Learning Experience',
      description:
        'Work with classmates, join study groups, and tackle challenges together.',
      icon: <Users />,
    },
    {
      title: 'Rewards and Recognition',
      description:
        'Earn badges, rewards, and leaderboards to track your learning progress.',
      icon: <Star />,
    },
    {
      title: 'Leaderboards',
      description:
        'Compete with other learners and see your rank rise as you complete courses and challenges.',
      icon: <Trophy />,
    },
    {
      title: 'Progress Tracking',
      description:
        'Track your learning progress, milestones, and completion with detailed statistics.',
      icon: <BarChart />,
    },
    {
      title: 'Security and Privacy',
      description:
        'We prioritize your safety with a secure platform to protect your personal data.',
      icon: <Shield />,
    },
    {
      title: 'Customizable Settings',
      description:
        'Personalize your learning experience with adjustable themes, notifications, and more.',
      icon: <Settings />,
    },
    {
      title: '24/7 Support and Community',
      description:
        'Our community and support team are here to help you anytime, anywhere.',
      icon: <MessageSquare />,
    },
  ]

  return (
    <div className="relative z-10 py-10 max-w-7xl mx-auto">
      {/* Heading */}
      <motion.div
        className="text-center mb-8 px-4"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-3xl font-bold md:text-4xl lg:text-5xl text-foreground">
          Features
        </h2>
        <p className="text-muted-foreground mt-2 text-sm md:text-base">
          Explore the awesome features that make our platform stand out.
        </p>
      </motion.div>

      {/* Features Grid */}
      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 px-4"
        initial="hidden"
        animate="visible"
        variants={{
          hidden: { opacity: 0 },
          visible: { opacity: 1, transition: { staggerChildren: 0.2 } },
        }}
      >
        {features.map((feature, index) => (
          <motion.div
            key={feature.title}
            variants={{
              hidden: { opacity: 0, y: 50 },
              visible: { opacity: 1, y: 0 },
            }}
            transition={{ duration: 0.5 }}
          >
            <Feature {...feature} index={index} />
          </motion.div>
        ))}
      </motion.div>
    </div>
  )
}

const Feature = ({
  title,
  description,
  icon,
  index,
}: {
  title: string
  description: string
  icon: React.ReactNode
  index: number
}) => {
  return (
    <div
      className={cn(
        'flex flex-col lg:border-r  py-10 relative group/feature dark:border-neutral-800',
        (index === 0 || index === 4) && 'lg:border-l dark:border-neutral-800',
        index < 4 && 'lg:border-b dark:border-neutral-800'
      )}
    >
      {index < 4 && (
        <div className="opacity-0 group-hover/feature:opacity-100 transition duration-200 absolute inset-0 h-full w-full bg-gradient-to-t bg-card to-transparent pointer-events-none" />
      )}
      {index >= 4 && (
        <div className="opacity-0 group-hover/feature:opacity-100 transition duration-200 absolute inset-0 h-full w-full bg-gradient-to-b bg-card to-transparent pointer-events-none" />
      )}
      <div className="mb-4 relative z-10 px-10">{icon}</div>
      <div className="text-lg font-bold mb-2 relative z-10 px-10">
        <div className="absolute left-0 inset-y-0 h-6 group-hover/feature:h-8 w-1 rounded-tr-full rounded-br-full bg-muted group-hover/feature:bg-blue-500 transition-all duration-200 origin-center" />
        <span className="group-hover/feature:translate-x-2 transition duration-200 inline-block">
          {title}
        </span>
      </div>
      <p className="text-sm text-muted-foreground max-w-xs relative z-10 px-10">
        {description}
      </p>
    </div>
  )
}
