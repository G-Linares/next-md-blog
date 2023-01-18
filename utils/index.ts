// import { PostType } from "@types/index";

// need to investigate why the Type is not accepted even though the variablea re well set
// when I add the post Tuype to a and b it breaks, that's why they are in any

export const sortByStartDate = (a: any, b: any) => {
  return +new Date(b.frontmatter.date) - +new Date(a.frontmatter.date);
};
