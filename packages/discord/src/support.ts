import nacl from 'tweetnacl'

export async function verifyEvent(event) {
  const signature = event.headers['X-Signature-Ed25519'.toLowerCase()]
  const timestamp = event.headers['X-Signature-Timestamp'.toLowerCase()]
  const body = JSON.stringify(event.body)
  if (!signature || !timestamp || !body) return false
  const isVerified = nacl.sign.detached.verify(
    Buffer.from(timestamp + body),
    Buffer.from(signature, 'hex'),
    Buffer.from(process.env.DISCORD_PUBLIC_KEY as string, 'hex')
  )
  return isVerified
}

export function generateResponse(content, embeds?) {
  return {
    tts: false,
    content,
    embeds,
    allowed_mentions: [],
  }
}
