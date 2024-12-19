"use client";

import { SignedIn, SignedOut, SignInButton, SignOutButton, SignUpButton } from "@clerk/nextjs";
import { Burger, Menu } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import React from "react";

const Navmenu = () => {
  const [opened, { toggle }] = useDisclosure();

  return (
    <Menu opened={opened} onClose={() => toggle()} withinPortal>
      <Menu.Target>
        <Burger
          aria-label="Toggle navigation"
          lineSize={2}
          opened={opened}
          onClick={toggle}
          size="sm"
        />
      </Menu.Target>
      <Menu.Dropdown>
        <Menu.Item onClick={toggle}>Home</Menu.Item>
        <Menu.Item onClick={toggle}>Courses</Menu.Item>
        <Menu.Item onClick={toggle}>Leaderboard</Menu.Item>
        <Menu.Divider />
        <Menu.Item>
          <SignedOut>
            <div className="px-4 py-1.5 bg-blue-500 text-white text-center rounded">
              <SignInButton />
            </div>
          </SignedOut>
          <SignedIn>
            <div className="px-4 py-1.5 border border-blue-500 text-blue-500 text-center rounded">
              <SignOutButton />
            </div>
          </SignedIn>
        </Menu.Item>
        <Menu.Item>
          <SignedOut>
            <div className="px-4 py-1.5 border border-blue-500 text-blue-500 text-center rounded">
              <SignUpButton />
            </div>
          </SignedOut>
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
};

export default Navmenu;
