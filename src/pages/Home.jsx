import { useEffect, useState } from "react";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { db } from "../lib/firebase";
import { Link } from "react-router-dom";
import WriterLink from "../components/WriterLink";

const G  = 16;
const SM = 80;
const MD = 160;
const LG = 256;

const SECTIONS = ["spotlight", "understanding", "prevention", "news", "creative"];

function selectFeatured(articles) {
  const sorted = [...articles].sort(
    (a, b) => (b.created_at?.toDate?.() ?? new Date(0)) - (a.created_at?.toDate?.() ?? new Date(0))
  );
  const bySection = {};
  SECTIONS.forEach((s) => (bySection[s] = []));
  sorted.forEach((a) => { if (bySection[a.section]) bySection[a.section].push(a); });
  const featured = [];
  const used = new Set();
  SECTIONS.forEach((section) => {
    const pick = bySection[section].find((a) => !used.has(a.id));
    if (pick) { featured.push(pick); used.add(pick.id); }
  });
  for (const article of sorted) {
    if (featured.length >= 8) break;
    if (!used.has(article.id)) { featured.push(article); used.add(article.id); }
  }
  return featured.sort(
    (a, b) => (b.created_at?.toDate?.() ?? new Date(0)) - (a.created_at?.toDate?.() ?? new Date(0))
  );
}

function formatDate(article) {
  return article.created_at?.toDate
    ? article.created_at.toDate().toLocaleDateString("en-US", { year: "numeric", month: "long" })
    : "";
}

function Img({ size }) {
  return (
    <div
      style={{ width: size, height: size, flexShrink: 0 }}
      className="bg-[#D2ECA0] rounded-lg hover:opacity-90 transition-opacity"
    />
  );
}

function SpokeText({ article, align, titleSize = "text-sm" }) {
  if (!article) return null;
  return (
    <>
      <Link to={`/article/${article.id}`}>
        <p className={`font-serif font-semibold text-[#6EA56C] ${titleSize} leading-snug hover:underline underline-offset-2`}>
          {article.title}
        </p>
      </Link>
      <p className="font-sans text-xs text-muted-foreground">
        <WriterLink name={article.author_name} className="text-xs font-sans" />
      </p>
      <p className="font-sans text-xs text-muted-foreground">{formatDate(article)}</p>
    </>
  );
}

