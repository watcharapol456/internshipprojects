import db from "@/db";
import Image from "next/image";
import Link from "next/link";

const Home = async () => {
  try {
    const allBlogs = await db.query.blog.findMany();

    return (
      <div className="grid grid-cols-3 gap-4 p-4 bg-[#e2bb94]">
        {allBlogs.map((blog) => (
          <Link key={blog.id} href={`/blog/${blog.id}`}>
            <div
              key={blog.id}
              className="bg-gray-100 p-4 rounded-lg shadow-md flex flex-col justify-between h-full"
            >
              <div>
                <div className="flex justify-center">
                  <Image
                    src={blog.image || ''}
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
          </Link>
        ))}
      </div>
    );
  } catch (error) {
    return null;
  }
};

export default Home;
