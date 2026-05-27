// src/pages/MeetTheOfficers.jsx
const officers = [
  // Add officers here. Example:
  // {
  //   name: "Jane Doe",
  //   title: "President",
  //   description: "Jane is a junior studying Biology...",
  //   photo: "/officers/jane.jpg",
  // },
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
