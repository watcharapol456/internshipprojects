"use client";
import React from 'react';
import { useRouter } from "next/navigation";


interface ProfileProps {
    userName: string;
  }

  const Profile: React.FC<ProfileProps> = ({ userName }) => {
  const router = useRouter();

  const onClickBackHome = () => {
    router.push("/admin");
  };

  return (
    <div>
      <button onClick={onClickBackHome}></button>
    </div>
  );
};

export default Profile;
