import db from "@/db";
import { blog } from "@/db/schema";
import React from "react";
import { eq } from "drizzle-orm";
import Image from "next/image";
import { redirect } from "next/navigation";

const Page = async ({ params }: { params: { id: string } }) => {
  const numberPattern = /^\d+$/;

  if (numberPattern.test(params.id)) {
    console.log("[DEBUG] , params", params.id);
    console.log("[DEBUG] , params", typeof params.id);
    const paramsnum = Number(params.id);
    try {
      const blogs = await db.select().from(blog).where(eq(blog.id, paramsnum));
      if (blogs.length === 0) {
        return redirect("/404");
      } else {
        return (
          <div>
         
            {blogs.map((blog) => (
              <div
                key={blog.id}
                className="bg-gray-100 p-4 rounded-lg shadow-md flex flex-col justify-between h-full"
              >
                <div>
                  <div className="flex justify-center">
                    <Image
                      src={blog.image || ""}
                      width={650}
                      height={400}
                      alt={blog.title}
                      className="object-fill"
                    />
                  </div>
                  <div className="mt-5">
                    <h2 className="text-xl font-bold">{blog.title}</h2>
                    <p className="text-gray-500">{blog.description}</p>
                  </div>
                </div>
                <div className="mt-5">
                  <div className="flex">
                    <h3 className="text-lg font-semibold mr-5">ผู้เขียน</h3>
                    <h3 className="text-lg font-semibold text-gray-500">
                      {blog.name}
                    </h3>
                  </div>
                </div>
              </div>
            ))}
          </div>
        );
      }
    } catch (error) {
      console.error("Error fetching blogs:", error);
      return redirect("/404");
    }
  } else {
    return redirect("/404");
  }
};

export default Page;
