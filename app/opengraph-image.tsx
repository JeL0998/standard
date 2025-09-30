import { ImageResponse } from "next/og";
export const runtime = "edge";
export const alt = "Azure Cove — Beach Resort";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export default function () {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #06b6d4, #22d3ee)",
          color: "white",
          fontSize: 72,
          fontWeight: 800,
        }}
      >
        Azure Cove
      </div>
    ),
    { ...size }
  );
}
