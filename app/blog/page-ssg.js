//Implementation with SSG
import styles from "./blog.module.css";
import Link from "next/link";

async function getBlogsData() {
  try {
    console.log("getBlogsData");
    // cache by default is cache: force-cache, so no need to give it explicitly
    let apiData = await fetch("http://localhost:3000/api/blogs?count=0", {
      cache: 'force-cache',
    }, { next: { revalidate: 3 } }
    );
    console.log(apiData);
    let res = await apiData.json();
    console.log(res);
    return res;
  } catch (error) {
    console.error('Error fetching blogs', error);
    throw new Error("Could not fetch blogs. Please try again later.");
  }
}

function createMarkup(c) {
  return { __html: c.substr(0, 140) + "..." };
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
                <p className={styles.blogItemp}><span dangerouslySetInnerHTML={createMarkup(blogItem.content)}></span></p>
                <Link href={`/blogpost/${blogItem.slug}`}><button className={styles.btn}>Read More</button></Link>
              </div>
            })
          }
      </div>
    </div>
  )
}

