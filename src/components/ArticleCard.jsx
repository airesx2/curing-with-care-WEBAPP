import { Card, CardHeader, CardTitle, CardContent } from "./ui/card";
import { Link } from "react-router-dom";
import WriterLink from "./WriterLink";

export default function ArticleCard({ article, imageHeight = "h-48" }) {
  return (
    <Link to={`/article/${article.id}`} className="block h-full">
      <Card className="overflow-hidden transition duration-300 hover:shadow-md cursor-pointer h-full">
        {/* Placeholder image — swap bg-[] div for an <img> once image_url is in Firestore */}
        <div className={`w-full ${imageHeight} bg-[#D2ECA0]`}>
          {article.image_url && (
            <img
              src={article.image_url}
              alt={article.title}
              className="w-full h-full object-cover"
            />
          )}
        </div>

        <CardHeader>
          <CardTitle className="text-xl font-serif tracking-wide mb-2 text-[#6EA56C]">
            {article.title}
          </CardTitle>
          <div className="text-sm text-muted-foreground font-serif">
            <WriterLink name={article.author_name} className="text-sm font-serif" />
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