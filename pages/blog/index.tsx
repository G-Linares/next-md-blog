import CustomLayout from "@components/CustomLayout";
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import Link from "next/link";
import { PostType } from "@types/index";
import { sortByStartDate } from "@utils/index";
import Post from "@components/Post";

interface AllPostsType {
  posts: PostType[];
}

export default function AllPosts({ posts }: AllPostsType) {
  return (
    <CustomLayout title="Markdown Blog | All Posts">
      <>
        <h1 className="text-5xl border-b-4 p-5 font-bold">Blog | All Posts</h1>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {posts.map((post) => (
            <Post key={post.slug} post={post.frontmatter} slug={post.slug} />
          ))}
        </div>
      </>
    </CustomLayout>
  );
}

export async function getStaticProps() {
  const files = fs.readdirSync(path.join("posts"));

  const posts = files.map((filename) => {
    const slug = filename.replace(".md", "");
    const markdownWithMeta = fs.readFileSync(
      path.join("posts", filename),
      "utf-8"
    );
    // gray matter will convert a font-matter string to an object
    const { data: frontmatter } = matter(markdownWithMeta);
    return {
      slug,
      frontmatter
    };
  });

  return {
    props: { posts: posts.sort(sortByStartDate) }
  };
}
