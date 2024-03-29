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
    title: string;
    img: string;

    firstDay: string;
    lastDay: string;
}

export async function createThread({
  text,
  author,
  communityId,
  path,
  title,
  img,

  firstDay,
  lastDay
}: Params) {
    try {
      connectToDB();

      const createThread = await Threads.create({
        text,
        author,
        community: null,
        title,
        img,
        
        firstDay,
        lastDay
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

export async function fetchPosts(pageNumber = 1, pageSize = 20) {
    connectToDB();

    const skipAmount = (pageNumber - 1) * pageSize;

    const postsQuery = Threads.find({ parentId: { $in: [null, undefined]}})
        .sort({ createdAt: 'desc'})
        .skip(skipAmount)
        .limit(pageSize)
        .populate({ path: 'author', model: User })
        .populate({
          path: 'children',
          populate: {
            path: 'author',
            model: User,
            select: "_id name parentId image"
          }
        })

    const totalPostsCount = await Threads.countDocuments({ parentId: { $in: [null, undefined]} })

    const posts = await postsQuery.exec();
    const isNext = totalPostsCount > skipAmount + posts.length;

    return { posts, isNext }
}

export async function fetchThreadById(id: string) {
  connectToDB();

  try {
    const thread = await Threads.findById(id)
        .populate({
          path: 'author',
          model: User,
          select: "_id id name image"
        })
        .populate({
          path: 'children',
          populate: [
            {
              path: 'author',
              model: User,
              select: "_id id name parentId image"
            },
            {
              path: 'children',
              model: Threads,
              populate: {
                path: 'author',
                model: User,
                select: "_id id name parentId image"
              }
            }
          ]
        }).exec();

        return thread;
  } catch(error: any) {
    throw new Error(`Error fetching thread: ${error.message}`)
  }
}