import { useParams } from "react-router-dom";
import ArticleCard from "../components/ArticleCard";

export default function SectionPage() {
  const { section } = useParams();

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

  const articles = [
    {
      id: "1",
      title: "A Survivor’s Journey Through Immunotherapy",
      author_id: "abc123",
      author_name: "Jane Doe",
      publish_date: "March 2026",
      excerpt: "One patient’s story of resilience and innovation.",
      section: "spotlight"
    },
    {
      id: "2",
      title: "What Is Leukemia?",
      author_id: "def456",
      author_name: "John Smith",
      publish_date: "February 2026",
      excerpt: "A simple breakdown of blood cancers.",
      section: "understanding"
    },
    {
      id: "3",
      title: "5 Lifestyle Changes That Lower Risk",
      author_id: "ghi789",
      author_name: "Emily Chen",
      publish_date: "January 2026",
      excerpt: "Small daily habits that matter.",
      section: "prevention"
    },
    {
      id: "4",
      title: "New mRNA Cancer Vaccine Shows Promise",
      author_id: "jkl111",
      author_name: "Alex Rivera",
      publish_date: "March 2026",
      excerpt: "Early trials show encouraging data.",
      section: "news"
    },
    {
      id: "5",
      title: "Hope in Bloom",
      author_id: "mno222",
      author_name: "Samantha Lee",
      publish_date: "March 2026",
      excerpt: "A student photography series.",
      section: "creative"
    }
  ];

  const filtered = articles.filter(a => a.section === section);
  const current = sectionInfo[section];

  if (!current) {
    return (
      <div className="min-h-screen flex items-center justify-center text-xl font-serif tracking-wide">
        Section not found
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-green-50/50 px-6 py-16">
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div className="mb-14">
          <h1 className="text-4xl font-serif uppercase tracking-wide mb-4">
            {current.title}
          </h1>
          <p className="text-muted-foreground font-serif max-w-2xl">
            {current.description}
          </p>
          <div className="mt-8 h-px bg-black/10 w-full"></div>
        </div>

        {/* Spotlight Layout */}
        {section === "spotlight" && filtered.length > 0 && (
          <div>
            <div className="mb-12">
              <ArticleCard article={filtered[0]} />
            </div>
            <div className="grid md:grid-cols-2 gap-8">
              {filtered.slice(1).map(article => (
                <ArticleCard key={article.id} article={article} />
              ))}
            </div>
          </div>
        )}

        {/* News Layout */}
        {section === "news" && (
          <div className="space-y-8">
            {filtered.map(article => (
              <div key={article.id} className="border-b border-black/10 pb-6">
                <h2 className="text-xl font-serif font-semibold mb-2 uppercase tracking-wide">
                  {article.title}
                </h2>
                <p className="text-sm text-muted-foreground font-serif mb-2">
                  {article.publish_date}
                </p>
                <p className="text-muted-foreground font-serif">
                  {article.excerpt}
                </p>
              </div>
            ))}
          </div>
        )}

        {/* Default Grid Layout */}
        {section !== "spotlight" && section !== "news" && (
          <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3">
            {filtered.map(article => (
              <ArticleCard key={article.id} article={article} />
            ))}
          </div>
        )}

      </div>
    </div>
  );
}
