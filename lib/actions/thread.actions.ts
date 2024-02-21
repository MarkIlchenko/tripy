"use server"

import { revalidatePath } from "next/cache";
import Threads from "../models/threads.model";
import User from "../models/user.model";
import { connectToDB } from "../mongoose";

interface Params {
    text: string;
    author: string;
    communityId: string | null;
    path: string;
}

export async function createThread({ text, author, communityId, path }: Params) {
    try {
      connectToDB();

      const createThread = await Threads.create({
        text,
        author,
        community: null
      });

      //Update user model
      await User.findByIdAndUpdate(author, {
        $push: { thread: createThread._id }
      })

      revalidatePath(path);
    } catch(error: any) {
      throw new Error(`Error creating thread: ${error.message}`)
    }
}