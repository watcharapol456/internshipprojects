"use client"
import { redirect, useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import { editPost, getBlog } from '@/actions/action.blog';
import { blog } from '@/db/schema';
import { useRouter } from 'next/navigation';

import { UploadButton } from "@/utlis/uploadthing";
import { Button } from '@/components/ui/button';
import Image from 'next/image';

interface IFormData  {
      title : string ,
      content : string ,
      image : string ,
}

const DEFAULT_FORM_DATA = {
  title: "",
  content: "",
  image: "",
};


const EditPage =  () => {
    const params = useParams();
    const router = useRouter();
    const [formData,setFormData] = useState<IFormData>(DEFAULT_FORM_DATA);


    const id = params.id as string;

    console.log("[DEBUG] paramsid",id)
    console.log("[DEBUG] paramsid",typeof id)

    const queryBlog = async (id: string) => {
      try {
        const blogs = await getBlog(id); 
          setFormData({
            title: blogs.title || "",
            content: blogs.description || "",
            image: blogs.image || "",
          });

      } catch (error) {
        console.error("[ERROR]", error);
        router.push('/myblog')
      }
    };

    useEffect(() => {
      if(id){
        queryBlog(id); 
      }else{
        router.push('/')
      }
       
    }, []);

      const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData((prev)=>(
          {
          ...prev,
          [e.target.name]: e.target.value,
        
         }
      ));
      };
    
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      try {
        if (id) {
          await editPost({
            title: formData.title,
            description: formData.content,
            image: formData.image,
          }, id);
          router.push('/myblog');
        }
      } catch (error) {
        console.error("Error updating post", error);
      }
    };
   
    return (
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-6">Edit Blog</h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="flex flex-col">
            <label htmlFor="title" className="text-lg font-medium mb-2">Title</label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="p-2 border border-gray-300 rounded-md"
              placeholder="Enter the title"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="content" className="text-lg font-medium mb-2">Content</label>
            <textarea
              id="content"
              name="content"
              value={formData.content}
              onChange={handleChange}
              className="p-2 border border-gray-300 rounded-md resize-none"
              rows={6}
              placeholder="Enter the content"
            />
          </div>
          <div className='flex justify-center'>
            <Image
             src={formData.image}
             alt='image'
             width={650}
             height={50}
            />

            
          </div>
          <UploadButton
            className="mt-4"
            endpoint="imageUploader"
            onClientUploadComplete={(res) => {
              console.log("Files: ", res);
              if (res && res.length > 0) {
                console.log("Selected file URL: ", res[0].url);
              }
              console.log("Thumbnail before submission: ", formData.image);
            }}
            onUploadError={(error: Error) => {
              console.log("error ", error);
            }}
          />
          <div className='flex justify-center'>
          <Button type="submit" className="mt-4 bg-green-500 text-white hover:bg-green-600">
            Update Blog
          </Button>
          </div>
      
        </form>
      </div>
    );
  };
export default EditPage