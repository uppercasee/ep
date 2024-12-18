import React from "react";
import { Group, Box } from "@mantine/core";
import Navlinks from "./navlinks";
import SearchBox from "../ui/searchbox";

const Navbar = () => {
  return (
    <Box component="nav" px="lg" py="sm">
      <Group justify="space-between" align="center">
        <Box component="div" className="font-bold" aria-label="Brand">
          Study with us
        </Box>

        <SearchBox />

        <Navlinks />
      </Group>
    </Box>
  );
};

export default Navbar;
