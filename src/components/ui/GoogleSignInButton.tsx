import { FC, ReactNode } from "react"
import { Button } from "./button";



interface GoogleSignInButtonProps {
 children: ReactNode;
}

const GoogleSignInButton: FC<GoogleSignInButtonProps> = ({children}) => {
    const logInWithGoogle = () => {
        console.log('Login with google')
    }

  return (
    <div>
        <Button onClick={logInWithGoogle} className="w-full">
        {children}
        </Button>
    </div>
  )
}

export default GoogleSignInButton

