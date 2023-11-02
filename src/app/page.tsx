import User from "@/components/User";
import { buttonVariants } from "@/components/ui/button";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import Link from "next/link";

export default async function Home() {

  const session = await getServerSession(authOptions)

  return (
    <div className="flex flex-col items-center">
      <h1 className="text-4xl p-4 uppercase">
        Welcome 👋
      </h1>
      <Link className={buttonVariants()} href='/admin'> Open My Admin</Link>
      <p className="mt-10"> Feel free play around 😊 </p>

      {/* Get Client session and server session
      <h2> Client Session</h2>
      <User />
      <h2> Server Session</h2>
      {JSON.stringify(session)} */}


    </div>

  )
}
