import Image from 'next/image';
import Link from 'next/link';
import React from 'react'

interface Props {
  id: string;
  currentUserId: string;
  parentId: string | null;
  content: string;
  author: {
    name: string;
    image: string;
    id: string;
  }
  community: {
    id: string;
    name: string;
    image: string
  } | null;
  createdAt: string;
  comments: {
    author: {
      image: string;
    }
  }[]
  isComment?: boolean;

  title: string;
  firstDay: string;
  lastDay: string
  // img: string;
}

const PostCard = ({
  id,
  currentUserId,
  parentId,
  content,
  author,
  community,
  createdAt,
  comments,
  isComment,
  title,

  firstDay,
  lastDay
  // img
}: Props) => {
  return (
    <article className='flex flex-col rounded-xl bg-gray-900'>
        <Image src="/images/banner.svg" alt="image" width={300} height={100} className='rounded-xl'></Image>
        <div className='flex w-full flex-1 flex-row gap-4  p-4'>
          <div className='flex flex-col items-center mb-2'>
            <Link href={`/profile/${author.id}`} className='relative h-11 w-11'>
              <Image
                src={author.image}
                alt='Profile image'
                fill
                className='cursor-pointer rounded-full'
              />
            </Link>

            <div className='thread-card_bar ' /> 
          </div>

          <div className='flex w-full flex-col'>
            <h2 className='text-white font-bold'>{title}</h2>
            
            <div className='text-slate-500'>
              {firstDay} - {lastDay}
            </div>
            <Link href={`/posts/${id}`} className='mt-6 text-white bg-slate-700 text-center py-2 rounded-xl'>
              Explore trip
            </Link>
          </div>
        </div>
    </article>
  )
}

export default PostCard