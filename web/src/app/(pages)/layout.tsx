import { getSession } from '@auth0/nextjs-auth0'
import { redirect } from 'next/navigation'
import type { ReactNode } from 'react'

export default async function Layout({
  children,
}: Readonly<{
  children: ReactNode
}>) {
  const session = await getSession()

  if (!session) {
    return redirect('/api/auth/login')
  }

  return <div>{children}</div>
}
