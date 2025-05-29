import React from "react";
import { QRCodeCanvas } from "qrcode.react";

export default function TicketQRCode({ value }) {
  return (
    <div className="flex flex-col items-center">
      <QRCodeCanvas value={value} size={128} />
    </div>
  );
}
