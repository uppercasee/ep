import React from "react";
import { Anchor, Box, Button, Group } from "@mantine/core";
import ThemeToggle from "../theme-toggle";
import Navmenu from "./navmenu";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignUpButton,
  UserButton,
} from "@clerk/nextjs";

const Navlinks = () => {
  return (
    <Group justify="flex-end" gap="lg">
      <ThemeToggle />
      {/* Desktop Navigation */}
      <Group visibleFrom="sm" gap="lg" align="center">
        <Anchor href="#" size="sm" underline={"hover"}>
          Home
        </Anchor>
        <Anchor href="/courses" size="sm" underline={"hover"}>
          Courses
        </Anchor>
        <Anchor href="/leaderboard" size="sm" underline={"hover"}>
          Leaderboard
        </Anchor>
        <SignedOut>
          <div className="px-4 py-1.5 bg-blue-500 text-white text-center rounded">
            <SignInButton />
          </div>
          <div className="px-4 py-1.5 border border-blue-500 text-blue-500 text-center rounded">
            <SignUpButton />
          </div>
        </SignedOut>
        <SignedIn>
          <UserButton />
        </SignedIn>
      </Group>

      {/* Mobile Navigation */}
      <Box hiddenFrom="sm">
        <Navmenu />
      </Box>
    </Group>
  );
};

export default Navlinks;
