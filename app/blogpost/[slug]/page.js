"use client"; 
import React, { useEffect, useState } from 'react'
import styles from '../blogpost.module.css';

const Blogpost = ({ params }) => {
  const [blog, setBlog] = useState();
  const [loading, setLoading] = useState(true)
  useEffect(()=>{
    const getBlogData = async ()=>{
      try{
        let apiData = await fetch(`/api/blog?slug=${params.slug}`);
        //console.log(apiData);
        let jsonData = await apiData.json();
        //console.log(jsonData);
        setBlog(jsonData);
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
    <div className={styles.divWrap} style={{ display: 'flex', justifyContent: 'center', flexDirection:'column', textAlign:'left'}}>
      <h2>{blog && blog.title}</h2>
      <p>
        {blog && blog.content}
      </p>
    </div>
  )
}

export default Blogpost