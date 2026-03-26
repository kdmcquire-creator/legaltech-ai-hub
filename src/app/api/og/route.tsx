import { ImageResponse } from "next/og";
import { NextRequest } from "next/server";

const WIDTH = 1200;
const HEIGHT = 630;

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;

  const title = searchParams.get("title") || "Legaltech AI Hub";
  const type = searchParams.get("type") || "home";
  const subtitle =
    searchParams.get("subtitle") ||
    (type === "home"
      ? "AI-powered tools and solutions for legal professionals"
      : null);
  const category = searchParams.get("category") || null;

  return new ImageResponse(
    (
      <div
        style={{
          width: WIDTH,
          height: HEIGHT,
          display: "flex",
          flexDirection: "column",
          background: "linear-gradient(135deg, #475569 0%, #2563eb 100%)",
          padding: "56px 72px",
          fontFamily: "system-ui, -apple-system, sans-serif",
          position: "relative",
        }}
      >
        {/* Subtle background texture — decorative circles */}
        <div
          style={{
            position: "absolute",
            top: -120,
            right: -120,
            width: 480,
            height: 480,
            borderRadius: "50%",
            background: "rgba(255,255,255,0.05)",
            display: "flex",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: -80,
            left: -80,
            width: 320,
            height: 320,
            borderRadius: "50%",
            background: "rgba(255,255,255,0.05)",
            display: "flex",
          }}
        />

        {/* Brand name — top left */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 12,
            marginBottom: "auto",
          }}
        >
          <div
            style={{
              width: 40,
              height: 40,
              borderRadius: 10,
              background: "rgba(255,255,255,0.2)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 22,
              color: "#ffffff",
            }}
          >
            {"&#9878;"}
          </div>
          <span
            style={{
              color: "#ffffff",
              fontSize: 22,
              fontWeight: 600,
              letterSpacing: "-0.02em",
              opacity: 0.9,
            }}
          >
            Legaltech AI Hub
          </span>
        </div>

        {/* Center content */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            flex: 1,
            gap: 20,
          }}
        >
          {/* Type badge */}
          {type !== "home" && (
            <div
              style={{
                display: "flex",
              }}
            >
              <span
                style={{
                  color: "rgba(255,255,255,0.75)",
                  fontSize: 18,
                  fontWeight: 500,
                  textTransform: "uppercase",
                  letterSpacing: "0.1em",
                }}
              >
                {type === "tool"
                  ? "Tool Review"
                  : type === "guide"
                  ? "Guide"
                  : type === "case-study"
                  ? "Case Study"
                  : type === "review"
                  ? "Review"
                  : type === "category"
                  ? "Category"
                  : ""}
              </span>
            </div>
          )}

          {/* Main title */}
          <div
            style={{
              display: "flex",
              color: "#ffffff",
              fontSize: title.length > 50 ? 48 : title.length > 30 ? 58 : 68,
              fontWeight: 800,
              lineHeight: 1.1,
              letterSpacing: "-0.03em",
              maxWidth: 960,
            }}
          >
            {title}
          </div>

          {/* Subtitle */}
          {subtitle && (
            <div
              style={{
                display: "flex",
                color: "rgba(255,255,255,0.75)",
                fontSize: 26,
                fontWeight: 400,
                lineHeight: 1.4,
                maxWidth: 800,
              }}
            >
              {subtitle}
            </div>
          )}
        </div>

        {/* Bottom row */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginTop: 40,
          }}
        >
          {/* Category pill */}
          {category ? (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                background: "rgba(255,255,255,0.15)",
                border: "1px solid rgba(255,255,255,0.25)",
                borderRadius: 100,
                paddingTop: 8,
                paddingBottom: 8,
                paddingLeft: 20,
                paddingRight: 20,
                color: "#ffffff",
                fontSize: 18,
                fontWeight: 500,
              }}
            >
              {category}
            </div>
          ) : (
            <div style={{ display: "flex" }} />
          )}

          {/* Domain */}
          <span
            style={{
              color: "rgba(255,255,255,0.6)",
              fontSize: 18,
              fontWeight: 400,
            }}
          >
            legaltech-ai-hub.com
          </span>
        </div>
      </div>
    ),
    {
      width: WIDTH,
      height: HEIGHT,
    }
  );
}
