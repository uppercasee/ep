import React from "react";
import { Box, Flex } from "@mantine/core";
import Navlinks from "./navlinks";
import SearchBox from "../ui/searchbox";

const Navbar = () => {
  return (
    <Box component="nav" px="lg" py="sm">
      <Flex align={"center"} justify={"space-between"}>
        <Box component="div" className="font-bold" aria-label="Brand">
          Study with us
        </Box>

        <SearchBox />

        <Navlinks />
      </Flex>
    </Box>
  );
};

export default Navbar;
