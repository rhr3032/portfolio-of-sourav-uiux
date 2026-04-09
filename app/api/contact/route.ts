import { NextResponse } from 'next/server'
import { readFile } from 'node:fs/promises'
import path from 'node:path'

interface ContactPayload {
  name?: string
  email?: string
  subject?: string
  message?: string
}

function parseEnvLine(rawLine: string): { key: string; value: string } | null {
  const line = rawLine.trim()

  if (!line || line.startsWith('#')) {
    return null
  }

  const separatorIndex = line.indexOf('=')

  if (separatorIndex === -1) {
    return null
  }

  const key = line.slice(0, separatorIndex).trim()
  const rawValue = line.slice(separatorIndex + 1).trim()
  const value = rawValue.replace(/^['\"]|['\"]$/g, '')

  if (!key) {
    return null
  }

  return { key, value }
}

async function readKeyFromEnvFiles() {
  const envPaths = [path.join(process.cwd(), '.env.local'), path.join(process.cwd(), '.env')]

  for (const envPath of envPaths) {
    try {
      const content = await readFile(envPath, 'utf8')
      const lines = content.split(/\r?\n/)

      for (const line of lines) {
        const parsed = parseEnvLine(line)

        if (!parsed) {
          continue
        }

        if (parsed.key === 'WEB3FORMS_ACCESS_KEY' || parsed.key === 'NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY') {
          return parsed.value
        }
      }
    } catch {
      // Ignore missing env files and continue to the next one.
    }
  }

  return undefined
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as ContactPayload
    const { name, email, subject, message } = body

    if (!name || !email || !subject || !message) {
      return NextResponse.json({ success: false, message: 'All fields are required.' }, { status: 400 })
    }

    const accessKey =
      process.env.WEB3FORMS_ACCESS_KEY ?? process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY ?? (await readKeyFromEnvFiles())

    if (!accessKey) {
      return NextResponse.json(
        {
          success: false,
          message: 'Web3Forms key is missing. Add WEB3FORMS_ACCESS_KEY or NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY.',
        },
        { status: 500 }
      )
    }

    const web3formsResponse = await fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        access_key: accessKey,
        name,
        email,
        subject,
        message,
        from_name: name,
      }),
    })

    const web3formsResult = await web3formsResponse.json()

    if (!web3formsResponse.ok || !web3formsResult.success) {
      return NextResponse.json(
        {
          success: false,
          message: web3formsResult.message || 'Something went wrong while sending your message.',
        },
        { status: 400 }
      )
    }

    return NextResponse.json({ success: true, message: 'Message sent successfully.' })
  } catch {
    return NextResponse.json({ success: false, message: 'Unable to send message right now.' }, { status: 500 })
  }
}
