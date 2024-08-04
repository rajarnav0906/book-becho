const Hero = () => {
  return (
    <>
      <div className="flex max-w-screen-2xl container mx-auto md:px-20 px-4 md:flex-row flex-col">
        <div className="md: w-1/2 w-full md:mt-52 mt-12">
          <div className="space-y-8">
            <h1 className="text-4xl bold">
              Ignite your imagination, one story at a time
            </h1>
            <p>
              Craving a captivating escape? Dive into a world of endless
              possibilities at LiteraryLane. Explore our vast collection of
              books, from timeless classics to modern masterpieces. Indulge in
              free reads or own your favorite stories. Let the pages transport
              you to distant lands, ignite your imagination, and enrich your
              soul. Your literary journey starts here.
            </p>
            <label className="input input-bordered flex items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                fill="currentColor"
                className="h-4 w-4 opacity-70"
              >
                <path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
                <path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
              </svg>
              <input type="text" className="grow" placeholder="Email" />
            </label>
          </div>
        </div>
        <div className="md: w-1/2 w-full ">Right</div>
      </div>
    </>
  );
};

export default Hero;
