import CustomLayout from "@components/CustomLayout";
import Link from "next/link";
import { PostType } from "@appTypes/index";
import Post from "@components/Post";
import { getPosts } from "@utils/posts";

interface HomeProps {
  posts: PostType[];
}

export default function Home({ posts }: HomeProps) {
  return (
    <CustomLayout title="Markdown Blog | Homepage">
      <>
        <h1 className="text-5xl border-b-4 p-5 font-bold">Latest Posts</h1>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {posts.map((post) => (
            <Post key={post.slug} post={post.frontmatter} slug={post.slug} />
          ))}
        </div>
        <Link
          href="/blog"
          className="block text-center border border-gray-500 text-gray-800 rounded-md py-4 my-5 transition duration-500 ease select-none hover:text-white hover:bg-gray-900 focus:outline-none focus:shadow-outline w-full"
        >
          All Posts
        </Link>
      </>
    </CustomLayout>
  );
}

export async function getStaticProps() {
  return {
    props: { posts: getPosts().slice(0, 6) }
  };
}
