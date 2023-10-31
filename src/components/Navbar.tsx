import Link from "next/link"
import { buttonVariants } from "./ui/button"
import { Gem } from "lucide-react"

const Navbar = () => {
  return (
    <div className="bg-purple-300 py-2 border-b border-s border-purple-200 fixed w-full z-10 top-0">
        <div className="container flex items-center justify-between">
            <Link href="/"> 
                <Gem />
            </Link>
            <Link className={buttonVariants()} href= "/sign-in"> Sign in</Link>
        </div>
    </div>
  )
}

export default Navbar