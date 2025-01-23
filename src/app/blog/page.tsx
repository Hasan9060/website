"use client"
import React, { useState } from 'react';
import Image from 'next/image';

interface BlogPost {
  src: string;
  title: string;
  date: string;
  category: string;
  excerpt: string;
}

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const BlogPage: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const postsPerPage = 3;

  const blogPosts: BlogPost[] = [
    {
      src: '/images/laptop.png',
      title: 'Going all-in with millennial design',
      date: '14 Oct 2022',
      category: 'Wood',
      excerpt: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit...',
    },
    {
      src: '/images/drawing.png',
      title: 'Exploring new ways of decorating',
      date: '14 Oct 2022',
      category: 'Wood',
      excerpt: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit...',
    },
    {
      src: '/images/book.png',
      title: 'Handmade pieces that took time to make',
      date: '14 Oct 2022',
      category: 'Wood',
      excerpt: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit...',
    },
    {
      src: '/images/office1.jpg',
      title: 'Modern home in Milan',
      date: '03 Aug 2022',
      category: 'Design',
      excerpt: 'Discover the latest trends in home design...',
    },
    {
      src: '/images/office2.jpg',
      title: 'Colorful office redesign',
      date: '10 Sep 2022',
      category: 'Interior',
      excerpt: 'A vibrant take on workplace transformation...',
    },
    {
      src: '/images/office3.jpg',
      title: 'Cozy Living Room Ideas',
      date: '25 Nov 2022',
      category: 'Interior',
      excerpt: 'Transform your living room into a cozy retreat with these design tips...',
    },
    {
      src: '/images/office4.jpg',
      title: 'Scandinavian Minimalism in Homes',
      date: '12 Oct 2022',
      category: 'Design',
      excerpt: 'Explore the simplicity and beauty of Scandinavian interior design...',
    },
    {
      src: '/images/office5.jpg',
      title: 'Modern Kitchen Trends',
      date: '05 Jan 2023',
      category: 'Crafts',
      excerpt: 'Bring modernity to your kitchen with these trending ideas...',
    },
    {
      src: '/images/office6.jpg',
      title: 'Outdoor Patio Decor',
      date: '18 Aug 2022',
      category: 'Handmade',
      excerpt: 'Get inspired with creative ways to decorate your patio...',
    },
    {
      src: '/images/office8.jpg',
      title: 'Gallery Wall Styling Tips',
      date: '30 Sep 2022',
      category: 'Design',
      excerpt: 'Learn how to curate and style a gallery wall for your space...',
    },
    {
      src: '/images/office9.jpg',
      title: 'Creating a Serene Bedroom',
      date: '14 Feb 2023',
      category: 'Interior',
      excerpt: 'Design a peaceful bedroom that promotes relaxation and sleep...',
    },
    

  ];

  const totalPages = Math.ceil(blogPosts.length / postsPerPage);

  const handlePagination = (page: number) => {
    setCurrentPage(page);
  };

  const displayedPosts = blogPosts.slice(
    (currentPage - 1) * postsPerPage,
    currentPage * postsPerPage
  );

  return (
    <>
      {/* Banner Section */}
      <div>
        <Image
          src="/images/blog.png"
          alt="blog"
          width={1440}
          height={316}
          className="w-full h-auto mt-20"
        />
      </div>

      {/* Main Content */}
      <div className="flex flex-col lg:flex-row lg:justify-between items-start px-4 lg:px-0">
        {/* Left Section */}
        <div className="lg:w-1/2 lg:ml-12">
          {displayedPosts.map((post, index) => (
            <div key={index}>
              <Image
                src={post.src}
                alt={post.title}
                width={817}
                height={500}
                className="mt-8 lg:mt-28 w-full hover:scale-105"
              />
              <div className="flex items-center gap-2 lg:gap-4 mt-2">
                <Image src="/images/user.svg" alt="user-img" width={20} height={20} />
                <h3 className="text-[#333333] text-sm lg:text-base">Admin</h3>
                <Image src="/images/briefcase.svg" alt="briefcase-img" width={20} height={20} />
                <h3 className="text-[#333333] text-sm lg:text-base">{post.date}</h3>
                <Image src="/images/wood.svg" alt="wood-img" width={20} height={20} />
                <h3 className="text-[#333333] text-sm lg:text-base">{post.category}</h3>
              </div>
              <h1 className="text-[20px] lg:text-[30px] font-semibold my-4">{post.title}</h1>
              <p className="text-[#333333] mb-8 text-sm lg:text-base">{post.excerpt}</p>
              <span className="border-b border-black text-sm cursor-pointer">Read More</span>
            </div>
          ))}
        </div>

        {/* Right Section */}
        <div className="lg:w-1/2 lg:mr-20 lg:ml-20 mt-10 lg:mt-28">
          {/* Search Bar */}
          <div className="flex items-center justify-end w-full lg:w-[311px] h-[58px] border px-4 botext-[#333333] rounded-md">
            <input
              type="text"
              placeholder="Search..."
              className="flex-grow outline-none bg-transparent text-gray-700 placeholder-gray-400"
            />
            <button className="text-gray-500 hover:text-black">
              <Image src="/images/research.svg" alt="search-img" width={20} height={20} />
            </button>
          </div>

          {/* Categories */}
          <h1 className="text-[20px] lg:text-[24px] font-semibold mt-10">Categories</h1>
          <div className="space-y-4 lg:space-y-6">
            {[
              { name: 'Crafts', count: 2 },
              { name: 'Design', count: 8 },
              { name: 'Handmade', count: 7 },
              { name: 'Interior', count: 1 },
              { name: 'Wood', count: 6 },
            ].map((category) => (
              <div key={category.name} className="flex justify-between text-sm lg:text-base">
                <h3>{category.name}</h3>
                <span>{category.count}</span>
              </div>
            ))}
          </div>

          {/* Recent Posts */}
          <h1 className="text-[24px] font-semibold mb-8">Recent Posts</h1>
          <div className="space-y-6">
            {blogPosts.slice(0, 5).map((post, index) => (
              <div key={index} className="flex items-center space-x-4">
                <Image
                  src={post.src}
                  alt={`Image of ${post.title}`}
                  width={80}
                  height={80}
                  className="rounded-lg"
                />
                <div className="flex flex-col">
                  <h2 className="font-semibold text-[14px] w-[200px]">{post.title}</h2>
                  <span className="text-[#333333]">{post.date}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Pagination */}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePagination}
      />
    </>
  );
};

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className="flex items-center justify-center gap-2 lg:gap-8 mt-10 lg:mt-14">
      {pages.map((page) => (
        <div
          key={page}
          className={`w-[40px] lg:w-[60px] h-[40px] lg:h-[60px] flex items-center justify-center cursor-pointer ${
            page === currentPage ? 'bg-[#B88E2F] text-white' : 'bg-[#F9F1E7]'
          }`}
          onClick={() => onPageChange(page)}
        >
          {page}
        </div>
      ))}
    </div>
  );
};

export default BlogPage;
