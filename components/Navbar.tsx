import { UserButton } from '@clerk/nextjs'
import Image from 'next/image'
import Link from 'next/link'

const Navbar = () => {
  return (
    <nav className="flex-center top-0 z-50 w-full border-b-2 bg-white py-7 text-white">
      <div className="flex justify-between mx-auto w-full max-w-screen-2xl px-6 xs:px-8 sm:px-16">
        <Link href="/">
          <Image src='/images/logo.svg' width={40} height={24} alt='JSM logo'/>
        </Link>

        <ul className="flex items-center gap-x-3 md:gap-x-16">
          <li className="body-text text-gradient_blue-purple !font-bold">
            <Link
              href="/user-posts"
            >
              User Posts
            </Link>
          </li>
          <li>
            <UserButton afterSignOutUrl="/"/>
          </li>
        </ul>
      </div>
    </nav>
  )
}

export default Navbar