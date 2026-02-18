import { useParams, Link } from "react-router-dom";
import { Heart } from "lucide-react";

export default function ArticlePage() {
  const { id } = useParams();

  const article = {
    id,
    title: "Understanding Immunotherapy",
    author_id: "abc123",
    author_name: "Jane Doe",
    publish_date: "March 26, 2026",
    read_time: "5 min read",
    views: 128,
    image_url: "",
    content: `
Immunotherapy is a groundbreaking approach to cancer treatment that empowers the immune system to recognize and destroy cancer cells more effectively.

Unlike chemotherapy, which directly attacks cancer cells, immunotherapy enhances the body's natural defenses.

Research continues to evolve rapidly in this field, offering hope for more personalized and targeted therapies.
    `
  };

  return (
    <div className="min-h-screen bg-green-50/50 px-6 py-16">
      <div className="max-w-4xl mx-auto">
        {/* Hero Image */}
        <div className="w-full h-72 bg-green-200 rounded-xl mb-10">
          {article.image_url && (
            <img
              src={article.image_url}
              alt={article.title}
              className="w-full h-full object-cover rounded-xl"
            />
          )}
        </div>

        {/* Title */}
        <h1 className="text-4xl font-serif tracking-wide mb-4 leading-tight font-semibold">
          {article.title}
        </h1>

        {/* Metadata */}
        <div className="text-sm text-muted-foreground font-serif mb-8">
          <Link
            to={`/writer/${article.author_id}`}
            className="hover:underline"
          >
            {article.author_name}
          </Link>
          <span className="mx-2">·</span>
          <span>{article.publish_date}</span>
          <span className="mx-2">·</span>
          <span>{article.read_time}</span>
        </div>

        {/* Article Content */}
        <div className="space-y-4 text-[1.05rem] leading-7 font-serif text-foreground">
          {article.content.split("\n").map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
        </div>

        {/* Bottom Section */}
        <div className="mt-12 pt-6 border-t border-black/10 flex items-center justify-between text-sm text-muted-foreground font-serif">
          <span>{article.views} views</span>

          <button className="flex items-center gap-2 hover:text-red-500 transition">
            <Heart size={18} />
            <span>Like</span>
          </button>
        </div>
      </div>
    </div>
  );
}
