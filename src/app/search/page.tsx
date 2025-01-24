"use client";
import React from "react";
import sanityClient from "@sanity/client";
import Image from "next/image";
import Link from "next/link";

const client = sanityClient({
  projectId: "2srh4ekv",
  dataset: "productions",
  token: "skz6lWFJkAgpfrjXgwK8Tb6UBsTpRcSwzsQawON5Qps118XQdODrtVLdyXySTgJqC7rhPUKAOzb9prGs2aORcV0IICFN6pLKCLW2G0P7u5rExc8E92fzYp0UMuro6VpCzm51svtpWMCniHWaEiZAeJApDrYyIXgO5Uar4GLM2QPxFsswwZnU",
  useCdn: true,
});

interface Product {
  _id: string;
  title: string;
  price: number;
  description: string;
  discountPercentage: number;
  imageUrl: string;
  productImage: {
    asset: {
      _ref: string;
    };
  };
  tags: string[];
  slug: string;
  Image: string;
}

const ProductSearch = () => {
  const [searchTerm, setSearchTerm] = React.useState("");
  const [filteredProducts, setFilteredProducts] = React.useState<Product[]>([]);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const query = `
          *[_type == "product" && title match "${searchTerm}*"] {
            _id,
        title,
        price,
        description,
        discountPercentage,
        "imageUrl": productImage.asset->url,
        tags,
        category,
        "slug": slug.current
          }`;
        const results = await client.fetch(query);
        setFilteredProducts(results);
      } catch (error) {
        console.error("Error fetching filtered products:", error);
      }
    };

    if (searchTerm.trim() !== "") {
      fetchData();
    } else {
      setFilteredProducts([]);
    }
  }, [searchTerm]);

  return (
    <div className="mt-28">
      {/* Search Form */}
      <form className="relative w-max mx-auto">
        <input
          type="search"
          name="search"
          id="search"
          value={searchTerm}
          onChange={handleSearchChange}
          className="relative peer z-10 bg-transparent w-96 h-12 rounded-full border cursor-pointer hover:cursor-text focus:cursor-text outline-none pl-12"
          placeholder="Search..."
        />
        <Image
          src="/images/search-icon.svg"
          alt="search"
          width={24}
          height={24}
          className="w-6 h-6 cursor-pointer absolute inset-y-0 my-auto px-3.4 ml-3 hover:opacity-80"
        />
      </form>

      {/* Product List */}
      <div className="product-list p-4">
        <h1 className="text-[#333333] text-[30px] text-center font-bold mb-6">Our Products</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <div
                key={product._id}
                className="bg-[#F4F5F7] shadow-md rounded-lg p-4 hover:shadow-lg transition-shadow duration-300"
              >
                <Link href={`/product/${product.slug}`}>
                <Image
                  src={product.imageUrl}
                  alt={product.title}
                  width={285}
                  height={301}
                  className="w-full h-52 object-cover rounded-md cursor-pointer"
                />
                </Link>
                <div className="mt-4">
                
                    <h2 className="text-[24px] font-semibold text-[#3A3A3A] mt-4 hover:underline">
                      {product.title}
                    </h2>
                  
                  <p className="text-sm text-gray-600 line-clamp-1">{product.description}</p>
                  <div className="mt-2 flex items-center justify-between">
                    <p className="text-[20px] font-semibold">${product.price}</p>
                    {product.discountPercentage > 0 && (
                      <span className="text-red-500 text-sm">
                        -{product.discountPercentage}% OFF
                      </span>
                    )}
                  </div>
                </div>
                <div className="flex flex-wrap gap-2 mt-3">
                  {product.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="text-xs bg-slate-300 text-black rounded-full px-3 py-1 whitespace-nowrap"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            ))
          ) : (
            <div className="w-full h-full flex justify-center items-center">
              <p className="text-xl text-center">No products found.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductSearch;
