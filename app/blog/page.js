import React from 'react'
import styles from "./blog.module.css";
import Link from "next/link";

const Blog = () => {
  return (
  <div style={{ display: 'flex', justifyContent: 'center'}}>
    <div style={{ display: 'flex', justifyContent: 'center', flexDirection:'column', textAlign:'left'}}>
      <div className={styles.blogItem}>
        <Link href={'/blogpost/learn-javascript'}><h3 className={styles.blogItemh3}>How to learn Java Spring Boot in 2024</h3></Link>
        <p>Watch my videos on YT</p>
      </div>
      <div className={styles.blogItem}>
        <h3 className={styles.blogItemh3}>How to learn Java Spring Boot in 2024</h3>
        <p>Watch my videos on YT</p>
      </div>
      <div className={styles.blogItem}>
        <h3 className={styles.blogItemh3}>How to learn Java Spring Boot in 2024</h3>
        <p>Watch my videos on YT</p>
      </div>
    </div>
  </div>
  )
}

export default Blog