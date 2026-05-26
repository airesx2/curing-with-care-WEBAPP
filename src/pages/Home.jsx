import { useEffect, useState } from "react";
import { collection, getDocs, orderBy, query, limit } from "firebase/firestore";
import { db } from "../lib/firebase";
import ArticleCard from "../components/ArticleCard"

export default function Home() {
  const [featured, setFeatured] = useState([]);

  useEffect(() => {
    async function fetchFeatured() {
      try {
        const q = query(collection(db, "articles"), orderBy("created_at", "desc"), limit(3));
        const snapshot = await getDocs(q);
        setFeatured(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      } catch (err) {
        console.error(err);
      }
    }
    fetchFeatured();
  }, []);

  return (
    <div className="min-h-screen bg-[#F4FFE1] px-6 py-16">
      <div className="max-w-6xl mx-auto">

        {/* Mission Section */}
        <div className="mb-16 text-center">
          <h1 className="!text-[#32567F] text-4xl font-serif tracking-wide font-bold mb-4 leading-tight text-primary">
            curingwithCARE
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto font-serif">
            *placeholder* Empowering students to explore cancer research, prevention,
            wellness, and creative expression through accessible, evidence-based writing.
          </p>
        </div>

        {/* Featured Section */}
        <div>
          <h2 className="text-2xl !text-[#32567F] font-semibold mb-8 text-primary font-serif">
            Featured Stories
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {featured.map(article => (
              <ArticleCard key={article.id} article={article} />
            ))}
          </div>
        </div>

      </div>
    </div>
  )
}
