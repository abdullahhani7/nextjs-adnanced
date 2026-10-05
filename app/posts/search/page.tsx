const page = async (props: any) => {
  const searchParams = await props.searchParams;

  // console.log(searchParams.query);

  return <div>Search value is: {searchParams.query}</div>;
};

export default page;
