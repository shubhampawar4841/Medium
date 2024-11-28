import React from 'react';
import { StaffPick } from '../types';

interface StaffPicksProps {
  picks: StaffPick[];
}

export const StaffPicks: React.FC<StaffPicksProps> = ({ picks }) => {
  return (
    <div className="p-6">
      <h2 className="font-bold mb-4">Staff Picks</h2>
      <div className="space-y-6">
        {picks.map((pick) => (
          <article key={pick.id} className="space-y-2">
            <div className="flex items-center gap-2">
              <img
                src={pick.author.avatar || "/placeholder.svg?height=20&width=20"}
                alt={pick.author.name}
                className="rounded-full h-5 w-5"
              />
              <span className="text-sm font-medium">{pick.author.name}</span>
            </div>
            <h3 className="font-bold line-clamp-2">{pick.title}</h3>
            <time className="text-sm text-gray-500">
              {pick.publishedAt}
            </time>
          </article>
        ))}
      </div>
    </div>
  );
};

