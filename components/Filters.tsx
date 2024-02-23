"use client"

import React, { useState } from 'react'
import { formUrlQuery } from '@/sanity/utils';
import { useSearchParams, useRouter } from 'next/navigation';

const links = ['europe', 'north-america', 'africa', 'south-america', 'asia'];

const Filters = () => {
  const [active, setActive] = useState('');
  const searchParams = useSearchParams();
  const router = useRouter();

  const handleFilter = (link: string) => {
    let newUrl = '';

    if(active === link) {
      setActive('');

      newUrl = formUrlQuery({
        params: searchParams.toString(),
        keysToRemove: ['category']
      });
    } else {
      setActive(link);

      newUrl = formUrlQuery({
        params: searchParams.toString(),
        key: 'category',
        value: link.toLowerCase(),
      });
    }

    router.push(newUrl, { scroll: false });
  }
  
  return (
    <ul className="text-white-800 mx-auto body-text no-scrollbar flex w-full max-w-full gap-2 py-12 sm:max-w-2xl max-md:hidden">
      {links.map((link, index) => (
        <button
          key={link}
          onClick={() => handleFilter(link)}
          className={`${
            active === link ?"gradient_blue-purple text-white" : "text-[#667394]"
          } whitespace-nowrap rounded-lg px-8 py-2.5 capitalize font-bold`}
        >
          {link}
        </button>
      ))}
    </ul>
  )
}

export default Filters