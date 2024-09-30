'use client';

import { useState } from "react";
import Link from "next/link";
import InfiniteScroll from 'react-infinite-scroll-component';
import styles from './blog.module.css';


function createMarkup(c) {
    return { __html: c.substr(0, 140) + "..." };
}

// Client component for infinite scroll
export default function BlogList({ initialBlogs }) {
    const [blogs, setBlogs] = useState(initialBlogs); // Initialize blogs with server data
    const [count, setCount] = useState(0); // Track the count of blogs loaded
    const [hasMore, setHasMore] = useState(true); // Control infinite scroll stop

    // Function to fetch more blogs
    const fetchMoreBlogs = async () => {
        try {
            const res = await fetch(`http://localhost:3000/api/blogs?count=${count + 2}`, {
                cache: 'no-store', // No caching, force fresh data
            });
            const newBlogs = await res.json();

            if (newBlogs.length === 0) {
                setHasMore(false); // Stop infinite scroll when no more blogs are available
                return;
            }

            setBlogs((prevBlogs) => [...prevBlogs, ...newBlogs]); // Append new blogs
            //setBlogs(newBlogs);
            setCount(count + 2); // Increase count
        } catch (error) {
            console.error('Error fetching more blogs', error);
        }
    };

    return (
        <div style={{ display: 'flex', justifyContent: 'center' }}>
            <div style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', textAlign: 'left' }}>
                <InfiniteScroll
                    dataLength={blogs.length} // Current number of blogs
                    next={fetchMoreBlogs} // Function to fetch more blogs
                    hasMore={hasMore} // Whether more blogs are available
                    loader={<h4>Loading...</h4>} // Loader component
                    endMessage={
                        <p style={{ textAlign: 'center' }}>
                            <b>Yay! You`ve seen it all</b>
                        </p>
                    }
                >
                    {
                        blogs.map((blogItem) => {
                            return <div className={styles.blogItem} key={blogItem.slug} >
                                <Link href={`/blogpost/${blogItem.slug}`}><h3 className={styles.blogItemh3}>{blogItem.title}</h3></Link>
                                <p className={styles.blogItemp}><span dangerouslySetInnerHTML={createMarkup(blogItem.content)}></span></p>
                                <Link href={`/blogpost/${blogItem.slug}`}><button className={styles.btn}>Read More</button></Link>
                            </div>
                        })
                    }
                </InfiniteScroll>
            </div>
        </div>
    )
}