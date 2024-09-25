import styles from "./blog.module.css";
import Link from "next/link";

async function getBlogsData() {
  try {
    let apiData = await fetch("http://localhost:3000/api/blogs",{
      cache: 'no-store',  // Forces fresh data on every request (SSR)
    });
    //console.log(apiData);
    let res = await apiData.json();
    console.log(res);
    return res;
  } catch (error) {
    console.error('Error fetching blogs', error);
    throw new Error("Could not fetch blogs. Please try again later.");
  }
}


export default async function BlogPage({ params }) {
  //const { slug } = params;
  const blogs = await getBlogsData();
  //if (loading) return <p>Loading...</p>;
  return (
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      <div style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', textAlign: 'left' }}>
        {
          blogs.map((blogItem) => {
            return <div className={styles.blogItem} key={blogItem.slug} >
              <Link href={`/blogpost/${blogItem.slug}`}><h3 className={styles.blogItemh3}>{blogItem.title}</h3></Link>
              <p className={styles.blogItemp}>{blogItem.content.substr(0, 140)}...</p>
            </div>
          })
        }
      </div>
    </div>
  )
}

