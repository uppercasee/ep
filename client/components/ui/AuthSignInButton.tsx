import { SignInButton } from "@clerk/nextjs";
import { Button } from "@mantine/core";

const AuthSignInButton = () => {
  return (
    <SignInButton>
      <Button variant="outline" size="xs">
        Log In
      </Button>
    </SignInButton>
  );
};

export default AuthSignInButton;
