import CustomLayout from "@components/CustomLayout";
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import Link from "next/link";
import { PostType } from "@types/index";
import { sortByStartDate } from "@utils/index";
import Post from "@components/Post";

interface HomeProps {
  posts: PostType[];
}

export default function CategoryBlogPage({ posts }: HomeProps) {
  return (
    <CustomLayout title="Markdown Blog | Homepage">
      <>
        <h1 className="text-5xl border-b-4 p-5 font-bold">Category</h1>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {posts.map((post) => (
            <Post key={post.slug} post={post.frontmatter} slug={post.slug} />
          ))}
        </div>
      </>
    </CustomLayout>
  );
}

export async function getStaticPaths() {
  const files = fs.readdirSync(path.join("posts"));

  const categories = files.map((filename) => {
    const markdownWithMeta = fs.readFileSync(
      path.join("posts", filename),
      "utf-8"
    );
    const { data: frontmatter } = matter(markdownWithMeta);
    return frontmatter.category.toLowerCase();
  });

  const paths = categories.map((category) => ({
    params: { category_params: category }
  }));
  return {
    paths,
    fallback: false
  };
}

export async function getStaticProps({
  params: { category_params }
}: {
  params: { category_params: any };
}) {
  const files = fs.readdirSync(path.join("posts"));
  const posts = files.map((filename) => {
    const slug = filename.replace(".md", "");
    const markdownWithMeta = fs.readFileSync(
      path.join("posts", filename),
      "utf-8"
    );
    const { data: frontmatter } = matter(markdownWithMeta);
    return {
      slug,
      frontmatter
    };
  });
  /// Filter posts by category
  const categoryPosts = posts.filter(
    (post) => post.frontmatter.category.toLowerCase() === category_params
  );
  return {
    props: { posts: categoryPosts.sort(sortByStartDate).slice(0, 6) }
  };
}
