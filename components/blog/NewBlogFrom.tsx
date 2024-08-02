"use client";
import React, { useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { createPost } from "@/actions/action.blog";

import { UploadButton } from "@/utlis/uploadthing";
import Link from "next/link";

export const NewBlogForm = () => {
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [thumbnail, setThumbnail] = useState<string>();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const post = await createPost({
        title,
        description: content,
        published: false,
        image: thumbnail,
      });
      setSubmitted(true);
    } catch (error) {
      console.error("Error creating post:", error);
    }
  };

  return (
    <div className=" h-[350px] py-2 container flex flex-col mt-12">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col items-stretch justify-center  text-left h-96"
      >
        <Input
          className="text-6xl focus-visible:outline-none h-[150px] my-5 "
          type="text"
          name="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title"
        />
        <textarea
          className="h-[300px] border-solid border-2 border-gray-200"
          name="content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Content"
        ></textarea>
        <UploadButton
          className="mt-5"
          endpoint="imageUploader"
          onClientUploadComplete={(res) => {
            console.log("Files: ", res);
            if (res && res.length > 0) {
              console.log("Selected file URL: ", res[0].url);
              setThumbnail(res[0].url);
            }
            console.log("Thumbnail before submission: ", thumbnail);
          }}
          onUploadError={(error: Error) => {
            console.log("error ", error);
          }}
        />
        <div className="flex justify-center h-12 w-full">
        
        <Link href={'/myblog'}>
        <Button
                className=" h-full text-2xl font-bold w-[450px] "
                type="submit"
              >
                Submit
              </Button>
  
        </Link>
        
        </div>
      </form>
    </div>
  );
};

export default NewBlogForm;
