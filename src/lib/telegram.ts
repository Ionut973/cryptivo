export async function sendTelegramMessage(message: string) {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_ADMIN_CHAT_ID;
  console.log("TG TOKEN:", token ? "YES" : "NO");
  console.log("TG CHAT:", chatId);
  console.log("TG TOKEN:", token ? "YES" : "NO");
  console.log("TG CHAT:", chatId);
  

  if (!token || !chatId) {
    console.log("Telegram not configured");
    return;
  }

  await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      chat_id: chatId,
      text: message,
    }),
  });
}