import fs from "fs";
import path from "path";
import CustomLayout from "@components/CustomLayout";
import Pagination from "@components/Pagination";
import Post from "@components/Post";
import CategoryList from "@components/CategoryList";
import { POST_PER_PAGE } from "@config/index";
import { PostType } from "@appTypes/index";
import { getPosts } from "@utils/posts";

interface BlogPageProps {
  posts: PostType[];
  numPages: number;
  currentPage: number;
  categories: string[];
}

export default function BlogPage({
  posts,
  numPages,
  currentPage,
  categories
}: BlogPageProps) {
  return (
    <CustomLayout title="Markdown Blog | Homepage">
      <>
        <div className="flex justify-between">
          <div className="w-3/4 mr-10">
            <h1 className="text-5xl border-b-4 p-5 font-bold">Posts</h1>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
              {posts.map((post) => (
                <Post
                  key={post.slug}
                  post={post.frontmatter}
                  slug={post.slug}
                />
              ))}
            </div>
            <Pagination currentPage={currentPage} numPages={numPages} />
          </div>
          <div className="w-1/4">
            <CategoryList categories={categories} />
          </div>
        </div>
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
  // this checks the index of the pagination
  const page = parseInt((params && params.page_index) || 1);
  // we need all the files to settle the pagination number
  const files = fs.readdirSync(path.join("posts"));
  // method that will bring all posts
  const posts = getPosts();
  // Get categories for sidebar
  const categories = posts.map((post) => post.frontmatter.category);
  const uniqueCategories = [...new Set(categories)];
  // creates the number of pages
  const numPages = Math.ceil(files.length / POST_PER_PAGE);
  // the index should be 1 lower
  const pageIndex = page - 1;
  // slices the info in table of different posts depoengin on posts per page
  const orderedPosts = posts.slice(
    pageIndex * POST_PER_PAGE,
    (pageIndex + 1) * POST_PER_PAGE
  );
  return {
    props: {
      posts: orderedPosts,
      numPages,
      currentPage: page,
      categories: uniqueCategories
    }
  };
}
