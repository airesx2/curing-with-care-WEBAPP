import HoverCardDemo from "../components/HoverCard";
import sampleImg from "../images/sample.jpg"
export default function CreativeCorner() {

    return (
    <div className="min-h-screen bg-green-50/50 px-6 py-16">
      <div className="max-w-6xl mx-auto">

        <div className="mb-14">
          <h1 className="text-4xl text-[#32567F] font-serif  font-bold mb-4">
            Creative Corner
          </h1>
          <p className="text-muted-foreground font-serif max-w-2xl">
            hover the image to view message
          </p>
          <div className="mt-8 h-px bg-black/10 w-full"></div>
          <HoverCardDemo src={sampleImg} alt="creative corner image" className="rounded-xl mt-6"/>
        </div>

    </div>
        
    </div>
)
}







    
