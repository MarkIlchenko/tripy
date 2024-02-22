import WeatherComponent from '@/components/WeatherComponent';
import PostCard from '@/components/cards/PostCard'
import { fetchThreadById } from '@/lib/actions/thread.actions';
import { fetchUser } from '@/lib/actions/user.actions';
import { currentUser } from '@clerk/nextjs';
import { redirect } from 'next/navigation';

const page = async({ params }: { params: { id: string }}) => {
  if(!params.id) return null;

  const user = await currentUser();
  if(!user) return null;

  const userInfo = await fetchUser(user.id);
  if(!userInfo?.onboarded) redirect('/onboarding')

  const post = await fetchThreadById(params.id);

  return (
    <main className="flex-center paddings mx-auto w-full max-w-screen-2xl flex-col mt-10 mb-20">
      <section className='relative'>
        <div>
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
        </div>
      </section>

      {/* Погода в Харькове */}
      <section className="mt-6 w-full flex flex-col items-start">
        <h2 className="self-start heading2 text-white">Weather in Kharkiv:</h2>
        <WeatherComponent city='Kharkiv'/>
      </section>
    </main>
  )
}

export default page