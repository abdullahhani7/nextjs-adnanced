import PostItem from "@/components/PostItem/PostItem";
import { TPostsResponse } from "../_utils/types";

const Page = async () => {
  const res = await fetch("https://dummyjson.com/posts", {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to get data!!sss");
  }
  const data: TPostsResponse = await res.json();

  const posts = data.posts;

  return (
    <div className="flex items-center justify-center flex-wrap gap-7">
      {posts.map((post) => (
        <PostItem key={post.id} post={post} />
      ))}
    </div>
  );
};

export default Page;
