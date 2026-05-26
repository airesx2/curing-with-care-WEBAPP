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
} from "firebase/firestore"
import { onAuthStateChanged } from "firebase/auth"
import { Button } from "../components/ui/button"
import { Input } from "../components/ui/input"
import { Label } from "../components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card"
import { Textarea } from "../components/ui/textarea"
import { ToastDemo } from "../components/toast"

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
  const [showToast, setShowToast] = useState(false)
  const [confirmDelete, setConfirmDelete] = useState(null)

  const allowedEditors = [
    "quark1594@gmail.com",
    "creepyspamk@gmail.com",
    "esmoon23@gmail.com",
    "priyaprabhudgp@gmail.com",
  ]

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
    const snapshot = await getDocs(collection(db, "articles"))
    const docs = snapshot.docs
      .map((d) => ({ id: d.id, ...d.data() }))
      .sort((a, b) => {
        const ta = a.created_at?.toDate?.() ?? new Date(0)
        const tb = b.created_at?.toDate?.() ?? new Date(0)
        return tb - ta
      })
    setArticles(docs)
    setLoading(false)
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm({ ...form, [name]: value })

    if (name === "content") {
      const words = value.trim().split(/\s+/).filter(Boolean).length
      setWordCount(words)
      const estTime = Math.max(1, Math.ceil(words / 200))
      setForm((prev) => ({ ...prev, read_time: `${estTime} min read` }))
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      if (form.id) {
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
        await addDoc(collection(db, "articles"), {
          title: form.title,
          author_name: form.author_name,
          section: form.section,
          content: form.content,
          read_time: form.read_time,
          created_at: serverTimestamp(),
          publish_date: new Date().toISOString(),
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
      setShowToast(true)
      setTimeout(() => setShowToast(false), 3000)
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

  const handleDelete = (id) => {
    setConfirmDelete(id)
  }

  const confirmDeleteArticle = async () => {
    await deleteDoc(doc(db, "articles", confirmDelete))
    setConfirmDelete(null)
    fetchArticles()
  }

  const handleLogout = async () => {
    await auth.signOut()
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center text-center">
        <p className="text-lg font-serif">
          You do not have access to this page. Please log in with an authorized editor account.
        </p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-green-50/50 px-6 py-16">
      <div className="max-w-5xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-serif font-semibold tracking-wide text-[#32567F]">Editor Dashboard</h1>

        </div>

        <ToastDemo trigger={showToast} />

        <Card className="mb-12 font-serif">
          <CardHeader>
            
            <CardTitle>{form.id ? "Edit Article" : "New Article"}</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
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

              <p className="text-sm text-muted-foreground font-serif">
                Word count: {wordCount} · Estimated read time: {form.read_time || "0 min read"}
              </p>

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

              <Button className= "!bg-[#C8ED90] !text-[#6BA579] hover:!bg-[#E7FFC4] !rounded-md !px-2 !py-2 !cursor-pointer !font-serif !shadow-sm" type="submit">{form.id ? "Update Article" : "Publish Article"}</Button>
            </form>
          </CardContent>
        </Card>

        <div className="space-y-6">
          {loading ? (
            <p>Loading articles...</p>
          ) : articles.length === 0 ? (
            <p>No articles yet.</p>
          ) : (
            articles.map((a) => (
              <Card key={a.id} className="bg-white border border-black/10">
                <CardContent className="flex justify-between items-start gap-4 !py-5 px-6">
                  <div className="flex-1 flex flex-col">
                    <h2 className="text-xl font-serif font-semibold text-[#6EA56C] leading-snug">{a.title}</h2>
                    <p className="text-sm text-muted-foreground font-serif mt-1">
                      {a.author_name} · {a.section} · {a.read_time} ·{" "}
                      {a.created_at?.toDate
                        ? a.created_at.toDate().toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          })
                        : ""}
                    </p>
                  </div>
                  <div className="flex gap-2 shrink-0 pt-1">
                    <Button
                      size="sm"
                      className="!bg-[#C8ED90] !font-serif !text-[#6BA579] hover:!bg-[#E7FFC4] !rounded-md !px-2 !cursor-pointer !shadow-sm"
                      onClick={() => handleEdit(a)}
                    >
                      Edit
                    </Button>
                    <Button
                      size="sm"
                      className="!bg-[#C8ED90] !font-serif !text-[#6BA579] hover:!bg-[#E7FFC4] !rounded-md !px-2 !cursor-pointer !shadow-sm "
                      onClick={() => handleDelete(a.id)}
                    >
                      Delete
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </div>

      {/* Delete confirmation modal */}
      {confirmDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
          <div className="bg-white rounded-2xl shadow-xl px-8 py-8 max-w-sm w-full mx-4 font-serif text-center">
            <h3 className="text-xl font-semibold text-[#32567F] mb-3">Delete Article?</h3>
            <p className="text-sm text-muted-foreground mb-7">
              This action cannot be undone. The article will be permanently removed.
            </p>
            <div className="flex justify-center gap-3">
              <button
                onClick={() => setConfirmDelete(null)}
                className="px-5 py-2 rounded-lg border border-black/10 text-sm text-muted-foreground hover:bg-gray-50 transition !cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={confirmDeleteArticle}
                className="px-5 py-2 rounded-lg bg-[#C8ED90] text-[#6BA579] text-sm font-medium hover:bg-[#E7FFC4] transition !cursor-pointer"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
