import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { sortByStartDate } from "@utils/index";

const files = fs.readdirSync(path.join("posts"));

export function getPosts() {
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
  return posts.sort(sortByStartDate);
}