export default function Home() {
  const [featured, setFeatured] = useState([]);

  useEffect(() => {
    async function fetchFeatured() {
      try {
        const q = query(collection(db, "articles"), orderBy("created_at", "desc"));
        const snapshot = await getDocs(q);
        const all = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        setFeatured(selectFeatured(all));
      } catch (err) {
        console.error(err);
      }
    }
    fetchFeatured();
  }, []);

  const [A, B, C, D, E, F, G_art, H] = featured;

  const lg1L    = MD + G + MD + G;
  const lg2L    = lg1L + LG + G;
  const col1SmL = lg1L - G - SM;
  const col1MdL = lg1L - G - MD;
  const col4MdL = lg2L + LG + G;
  const col4SmL = col4MdL;
  const row1MdL = lg2L;
  const row3MdR = lg1L + LG;
  const row3MdL = row3MdR - MD;
  const totalW  = col4MdL + MD + G + MD;
  const row2Top = MD + G;
  const row3Top = MD + G + LG + G;
  const totalH  = MD + G + LG + G + MD;

  return (
    <div className="min-h-screen px-6 py-16" style={{
  backgroundColor: "#F4FFE1",
  backgroundImage: "radial-gradient(circle, #b5d97a 1px, transparent 1px)",
  backgroundSize: "24px 24px",
}}>
      <div className="max-w-6xl mx-auto">

        <div className="mb-16 text-center">
          <h1 className="text-4xl font-serif font-bold tracking-wide text-[#32567F] mb-4 leading-tight">
            curingwithCARE
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto font-serif">
            Empowering students to explore cancer research, prevention,
            wellness, and creative expression through accessible, evidence-based writing.
          </p>
        </div>

        <h2 className="text-2xl font-serif font-semibold text-[#32567F] mb-8">
          Featured Stories
        </h2>

        {featured.length === 0 ? (
          <p className="text-muted-foreground font-serif">Loading stories...</p>
        ) : (
          <div style={{ width: totalW, height: totalH, position: "relative", margin: "0 auto" }}>

            {/* ── ROW 1 ── */}
            <div style={{ position: "absolute", top: 0, left: row1MdL - G - MD, width: MD, height: MD }}
              className="flex flex-col justify-center items-end text-right gap-1">
              <SpokeText article={A} align="right" />
            </div>
            {A && (
              <Link to={`/article/${A.id}`} style={{ position: "absolute", top: 0, left: row1MdL }}>
                <Img size={MD} />
              </Link>
            )}
            <div style={{ position: "absolute", top: 0, left: row1MdL + MD + G, width: MD, height: MD }}
              className="flex flex-col justify-center items-start text-left gap-1">
              <SpokeText article={D} align="left" />
            </div>

            {/* ── ROW 2 col1 ── */}
            {C && (
              <Link to={`/article/${C.id}`} style={{ position: "absolute", top: row2Top, left: col1SmL }}>
                <Img size={SM} />
              </Link>
            )}
            {B && (
              <Link to={`/article/${B.id}`} style={{ position: "absolute", top: row2Top + SM + G, left: col1MdL }}>
                <Img size={MD} />
              </Link>
            )}
            <div style={{ position: "absolute", top: row2Top, left: col1SmL - G - MD, width: MD, height: SM }}
  className="flex flex-col justify-center items-end text-right gap-1">
  <SpokeText article={C} align="right" titleSize="text-xs" />
</div>
            <div style={{ position: "absolute", top: row2Top + SM + G, left: col1MdL - G - MD, width: MD, height: MD }}
              className="flex flex-col justify-center items-end text-right gap-1">
              <SpokeText article={B} align="right" />
            </div>

            {/* ── ROW 2 large images ── */}
            {E && (
              <Link to={`/article/${E.id}`} style={{ position: "absolute", top: row2Top, left: lg1L }}>
                <Img size={LG} />
              </Link>
            )}
            {F && (
              <Link to={`/article/${F.id}`} style={{ position: "absolute", top: row2Top, left: lg2L }}>
                <Img size={LG} />
              </Link>
            )}

            {/* ── ROW 2 col4 ── */}
            {G_art && (
              <Link to={`/article/${G_art.id}`} style={{ position: "absolute", top: row2Top, left: col4MdL }}>
                <Img size={MD} />
              </Link>
            )}
            {H && (
              <Link to={`/article/${H.id}`} style={{ position: "absolute", top: row2Top + MD + G, left: col4SmL }}>
                <Img size={SM} />
              </Link>
            )}
            <div style={{ position: "absolute", top: row2Top, left: col4MdL + MD + G, width: MD, height: MD }}
              className="flex flex-col justify-center items-start text-left gap-1">
              <SpokeText article={G_art} align="left" />
            </div>
            <div style={{ position: "absolute", top: row2Top + MD + G, left: col4SmL + SM + G, width: SM, height: SM }}
              className="flex flex-col justify-center items-start text-left gap-1">
              <SpokeText article={H} align="left" titleSize="text-xs" />
            </div>

            {/* ── ROW 3 ── */}
            <div style={{ position: "absolute", top: row3Top, left: row3MdL - G - MD, width: MD, height: MD }}
              className="flex flex-col justify-center items-end text-right gap-1">
              <SpokeText article={E} align="right" />
            </div>
            {E && (
              <Link to={`/article/${E.id}`} style={{ position: "absolute", top: row3Top, left: row3MdL }}>
                <Img size={MD} />
              </Link>
            )}
            <div style={{ position: "absolute", top: row3Top, left: row3MdR + G, width: MD, height: MD }}
              className="flex flex-col justify-center items-start text-left gap-1">
              <SpokeText article={F} align="left" />
            </div>

          </div>
        )}
      </div>
    </div>
  );
}