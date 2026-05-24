export default function AuthCryptoBackground() {
  const coins = [
    "₿ BTC", "Ξ ETH", "₮ USDT", "◎ SOL", "BNB", "XRP", "TON",
    "ADA", "AVAX", "DOT", "MATIC", "ARB", "EGLD", "FIL", "DOGE",
  ];

  return (
    <>
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(132,255,77,0.16),transparent_35%),radial-gradient(circle_at_bottom_right,rgba(59,130,246,0.14),transparent_35%)]" />

      {coins.map((coin, i) => (
        <div
          key={coin}
          className="pointer-events-none absolute rounded-xl border border-green-400/10 bg-white/5 px-3 py-2 text-xs font-black text-green-300/40 backdrop-blur-xl"
          style={{
            left: `${5 + ((i * 17) % 85)}%`,
            top: `${8 + ((i * 23) % 80)}%`,
            animation: `authFloat ${3 + (i % 6)}s ease-in-out infinite`,
          }}
        >
          {coin}
        </div>
      ))}

      <style>
        {`
          @keyframes authFloat {
            0%, 100% { transform: translateY(0) rotate(0deg); opacity: .35; }
            50% { transform: translateY(-22px) rotate(7deg); opacity: .85; }
          }
        `}
      </style>
    </>
  );
}