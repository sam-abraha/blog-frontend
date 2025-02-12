import React from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'
import { useState } from 'react';
import { useContext } from 'react';
import { UserContext } from '../context/UserContext';
import { Navigate } from 'react-router-dom';
import TextEditor from '../components/TextEditor';

export default function CreatePostPage() {
    const [title, setTitle] = useState('')
    const [summary, setSummary] = useState('')
    const [content, setContent] = useState('')
    const [redirect, setRedirect] = useState(false)
    const [imgCredit, setImgCredit] = useState('')
    const [files, setFiles] = useState('')
    const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

    async function createPost(e) {
        e.preventDefault()
        const data = new FormData()
        data.set('title', title)
        data.set('summary', summary)
        data.set('content', content)
        data.set('file',files[0]) // Grabs only the first file
        data.set('imgCredit', imgCredit)

        await fetch(`${apiBaseUrl}posts`, {
            method: 'POST',
            body : data,
            credentials : 'include',
        }).then(response => {
            if(response.ok) {
                setRedirect(true)
            }else {
                alert('Error creating post')
            }
        }).catch(error => {
            console.log('Error creating post',error)
        })

    }

    if(redirect) {
        return <Navigate to={'/'}/>
    }

    return (
        <form className="flex flex-col gap-4 mt-12" onSubmit={createPost}>
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
                placeholder="Image Credits"
                onChange={e => setImgCredit(e.target.value)}
                className="border rounded p-2"
            />
            <TextEditor value={content} onChange={setContent}/>
            <button className="mt-2 border p-2  text-white bg-lime-600 rounded-lg hover:bg-lime-700 w-32">Create</button>
        </form>
    );
}
