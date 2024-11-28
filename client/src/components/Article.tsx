import React from 'react';
import { Link } from 'react-router-dom';
import { Article } from '../types';

interface ArticleCardProps {
  article: Article;
}

export const ArticleCard: React.FC<ArticleCardProps> = ({ article }) => {
  return (
    <article className="py-6 border-b">
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-2">
          <img
            src={article.author.avatar || "/placeholder.svg?height=24&width=24"}
            alt={article.author.name}
            className="rounded-full h-6 w-6"
          />
          <span className="text-sm font-medium">{article.author.name}</span>
          <span className="text-sm text-gray-500">·</span>
          <time className="text-sm text-gray-500">
            {new Date(article.publishedAt).toLocaleDateString()}
          </time>
        </div>
        <button className="text-gray-500">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-4 w-4">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z" />
          </svg>
        </button>
      </div>
      <div className="grid grid-cols-12 gap-4 mt-4">
        <div className="col-span-8">
          <Link to={`/article/${article.id}`}>
            <h2 className="text-xl font-bold mb-2 line-clamp-2">{article.title}</h2>
            <p className="text-gray-500 line-clamp-3">{article.subtitle}</p>
          </Link>
          <div className="flex items-center gap-4 mt-4 text-sm text-gray-500">
            <span>{article.readingTime} min read</span>
            <span>·</span>
            <span>{article.views} views</span>
            <span>·</span>
            <span>{article.comments} comments</span>
          </div>
        </div>
        {article.image && (
          <div className="col-span-4">
            <img
              src={article.image}
              alt={article.title}
              className="w-full aspect-square object-cover rounded-lg"
            />
          </div>
        )}
      </div>
    </article>
  );
};

