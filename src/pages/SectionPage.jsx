import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../lib/firebase";
import ArticleCard from "../components/ArticleCard";

export default function SectionPage() {
  const { section } = useParams();
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  const sectionInfo = {
    spotlight: {
      title: "Spotlight Stories",
      description:
        "Personal stories from survivors, healthcare workers, and researchers dedicated to fighting cancer."
    },
    understanding: {
      title: "Understanding Cancer",
      description:
        "Student-friendly explanations of cancer types, biology, and treatment approaches."
    },
    prevention: {
      title: "Prevention & Wellness",
      description:
        "Practical guidance on healthy living, early detection, and reducing cancer risk."
    },
    news: {
      title: "In the News",
      description:
        "Recent breakthroughs and research highlights."
    }
  };

  useEffect(() => {
    async function fetchArticles() {
      try {
        const q = query(
          collection(db, "articles"),
          where("section", "==", section)
        );
        const snapshot = await getDocs(q);
        const data = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setArticles(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    fetchArticles();
  }, [section]);

  const current = sectionInfo[section];

  if (!current) {
    return (
      <div className="min-h-screen flex items-center justify-center !bg-[#F4FFE1]">
        <h1>Section not found</h1>
      </div>
    );
  }

  if (loading) {
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

  return (
    <div className="min-h-screen bg-green-50/50 px-6 py-16">
      <div className="max-w-6xl mx-auto">

        <div className="mb-14">
          <h1 className="text-4xl text-[#32567F] font-serif  font-bold mb-4">
            {current.title}
          </h1>
          <p className="text-muted-foreground font-serif max-w-2xl">
            {current.description}
          </p>
          <div className="mt-8 h-px bg-black/10 w-full"></div>
        </div>

        {articles.length === 0 ? (
          <p className="font-serif">No articles yet.</p>
        ) : (
          <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3">
            {articles.map(article => (
              <ArticleCard key={article.id} article={article} />
            ))}
          </div>
        )}

      </div>
    </div>
  );
}
