import React from "react";
import { FrontMatterType, SlugType } from "@types/index";
import Post from "@components/Post";

type SearchResultsProps = {
  results: { frontmatter: FrontMatterType; slug: SlugType }[];
};

export default function SearchResults({ results }: SearchResultsProps) {
  if (results.length === 0) return <></>;

  return (
    <div className="absolute top-20 right-0 md:right-10 z-10 border-4 border-gray-500 bg-white text-black w-full md:w-6/12 rounded-2xl">
      <div className="p-10">
        <h2 className="text-3xl mb-3">{results.length} Results</h2>
        {results.map((result, idx) => (
          <Post
            key={idx}
            post={result.frontmatter}
            compact={true}
            slug={result.slug}
          />
        ))}
      </div>
    </div>
  );
}
