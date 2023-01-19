import Link from "next/link";
import Image from "next/image";
import { FrontMatterType, SlugType } from "@types/index";
import CategoryLabel from "./CategoryLabel";

interface PostProps {
  post: FrontMatterType;
  slug?: SlugType;
  compact?: boolean;
}

export default function Post({ post, slug, compact }: PostProps) {
  return (
    <div className="w-full px-10 py-6 bg-white rounded-lg shadow-md mt-6">
      {!compact && (
        <Image
          src={post.cover_image}
          alt={post.title}
          height={420}
          width={600}
          className="mb-4 rounded"
        />
      )}
      <div className="flex justify-between items-center">
        <span className="font-light text-gray-600">{post.date}</span>
        <CategoryLabel>{post.category}</CategoryLabel>
      </div>
      <div className="mt-2">
        <Link
          href={`/blog/${slug}`}
          className="text-2xl text-gray-700 font-bold hover:underline"
        >
          {post.title}
        </Link>
        <p className="mt-2 text-gray-600">{post.excerpt}</p>

        {!compact && (
          <div className="flex justify-between items-center mt-6">
            <Link
              href={`/blog/${slug}`}
              className="text-gray-900 hover:text-blue-600"
            >
              Read More
            </Link>
            <div className="flex items-center">
              <Image
                src={post.author_image}
                alt="author"
                width={35}
                height={35}
                className="mx-4 object-cover rounded-full hidden sm:block"
              />
              <h3 className="text-gray-700 font-bold">{post.author}</h3>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
