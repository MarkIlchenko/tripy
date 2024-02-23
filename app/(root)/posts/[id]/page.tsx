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

  //geting today's data
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, '0');
  const day = String(today.getDate()).padStart(2, '0');
  const formattedToday = `${year}-${month}-${day}`;

  if(post.title) {
    return (
      <main className="flex justify-between mx-auto w-full max-w-screen-2xl  mt-10 mb-20">
        <section className='relative w-fit'>
          <div className='w-fit'>
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
  
              title={post.title}
  
              firstDay={post.firstDay}
              lastDay={post.lastDay}
            />
          </div>
        </section>
  
        {/* Погода в Харькове {post.title}*/}
        <section className="mt-6 mr-auto ml-20 flex flex-col items-start">
          <h2 className="self-start heading2 text-[#19213D]">Weather in {post.title}:</h2>
          <WeatherComponent city={post.title} startDate={`${post.firstDay === formattedToday ? formattedToday : post.firstDay}`} endDate={`${post.lastDay}`}/>
        </section>
      </main>
    )
  }
}

export default page

// import WeatherComponent from '@/components/WeatherComponent';
// import PostCard from '@/components/cards/PostCard'
// import { fetchThreadById } from '@/lib/actions/thread.actions';
// import { fetchUser } from '@/lib/actions/user.actions';
// import { currentUser } from '@clerk/nextjs';
// import { redirect } from 'next/navigation';

// const page = async({ params }: { params: { id: string }}) => {
//   if(!params.id) return null;

//   const user = await currentUser();
//   if(!user) return null;

//   const userInfo = await fetchUser(user.id);
//   if(!userInfo?.onboarded) redirect('/onboarding')

//   const post = await fetchThreadById(params.id);

//   //geting today's data
//   const today = new Date();
//   const year = today.getFullYear();
//   const month = String(today.getMonth() + 1).padStart(2, '0');
//   const day = String(today.getDate()).padStart(2, '0');
//   const formattedToday = `${year}-${month}-${day}`;

//   return (
//     <main className="flex-center paddings mx-auto w-full max-w-screen-2xl flex-col mt-10 mb-20">
//       <section className='relative'>
//         <div>
//           <PostCard
//             key={post._id}
//             id={post._id}
//             currentUserId={user?.id || ""}
//             parentId={post.parentId}
//             content={post.text}
//             author={post.author}
//             community={post.community}
//             createdAt={post.createdAt}
//             comments={post.children}

//             title={post.title}

//             firstDay={post.firstDay}
//             lastDay={post.lastDay}
//           />
//         </div>
//       </section>

//       {/* Погода в Харькове {post.title}*/}
//       <section className="mt-6 w-full flex flex-col items-start">
//         <h2 className="self-start heading2 text-white">Weather in {post.title}:</h2>
//         <WeatherComponent city={post.title} startDate={`${formattedToday}`} endDate={`${post.lastDay}`}/>
//       </section>
//     </main>
//   )
// }

// export default page