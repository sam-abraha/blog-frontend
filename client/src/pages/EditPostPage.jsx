import React from 'react';
import {Navigate, useParams} from "react-router-dom";
import { useState, useEffect } from "react"
import ReactQuill from "react-quill"
import TextEditor from "../components/TextEditor"

export default function EditPostPage() {
    const {id} = useParams()
    const [title, setTitle] = useState('')
    const [summary, setSummary] = useState('')
    const [content, setContent] = useState('')
    const [redirect, setRedirect] = useState(false)
    const [imgCredit, setImgCredit] = useState('')
    const [files, setFiles] = useState(null)
    const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

    useEffect(() => {
        fetch(`${apiBaseUrl}posts/${id}`)
            .then(res => res.json())
            .then(post => {
                setTitle(post.title);
                setContent(post.content);
                setSummary(post.summary);
                setImgCredit(post.imgCredit)
            })
            .catch(error => {
                console.error('Error fetching post:', error);
            });
    }, [id]);

    async function updatePost(e) {
        e.preventDefault();
      
        const data = new FormData();
        data.append('title', title);
        data.append('summary', summary);
        data.append('content', content);
        data.append('imgCredit', imgCredit)
      
        if (files && files[0]) {
          data.append('file', files[0]);
        }
      
        for (const [key, value] of data.entries()) {
          if (key === 'file') {
            console.log(`${key}: ${value.name}`);
          } else {
            console.log(`${key}: ${value}`);
          }
        }
      
        try {
          const response = await fetch(`${apiBaseUrl}posts/${id}`, {
            method: 'PUT',
            body: data,
            credentials: 'include',
          });
      
          if (response.ok) {
            setRedirect(true);
          } else {
            console.log('Error updating post:', response.statusText, await response.json());
          }
        } catch (error) {
          console.log('Error updating post:', error);
        }
      }
      

    if(redirect) {
        return <Navigate to={'/'}/>
    }

    return (
        <form className="flex flex-col gap-4 mt-12" onSubmit={updatePost}>
            <input 
                type="text" 
                value={title}
                onChange={e => setTitle(e.target.value)}
                placeholder="Title" 
                className="border rounded p-2"
            />
            <input 
                type="text" 
                value={summary}
                onChange={e => setSummary(e.target.value)}
                placeholder="Summary" 
                className="border rounded p-2"
            />
            <input 
                type="file" 
                onChange={e => setFiles(e.target.files)}
                className="border rounded p-2"
            />
            <input 
                type="text" 
                value={imgCredit}
                onChange={e => setImgCredit(e.target.value)}
                placeholder="Image Credits" 
                className="border rounded p-2"
            />
            <TextEditor onChange={setContent} value={content}/>
            <button className="mt-2 border p-2  text-white bg-lime-600 rounded-lg hover:bg-lime-700 w-32">Edit</button>
        </form>
    );
}