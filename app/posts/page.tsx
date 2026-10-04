"use client";

import PostItem from "@/components/PostItem/PostItem";
import { TPost } from "../_utils/types";
import { useEffect, useState } from "react";
import axios from "axios";

const Page = () => {
  // const res = await fetch("https://dummyjson.com/posts", {
  //   cache: "no-store",
  // });

  // if (!res.ok) {
  //   throw new Error("Failed to get data!!sss");
  // }
  // const data: TPostsResponse = await res.json();

  // const posts = data.posts;

  const [posts, setPosts] = useState<TPost[]>([]);

  const getPosts = async () => {
    try {
      const res = await axios.get("https://dummyjson.com/posts");
      // console.log(res.data.posts)
      setPosts(res.data.posts);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getPosts();
  }, []);

  return (
    <div className="flex items-center justify-center flex-wrap gap-7">
      {posts.map((post) => (
        <PostItem key={post.id} post={post} />
      ))}
    </div>
  );
};

export default Page;
