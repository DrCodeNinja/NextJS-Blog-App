"use client";

import Profile from "@components/Profile";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const MyProfile = () => {
  const { data: session } = useSession();
  const [posts, setPosts] = useState([]);
  const router = useRouter();
  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch(`/api/users/${session?.user.id}/posts`);
      const data = await response.json();
      if (session?.user.id) setPosts(data);
    };
    fetchPosts();
  }, []);
  const handleEdit = (posts) => {
    router.push(`/update-prompt?id=${posts._id}`);
  };
  const handleDelete = async (posts) => {
    const hasConfirmed = confirm(
      "Are you sure you want to delete this prompt?"
    );
    console.log(hasConfirmed);
    try {
      if (hasConfirmed) {
        await fetch(`/api/prompt/${posts._id}`, {
          method: "DELETE",
        });
        const filteredPosts = posts.filter((p) => {
          p._id !== posts._id;
        });
        setPosts(filteredPosts);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Profile
      name="My"
      desc="Welcome to your personalized profile page"
      data={posts}
      handleEdit={handleEdit}
      handleDelete={handleDelete}
    />
  );
};

export default MyProfile;
