import React from "react";

export default function AnimatedMicroscopeLoading() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        backgroundColor: "#F4FFE1",
      }}
    >
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Nunito:wght@600;700&display=swap');

          @keyframes floatArm {
            0%, 100% {
              transform: translate(0px, 0px);
            }
            50% {
              transform: translate(-2px, -4px);
            }
          }

          @keyframes floatEyepiece {
            0%, 100% {
              transform: translate(0px, 0px);
            }
            50% {
              transform: translate(2px, -3px);
            }
          }

          @keyframes floatObjectives {
            0%, 100% {
              transform: translateY(0px);
            }
            50% {
              transform: translateY(3px);
            }
          }

          @keyframes floatStage {
            0%, 100% {
              transform: translateX(0px);
            }
            50% {
              transform: translateX(2px);
            }
          }

          @keyframes pulseKnob {
            0%, 100% {
              transform: scale(1);
            }
            50% {
              transform: scale(1.06);
            }
          }

          @keyframes baseBounce {
            0%, 100% {
              transform: translateY(0px);
            }
            50% {
              transform: translateY(1px);
            }
          }

          @keyframes loadingDots {
            0%, 20% {
              content: "";
            }
            40% {
              content: ".";
            }
            60% {
              content: "..";
            }
            80%, 100% {
              content: "...";
            }
          }

          .base {
            animation: baseBounce 2.4s ease-in-out infinite;
            transform-origin: center;
            filter: drop-shadow(0 2px 8px rgba(110, 165, 108, 0.18));
          }

          .arm {
            animation: floatArm 2.5s ease-in-out infinite;
            transform-origin: center;
            filter: drop-shadow(0 2px 8px rgba(110, 165, 108, 0.18));
          }

          .eyepiece {
            animation: floatEyepiece 2.2s ease-in-out infinite;
            transform-origin: center;
            filter: drop-shadow(0 2px 8px rgba(110, 165, 108, 0.18));
          }

          .objectives {
            animation: floatObjectives 1.8s ease-in-out infinite;
            filter: drop-shadow(0 2px 8px rgba(110, 165, 108, 0.18));
          }

          .stage {
            animation: floatStage 2s ease-in-out infinite;
            filter: drop-shadow(0 2px 8px rgba(110, 165, 108, 0.18));
          }

          .knob {
            animation: pulseKnob 1.6s ease-in-out infinite;
            transform-origin: center;
            filter: drop-shadow(0 2px 8px rgba(110, 165, 108, 0.18));
          }

          .loading {
            margin-top: 12px;
            font-size: 24px;
            font-weight: 700;
            font-family: 'Nunito', sans-serif;
            color: #2D5016;
            letter-spacing: 0.75px;
          }

          .loading::after {
            display: inline-block;
            width: 24px;
            text-align: left;
            animation: loadingDots 1.5s steps(4) infinite;
            content: "";
          }
        `}
      </style>

      <svg
        width="400"
        height="400"
        viewBox="0 0 400 400"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Base */}
        <g className="base">
          <rect
            x="110"
            y="320"
            width="180"
            height="30"
            rx="10"
            fill="#6EA56C"
          />
        </g>

        {/* Arm */}
        <g className="arm">
          <path
            d="
              M140 300
              Q130 180 210 120
              L230 140
              Q180 180 185 300
              Z
            "
            fill="#CBEC93"
          />
        </g>

        {/* Eyepiece + Tube */}
        <g className="eyepiece">
          <rect
            x="200"
            y="70"
            width="25"
            height="60"
            rx="5"
            fill="#2D5016"
            transform="rotate(-25 212 100)"
          />

          <rect
            x="180"
            y="100"
            width="30"
            height="90"
            rx="6"
            fill="#D2ECA0"
            transform="rotate(-25 195 145)"
          />
        </g>

        {/* Revolver + Objectives */}
        <g className="objectives">
          <circle cx="190" cy="180" r="18" fill="#6EA56C" />

          <rect
            x="175"
            y="185"
            width="8"
            height="30"
            rx="2"
            fill="#2D5016"
            transform="rotate(10 179 200)"
          />

          <rect
            x="188"
            y="185"
            width="8"
            height="35"
            rx="2"
            fill="#2D5016"
          />

          <rect
            x="201"
            y="185"
            width="8"
            height="28"
            rx="2"
            fill="#2D5016"
            transform="rotate(-10 205 200)"
          />
        </g>

        {/* Stage */}
        <g className="stage">
          <rect
            x="145"
            y="220"
            width="120"
            height="18"
            rx="4"
            fill="#6EA56C"
          />

          <rect
            x="200"
            y="214"
            width="18"
            height="12"
            rx="2"
            fill="#FFFFFF"
          />
        </g>

        {/* Focus Knobs */}
        <g className="knob">
          <circle cx="250" cy="205" r="18" fill="#6EA56C" />
          <circle cx="250" cy="205" r="8" fill="#F4FFE1" />

          <circle cx="265" cy="240" r="10" fill="#6EA56C" />
          <circle cx="265" cy="240" r="4" fill="#F4FFE1" />
        </g>

        {/* Pillar */}
        <rect
          x="170"
          y="270"
          width="25"
          height="55"
          rx="4"
          fill="#CBEC93"
        />

        {/* Highlight */}
        <ellipse
          cx="170"
          cy="180"
          rx="12"
          ry="40"
          fill="rgba(255,255,255,0.4)"
        />

        {/* Cartoon Face */}
        <circle cx="145" cy="340" r="3" fill="#F4FFE1" />
        <circle cx="160" cy="340" r="3" fill="#F4FFE1" />

        <path
          d="M143 350 Q152 358 162 350"
          stroke="#F4FFE1"
          strokeWidth="2"
          fill="none"
          strokeLinecap="round"
        />
      </svg>

      <div className="loading">Loading</div>
    </div>
  );
}
