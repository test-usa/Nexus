import { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";

interface BlogPost {
  id: number;
  title: string;
  date: string;
  excerpt: string;
  content: string;
}

const blogPosts: BlogPost[] = [
  {
    id: 1,
    title: "Getting Started with Tampermonkey",
    date: "March 18, 2025",
    excerpt:
      "Learn how to install and use Tampermonkey to enhance your browsing experience with custom scripts.",
    content:
      "This guide will walk you through the installation and basic usage of Tampermonkey.",
  },
  {
    id: 2,
    title: "Top 5 Tampermonkey Scripts for Productivity",
    date: "March 10, 2025",
    excerpt:
      "Boost your productivity with these powerful user scripts designed to automate tasks and improve workflow.",
    content:
      "We have curated a list of the best Tampermonkey scripts that can enhance your daily workflow.",
  },
  {
    id: 3,
    title: "How to Create Your Own Tampermonkey Scripts",
    date: "March 1, 2025",
    excerpt:
      "A step-by-step guide to writing your own custom scripts to enhance websites and automate repetitive tasks.",
    content:
      "In this tutorial, you will learn how to create and deploy your own Tampermonkey scripts.",
  },
  {
    id: 4,
    title: "Getting Started with Tampermonkey",
    date: "March 18, 2025",
    excerpt:
      "Learn how to install and use Tampermonkey to enhance your browsing experience with custom scripts.",
    content:
      "This guide will walk you through the installation and basic usage of Tampermonkey.",
  },
  {
    id: 5,
    title: "Top 5 Tampermonkey Scripts for Productivity",
    date: "March 10, 2025",
    excerpt:
      "Boost your productivity with these powerful user scripts designed to automate tasks and improve workflow.",
    content:
      "We have curated a list of the best Tampermonkey scripts that can enhance your daily workflow.",
  },
  {
    id: 6,
    title: "How to Create Your Own Tampermonkey Scripts",
    date: "March 1, 2025",
    excerpt:
      "A step-by-step guide to writing your own custom scripts to enhance websites and automate repetitive tasks.",
    content:
      "In this tutorial, you will learn how to create and deploy your own Tampermonkey scripts.",
  },
];

const Blog: React.FC = () => {
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current) {
      gsap.fromTo(
        containerRef.current.children,
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, stagger: 0.2, duration: 0.8, ease: "power3.out" }
      );
    }
  }, [selectedPost]);

  return (
    <div className="min-h-screen bg-[#212020]  py-10 px-5 text-white">
      <div className="max-w-6xl mx-auto p-6">
        <h1 className="text-4xl font-bold text-center mb-10">
          Tampermonkey Blog
        </h1>
        <p className="text-gray-400 text-center mb-6">
          Stay updated with the latest guides and tips on using Tampermonkey.
        </p>
        <div
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
          ref={containerRef}
        >
          {selectedPost ? (
            <div className="col-span-3 bg-gray-900 p-6 rounded shadow-lg">
              <h2 className="text-2xl font-semibold text-yellow-500">
                {selectedPost.title}
              </h2>
              <p className="text-sm text-gray-400">{selectedPost.date}</p>
              <p className="text-gray-300 mt-4">{selectedPost.content}</p>
              <button
                className="mt-4 px-4 py-2 bg-gray-700 text-white rounded hover:bg-gray-600"
                onClick={() => setSelectedPost(null)}
              >
                Back to Blog List
              </button>
            </div>
          ) : (
            blogPosts.map((post) => (
              <div
                key={post.id}
                className="bg-gray-900 p-6 rounded shadow-lg hover:shadow-xl transition-shadow"
              >
                <h2 className="text-xl font-semibold text-yellow-500">
                  {post.title}
                </h2>
                <p className="text-sm text-gray-400">{post.date}</p>
                <p className="text-gray-300 mt-2">{post.excerpt}</p>
                <button
                  className="mt-4 px-4 py-2 bg-yellow-500 text-black font-semibold rounded hover:bg-yellow-600"
                  onClick={() => setSelectedPost(post)}
                >
                  Read More
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Blog;
