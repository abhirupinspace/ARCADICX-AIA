"use client";

import { motion } from "framer-motion";
import React from "react";
import { AuroraBackground } from "../components/ui/aurora-background";
import { ConnectButton } from "thirdweb/react";
import { client } from "./client";
import Link from "next/link";

export default function Page() {
  return (
    <AuroraBackground>
      <motion.div
        initial={{ opacity: 0.0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{
          delay: 0.3,
          duration: 0.8,
          ease: "easeInOut",
        }}
        className="relative flex flex-col gap-4 items-center justify-center px-4"
      >
        <div className="text-6xl md:text-8xl font-bold dark:text-white text-center">
          Arcadix on AIA!
        </div>
        <div className="font-extralight text-base md:text-4xl dark:text-neutral-200 py-4">
          Start playing now by entering the arena.
        </div>
        <div className="flex flex-row gap-2">
        <Link className="bg-black dark:bg-white rounded-xl w-fit text-white dark:text-black px-8 py-3" href="./arena">
          Enter Arena
        </Link>
          <ConnectButton
          client={client}
          theme={"light"}
          ></ConnectButton>
        </div>
      </motion.div>
    </AuroraBackground>
  );
}


