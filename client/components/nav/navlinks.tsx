import React from "react";
import { Anchor, Box, Button, Group } from "@mantine/core";
import ThemeToggle from "../theme-toggle";
import Navmenu from "./navmenu";

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
        <Button radius="sm">Sign In</Button>
      </Group>

      {/* Mobile Navigation */}
      <Box hiddenFrom="sm">
        <Navmenu />
      </Box>
    </Group>
  );
};

export default Navlinks;
