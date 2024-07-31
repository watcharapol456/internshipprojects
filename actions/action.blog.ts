"use server";
import { db } from "@/db";
import { blog } from "@/db/schema";
import { auth } from "@/auth";
import { eq } from "drizzle-orm";

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

// export async function editPost(editpost : postupdate) {
//     try {
//       const updatePost = await db.update(blog)
//       .set({title :  })
//     }
// }