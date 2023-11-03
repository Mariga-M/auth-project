import { FC, ReactNode } from "react"
import { Button } from "./ui/button"
import { useToast } from "@/components/ui/use-toast"

interface GoogleSignInButtonProps {
    children: ReactNode
}

const GoogleSignInButton: FC<GoogleSignInButtonProps> = ({ children }) => {
    const { toast } = useToast()

    const loginWithGoogle = () => {
        toast({
            title: "More Information 😃",
            description: "Work in Progress",
            variant: 'default'
        })
    }

    return (
        <Button onClick={loginWithGoogle} className="w-full">
            {children}
        </Button>
    )
}

export default GoogleSignInButton