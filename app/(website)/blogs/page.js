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
      <div className="blogs blog-archive pt30 pb60 blog" style={{ background: "#f8f9fa" }}>
        <div className="container-fluid pt-4">
          <div className="row mb-5">
            <div className="col-lg-12">
              <span className="section-title">blogs</span>
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
                    <div className="blog-card" style={{ cursor: "pointer", height: "100%", background: "#fff", borderRadius: "20px", overflow: "hidden" }}>
                      <div className="locations-image relative">
                        <img
                          src={blog.imageURL || "/assets/blogs/1748253643_1.png"}
                          alt={blog.title}
                          style={{ objectFit: "cover", width: "100%", height: "300px" }}
                        />
                        <div className="shape-bottom">
                          <div className="shape-left-top">
                            <svg className="w-11 h-11" fill="none" style={{ width: "1.0rem", height: "1.0rem" }} viewBox="0 0 11 11" xmlns="http://www.w3.org/2000/svg">
                              <path d="M11 1.54972e-06L0 0L2.38419e-07 11C1.65973e-07 4.92487 4.92487 1.62217e-06 11 1.54972e-06Z" fill="#fff"></path>
                            </svg>
                          </div>
                          <div className="shape-right-bottom">
                            <svg className="w-11 h-11" fill="none" style={{ width: "1.2rem", height: "1.2rem" }} viewBox="0 0 11 11" xmlns="http://www.w3.org/2000/svg">
                              <path d="M11 1.54972e-06L0 0L2.38419e-07 11C1.65973e-07 4.92487 4.92487 1.62217e-06 11 1.54972e-06Z" fill="#fff"></path>
                            </svg>
                          </div>
                        </div>
                      </div>
                      <div className="blog-content text-shape relative" style={{ padding: "20px" }}>
                        <div className="blog-para">
                          <p style={{ display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden", fontSize: "20px", fontWeight: "600", color: "#000", fontFamily: "Montserrat, sans-serif" }}>
                            {blog.title}
                          </p>
                        </div>
                        <div className="blog-date textright" style={{ marginTop: "15px" }}>
                          <span className="font17 textright" style={{ display: "block", color: "#575757" }}>
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
