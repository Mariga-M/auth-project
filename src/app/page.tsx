import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col items-center">
      <h1 className="text-4xl p-4 uppercase">
        Welcome 👋
      </h1>
      <Link className={buttonVariants()} href='/admin'> Open My Admin</Link>
      <p className="mt-10"> Feel free play around 😊 </p>
    </div>

  )
}
