import { Cursor, useTypewriter } from "react-simple-typewriter";
import oldMan from "../../public/oldman.jpg";
import Navbar from "./Navbar";
import { CardSpotlight } from "./CardSpotlight";

const Hero = () => {
  const [text] = useTypewriter({
    words: ['one story at a time!', 'discover worlds within words!', 'let your mind wander!'],
    loop: true
  });

  return (
    <>
      {/* <Navbar /> */}
      <div className="relative hero-container h-screen flex items-center justify-center bg-slate-950">
        <img src={oldMan} alt="Old Man" className="absolute w-full h-full object-cover z-0 brightness-60 contrast-70 blur-sm" />
        <div className="relative z-10 text-center text-[#A6ADBB] p-4 bg-black bg-opacity-30 rounded-lg max-w-2xl mx-auto">
          <h1 className="text-4xl font-bold">
            Ignite your imagination, <span className="text-[#b6d07a]">{text}</span><Cursor />
          </h1>
          <p className="mt-4">
            Craving a captivating escape? Dive into a world of endless possibilities at literaryLane. Explore our vast collection of books, from timeless classics to modern masterpieces. Indulge in free reads or own your favorite stories. Let the pages transport you to distant lands, ignite your imagination, and enrich your soul. Your literary journey starts here.
          </p>
          <label className="input input-bordered flex items-center gap-2 mt-4">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="h-4 w-4 opacity-70">
              <path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
              <path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
            </svg>
            <input type="text" className="grow" placeholder="Email" />
          </label>
          <button className="btn mt-6 hover:bg-[#b6d07a] hover:text-black">Get Started</button>
          {/* <CardSpotlight></CardSpotlight> */}
        </div>
        {/* <CardSpotlight></CardSpotlight> */}
      </div>

      
    </>
  );
};

export default Hero;
