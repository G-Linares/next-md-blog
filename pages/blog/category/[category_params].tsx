import fs from "fs";
import path from "path";
import matter from "gray-matter";
import CustomLayout from "@components/CustomLayout";
import { PostType } from "@types/index";
import Post from "@components/Post";
import CategoryList from "@components/CategoryList";
import { getPosts } from "@utils/posts";

interface HomeProps {
  posts: PostType[];
  categoryName: string;
  categories: string[];
}

export default function CategoryBlogPage({
  posts,
  categoryName,
  categories
}: HomeProps) {
  return (
    <CustomLayout title="Markdown Blog | Homepage">
      <>
        <div className="flex justify-between">
          <div className="w-3/4 mr-10">
            <h1 className="text-5xl border-b-4 p-5 font-bold">
              Posts in {categoryName}
            </h1>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
              {posts.map((post) => (
                <Post
                  key={post.slug}
                  post={post.frontmatter}
                  slug={post.slug}
                />
              ))}
            </div>
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
  const posts = getPosts();
  // Get categories for sidebar
  const categories = posts.map((post) => post.frontmatter.category);
  const uniqueCategories = [...new Set(categories)];
  /// Filter posts by category
  const categoryPosts = posts.filter(
    (post) => post.frontmatter.category.toLowerCase() === category_params
  );
  return {
    props: {
      posts: categoryPosts,
      categoryName: category_params,
      categories: uniqueCategories
    }
  };
}
