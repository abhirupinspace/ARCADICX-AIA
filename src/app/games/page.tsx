"use client";

import { motion } from "framer-motion";
import React from "react";
import { AuroraBackground } from "../../components/ui/aurora-background";
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
        <Link href="/games/othello">Play Othello</Link>
      </motion.div>
    </AuroraBackground>
  );
}


