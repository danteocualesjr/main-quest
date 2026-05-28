import { ImageResponse } from "next/og";

export const alt = "Main Quest — Pick your next move with clarity";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#F3EDE4",
          padding: "72px 80px",
          fontFamily: "Georgia, 'Times New Roman', serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <div
            style={{
              width: 64,
              height: 64,
              borderRadius: 16,
              background: "#1C1917",
              color: "#FFFCF8",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 40,
              fontWeight: 600,
            }}
          >
            M
          </div>
          <div
            style={{
              fontSize: 30,
              fontWeight: 600,
              color: "#1C1917",
            }}
          >
            Main Quest
          </div>
          <div
            style={{
              marginLeft: 8,
              fontSize: 18,
              letterSpacing: 4,
              textTransform: "uppercase",
              color: "#78716C",
              fontFamily: "monospace",
            }}
          >
            Pick your path
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
          <div
            style={{
              fontSize: 88,
              lineHeight: 1.02,
              color: "#1C1917",
              letterSpacing: -2,
              display: "flex",
              flexWrap: "wrap",
            }}
          >
            <span>Pick your&nbsp;</span>
            <span style={{ color: "#C83C1A", fontStyle: "italic" }}>next move</span>
            <span>&nbsp;with clarity.</span>
          </div>
          <div
            style={{
              fontSize: 30,
              lineHeight: 1.45,
              color: "#44403C",
              maxWidth: 880,
              fontFamily: "Arial, sans-serif",
            }}
          >
            An honest career guide for US students — matched careers, roadmaps to
            dream jobs, and real salary data.
          </div>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 16,
            fontSize: 22,
            fontFamily: "monospace",
            textTransform: "uppercase",
            letterSpacing: 3,
            color: "#78716C",
          }}
        >
          <div style={{ width: 48, height: 4, background: "#C83C1A", borderRadius: 9999 }} />
          <span>Discover · Path · Explore</span>
        </div>
      </div>
    ),
    { ...size }
  );
}
