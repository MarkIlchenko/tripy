import PostThread from "@/components/forms/PostThread";
import { fetchUser } from "@/lib/actions/user.actions";
import { currentUser } from "@clerk/nextjs"
import { redirect } from "next/navigation"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"


const page = async() => {
  const user = await currentUser();

  if(!user) return null;

  const userInfo = await fetchUser(user.id);

  if(!userInfo?.onboarded) redirect('/onboarding');

  return (
    <div className="flex-center paddings mx-auto w-full max-w-screen-2xl flex-col mt-10 mb-20">
      <h1 className='heading2 text-white'>Create Post</h1>
      <Dialog>
        <DialogTrigger>Open</DialogTrigger>
        <DialogContent >
          <PostThread userId={userInfo._id} />
        </DialogContent>
      </Dialog>
      {/* <PostThread userId={userInfo._id} /> */}
    </div>
  )
}

export default page