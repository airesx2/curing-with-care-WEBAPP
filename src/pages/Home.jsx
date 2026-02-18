import ArticleCard from "../components/ArticleCard"

export default function Home() {
  const mockArticle = {
    id: "1",
    title: "Understanding Immunotherapy",
    excerpt:
      "A deep dive into how the immune system can be trained to fight cancer cells and reshape modern oncology.",
    author_id: "abc123",
    author_name: "Jane Doe",
    publish_date: "March 2026",
  }

  return (
    <div className="min-h-screen bg-green-50 px-6 py-16">
      <div className="max-w-6xl mx-auto">

        {/* Mission Section */}
        <div className="mb-16 text-center">
          <h1 className="text-4xl font-serif tracking-wide font-bold mb-4 leading-tight text-primary">
            curingwithCARE
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto font-serif">
            *placeholder* Empowering students to explore cancer research, prevention,
            wellness, and creative expression through accessible, evidence-based writing.
          </p>
        </div>

        {/* Featured Section */}
        <div>
          <h2 className="text-2xl font-semibold mb-8 text-primary font-serif">
            Featured Stories
          </h2>

          <div className="max-w-md">
            <ArticleCard article={mockArticle} />
          </div>
        </div>

      </div>
    </div>
  )
}
