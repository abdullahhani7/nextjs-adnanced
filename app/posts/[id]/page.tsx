"use client";

import { TPost } from "@/app/_utils/types";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

const Page = () => {
  const params = useParams();

  const id = params.id as string;

  const [post, setPost] = useState<TPost | null>(null);

  const getPost = async () => {
    try {
      const res = await axios.get(`https://dummyjson.com/posts/${id}`);

      setPost(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getPost();
  }, []);

  if (!post) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-2 md:w-2/5 lg:w-1/4 bg-gray-400 border-2 border-blue-400 rounded-md">
      <h2 className="text-2xl font-bold text-green-400">{post.title}</h2>

      <p className="text-sm text-gray-600">{post.body}</p>
    </div>
  );
};

export default Page;
