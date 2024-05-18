"use client";
import axios from "axios";
import {toast} from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function ProfilePage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const logout = async () => {
    try {
        await axios.get('/api/users/logout')
        toast.success('Logout Successful')
        router.push('/login')
    } catch (error: any) {
      console.log(error.message);
      toast.error(error.message);
    }
  };

  const fetchData = async () => {
    try {
      const res = await axios.get('/api/users/user');
      setUsername(res.data.data.username);
    } catch (error) {
      console.error('Cannot fetch the data:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [username]);
  

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1>Hi, {username === ""? "Nothing" : <Link href={`/profile/${username}`}>{username}</Link>}</h1>
      <hr />
      <p>Profile page</p>
      <hr />
      <button
        onClick={logout}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mt-4 rounded"
      >
        Logout
      </button>
    </div>
  );
}
