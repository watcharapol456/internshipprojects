'use client';

import React from 'react';
import { deletePost } from  "@/actions/action.blog"
import { useRouter } from "next/navigation";

interface DeleteButtonProps {
  postId: number;
}



const DeleteButton: React.FC<DeleteButtonProps> = ({ postId }) => {
  const router = useRouter();

  const onClickrefresh = () => {
  router.push("/myblog");
};
  const handleDelete = async () => {
    try {
      const deletedPost = await deletePost(postId);

      if (deletedPost) {
        console.log('Post deleted successfully');
      } else {
        console.error('Failed to delete post');
      }
    } catch (error) {
      console.error('Error deleting post:', error);
    }
  };
  const handleBothClicks = () => {
    handleDelete();
    onClickrefresh();
  };
  return (
    <button
      onClick={handleBothClicks}
      
      className="bg-red-500 text-white px-4 py-2 rounded"
    >
      Delete
    </button>
  );
};

export default DeleteButton;
