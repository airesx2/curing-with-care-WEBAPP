import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../lib/firebase";
import { slugToName, nameToSlug } from "../lib/writerUtils";
import { Card, CardContent } from "../components/ui/card";

const SECTION_LABELS = {
  spotlight: "Spotlight Stories",
  understanding: "Understanding Cancer",
  prevention: "Prevention and Wellness",
  news: "In the News",
  creative: "Creative Corner",
};

function WriterPage() {
  const { writerSlug } = useParams();
  const writerName = slugToName(writerSlug);
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchArticles() {
      setLoading(true);
      const snapshot = await getDocs(collection(db, "articles"));
      const all = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

      const byWriter = all.filter((article) => {
        const authors = article.author_name
          .split("•")
          .map((name) => nameToSlug(name.trim()));
        return authors.includes(writerSlug);
      });

      byWriter.sort((a, b) => new Date(b.publish_date) - new Date(a.publish_date));

      setArticles(byWriter);
      setLoading(false);
    }
    fetchArticles();
  }, [writerSlug]);

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center text-gray-400 font-serif">
      Loading...
    </div>
  );

  return (
    <div className="min-h-screen bg-green-50/50 px-6 py-16">
      <div className="max-w-5xl mx-auto">

        {/* Header */}
        <div className="mb-10">
          <h1 className="text-3xl font-serif font-semibold tracking-wide text-[#32567F]">
            {writerName}
          </h1>
          <p className="text-sm text-muted-foreground font-serif mt-1">
            {articles.length} article{articles.length !== 1 ? "s" : ""} published
          </p>
        </div>

        {/* Articles */}
        {loading ? (
          <p className="font-serif text-muted-foreground">Loading articles...</p>
        ) : articles.length === 0 ? (
          <p className="font-serif text-muted-foreground">No articles found for this writer.</p>
        ) : (
          <div className="space-y-6">
            {articles.map((a) => {

              const formattedDate = a.created_at?.toDate
                ? a.created_at.toDate().toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })
                : "";

              const sectionLabel = SECTION_LABELS[a.section] || a.section;

              return (
                <Card key={a.id} className="bg-white border border-black/10">
                  <CardContent className="flex justify-between items-center gap-4 !py-5 px-6">
                    <div className="flex-1 flex flex-col">
                      <h2 className="text-xl font-serif font-semibold text-[#6EA56C] leading-snug">
                        {a.title}
                      </h2>
                      <p className="text-sm text-muted-foreground font-serif mt-1">
                        {sectionLabel} · {a.read_time} · {formattedDate}
                      </p>
                    </div>
                    <Link
                      to={`/article/${a.id}`}
                      aria-label="Read article"
                      className="text-[#3B6D11] hover:text-[#27500A] transition-colors flex-shrink-0 text-xl font-light"
                    >
                      →
                    </Link>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

export default WriterPage;