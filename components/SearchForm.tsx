"use client"

import Image from 'next/image'
import React, { useState } from 'react'
import { Input } from './ui/input'

const SearchForm = () => {
   const [search, setSearch] = useState('');

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