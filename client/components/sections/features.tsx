import { Card, Text, Group } from '@mantine/core'
import React from 'react'

const features = [
  {
    title: 'Earn Rewards',
    content:
      'Gain points, badges, and certificates as you complete lessons and progress through your courses!',
  },
  {
    title: 'Learn with Fun',
    content:
      'Our interactive quizzes and challenges keep you engaged while you learn new skills.',
  },
  {
    title: 'Track Your Progress',
    content:
      'Monitor your learning journey with personalized progress tracking and performance analytics.',
  },
  {
    title: 'Track Your Progress',
    content:
      'Monitor your learning journey with personalized progress tracking and performance analytics.',
  },
]

const Features = () => {
  return (
    <div className='h-screen md:h-auto'>
      <div className=" my-4 flex items-center justify-center">
        <h2 className="text-4xl font-extrabold leading-tight text-white">
          Features
        </h2>{' '}
      </div>
      <div className="mx-16 my-2 flex h-auto flex-col gap-8 md:flex-row">
        {features.map((features, index) => (
          <Card
            key={index}
            shadow="xl"
            radius="md"
            className="transition-all duration-300 hover:scale-105 hover:border hover:border-gray-300"
          >
            <Group justify="space-between" mt="md" mb="xs">
              <Text fw={500}>{features.title}</Text>
            </Group>
            <Text size="sm" c="dimmed">
              {features.content}
            </Text>
          </Card>
        ))}
      </div>
    </div>
  )
}

export default Features
