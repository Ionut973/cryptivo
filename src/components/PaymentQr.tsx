"use client";

import { QRCodeCanvas } from "qrcode.react";

export default function PaymentQr({ address }: { address: string }) {
  return (
    <div className="rounded-2xl bg-white p-4">
      <QRCodeCanvas value={address} size={220} />
    </div>
  );
}