"use server";
import { db } from "@/db";
import { blog } from "@/db/schema";
import { auth } from "@/auth";
import { eq } from "drizzle-orm";
import { redirect } from "next/navigation";

interface Post {
  title: string;
  description: string;
  image?: string;
  published: boolean;
}


export async function createPost(postInfo: Post) {
  const session = await auth();
  
  if (!session || !session.user || !session.user.name) {
    throw new Error('User not authenticated');
  }
  try{
    const newPost = await db.insert(blog).values({
      title: postInfo.title,
      description: postInfo.description,
      image: postInfo.image,
      published: postInfo.published,
      name: session.user.name, 
      userId:session.user.id
    }).returning();
  
    return newPost[0]; 
  } catch (error){
    return null;
  }


}
export async function deletePost(postId: number) {

  try {
    const deletedPost = await db
      .delete(blog)
      .where(eq(blog.id, postId))
      .returning();
      
    return deletedPost[0];
  } catch (error) {
    throw new Error('Error deleting blog post');
  }
}

export async function getBlog(id: string) {
  const numberPattern = /^\d+$/;
  if(numberPattern.test(id)){
    const paramnum = Number(id)
    try {
      const blogs = await db.select().from(blog).where(eq(blog.id, paramnum));
      return blogs[0];

    } catch (error) {
      console.error("Error querying blog:", error);
      throw error;
    }
  }else{
    redirect('/')
  }
  
}

interface editPosts {
  title: string;
  description: string;
  image?: string;
}

export async function editPost (updatepost: editPosts ,id:string) {
  const numberPattern = /^\d+$/;
  if(numberPattern.test(id)){
    const paramnum = Number(id)
    try{
      const editPost = await db.update(blog).set(
        {
          title: updatepost.title,
          description : updatepost.description,
          image : updatepost.image
        }
      )
      .where(eq(blog.id,paramnum));
     }catch (error){
        console.error("[DEBUG],error update blog",error)
     }
  }else{
    redirect('/')
  }
  
} 