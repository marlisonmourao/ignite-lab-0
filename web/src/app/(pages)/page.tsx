import { getSession } from '@auth0/nextjs-auth0'

export default async function Home() {
  const user = await getSession()

  return (
    <div className="flex-1">
      <h1 className="text-6xl">hello World</h1>

      <a href="/api/auth/login" className="w-full h-6 bg-pink-600 text-white">
        Login
      </a>

      <pre>{JSON.stringify(user, null, 2)}</pre>

      <a
        href="/api/auth/logout"
        className="
        w-full h-6 bg-pink-600 text-white
      "
      >
        logout
      </a>
    </div>
  )
}
