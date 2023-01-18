export type SlugType = string;

export type FrontMatterType = {
  title: string;
  date: string;
  excerpt: string;
  cover_image: string;
  category: string;
  author: string;
  author_image: string;
};

export interface PostType {
  slug: SlugType;
  frontmatter: FrontMatterType;
}
