import Link from "next/link";
import Image from "next/image";
import Homeproducts from "../app/query/Homeproducts/page";
import dynamic from "next/dynamic";

const page = () => {

  const LazyComponent = dynamic(() => import('../app/query/Homeproducts/page'), {
    ssr: false,
  });

  return (
    <>
      <div className="relative bg-gray-50">
        {/* Hero Image */}

        <div className="w-full">
          <Image
            src="/images/hero-sec.png"
            alt="hero-section"
            width={1440}
            height={316}
            sizes="(max-width: 768px) 100vw, 100vw"
            className="w-full h-auto mt-20 "
            priority
             fetchPriority="high"
          />
        </div>

       {/* Text Content */}
<div className="absolute top-1/2 right-2 md:right-20 transform -translate-y-1/2 bg-[#EFE7D6] p-3 sm:p-6 md:p-14 rounded-lg shadow-lg max-w-full md:max-w-lg text-left">
  <h2 className="font-poppins font-semibold text-[10px] sm:text-[14px] md:text-[16px] uppercase text-[#333333] tracking-wide">
    New Arrival
  </h2>
  <h1 className="text-[12px] sm:text-lg md:text-3xl font-bold text-[#5A4815] mt-2 sm:mt-3 md:mt-4 mb-2 sm:mb-4">
    Discover Our New Furniture 
    <span className="block sm:inline"> Collection</span>  
  </h1>
  <p className="text-gray-600 mb-2 sm:mb-6 text-[8px] sm:text-xs md:text-base leading-relaxed sm:leading-normal">
    <span className="text-[#4A3A12] block sm:inline">Crafted to perfection with exquisite designs and</span> 
    <span className="text-[#4A3A12] block sm:inline"> unmatched comfort to elevate your living spaces.</span> 
  </p>
  <Link href={'/shop'}>
    <button className="bg-[#8C6D23] text-white text-[10px] sm:text-sm md:text-lg px-4 py-2 sm:px-6 sm:py-3 md:px-8 md:py-4 hover:bg-[#70561C] transition shadow-lg">
      Buy Now
    </button>
  </Link>
</div>
      </div>

      {/* Browse the Range Section */}
      <section className="py-10">
  <h1 className="text-[#333333] text-2xl sm:text-3xl font-bold text-center mt-10">
    Browse The Range
  </h1>
  <p className="text-center text-[#555555] mt-4">
    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
  </p>
  <div className="flex flex-wrap items-center justify-center mt-16 gap-8">
    {["Dining", "Living", "Bedroom"].map((category, index) => (
      <div
        key={index}
        className="flex flex-col items-center max-w-[300px] sm:max-w-full"
      >
        <Image
          src={`/images/img${index + 1}.png`}
          alt={`Explore our ${category} collection`}
          width={381}
          height={480}
          className="w-full h-auto hover:scale-105 transition-transform duration-300"
          quality={75}
          loading="lazy" // Lazy-load images
        />
        <h2 className="text-center text-xl sm:text-2xl font-medium mt-6 text-[#333333]">
          {category}
        </h2>
      </div>
    ))}
  </div>
</section>


      {/* Our Products Section */}
      <section>
        <h1 className="text-[#333333] text-[40px] text-center font-bold mt-14 mb-6">
          Our Products
        </h1>
        <Homeproducts />
        <div className="flex items-center justify-center mt-6">
          <Link href={"/shop"}>
            <button className="w-[245px] h-[48px] bg-[#FFFFFF] border border-[#946F27] text-[#946F27] hover:bg-[#946F27] hover:text-white">
              Show More
            </button>
          </Link>
        </div>
      </section>

      {/* Inspiration Section */}
      <section className="h-auto bg-[#FCF8F3] mt-10 flex flex-col lg:flex-row items-center justify-around">
        <div className="text-center lg:text-left px-6 lg:px-0">
          <h1 className="text-[#333333] text-[32px] sm:text-[36px] md:text-[40px] font-bold w-[90%] md:w-[422px]">
            50+ Beautiful rooms inspiration
          </h1>
          <p className="text-[14px] sm:text-[16px] mt-4 md:mt-6 w-[90%] md:w-[368px]">
            Our designer already made a lot of beautiful prototypes of rooms
            that inspire you.
          </p>
          <Link href={`/explorerrooms`}>
            <button className="w-[70%] md:w-[176px] h-[48px] bg-[#8C6D23] text-[#FFFFFF] mt-8 transition duration-300 ease-in-out hover:bg-[#70561C] hover:scale-105">
              Explore More
            </button>
          </Link>
        </div>
        {["img6", "img5"].map((image, index) => (
          <div key={index} className="mt-8 lg:mt-0">
            <Image
              src={`/images/${image}.png`}
              alt={image}
              width={index === 0 ? 404 : 372}
              height={index === 0 ? 582 : 486}
              className="w-full"
            />
          </div>
        ))}
      </section>

      {/* Social Section */}
      <section className="h-auto mt-32 px-6 md:px-16 lg:px-32">
        <h1 className="text-center text-[18px] sm:text-[20px]">Share your setup with</h1>
        <h1 className="text-center text-[30px] sm:text-[40px] font-bold">
          #FuniroFurniture
        </h1>
        <div className="flex flex-col lg:flex-row items-center justify-center gap-4 mt-8">
          {["last1", "last2", "last3", "last4", "last5", "last6", "last7"].map(
            (image, index) => (
              <Image
                key={index}
                src={`/images/${image}.png`}
                alt={image}
                width={index === 2 ? 295 : index === 6 ? 425 : 451}
                height={index === 2 ? 392 : index === 6 ? 423 : 312}
                className={index === 6 ? "mb-52" : "mb-5"}
              />
            )
          )}
        </div>
      </section>
    </>
  );
};

export default page;
