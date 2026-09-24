import { ImageResponse } from "next/og";

export const alt = "ConformeFR — Générateur de documents légaux pour sites web français";
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
          alignItems: "center",
          justifyContent: "center",
          background: "#101010",
          color: "#f5f5f5",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 14,
            border: "1px solid rgba(255,255,255,0.25)",
            borderRadius: 999,
            padding: "10px 28px",
            fontSize: 26,
            color: "#9db8a6",
            marginBottom: 44,
          }}
        >
          Loi LCEN &amp; RGPD — droit français
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 96,
            fontWeight: 700,
            letterSpacing: -2,
            marginBottom: 28,
          }}
        >
          ConformeFR
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 36,
            color: "rgba(245,245,245,0.65)",
            textAlign: "center",
            maxWidth: 900,
          }}
        >
          Mentions légales &amp; politique de confidentialité en 3 minutes
        </div>
        <div
          style={{
            display: "flex",
            position: "absolute",
            bottom: 48,
            fontSize: 26,
            color: "rgba(245,245,245,0.4)",
          }}
        >
          conformefr.com
        </div>
      </div>
    ),
    size
  );
}
