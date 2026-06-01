# curingwithCARE Blog

**Live site:** https://curing-with-care.vercel.app/

A student-run blog focused on cancer research, prevention, wellness, and creative expression. Built with React and Firebase.

## Pages

| Route | Page |
|---|---|
| `/` | Home — featured articles |
| `/officers` | Meet the Officers |
| `/section/spotlight` | Spotlight Stories |
| `/section/understanding` | Understanding Cancer |
| `/section/prevention` | Prevention & Wellness |
| `/section/news` | In the News |
| `/creative` | Creative Corner |
| `/editor` | Editor Dashboard (protected) |

## Tech Stack

- **React** + **Vite**
- **Tailwind CSS** + **Radix UI**
- **Firebase** — Firestore (articles), Firebase Auth (editor login), Hosting
- **React Router v6**

## Getting Started

```bash
npm install
npm run dev
```

## Editor Access

The `/editor` route is protected. Approved editors are managed via Firebase Auth and a hardcoded allowlist in `firestore.rules`.

## Project Structure

```
src/
├── components/       # Navbar, ArticleCard, HoverCard, etc.
├── pages/            # Home, MeetTheOfficers, SectionPage, CreativeCorner, etc.
├── context/          # AuthContext (Firebase Auth)
├── officers/         # Officer photos
├── images/           # Creative Corner images
└── lib/              # Firebase config, utilities
```
