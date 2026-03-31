'use client';

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  const scrollRef = useRef<HTMLDivElement>(null);

  // Helper function for the carousel buttons
  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const scrollAmount = clientWidth / 2;
      const scrollTo = direction === "left" ? scrollLeft - scrollAmount : scrollLeft + scrollAmount;

      scrollRef.current.scrollTo({
        left: scrollTo,
        behavior: "smooth",
      });
    }
  };

  // The 'slug' here MUST match the keys in your MENU_DATA object
  const menuItems = [
    { name: "BURGERS", src: "/burger.png", slug: "burgers" },
    { name: "COFFEE", src: "/coffee1.png", slug: "coffee" },
    { name: "PASTA", src: "/pasta.png", slug: "pasta" },
    { name: "NON-COFFEE", src: "/non coffee.png", slug: "non-coffee" },
    { name: "DESSERTS", src: "/cookie.png", slug: "desserts" },
    { name: "RICE BOWLS", src: "/ricebowl.png", slug: "rice-bowls" },
  ];

  return (
    <main>
      {/* Hero Section */}
      <section className="relative w-full h-[60vh]">
        <Image
          src="/bgc coffee.jpg"
          alt="Coffee Shop Hero"
          fill
          priority
          className="object-cover"
        />
      </section>

      {/* Categories Selection Section */}
      <section className="bg-gray-100 py-20 px-4 relative">
        <h2 className="text-center text-2xl font-black mb-16 text-black tracking-widest uppercase">
          What would you like to order?
        </h2>

        <div className="max-w-7xl mx-auto relative px-4">
          {/* Left Navigation Arrow */}
          <button
            onClick={() => scroll("left")}
            className="absolute -left-4 top-1/2 -translate-y-1/2 z-20 bg-white/90 p-3 rounded-full shadow-lg hover:bg-white transition-all active:scale-90"
            aria-label="Scroll Left"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="black" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
            </svg>
          </button>

          {/* The Horizontal Scrolling Container */}
          <div
            ref={scrollRef}
            className="flex gap-6 overflow-x-auto snap-x snap-mandatory no-scrollbar pb-12"
          >
            {menuItems.map((item, index) => (
              <div key={index} className="min-w-70 flex-1 snap-center shrink-0 pt-24">
                {/* DYNAMIC LINK: Redirects to /menu/[slug] */}
                <Link href={`/menu/${item.slug}`} className="block group">
                  <div className="bg-gray-300 rounded-[40px] p-8 text-center shadow-md relative h-52 flex flex-col justify-end transition-all duration-300 group-hover:shadow-xl group-hover:bg-gray-200">
                    
                    {/* Floating Product Image */}
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 drop-shadow-2xl transition-transform duration-500 group-hover:-translate-y-[60%] group-hover:scale-110">
                      <Image
                        src={item.src}
                        alt={item.name}
                        fill
                        className="object-contain"
                      />
                    </div>

                    <p className="font-black text-xl text-black tracking-tighter uppercase mb-4">
                      {item.name}
                    </p>
                  </div>
                </Link>
              </div>
            ))}
          </div>

          {/* Right Navigation Arrow */}
          <button
            onClick={() => scroll("right")}
            className="absolute -right-4 top-1/2 -translate-y-1/2 z-20 bg-white/90 p-3 rounded-full shadow-lg hover:bg-white transition-all active:scale-90"
            aria-label="Scroll Right"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="black" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
            </svg>
          </button>
        </div>
      </section>

      {/* Global Style to hide scrollbars while keeping functionality */}
      <style jsx global>{`
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </main>
  );
}