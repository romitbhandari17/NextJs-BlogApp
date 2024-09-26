import styles from '../blogpost.module.css';

async function getBlogData(params) {
  try {
    console.log('params=',params);
    let apiData = await fetch(`http://localhost:3000/api/blog?slug=${params.slug}`,{
      cache: 'no-store',  // Forces fresh data on every request (SSR)
    });
    //console.log(apiData);
    let res = await apiData.json();
    console.log(res);
    return res;
  } catch (error) {
    console.error('Error fetching blog', error);
    throw new Error("Could not fetch blog. Please try again later.");
  }
}



export default async function Blogpost({ params }) {
  //const { slug } = params;
  const blog = await getBlogData(params);
  //if (loading) return <p>Loading...</p>;
  return (
    <div className={styles.divWrap} style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', textAlign: 'left' }}>
      <h2>{blog && blog.title}</h2>
      <p>
        {blog && blog.content}
      </p>
    </div>
  )
}