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
    <article className='flex w-full flex-col rounded-xl bg-gray-900 p-7'>
      <div className='flex items-start justify-between'>
        <div className='flex w-full flex-1 flex-row gap-4'>
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
            <Link href={`/profile/${author.id}`} className='w-fit'>
              <h4>{author.name}</h4>
            </Link>

            <p className=' text-slate-400'>{content}</p>

              <div className='flex gap-3.5 mt-4 mb-6'>
                <Image src="/assets/heart-gray.svg" alt='heart' width={24} height={24} className='cursor-pointer object-contain'/>
                <Link href={`/posts/${id}`}>
                  <Image src="/assets/reply.svg" alt='heart' width={24} height={24} className='cursor-pointer object-contain'/>
                </Link>
                <Image src="/assets/repost.svg" alt='heart' width={24} height={24} className='cursor-pointer object-contain'/>
                <Image src="/assets/share.svg" alt='heart' width={24} height={24} className='cursor-pointer object-contain'/>
              </div>
          </div>
          
          <div>{title}</div>
          first Day: {firstDay}
          last Day: {lastDay}
          {/* <Image 
            src={img}
            alt='img'
            width={200}
            height={100}
          /> */}
          <div className='mt-5 flex flex-col gap-3 mb-2'>
              

              {isComment && comments.length > 0 && (
                <Link href={`/posts/${id}`}>
                  <p className='mt-1 text-slate-400'>{comments.length} replies</p>
                </Link>
              )}
            </div>
        </div>
      </div>

      <h2 className='text-small-regular text-light-2'>{content}</h2>
    </article>
  )
}

export default PostCard