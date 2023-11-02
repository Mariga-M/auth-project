import { authOptions } from "@/lib/auth"
import { getServerSession } from "next-auth"

const page = async () => {

    const session = await getServerSession(authOptions);

    if (session?.user) {
        return (
            <div className="flex flex-col items-center">
                <h1 className="text-4xl uppercase">
                    Welcome to Admin Panel, {session?.user.username} 👋
                </h1>
            </div>
        )
    }

    return (
        <div className="flex flex-col items-center">
            <h2 className="text-4xl ">
                Please sign in to see the admin page 🙂
            </h2>
        </div>
    )
}

export default page