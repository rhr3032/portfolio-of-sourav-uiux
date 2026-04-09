import { NextResponse } from 'next/server'

interface ContactPayload {
  name?: string
  email?: string
  subject?: string
  message?: string
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as ContactPayload
    const { name, email, subject, message } = body

    if (!name || !email || !subject || !message) {
      return NextResponse.json({ success: false, message: 'All fields are required.' }, { status: 400 })
    }

    const accessKey = process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY

    if (!accessKey) {
      console.error('Web3Forms access key is missing')
      return NextResponse.json(
        {
          success: false,
          message: 'Web3Forms configuration is incomplete. Please check the environment variables.',
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
      console.error('Web3Forms error:', web3formsResult)
      return NextResponse.json(
        {
          success: false,
          message: web3formsResult.message || 'Something went wrong while sending your message.',
        },
        { status: 400 }
      )
    }

    return NextResponse.json({ success: true, message: 'Message sent successfully.' })
  } catch (error) {
    console.error('Contact form error:', error)
    return NextResponse.json({ success: false, message: 'Unable to send message right now.' }, { status: 500 })
  }
}
