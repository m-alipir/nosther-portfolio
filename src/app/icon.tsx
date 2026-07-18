import { ImageResponse } from "next/og";

export const size = { height: 64, width: 64 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          alignItems: "center",
          background: "#0a0a0b",
          color: "#f1eee8",
          display: "flex",
          fontFamily: "Arial, sans-serif",
          fontSize: 48,
          fontWeight: 800,
          height: "100%",
          justifyContent: "center",
          letterSpacing: "-0.08em",
          width: "100%",
        }}
      >
        A
        <span
          style={{
            background: "#c55252",
            bottom: 6,
            display: "flex",
            height: 5,
            position: "absolute",
            right: 6,
            width: 18,
          }}
        />
      </div>
    ),
    size,
  );
}
