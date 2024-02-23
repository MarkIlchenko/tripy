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

  //Date
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, '0');
  const day = String(today.getDate()).padStart(2, '0');
  const formattedToday = `${year}-${month}-${day}`;
  //

  const form = useForm({
    resolver: zodResolver(ThreadValidation),
    defaultValues: {
      thread: 'thread',
      accountId: userId,
      title: '',
      img: 'implementing',

      firstDay: formattedToday,
      lastDay: ''
    }
  })

  const onSubmit = async (values: u.infer<typeof ThreadValidation>) => {
    await createThread({
      text: values.thread,
      author: userId,
      communityId: null,
      path: pathname,
      title: values.title,
      img: values.img,
      firstDay: values.firstDay,
      lastDay: values.lastDay
    })

    router.push("/")
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col justify-start gap-10 mt-10">
        <span className="relative">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem className="flex flex-col items-center gap-4">
                <FormLabel className="text-base-semibold w-full text-light-2">
                  Title
                </FormLabel>
                <FormControl className="flex-1 text-base-semibold text-gray-200">
                  <Textarea
                    className="account-form_input no-focus bg-gray-900 border-neutral-800"
                    rows={1}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <span className="my-selector">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem className="flex flex-col items-center gap-4">
                  <FormControl className="flex-1 text-base-semibold text-gray-200">
                    <select {...field} className="account-form_input no-focus bg-gray-900 border-neutral-800">
                      <option value="">Select a title</option>
                      <option value="Kharkiv">Kharkiv</option>
                      <option value="Berlin">Berlin</option>
                      <option value="Amsterdam">Amsterdam</option>
                    </select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </span>
        </span>

        {/* Days */}
        <FormField
          control={form.control}
          name="firstDay"
          render={({ field }) => (
            <FormItem className="flex flex-col items-center gap-4">
              <FormLabel className="text-base-semibold w-full text-light-2">
              firstDay
              </FormLabel>
              <FormControl className="flex-1 text-base-semibold text-gray-200">
                <Textarea
                  className="account-form_input no-focus bg-gray-900 border-neutral-800"
                  rows={1}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="lastDay"
          render={({ field }) => (
            <FormItem className="flex flex-col items-center gap-4">
              <FormLabel className="text-base-semibold w-full text-light-2">
              lastDay
              </FormLabel>
              <FormControl className="flex-1 text-base-semibold text-gray-200">
                <Textarea
                  className="account-form_input no-focus bg-gray-900 border-neutral-800"
                  rows={1}
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