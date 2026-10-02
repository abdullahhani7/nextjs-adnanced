import { TPost } from "@/app/_utils/types";

const page = async (props: { params: Promise<{ id: string }> }) => {
  const params = await props.params;

  //   console.log(params.id);

  const res = await fetch(`https://dummyjson.com/posts/${params.id}`);
  const post: TPost = await res.json();

  return (
    <div
      className="p-2 md:w-2/5 lg:w-1/4 bg-gray-400 border-2 border-blue-400 rounded-md"
      key={post.id}
    >
      <h2 className="text-2xl font-bold text-green-400">
        {post.title} <span className="text-2xl">{params.id}</span> 
      </h2>
      <p className="text-sm text-gray-600">{post.body}</p>
    </div>
  );
};

export default page;
