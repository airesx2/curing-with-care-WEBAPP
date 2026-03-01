import { Card, CardHeader, CardTitle, CardContent } from "./ui/card";
import { Link } from "react-router-dom";

export default function ArticleCard({ article }) {
  return (
    <Link to={`/article/${article.id}`} className="block">
      <Card className="overflow-hidden transition duration-300 hover:shadow-md cursor-pointer">
        {/* Fake Image */}
        <div className="w-full h-48 bg-green-200"></div>

        <CardHeader>
          <CardTitle className="text-xl font-serif tracking-wide mb-2">
            {article.title}
          </CardTitle>

          <div className="text-sm text-muted-foreground font-serif">
            <Link
              to={`/writer/${article.author_id}`}
              className="hover:underline"
            >
              {article.author_name}
            </Link>
            <span className="mx-2">·</span>
            <span>
              {article.created_at?.toDate
                ? article.created_at.toDate().toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                })
              : ""}
            </span>
          </div>
        </CardHeader>

        <CardContent>
          <p className="text-sm text-muted-foreground font-serif">
            {article.excerpt}
          </p>
        </CardContent>
      </Card>
    </Link>
  );
}
