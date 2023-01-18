import fs from "fs";
import path from "path";
import matter from "gray-matter";
import Link from "next/link";
import CustomLayout from "@components/CustomLayout";
import Pagination from "@components/Pagination";
import Post from "@components/Post";
import { POST_PER_PAGE } from "@config/index";
import { PostType } from "@types/index";
import { sortByStartDate } from "@utils/index";

interface BlogPageProps {
  posts: PostType[];
  numPages: number;
  currentPage: number;
}

export default function BlogPage({
  posts,
  numPages,
  currentPage
}: BlogPageProps) {
  return (
    <CustomLayout title="Markdown Blog | Homepage">
      <>
        <h1 className="text-5xl border-b-4 p-5 font-bold">Posts</h1>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {posts.map((post) => (
            <Post key={post.slug} post={post.frontmatter} slug={post.slug} />
          ))}
        </div>
        <Pagination currentPage={currentPage} numPages={numPages} />
      </>
    </CustomLayout>
  );
}

export async function getStaticPaths() {
  const files = fs.readdirSync(path.join("posts"));
  const numPages = Math.ceil(files.length / POST_PER_PAGE);
  let paths = [];
  for (let i = 1; i <= numPages; i++) {
    paths.push({
      params: { page_index: i.toString() }
    });
  }
  return {
    paths,
    fallback: false
  };
}

export async function getStaticProps({ params }: { params: any }) {
  const page = parseInt((params && params.page_index) || 1);
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

  const numPages = Math.ceil(files.length / POST_PER_PAGE);
  const pageIndex = page - 1;
  const orderedPosts = posts
    .sort(sortByStartDate)
    .slice(pageIndex * POST_PER_PAGE, (pageIndex + 1) * POST_PER_PAGE);

  return {
    props: {
      posts: orderedPosts,
      numPages,
      currentPage: page
    }
  };
}
