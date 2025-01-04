import { Webhook } from 'svix'
import { headers } from 'next/headers'
import { WebhookEvent } from '@clerk/nextjs/server'
import { env } from '@/data/env/server'
import { NextResponse } from 'next/server'
import { createUser } from '@/server-actions/user/createUser'

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
        await createUser(id)
      } catch (err) {
        console.error('Error creating user:', err)
        return new NextResponse('Error occurred while creating user', {
          status: 500,
        })
      }
      break
    }
    case 'user.deleted': {
      if (event.data.id != null) {
        console.log('Webhooks: User Deleted!!!!')
      }
    }
  }

  return new Response('', { status: 200 })
}
