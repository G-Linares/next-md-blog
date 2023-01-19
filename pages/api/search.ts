import type { NextApiRequest, NextApiResponse } from "next";
import fs from "fs";
import path from "path";
import matter from "gray-matter";

type Data = {
  results: any;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  let posts;
  if (process.env.NODE_ENV === "production") {
    // Fetch from cache
    posts = require("../../cache/data").posts;
  } else {
    console.log("develoment");
    const files = fs.readdirSync(path.join("posts"));
    posts = files.map((filename) => {
      //getting the slug as well
      const slug = filename.replace(".md", "");
      const markdownWithMeta = fs.readFileSync(
        path.join("posts", filename),
        "utf-8"
      );
      const { data: frontmatter } = matter(markdownWithMeta);
      return {
        frontmatter,
        slug
      };
    });
  }
  const results = posts?.filter(
    ({ frontmatter: { title, excerpt, category } }: any) =>
      title.toLowerCase().indexOf(req.query.q) != -1 ||
      excerpt.toLowerCase().indexOf(req.query.q) != -1 ||
      category.toLowerCase().indexOf(req.query.q) != -1
  );
  res.status(200).json({ results: results });
}
