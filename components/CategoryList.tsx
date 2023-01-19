import React, { ReactElement } from "react";
import Link from "next/link";

interface CategoryListProps {
  categories: string[];
}

export default function CategoryList({
  categories
}: CategoryListProps): ReactElement {
  return (
    <div className="w-full p-5 bg-white rounded-lg shadow-md mt-6">
      <h3 className="text-2xl bg-gray-800 text-white p-3 rounded">
        Blog Categories
      </h3>
      <ul className="divide-y divide-gray-300">
        {categories.map((category) => (
          <Link
            key={category}
            href={`/blog/category/${category.toLowerCase()}`}
          >
            <li className="p-4 cursor-pointer hover:bg-gray-50">{category}</li>
          </Link>
        ))}
      </ul>
    </div>
  );
}
