import { env } from '@/data/env/server'
import {
  createUserAction,
  deleteUserAction,
} from '@/server/actions/userActions'
import type { WebhookEvent } from '@clerk/nextjs/server'
import { headers } from 'next/headers'
import { NextResponse } from 'next/server'
import { Webhook } from 'svix'

export async function POST(req: Request) {
  const headerPayload = await headers()
  const svixId = headerPayload.get('svix-id')
  const svixTimestamp = headerPayload.get('svix-timestamp')
  const svixSignature = headerPayload.get('svix-signature')

  if (!svixId || !svixTimestamp || !svixSignature) {
    return new Response('Error occurred -- no svix headers', {
      status: 400,
    })
  }

  const payload = await req.json()
  const body = JSON.stringify(payload)

  const wh = new Webhook(env.CLERK_WEBHOOK_SECRET)
  let event: WebhookEvent

  try {
    event = wh.verify(body, {
      'svix-id': svixId,
      'svix-timestamp': svixTimestamp,
      'svix-signature': svixSignature,
    }) as WebhookEvent
  } catch (err) {
    console.error('Error verifying webhook:', err)
    return new Response('Error occurred', {
      status: 400,
    })
  }

  switch (event.type) {
    case 'user.created': {
      const { id } = event.data
      try {
        await createUserAction(id)
        console.log(`User with ID: ${id} created successfully.`)
      } catch (err) {
        console.error('Error creating user:', err)
        return new NextResponse('Error occurred while creating user', {
          status: 500,
        })
      }
      break
    }
    case 'user.deleted': {
      const { id } = event.data
      try {
        await deleteUserAction(id as string)
        console.log(`User with ID: ${id} deleted successfully.`)
      } catch (err) {
        console.error('Error deleting user:', err)
        return new NextResponse('Error occurred while deleting user', {
          status: 500,
        })
      }
    }
  }

  return new Response('', { status: 200 })
}
