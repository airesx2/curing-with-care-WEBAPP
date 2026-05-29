// src/pages/MeetTheOfficers.jsx
import estherPhoto from "../officers/esther.jpg";
import meghaPhoto from "../officers/megha.jpg";
import sanvitiPhoto from "../officers/sanviti.jpg";
import dhrithiPhoto from "../officers/dhrithi.jpg";
import annaPhoto from "../officers/anna.png";
import luciaPhoto from "../officers/lucia.png";

const officers = [
  {
    name: "Esther Moon",
    title: "President & Editor in Chief",
    description:
      "Hi everyone! My name is Esther Moon, and I'm a rising senior. I am planning to pursue a career in the medical field. I enjoy baking, crocheting, and playing the clarinet. I also love spending time with family and friends!",
    photo: estherPhoto,
  },
  {
    name: "Megha Somayaji",
    title: "President",
    description:
      "Hello! My name is Megha Somayaji and I am a rising senior. I am interested in majoring in biology in college. Some of my hobbies are playing tennis with friends, reading, and spending time with family!",
    photo: meghaPhoto,
  },
  {
    name: "Sanviti Amarnath",
    title: "President",
    description:
      "My name is Sanviti Amarnath and I’m a rising senior. I’m interested in majoring in biology or neuroscience along with a minor in business in college. My hobbies are singing, drawing, watching TV shows and movies, and hanging out with friends and my family!",
    photo: sanvitiPhoto, 
  },
  {
    name: "Dhrithi Ravilochan",
    title: "Secretary",
    description:
      "Hi my name is Dhrithi Ravilochan and I'm a rising Junior. I'm interested in majoring in biological sciences in college. My hobbies are running, hiking, baking, reading, and spending time with friends and family!",
    photo: dhrithiPhoto, 
  },
  {
    name: "Anna Waller",
    title: "Treasurer",
    description:
      "Hello! My name is Anna Waller and I am a rising senior! I’m interested in becoming a pediatric nurse and majoring in nursing in college. Some of my hobbies are gymnastics and reading.",
    photo: annaPhoto, 
  },
  {
    name: "Lucia Nguyen",
    title: "Social Media Manager",
    description:
      "My name is Lucia Nguyen and I’m a rising senior. I’m interested in going down the pre-med path in college and I would like to pursue a minor in studio art or art history. I love drawing and playing my clarinet as well, and I enjoy writing, whether it be analyzation for English, or creative writing for fun.",
    photo: luciaPhoto, 
  }
];

export default function MeetTheOfficers() {
  return (
    <div className="min-h-screen bg-green-50/50 px-6 py-16">
      <div className="max-w-6xl mx-auto">

        <div className="mb-14">
          <h1 className="text-4xl text-[#32567F] font-serif font-bold mb-4">
            Meet the Officers
          </h1>
          <p className="text-muted-foreground font-serif max-w-2xl">
            The people behind curingwithCARE.
          </p>
          <div className="mt-8 h-px bg-black/10 w-full" />
        </div>

        {officers.length === 0 ? (
          <p className="text-muted-foreground font-serif">
            Officer profiles coming soon.
          </p>
        ) : (
          <div className="flex flex-col gap-16">
            {officers.map((officer, index) => (
              <div key={index} className="flex flex-col sm:flex-row gap-8 items-start">
                <img
                  src={officer.photo}
                  alt={officer.name}
                  className="w-52 h-52 object-cover rounded-sm flex-shrink-0"
                />
                <div className="flex flex-col gap-2">
                  <h2 className="text-2xl font-serif font-semibold text-[#32567F]">
                    {officer.name}
                  </h2>
                  <p className="text-sm font-serif tracking-widest uppercase text-muted-foreground">
                    {officer.title}
                  </p>
                  <p className="text-muted-foreground font-serif leading-relaxed mt-2">
                    {officer.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
}
