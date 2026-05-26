import HoverCardDemo from "../components/HoverCard";

const imageModules = import.meta.glob("../images/[0-9]*.{png,JPG,jpg}", { eager: true });
const images = Object.keys(imageModules)
  .sort((a, b) => parseInt(a.match(/(\d+)/)[1]) - parseInt(b.match(/(\d+)/)[1]))
  .map(key => imageModules[key].default);

const messages = [
  "You are so much stronger than you realize, even on the days when it genuinely doesn't feel that way.",
  "Every single day that you show up matters and you deserve to actually know that.",
  "You don't have to be brave all the time — it is completely okay to just rest today.",
  "The people who love you are holding you up even in the moments you can't feel it.",
  "You have already made it through so many hard days and that says everything about who you are.",
  "It is okay to feel everything you are feeling right now, every single bit of it is valid.",
  "You are not alone in this, not for a single moment, even when it feels that way.",
  "Your courage doesn't always have to look like strength — sometimes it just looks like making it to the next hour.",
  "You are seen, you are loved, and you are absolutely worth fighting for.",
  "Even the smallest steps forward still count and every single one of them matters.",
  "You don't have to have it all figured out right now, just take it one breath at a time.",
  "The love around you is real and it is so much bigger than what you are going through.",
  "You matter so deeply to the people in your life, more than words could ever really capture.",
  "Healing is not always a straight line and that does not mean you are doing anything wrong.",
  "On the days you can't be strong, just let the people who love you be strong for you.",
  "You are so much more than your diagnosis — you are so fully and wonderfully yourself.",
  "Every moment you spend resting is your body doing something important, so please don't feel guilty for it.",
  "You were never meant to carry all of this alone and you truly don't have to.",
  "There is a part of you that illness simply cannot reach, no matter what.",
  "It is okay to have a really hard day and still hold on to the belief that things can get better.",
  "You have people in your corner who would do anything for you without a second of hesitation.",
  "There is so much light in you and it comes through even on your darkest days.",
  "You are allowed to feel hopeful, even when that hope feels small and a little fragile.",
  "The kind of fight you are in takes a strength that most people will never truly understand — and you are doing it.",
  "You are held, you are cherished, and you are never forgotten.",
  "Whatever today has looked like, you are doing enough and that is the honest truth.",
  "This is not the whole story of your life, there are still so many beautiful things ahead of you.",
];

export default function CreativeCorner() {

    return (
    <div className="min-h-screen bg-green-50/50 px-6 py-16">
      <div className="max-w-6xl mx-auto">

        <div className="mb-14">
          <h1 className="text-4xl text-[#32567F] font-serif  font-bold mb-4">
            Creative Corner
          </h1>
          <p className="text-muted-foreground font-serif max-w-2xl">
            Try hovering over the images :)
          </p>
          <div className="mt-8 h-px bg-black/10 w-full"></div>
          <div style={{
            columns: "4 200px",
            columnGap: "12px",
            marginTop: "24px",
          }}>
            {images.map((src, i) => (
              <div key={i} style={{ breakInside: "avoid", marginBottom: "12px" }}>
                <HoverCardDemo src={src} alt={`creative corner image ${i + 1}`} message={messages[i]} />
              </div>
            ))}
          </div>
        </div>

    </div>

    </div>
)
}







    
