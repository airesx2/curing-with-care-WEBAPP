// src/pages/EditorDashboard.jsx
import { useState, useEffect } from "react"
import { db, auth } from "../lib/firebase"
import {
  collection,
  addDoc,
  getDocs,
  doc,
  updateDoc,
  deleteDoc,
  serverTimestamp,
  query,
  orderBy,
} from "firebase/firestore"
import { onAuthStateChanged } from "firebase/auth"
import { Button } from "../components/ui/button"
import { Input } from "../components/ui/input"
import { Label } from "../components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card"
import { Textarea } from "../components/ui/textarea"

export default function EditorDashboard() {
  const [user, setUser] = useState(null)
  const [articles, setArticles] = useState([])
  const [loading, setLoading] = useState(true)
  const [form, setForm] = useState({
    id: null,
    title: "",
    author_name: "",
    section: "spotlight",
    content: "",
    read_time: "",
  })
  const [wordCount, setWordCount] = useState(0)

  // Only these emails can access editor
  const allowedEditors = ["editor1@example.com", "editor2@example.com", "quark1594@gmail.com"]

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (u) => {
      if (u && allowedEditors.includes(u.email)) {
        setUser(u)
        await fetchArticles()
      } else {
        setUser(null)
      }
    })
    return () => unsubscribe()
  }, [])

  const fetchArticles = async () => {
    setLoading(true)
    const q = query(collection(db, "articles"), orderBy("created_at", "desc"))
    const snapshot = await getDocs(q)
    const docs = snapshot.docs.map((d) => ({ id: d.id, ...d.data() }))
    setArticles(docs)
    setLoading(false)
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm({ ...form, [name]: value })

    if (name === "content") {
      const words = value.trim().split(/\s+/).filter(Boolean).length
      setWordCount(words)
      const estTime = Math.max(1, Math.ceil(words / 200)) // ~200 wpm
      setForm((prev) => ({ ...prev, read_time: `${estTime} min read` }))
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      if (form.id) {
        // Update
        const docRef = doc(db, "articles", form.id)
        await updateDoc(docRef, {
          title: form.title,
          author_name: form.author_name,
          section: form.section,
          content: form.content,
          read_time: form.read_time,
          updated_at: serverTimestamp(),
        })
      } else {
        // Create with automatic publish date
        await addDoc(collection(db, "articles"), {
          title: form.title,
          author_name: form.author_name,
          section: form.section,
          content: form.content,
          read_time: form.read_time,
          created_at: serverTimestamp(), // automatic timestamp
          publish_date: new Date().toISOString(), // optional: store ISO date string
        })
      }
      setForm({
        id: null,
        title: "",
        author_name: "",
        section: "spotlight",
        content: "",
        read_time: "",
      })
      setWordCount(0)
      fetchArticles()
    } catch (err) {
      console.error("Error saving article:", err)
      alert("Something went wrong saving the article.")
    }
  }

  const handleEdit = (article) => {
    setForm({
      id: article.id,
      title: article.title,
      author_name: article.author_name,
      section: article.section,
      content: article.content,
      read_time: article.read_time || "",
    })
    setWordCount(article.content.trim().split(/\s+/).filter(Boolean).length)
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  const handleDelete = async (id) => {
    if (confirm("Are you sure you want to delete this article?")) {
      await deleteDoc(doc(db, "articles", id))
      fetchArticles()
    }
  }

  const handleLogout = async () => {
    await auth.signOut()
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center text-center">
        <p className="text-lg">
          You do not have access to this page. Please log in with an authorized editor account.
        </p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-green-50/50 px-6 py-16">
      <div className="max-w-5xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-serif font-semibold tracking-wide">Editor Dashboard</h1>
          <Button variant="outline" onClick={handleLogout}>Logout</Button>
        </div>

        {/* Article Form */}
        <Card className="mb-12">
          <CardHeader>
            <CardTitle>{form.id ? "Edit Article" : "New Article"}</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* TITLE */}
              <div className="grid gap-2">
                <Label htmlFor="title">Title</Label>
                <Input
                  name="title"
                  id="title"
                  value={form.title}
                  onChange={handleChange}
                  required
                  placeholder="e.g. The latest breakthroughs in cancer research"
                />
              </div>

              {/* WRITER NAME */}
              <div className="grid gap-2">
                <Label htmlFor="author_name">Writer Name</Label>
                <Input
                  name="author_name"
                  id="author_name"
                  value={form.author_name}
                  onChange={handleChange}
                  required
                  placeholder="e.g. Jane Doe"
                />
              </div>

              {/* SECTION */}
              <div className="grid gap-2">
                <Label htmlFor="section">Section</Label>
                <select
                  name="section"
                  id="section"
                  value={form.section}
                  onChange={handleChange}
                  className="rounded-md border border-input px-3 py-2 text-sm"
                >
                  <option value="spotlight">Spotlight Stories</option>
                  <option value="understanding">Understanding Cancer</option>
                  <option value="prevention">Prevention & Wellness</option>
                  <option value="news">In the News</option>
                  <option value="creative">Creative Corner</option>
                </select>
              </div>

              {/* WORD COUNT & READ TIME */}
              <p className="text-sm text-muted-foreground font-serif">
                Word count: {wordCount} · Estimated read time: {form.read_time || "0 min read"}
              </p>

              {/* CONTENT */}
              <div className="grid gap-2">
                <Label htmlFor="content">Content</Label>
                <Textarea
                  name="content"
                  id="content"
                  value={form.content}
                  onChange={handleChange}
                  rows={10}
                  placeholder="Write your article here..."
                />
              </div>

              <Button type="submit">{form.id ? "Update Article" : "Publish Article"}</Button>
            </form>
          </CardContent>
        </Card>

        {/* Article List */}
        <div className="space-y-6">
          {loading ? (
            <p>Loading articles...</p>
          ) : articles.length === 0 ? (
            <p>No articles yet.</p>
          ) : (
            articles.map((a) => (
              <Card
                key={a.id}
                className="bg-white border border-black/10" // ✅ Card background
              >
                <CardContent className="flex justify-between items-center min-h-[100px]">
                  <div className="flex-1 flex flex-col justify-center">
                    {/* Centered text vertically */}
                    <h2 className="text-xl font-serif font-semibold">{a.title}</h2>
                    <p className="text-sm text-muted-foreground font-serif mt-1">
                      {a.author_name} · {a.section} · {a.read_time} · {a.publish_date}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    {/* Edit button color */}
                    <Button 
                      size="sm"
                      className="bg-green-50 text-green-900 hover:bg-green-100"
                      onClick={() => handleEdit(a)}
                    >
                      Edit
                    </Button>
                    {/* Delete button color */}
                    <Button 
                      size="sm"
                      variant="destructive" 
                      className="bg-red-50 text-red-900 hover:bg-red-100"
                      onClick={() => handleDelete(a.id)}
                    >
                      Delete
                    </Button>
                    {/* Change colors here if you want different shades */}
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </div>
    </div>
  )
}
