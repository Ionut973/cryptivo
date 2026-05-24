import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendOrderEmail(
  to: string,
  orderId: string,
  total: number
) {
  if (!process.env.RESEND_API_KEY) {
    console.log("Resend not configured");
    return;
  }

  await resend.emails.send({
    from: process.env.EMAIL_FROM || "Cryptivo <onboarding@resend.dev>",
    to,
    subject: "Your Cryptivo order was created",
    html: `
      <div style="background:#09090b;padding:40px;font-family:Arial;color:white">
        <h1 style="font-size:32px;color:#a3ff5f">Order created</h1>

        <p style="margin-top:20px;font-size:16px">
          Your order
          <strong>#${orderId.slice(0, 8)}</strong>
          was created successfully.
        </p>

        <div
          style="
            margin-top:25px;
            padding:20px;
            border-radius:16px;
            background:#18181b;
            border:1px solid #27272a;
          "
        >
          <p style="font-size:14px;color:#a1a1aa">
            TOTAL
          </p>

          <p style="font-size:36px;font-weight:900;color:#a3ff5f">
            $${total}
          </p>
        </div>

        <p style="margin-top:30px;color:#71717a">
          Cryptivo Store
        </p>
      </div>
    `,
  });
}

export async function sendCampaignEmail(
  to: string,
  title: string,
  message: string
) {
  if (!process.env.RESEND_API_KEY) {
    console.log("Resend not configured");
    return;
  }

  await resend.emails.send({
    from: process.env.EMAIL_FROM || "Cryptivo <onboarding@resend.dev>",
    to,
    subject: title,
    html: `
      <div style="background:#09090b;padding:40px;font-family:Arial;color:white">
        <h1 style="font-size:32px;color:#a3ff5f">
          ${title}
        </h1>

        <div
          style="
            margin-top:25px;
            padding:20px;
            border-radius:16px;
            background:#18181b;
            border:1px solid #27272a;
            line-height:1.8;
            color:#e4e4e7;
          "
        >
          ${message}
        </div>

        <p style="margin-top:30px;color:#71717a">
          Cryptivo Store
        </p>
      </div>
    `,
  });
}

export async function sendVerificationCodeEmail(
  to: string,
  code: string
) {
  if (!process.env.RESEND_API_KEY) {
    console.log("Resend not configured");
    return;
  }

  await resend.emails.send({
    from: process.env.EMAIL_FROM || "Cryptivo <onboarding@resend.dev>",
    to,
    subject: "Your Cryptivo verification code",
    html: `
      <div style="background:#09090b;padding:40px;font-family:Arial;color:white">
        <p
          style="
            font-size:12px;
            letter-spacing:4px;
            color:#a3ff5f;
            text-transform:uppercase;
          "
        >
          CRYPTIVO SECURITY
        </p>

        <h1 style="font-size:34px;margin-top:15px">
          Verification code
        </h1>

        <div
          style="
            margin-top:30px;
            border-radius:20px;
            padding:30px;
            background:#18181b;
            border:1px solid #27272a;
            text-align:center;
          "
        >
          <div
            style="
              font-size:52px;
              font-weight:900;
              letter-spacing:12px;
              color:#a3ff5f;
            "
          >
            ${code}
          </div>
        </div>

        <p style="margin-top:25px;color:#71717a">
          This code expires in 10 minutes.
        </p>

        <p style="margin-top:40px;color:#52525b">
          Cryptivo Store
        </p>
      </div>
    `,
  });
}