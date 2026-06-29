export type Blog = {
  id: number;
  title: string;
  author: string;
  url: string;
  likes: number;
};

const blogs: Blog[] = [
  {
    id: 1,
    title: "Next.js App Router Deep Dive",
    author: "Jane Doe",
    url: "https://example.com/nextjs-app-router",
    likes: 12,
  },
  {
    id: 2,
    title: "React Server Components Explained",
    author: "John Smith",
    url: "https://example.com/rsc-explained",
    likes: 8,
  },
  {
    id: 3,
    title: "TypeScript Best Practices for React",
    author: "Alice Johnson",
    url: "https://example.com/typescript-react",
    likes: 15,
  },
];

let nextId = 4;

export const getBlogs = () => blogs;

export const getBlogById = (id: number) =>
  blogs.find((blog) => blog.id === id);

export const addBlog = (
  title: string,
  author: string,
  url: string
): Blog => {
  const newBlog = { id: nextId++, title, author, url, likes: 0 };
  blogs.unshift(newBlog);
  return newBlog;
};

export const likeBlog = (id: number) => {
  const blog = blogs.find((blog) => blog.id === id);
  if (blog) {
    blog.likes += 1;
  }
};
