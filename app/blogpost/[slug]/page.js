// Implementation with SSG
// generateStaticParams is only called at build time to determine which dynamic paths should be statically 
// generated.
// During revalidation (ISR), only the specific page’s data (e.g., BlogPostPage) is re-fetched 
// and re-generated.
// generateStaticParams does not run at runtime; Next.js only re-fetches the content for the 
// dynamic route that is accessed after the revalidation period.

//Detail:
//Build Time:
// generateStaticParams is called and returns slugs: ['post-1', 'post-2'].
// Next.js statically generates the pages for /blog/post-1 and /blog/post-2 at build time using BlogPostPage.

//Runtime (After Revalidation Period):
// If a user visits /blog/post-1 after the 10-second revalidation interval, Next.js will call 
// BlogPostPage({ params: { slug: 'post-1' } }) again and re-fetch the blog post data for post-1.
// generateStaticParams is NOT called again to regenerate the list of all slugs.

import styles from '../blogpost.module.css';

async function getBlogData(params) {
  try {
    console.log('params=',params);
    // cache by default is cache: force-cache, so no need to give it explicitly
    // revalidate = 10 seconds - gets new data from server every 10 seconds.
    let apiData = await fetch(`http://localhost:3000/api/blog?slug=${params.slug}`,{ next: { revalidate: 10 } });
    //console.log(apiData);
    let res = await apiData.json();
    //console.log(res);
    return res;
  } catch (error) {
    console.error('Error fetching blog', error);
    throw new Error("Could not fetch blog. Please try again later.");
  }
}

// if pre-rendering of dynamic routes at build time is not reqd, this fucntion can be skipped, the page will call api first time, 
// cache for 10 seconds and revalidate
// export async function generateStaticParams() {
//   const apiUrl = 'http://localhost:3000/api/blogs';
//   const res = await fetch(apiUrl);
//   const blogs = await res.json();

//   return blogs.map((blog) => ({
//     slug: blog.slug,
//   }));
// }

function createMarkup(c) {
  return {__html: c};
}

export default async function Blogpost({ params }) {
  //const { slug } = params;
  const blog = await getBlogData(params);
  //if (loading) return <p>Loading...</p>;
  return (
    <div className={styles.divWrap} style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', textAlign: 'left' }}>
      <h2>{blog && blog.title}</h2>
      <p>
        {blog && <span dangerouslySetInnerHTML={createMarkup(blog.content)}></span>}
      </p>
    </div>
  )
}