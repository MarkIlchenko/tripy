"use client"

import * as u from "zod"
import { useForm } from 'react-hook-form';

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"

import { zodResolver } from '@hookform/resolvers/zod'
import { Textarea } from "../ui/textarea";
import { usePathname, useRouter } from "next/navigation";
import { ThreadValidation } from "@/lib/validations/thread";
import { createThread } from "@/lib/actions/thread.actions";

interface Props {
  user: {
    id: string;
    objectId: string;
    username: string;
    name: string;
    bio: string;
    image: string;
  };
  btnTitle: string;
}

const PostThread = ({ userId }: { userId: string }) => {
  const router = useRouter();
  const pathname = usePathname();

  const form = useForm({
    resolver: zodResolver(ThreadValidation),
    defaultValues: {
      thread: '',
      accountId: userId
    }
  })

  const onSubmit = async (values: u.infer<typeof ThreadValidation>) => {
    await createThread({
      text: values.thread,
      author: userId,
      communityId: null,
      path: pathname
    })

    router.push("/")
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col justify-start gap-10 mt-10">
        <FormField
          control={form.control}
          name="thread"
          render={({ field }) => (
            <FormItem className="flex flex-col items-center gap-4">
              <FormLabel className="text-base-semibold w-full text-light-2">
                Content
              </FormLabel>
              <FormControl className="flex-1 text-base-semibold text-gray-200">
                <Textarea
                  className="account-form_input no-focus bg-gray-900 border-neutral-800"
                  rows={15}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="bg-gray-800 text-white">PostThread</Button>
      </form>
    </Form>
  )
}

export default PostThread