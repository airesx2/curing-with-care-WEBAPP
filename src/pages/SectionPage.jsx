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
    },
    creative: {
      title: "Creative Corner",
      description:
        "Student art, photography, and creative reflections."
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
      <div className="min-h-screen flex items-center justify-center">
        <h1>Section not found</h1>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-green-50/50 px-6 py-16">
      <div className="max-w-6xl mx-auto">

        <div className="mb-14">
          <h1 className="text-4xl font-bold mb-4">
            {current.title}
          </h1>
          <p className="text-muted-foreground max-w-2xl">
            {current.description}
          </p>
          <div className="mt-8 h-px bg-black/10 w-full"></div>
        </div>

        {articles.length === 0 ? (
          <p>No articles yet.</p>
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
