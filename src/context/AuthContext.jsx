import { createContext, useContext, useEffect, useState } from "react";
import { auth } from "../lib/firebase";
import { onAuthStateChanged } from "firebase/auth";
import './AuthContext.css';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      // Artificial delay: 2 seconds
    setTimeout(() => {
      setUser(currentUser);
      setLoading(false);
    }, 2700);
    });

    return () => unsubscribe();
  }, []);

  if(loading){
    return (
      <div className="auth-loading-screen !bg-[#F4FFE1]">
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
        </svg>

        <div className="loading">Loading</div>
      </div>
    );
  }

  return(
    <AuthContext.Provider value = {{user}}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext);
}