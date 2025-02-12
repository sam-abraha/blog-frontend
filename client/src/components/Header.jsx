import React from 'react';
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../context/UserContext";

export default function Header() {

  const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;
  const {userInfo, setUserInfo} = useContext(UserContext)
  const username = userInfo?.name;
  
  useEffect(() => {
    async function fetchProfile() {
      try {
        const response = await fetch(`${apiBaseUrl}profile`, {
          credentials: 'include',
        });

        if (response.ok) {
          const userInfo = await response.json();
          setUserInfo(userInfo);
        } else {
          setUserInfo(null);
        }
      } catch (error) {
        console.error('Error fetching profile:', error);
        setUserInfo(null);
      }
    }

    fetchProfile();
  }, [apiBaseUrl, setUserInfo]);

  async function signout() {
    try {
      const response = await fetch(`${apiBaseUrl}auth/signout`, {
        credentials: 'include',
        method: 'POST',
      });

      if (response.ok) {
        setUserInfo(null);
      } else {
        console.error('Error signing out:', response.statusText);
      }
    } catch (error) {
      console.error('Error signing out:', error);
    }
  }
    return (
    <header className='flex justify-between mt-4 px-4'>
        <Link to={'/'} className="">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="size-6">
          <path d="M16.881 4.345A23.112 23.112 0 0 1 8.25 6H7.5a5.25 5.25 0 0 0-.88 10.427 21.593 21.593 0 0 0 1.378 3.94c.464 1.004 1.674 1.32 2.582.796l.657-.379c.88-.508 1.165-1.593.772-2.468a17.116 17.116 0 0 1-.628-1.607c1.918.258 3.76.75 5.5 1.446A21.727 21.727 0 0 0 18 11.25c0-2.414-.393-4.735-1.119-6.905ZM18.26 3.74a23.22 23.22 0 0 1 1.24 7.51 23.22 23.22 0 0 1-1.41 7.992.75.75 0 1 0 1.409.516 24.555 24.555 0 0 0 1.415-6.43 2.992 2.992 0 0 0 .836-2.078c0-.807-.319-1.54-.836-2.078a24.65 24.65 0 0 0-1.415-6.43.75.75 0 1 0-1.409.516c.059.16.116.321.17.483Z" />
          </svg>
        </Link>
        <Link to={'/'} className='font-bold'>TechBlog</Link>
        <nav className="flex font-bold gap-10">
          {username && (
            <>
            <Link to={'/create-post'}  className='text-lime-600'>Create Post</Link>
            <Link to={'/'}        onClick={signout}>Signout</Link>
            </>
          )}
          {!username && (
            <>
            <Link to={'/signin'} className='text-lime-600'>Signin</Link>
            <Link to={'/signup'} className='text-lime-600'>Signup</Link>
            </>
          )}
        </nav>
    </header>
    )
}