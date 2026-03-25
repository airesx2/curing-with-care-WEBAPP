import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { doc, getDoc, updateDoc, increment } from "firebase/firestore";
import { db } from "../lib/firebase";
import { Heart } from "lucide-react";

export default function ArticlePage() {
  const { id } = useParams();
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [liked, setLiked] = useState(() => {
    return localStorage.getItem(`liked_${id}`) === "true";
  });
  const [likeCount, setLikeCount] = useState(0);

  useEffect(() => {
    async function fetchArticle() {
      try {
        const docRef = doc(db, "articles", id);
        const snapshot = await getDoc(docRef);

        if (snapshot.exists()) {
          const data = snapshot.data();
          setArticle({ id: snapshot.id, ...data });
          setLikeCount(data.likes || 0);

          // Only count view once per session
          const sessionKey = `viewed_${id}`;
          if (!sessionStorage.getItem(sessionKey)) {
            sessionStorage.setItem(sessionKey, "true");
            await updateDoc(docRef, { views: increment(1) });
          }
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    fetchArticle();
  }, [id]);

  async function handleLike() {
    const docRef = doc(db, "articles", id);
    const newLiked = !liked;
    const delta = newLiked ? 1 : -1;

    setLiked(newLiked);
    setLikeCount((prev) => prev + delta);
    localStorage.setItem(`liked_${id}`, String(newLiked));

    try {
      await updateDoc(docRef, { likes: increment(delta) });
    } catch (err) {
      // Rollback on failure
      setLiked(!newLiked);
      setLikeCount((prev) => prev - delta);
      localStorage.setItem(`liked_${id}`, String(!newLiked));
      console.error(err);
    }
  }

  if (loading) {
    return <div className="p-10">Loading...</div>;
  }

  if (!article) {
    return <div className="p-10">Article not found</div>;
  }

  // Proper full date formatting
  const formattedDate = article.created_at?.toDate
    ? article.created_at.toDate().toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "";

  return (
    <div className="min-h-screen bg-green-50/50 px-6 py-16">
      <div className="max-w-4xl mx-auto">
        {/* Image */}
        <div className="w-full h-72 bg-[#D2ECA0] rounded-xl mb-10">
          {article.image_url && (
            <img
              src={article.image_url}
              alt={article.title}
              className="w-full h-full object-cover rounded-xl"
            />
          )}
        </div>

        {/* Title */}
        <h1 className="text-4xl text-[#32567F] font-serif tracking-wide mb-4 leading-tight font-semibold">
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

  
          <span>{formattedDate}</span>

          <span className="mx-2">·</span>
          <span>{article.read_time}</span>
        </div>

        {/* Article Content */}
        <div className="space-y-4 text-[1.05rem] leading-7 font-serif text-foreground">
          {article.content?.split("\n").map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
        </div>

        {/* Bottom Section */}
        <div className="mt-12 pt-6 border-t border-black/10 flex items-center justify-between text-sm text-muted-foreground font-serif">
          <span>{article.views || 0} views</span>

          <button
            onClick={handleLike}
            className={`inline-flex items-center !cursor-pointer gap-2 transition ${
              liked ? "text-red-500" : "hover:text-red-500"
            }`}
          >
            <Heart size={18} fill={liked ? "currentColor" : "none"} />
            <span className="ml-1">{likeCount}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
