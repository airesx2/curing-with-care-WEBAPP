import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card"
import featuredImage from "../images/featuredImage.jpg"

export function FeaturedArticle() {
  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div>
            <CardTitle>Featured Article</CardTitle>
            <CardDescription>
              This is tung tung sahur
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <img src={featuredImage} alt="Featured Article" className="mb-4 w-full rounded-md" />
      </CardContent>
    </Card>
  )
}