import db from "@/db";
import { blogUser } from "@/db/schema";
import { auth } from "@/auth";
import { eq , desc } from "drizzle-orm";
import DeleteButton from "@/components/blog/deletebutton";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface Blog {
  id: number | null;
  title: string | null;
  description: string | null;
  image?: string | null;
  published: boolean | null;
  username: string | null;
}

const MyBlogPage = async () => {
  try {
    const session = await auth();
    const username = session?.user?.name;

    if (!username) {
      return <div className="p-4 text-center">Please log in to view your blogs.</div>;
    }

    const userBlogs = await db
    .select()
    .from(blogUser)
    .where(eq(blogUser.username, username))
    .orderBy(desc(blogUser.id))
    .execute();
  

    console.log("Fetched blogs:", userBlogs);

    return (
      <div className="bg-[#e2bb94] min-h-screen p-8">
        <div className="flex items-center justify-between mb-8 m-1">
          <h1 className="text-4xl font-bold text-center">My Blog</h1>
          <a href="/profile">
            <Image 
              src="/icons/pencil-line.svg"
              alt="Edit"
              width={50}
              height={50}
              className="w-8 h-8 cursor-pointer hover:opacity-80 transition-opacity mt-5"
            />
          </a>
        </div>

        {userBlogs.length > 0 ? (
          userBlogs.map((blog) => (
            <div
              key={blog.id ?? "default-key"}
              className="p-6 bg-gray-100 rounded-lg shadow-md flex flex-col justify-between h-full mb-6"
            >
              <div>
                <h2 className="text-2xl font-bold mb-2">Title</h2>
                <p className="text-xl mb-4">
                  {blog.title ?? "Untitled"}
                </p>
              </div>
              <div>
                <h2 className="text-2xl font-bold mb-2">Content</h2>
                <p className="text-gray-700 mb-4">
                  {blog.description ?? "No description"}
                </p>
              </div>
              {blog.image && (
                <Image
                  src={blog.image}
                  width={650}
                  height={50}
                  alt={blog.title ?? "No title"}
                  className="mt-4 rounded-lg"
                />
              )}
              <div className="mt-4">
                <DeleteButton postId={blog.id ?? 0}  />

                <Link href={`/myblog/${blog.id}`} className="ml-5 ">
                <Button className="w-32 bg-green-500 hover:bg-green-700">Edit</Button>
                </Link>
               
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-lg">No blogs found.</p>
        )}
      </div>
    );
  } catch (error) {
    console.error("Error fetching data from view:", error);
    return <div className="p-4 text-center">Failed to load blogs.</div>;
  }
};

export default MyBlogPage;