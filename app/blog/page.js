"use client"; // This marks the component as a Client Component
import React, { useEffect, useState } from 'react'
import styles from "./blog.module.css";
import Link from "next/link";

const Blog = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true)
  useEffect(()=>{
    const getBlogData = async ()=>{
      try{
        let apiData = await fetch("/api/blogs");
        //console.log(apiData);
        let jsonData = await apiData.json();
        //console.log(jsonData);
        setBlogs(jsonData);
      }catch(error){
        console.error('Error fetching blogs', error);
      }finally{
        setLoading(false);
      }
    }
    getBlogData();
  },[])
  
  if (loading) return <p>Loading...</p>;
  return (
  <div style={{ display: 'flex', justifyContent: 'center'}}>
    <div style={{ display: 'flex', justifyContent: 'center', flexDirection:'column', textAlign:'left'}}>
      {
        blogs.map((blogItem)=>{
          return <div className={styles.blogItem} key={blogItem.slug} >
                    <Link href={`/blogpost/${blogItem.slug}`}><h3 className={styles.blogItemh3}>{blogItem.title}</h3></Link>
                    <p className={styles.blogItemp}>{blogItem.content.substr(0,140)}...</p>
                </div>
        })
      }
    </div>
  </div>
  )
}

export default Blog