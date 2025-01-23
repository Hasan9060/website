import Image from "next/image";
import Feature from "@/components/Feature";
import Products from "../query/Products/page";
import Link from "next/link";

const ShopPage = () => {


  const totalPages = 4; // Update this based on your total number of products/pages


  return (
    <>
      <div>
        <Image
          src={"/images/shop.svg"}
          alt="shop"
          width={1440}
          height={316}
          className="w-full h-auto mt-20"
        />
      </div>
      {/* Filter, Show, and Sort */}
      <div className="h-auto bg-[#F9F1E7] flex flex-col sm:flex-row items-center justify-between p-2 sm:p-4">
        <div className="flex flex-wrap items-center justify-center sm:justify-evenly space-x-4 sm:space-x-8 w-full">
          <Image
            src="/images/dotted-line.svg"
            alt="dotted-line"
            width={25}
            height={25}
          />
          <Link href={'/search'}>
          <h3
            className="text-[14px] sm:text-[18px] md:text-[20px] font-semibold cursor-pointer"
          >
            Filter
          </h3>
          </Link>
          <Image
            src="/images/four-dot.svg"
            alt="four-dot"
            width={25}
            height={25}
          />
          <Image
            src="/images/square-line.svg"
            alt="square-line"
            width={25}
            height={25}
          />
        </div>
        <div className="flex flex-wrap items-center justify-between sm:space-x-4 mt-2 sm:mt-0 w-full">
          <span className="text-xs sm:text-sm md:text-base">
            Showing 1 of 25 results
          </span>
          <span className="text-xs sm:text-sm md:text-base">Show</span>

          <div
            className="w-[45px] sm:w-[55px] h-[45px] sm:h-[55px] bg-white flex items-center justify-center cursor-pointer"
            
          >
            <h3 className="text-[#333333] text-xs sm:text-sm md:text-base">
             
            </h3>
          </div>

          <span className="text-xs sm:text-sm md:text-base">Sort by</span>

          <div
            className="w-[45px] sm:w-[55px] h-[45px] sm:h-[55px] bg-white flex items-center justify-center cursor-pointer"
            
          >
            <h3 className="text-[#333333] text-xs sm:text-sm md:text-base">
              
            </h3>
          </div>
        </div>
      </div>

      {/* Products Section */}
      <Products />

      

      <Feature />
    </>
  );
};

export default ShopPage;
