import Header from "@/app/components/home/Header";
import Footer from "@/app/components/home/Footer";
import connectDB from "@/utils/db";
import { Blog } from "@/model/blog.model";
import { notFound } from "next/navigation";
import "@/app/components/blogs/blogs.css";

export async function generateMetadata({ params }) {
  const { slug } = await params;
  await connectDB();
  const blog = await Blog.findOne({ slug, isActive: true }).lean();
  
  if (!blog) return {};
  
  return {
    title: blog.seo?.metaTitle || `${blog.title} | SpringHouse Coworking Space`,
    description: blog.seo?.metaDescription || blog.title,
  };
}

export default async function SingleBlogPage({ params }) {
  const { slug } = await params;

  await connectDB();

  const rawBlog = await Blog.findOne({ slug, isActive: true }).lean();

  if (!rawBlog) {
    notFound();
  }

  // Safe mapping for Client Components
  const blog = JSON.parse(JSON.stringify(rawBlog));

  return (
    <>
      <Header />
      
      <div className="pt60 pb60" style={{ paddingTop: "140px", paddingBottom: "80px", background: "#ffffff" }}>
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-12 col-lg-10">
              <div className="blog-header mb-4 text-center">
                <h1 className="mb-3" style={{ fontSize: "2.8rem", fontWeight: "900", fontFamily: "gobold", textTransform: "uppercase", wordWrap: "break-word" }}>
                  {blog.title}
                </h1>
                <p className="text-muted" style={{ color: "#575757", fontSize: "1.1rem" }}>
                    Published on {(blog.publishDate || blog.createdAt) ? new Date(blog.publishDate || blog.createdAt).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" }) : ""}
                </p>
              </div>

              {blog.imageURL && (
                <div className="blog-hero-image mb-5">
                  <img 
                    src={blog.imageURL} 
                    alt={blog.title} 
                    style={{ width: "100%", maxHeight: "550px", objectFit: "cover", borderRadius: "10px" }} 
                  />
                </div>
              )}

              <style dangerouslySetInnerHTML={{__html: `
                .blog-content-body {
                  font-size: 1.15rem;
                  line-height: 1.8;
                  color: #333;
                  word-wrap: break-word;
                  overflow-wrap: break-word;
                }
                .blog-content-body * {
                  max-width: 100% !important;
                }
                .blog-content-body img {
                  max-width: 100% !important;
                  height: auto !important;
                  border-radius: 8px;
                }
              `}} />

              <div className="blog-content-body mt-5 ql-content" dangerouslySetInnerHTML={{ __html: blog.content }}></div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}
