"use client";

import PostItem from "@/components/PostItem/PostItem";
import { TPost } from "../_utils/types";
import { useEffect, useState } from "react";
import axios from "axios";
import SearchPostInput from "@/components/SearchPostInput/SearchPostInput";
import Pagination from "@/components/Pagination/Pagination";

const Page = () => {
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
    <>
      <div className="container m-auto px-4">
        <SearchPostInput />

        <div className="flex items-center justify-center flex-wrap gap-7">
          {posts.slice(0, 6).map((post) => (
            <PostItem key={post.id} post={post} />
          ))}
        </div>
        <Pagination />
      </div>
    </>
  );
};

export default Page;
