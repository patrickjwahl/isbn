"use client"

import Image from "next/image";
import { useState } from "react";

export default function Home() {

  const [query, setQuery] = useState("");
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState([]);
  const [imageUrl, setImageUrl] = useState(""); 

  const getData = async () => {
    const res = await fetch(`https://openlibrary.org/api/books?bibkeys=ISBN:${query}&jscmd=data&format=json`);
    const data = (await res.json())[`ISBN:${query}`];
    setTitle(data.title);
    setAuthor(data.authors);

    const resImage = await fetch(`https://openlibrary.org/api/books?bibkeys=ISBN:${query}&jscmd=viewapi&format=json`);
    const dataImage = (await resImage.json())[`ISBN:${query}`];
    setImageUrl(dataImage.thumbnail_url);
  }

  return (
    <main className="flex p-8 pt-16 lg:pt-24 lg:p-48 min-h-screen flex-col items-left gap-16 lg:gap-24 p-24">
      <h1 className="text-xl">ISBN Search</h1>
      <div className="flex flex-row">
        <form className="flex gap-5" onSubmit={e => {e.preventDefault(); getData()}}>
          <input className="p-2" type="text" placeholder="Enter your ISBN..." value={query} onChange={e => setQuery(e.target.value)} />
          <input className="p-2 cursor-pointer bg-blue-100 hover:bg-blue-50 active:brightness-50" type="submit" value="Go!" />
        </form>
      </div>
      {title ? (
      <div className="flex flex-row gap-10">
        <Image width={100} height={250} src={imageUrl} alt="thumbnail" />
        <div className="flex flex-col gap-5">
          <h2>{title}</h2>
          {author.map(a => <h3 key={a.name}>{a.name}</h3>)}
        </div>
      </div> ) : (null)}
    </main>
  )
}