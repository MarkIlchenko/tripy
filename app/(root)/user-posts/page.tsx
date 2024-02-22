import PostCard from '@/components/cards/PostCard';
import { fetchPosts } from '@/lib/actions/thread.actions';
import { getResourcesPlaylist } from '@/sanity/actions';
import { currentUser } from "@clerk/nextjs";

const page = async() => {
  //Fetching user posts
  const result = await fetchPosts(1, 30);
  const user = await currentUser();

  console.log(result);

  return (
    <main className="flex-center paddings mx-auto w-full max-w-screen-2xl flex-col mt-10 mb-20">
      {/* User own posts */}
      <section className="flex items-center mt-6 w-full flex-col sm:mt-20">
        <h1 className="self-start heading2 text-white">My Posts:</h1>
        <div className="mt-12 flex w-full flex-wrap justify-center gap-16 sm:justify-start">
          {result.posts.length === 0 ? (
            <p className="no-result">No posts found</p>
          ): (
            <>
              {result.posts.map((post) => (
                <PostCard
                  key={post._id}
                  id={post._id}
                  currentUserId={user?.id || ""}
                  parentId={post.parentId}
                  content={post.text}
                  author={post.author}
                  community={post.community}
                  createdAt={post.createdAt}
                  comments={post.children}
                />
              ))}
            </>
          )}
        </div>
      </section>
    </main>
  )
}

export default page