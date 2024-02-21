"use client"

import Image from 'next/image'
import React, { useState, useEffect } from 'react'
import { Input } from './ui/input'
import { useSearchParams, useRouter, usePathname } from 'next/navigation'
import { formUrlQuery } from '@/sanity/utils'

const SearchForm = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const [search, setSearch] = useState('');

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      let newUrl = '';

      if(search) {
        newUrl = formUrlQuery({
          params: searchParams.toString(),
          key: 'query',
          value: search
        })
      } else {
        newUrl = formUrlQuery({
          params: searchParams.toString(),
          keysToRemove: ['query']
        })
      }

      router.push(newUrl, { scroll: false });
    }, 300)

    return () => clearTimeout(delayDebounceFn)
  }, [search])

  return (
    <form className='flex-center mx-auto  w-full sm:mt-4  sm:px-5'>
      <label className='flex items-center ml-auto mr-auto justify-center relative w-full max-w-3xl'>
         <Image 
            src="/temp/magnifying-glass.svg"
            className='absolute left-8'
            width={24}
            height={24}
            alt='Search icon'
         />
         <Input 
            className='base-regular h-fit border-0 bg-slate-800
             py-6 pl-20 pr-8 text-white !right-0 !ring-offset-0
             placeholder:text-white-800'
            type='text'
            placeholder='Search your post'
            value={search}
            onChange={(e) => setSearch(e.target.value)}
         />
      </label>
    </form>
  )
}

export default SearchForm