import Head from "next/head";
import { ReactElement, ReactNode } from "react";
import Header from "./Header";

interface LayoutProps {
  children: ReactNode;
  title: string;
  keywords?: string;
  description?: string;
}

export default function CustomLayout({
  children,
  title,
  keywords,
  description
}: LayoutProps): ReactElement {
  return (
    <div>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="keywords" content={keywords} />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <main className="container mx-auto my-7">{children}</main>
    </div>
  );
}

CustomLayout.defaultProps = {
  title: "Markdown Blog App",
  keywords: "Tech Blog Markdown Next",
  description:
    "This is a Blog where you can write a post and read some elses online"
};
