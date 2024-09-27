import BlogList from './BlogList'; // Import the client component

// Server component to fetch initial blogs
export default async function BlogPage() {
  const blogs = await getBlogsData(); // Fetch initial blogs from the server

  return (
    <div>
      {/* Pass the initial blogs data to the client component */}
      <BlogList initialBlogs={blogs} />
    </div>
  );
}


// Server-side function to fetch initial blogs
async function getBlogsData() {
  const res = await fetch("http://localhost:3000/api/blogs?count=0", {
    cache: 'no-store', // Ensure fresh data on each request
  });
  const data = await res.json();
  return data;
}