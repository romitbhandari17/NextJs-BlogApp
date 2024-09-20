import Image from "next/image";
import styles from "./home.module.css";
import Link from "next/link";

export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      {/* <Dummy/> */}
      {/* <style jsx>
        {`
          .myH1{
            color:red;
          }
        `}
      </style> */}
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <div style={{ display: 'flex', justifyContent: 'center', flexDirection:'column', textAlign: 'center'}}>
          <h1>Romit Bhandari Personal Blog</h1>
          <div className={styles.imageWrap}>
            <Image className={styles.homeBlog} height={144} width={192} src='/images/home-blog.jpg' alt="Picture of Blog"></Image>
          </div>
          <p>Hi, I share some of my professional achievements and personal likes and dislikes on ths blog, Thanks!!</p>
        </div>
        <div style={{ display: 'flex', justifyContent: 'center'}}>
          <div style={{ display: 'flex', justifyContent: 'center', flexDirection:'column', textAlign:'left'}}>
            <h2>Popular Blogs</h2>
            <div className={styles.blogItem}>
              <Link href={'/blogpost/learn-js'}><h3>How to learn Java Spring Boot in 2024</h3></Link>
              <p>Watch my videos on YT</p>
            </div>
            <div className={styles.blogItem}>
              <h3>How to learn Java Spring Boot in 2024</h3>
              <p>Watch my videos on YT</p>
            </div>
            <div className={styles.blogItem}>
              <h3>How to learn Java Spring Boot in 2024</h3>
              <p>Watch my videos on YT</p>
            </div>
          </div>
        </div>
      </main>
      <footer>
      </footer>
    </div>
  );
}
