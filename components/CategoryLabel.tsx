import React from "react";
import Link from "next/link";

interface CategoryLabelProps {
  children: string;
}
export default function CategoryLabel({ children }: CategoryLabelProps) {
  const colorKey: any = {
    javascript: "bg-yellow-600",
    css: "bg-blue-600",
    php: "bg-purple-600",
    python: "bg-green-600",
    ruby: "bg-red-600"
  };
  return (
    <Link href={`/blog/category/${children.toLowerCase()}`}>
      <div
        className={`px-2 py-1 ${
          colorKey[children.toLowerCase()]
        } text-gray-100 font-bold rounded`}
      >
        {children}
      </div>
    </Link>
  );
}
