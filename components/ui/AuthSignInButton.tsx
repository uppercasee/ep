import { SignInButton } from '@clerk/nextjs'
import { Button } from './button'

const AuthSignInButton = () => {
  return (
    <SignInButton>
      <Button variant="default" size="sm">
        Log In
      </Button>
    </SignInButton>
  )
}

export default AuthSignInButton
