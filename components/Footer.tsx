import Link from 'next/link'
import React from 'react'

const Footer = () => {
  return (
    <footer className="flex-between text-gray-500 body-text w-full flex justify-between gap-y-10 border-t border-y-slate-800 bg-white px-20 py-12 max-md:flex-col">
      <p>Copyright © 2023 JS Mastery Pro | All Rights Reserved</p>

      <div className="flex gap-x-9 ">
        <Link href="/terms-of-use">Terms & Conditions</Link>
        <Link href="/privacy-policy">Privacy Policy</Link>
      </div>
    </footer>
  )
}

export default Footer