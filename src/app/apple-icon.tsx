import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#1C1917",
          position: "relative",
        }}
      >
        <div
          style={{
            fontFamily: "Georgia, 'Times New Roman', serif",
            fontSize: 116,
            fontWeight: 600,
            color: "#FFFCF8",
            lineHeight: 1,
          }}
        >
          M
        </div>
        <div
          style={{
            position: "absolute",
            top: 38,
            right: 40,
            width: 18,
            height: 18,
            borderRadius: 9999,
            background: "#C83C1A",
          }}
        />
      </div>
    ),
    { ...size }
  );
}
