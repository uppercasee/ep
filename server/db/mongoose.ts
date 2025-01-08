'use server'
import { env } from '@/lib/data/env/server'
import mongoose from 'mongoose'
import type { ConnectOptions } from 'mongoose'

const MONGODB_URI = env.MONGODB_URI

if (!MONGODB_URI) {
  throw new Error('Please define the MONGODB_URI environment variable')
}

let isConnected = false

async function connectToDatabase() {
  if (isConnected) {
    console.log('Using existing database connection')
    return
  }

  try {
    await mongoose.connect(MONGODB_URI, {} as ConnectOptions)
    isConnected = true
    console.log('MongoDB connected')
  } catch (error) {
    console.error('Error connecting to MongoDB:', error)
  }
}

export default connectToDatabase
