import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../lib/firebase";
import { slugToName, nameToSlug } from "../lib/writerUtils";

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
      <div className="max-w-2xl mx-auto">

        {/* Writer Header */}
        <div className="mb-12 pb-8 border-b border-black/10">
          <h1 className="text-5xl font-serif font-semibold text-[#32567F] mb-3">
            {writerName}
          </h1>
          <p className="text-gray-400 font-serif text-sm">
            {articles.length} article{articles.length !== 1 ? "s" : ""} published
          </p>
        </div>

        {/* Articles List */}
        {articles.length === 0 ? (
          <p className="text-gray-400 font-serif">No articles found for this writer.</p>
        ) : (
          <ul className="space-y-8">
            {articles.map((article) => {

              // Format the date cleanly
              let formattedDate = "";
              if (article.publish_date) {
                const d = new Date(article.publish_date);
                if (!isNaN(d)) {
                  formattedDate = d.toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  });
                }
              }

              return (
                <li key={article.id} className="group pb-8 border-b border-black/10 last:border-none">
                  <Link to={`/article/${article.id}`}>
                    <h2 className="text-xl font-serif font-semibold text-[#32567F] group-hover:underline underline-offset-2 mb-2">
                      {article.title}
                    </h2>
                  </Link>
                  <div className="flex items-center gap-2 text-xs text-gray-400 font-serif">
                    <span>{formattedDate}</span>
                    <span>·</span>
                    <span>{article.read_time}</span>
                    <span>·</span>
                    <span className="capitalize">{article.section}</span>
                  </div>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </div>
  );
}

export default WriterPage;