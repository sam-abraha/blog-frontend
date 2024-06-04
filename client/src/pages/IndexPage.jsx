
import Post from "../components/Post";
import { useState } from "react";
import { useEffect } from "react";
import React from 'react';

export default function IndexPage() {
    const [posts,setPosts] = useState([]);
    const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;
    useEffect(() => {
      fetch(`${apiBaseUrl}posts`).then(response => {
        response.json().then(posts => {
          setPosts(posts);
        });
      }).catch(error => {
        console.log('Error fetching all posts',error)
      })
    }, []);
    return (
      <>
        {posts.length > 0 && posts.map(post => (
          <Post {...post} />
        ))}
      </>
    );
  }