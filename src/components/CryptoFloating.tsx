"use client";

import { motion } from "framer-motion";

const coins = [
  { name: "btc", x: 8, y: 18, delay: 0 },
  { name: "eth", x: 88, y: 20, delay: 0.4 },
  { name: "usdt", x: 18, y: 72, delay: 0.8 },
  { name: "sol", x: 78, y: 66, delay: 1.1 },
  { name: "arb", x: 42, y: 38, delay: 1.4 },
  { name: "egld", x: 63, y: 28, delay: 1.8 },
  { name: "fil", x: 30, y: 55, delay: 2.2 },
];

function CoinIcon({ name }: { name: string }) {
  return (
    <div className="flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-black/70 text-xl font-black text-green-400 shadow-lg shadow-green-500/20">
      {name === "btc" && "₿"}
      {name === "eth" && "Ξ"}
      {name === "usdt" && "₮"}
      {name === "sol" && "◎"}
      {name === "arb" && "⬡"}
      {name === "egld" && "✦"}
      {name === "fil" && "◇"}
    </div>
  );
}

export default function CryptoFloating() {
  return (
    <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
      {coins.map((coin, i) => (
        <motion.div
          key={`${coin.name}-${i}`}
          className="absolute opacity-20"
          style={{
            left: `${coin.x}%`,
            top: `${coin.y}%`,
          }}
          animate={{
            y: [0, -18, 0],
            rotate: [0, 8, -8, 0],
            scale: [1, 1.08, 1],
          }}
          transition={{
            duration: 5 + i,
            repeat: Infinity,
            ease: "easeInOut",
            delay: coin.delay,
          }}
        >
          <CoinIcon name={coin.name} />
        </motion.div>
      ))}
    </div>
  );
}