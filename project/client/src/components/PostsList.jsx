import Post from "./Post";

const PostsList = ({posts, handlePost}) => {
  return (
    <>
      <div className="relative">
        <textarea
          placeholder="What is in you mind?"
          className="w-full h-20 rounded-xl resize-none p-2"
        ></textarea>
        <button
          className="absolute bottom-4 right-4 bg-red-500 w-20 h-7 rounded-xl"
          onClick={handlePost}
        >
          Post
        </button>
      </div>
      {posts.map((post) => {
        return <Post content={post.content} writerId={post.writer} date={post.date} />;
      })}
    </>
  );
}

export default PostsList;
