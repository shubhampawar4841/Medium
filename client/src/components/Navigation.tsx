import React from 'react';

const topics = [
  "For you",
  "Following",
  "Docker",
  "Typescript",
  "Leadership",
  "Android",
  "Society",
  "Technology",
  "Programming",
  "Politics"
];

export const Navigation: React.FC = () => {
  return (
    <nav className="border-b overflow-x-auto">
      <div className="flex items-center px-4 max-w-7xl mx-auto">
        <button className="shrink-0 p-2">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-4 w-4">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
        <div className="flex space-x-4 p-4 whitespace-nowrap">
          {topics.map((topic) => (
            <button
              key={topic}
              className={`px-4 py-2 rounded-full ${topic === "For you" ? "bg-gray-200" : "hover:bg-gray-100"}`}
            >
              {topic}
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
};

