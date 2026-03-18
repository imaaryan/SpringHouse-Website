import Header from "@/app/components/home/Header";
import Footer from "@/app/components/home/Footer";
import { Blog } from "@/model/blog.model";
import connectDB from "@/utils/db";
import Link from "next/link";
import "@/app/components/blogs/blogs.css";

export const metadata = {
  title: "Blogs | SpringHouse Coworking Space",
  description: "Read the latest blogs and articles from SpringHouse Coworking.",
};

export default async function BlogsArchivePage() {
  await connectDB();
  
  const rawBlogs = await Blog.find({ isActive: true }).sort({ publishDate: -1, createdAt: -1 }).lean();
  const blogs = JSON.parse(JSON.stringify(rawBlogs));

  return (
    <>
      <Header />
      <div className="blogs blog-archive pt60 pb60" style={{ paddingTop: "120px", background: "#f8f9fa" }}>
        <div className="container-fluid pt-4">
          <div className="row mb-5">
            <div className="col-lg-12">
              <span className="section-title-span">our blogs</span>
            </div>
          </div>
          <div className="row">
            {blogs.length === 0 ? (
              <div className="col-12 text-center">
                <p>No published blogs available at the moment.</p>
              </div>
            ) : (
              blogs.map((blog, idx) => (
                <div className="col-lg-4 col-md-6 mb-5" key={blog._id || idx}>
                  <Link href={`/blogs/${blog.slug || "#"}`}>
                    <div className="blog-card" style={{ cursor: "pointer", height: "100%" }}>
                      <div className="blog-image relative">
                        <img
                          src={blog.imageURL || "/assets/blogs/1748253643_1.png"}
                          alt={blog.title}
                          style={{ objectFit: "cover", width: "100%", height: "300px" }}
                        />
                      </div>
                      <div className="blog-content text-shape relative">
                        <div className="blog-para">
                          <p style={{ display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>
                            {blog.title}
                          </p>
                        </div>
                        <div className="blog-date textright">
                          <span className="font17 textright" style={{ display: "block" }}>
                            {(blog.publishDate || blog.createdAt)
                              ? new Date(blog.publishDate || blog.createdAt).toLocaleDateString(
                                  "en-US",
                                  {
                                    month: "short",
                                    day: "numeric",
                                    year: "numeric",
                                  },
                                )
                              : ""}
                          </span>
                        </div>
                      </div>
                    </div>
                  </Link>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
