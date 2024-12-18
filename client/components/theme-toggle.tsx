"use client";

import { Moon, Sun } from "lucide-react";
import {
  ActionIcon,
  useComputedColorScheme,
  useMantineColorScheme,
} from "@mantine/core";
import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const { setColorScheme } = useMantineColorScheme({
    keepTransitions: true,
  });
  const computedColorScheme = useComputedColorScheme("dark");
  const [mounted, setMounted] = useState(false);

  const handleToggle = () => {
    setColorScheme(computedColorScheme === "dark" ? "light" : "dark");
  };

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <ActionIcon
      variant="light"
      color="gray"
      radius={"lg"}
      size={"lg"}
      onClick={handleToggle}
      className="relative flex items-center justify-center p-2 rounded-full"
    >
      <Sun
        className={`h-[1.2rem] w-[1.2rem] transition-all ${computedColorScheme === "dark" ? "opacity-0" : "opacity-100"}`}
      />
      <Moon
        className={`absolute h-[1.2rem] w-[1.2rem] transition-all ${computedColorScheme === "dark" ? "opacity-100" : "opacity-0"}`}
      />
      <span className="sr-only">Toggle theme</span>
    </ActionIcon>
  );
}
