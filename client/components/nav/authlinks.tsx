"use client";

import { SignedIn, SignedOut, useAuth, UserButton } from "@clerk/nextjs";
import { Skeleton } from "@mantine/core";
import AuthSignInButton from "../ui/AuthSignInButton";

const AuthLinks = () => {
  const { isLoaded } = useAuth();

  if (!isLoaded) {
    return <Skeleton height={30} width={30} radius="xl" visible />;
  }

  return (
    <div>
      <SignedOut>
        <AuthSignInButton />
      </SignedOut>

      <SignedIn>
        <UserButton />
      </SignedIn>
    </div>
  );
};

export default AuthLinks;
