import Header from "@/app/components/home/Header";
import Footer from "@/app/components/home/Footer";
import GlobalBanner from "@/app/components/home/GlobalBanner";
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

      {/* Blog Hero Banner */}
      <div className="blog">
        <GlobalBanner
          title=""
          imageSrc={
            blog.imageURL || "/assets/bannerimage/1747035219_home-banner.jpg"
          }
        />
      </div>

      <div
        className="pt60 pb60"
        style={{ paddingBottom: "60px", background: "#ffffff" }}
      >
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-12 col-lg-9">
              <div className="blog-content-header mb-5">
                <h1
                  className="mb-3"
                  style={{
                    fontSize: "2.8rem",
                    fontWeight: "700",
                    fontFamily: "gobold",
                    textTransform: "uppercase",
                    wordWrap: "break-word",
                    lineHeight: "1.2",
                    color: "#000",
                  }}
                >
                  {blog.title}
                </h1>
                <p
                  className="text-muted"
                  style={{
                    color: "#575757",
                    fontSize: "1.1rem",
                    fontWeight: "500",
                  }}
                >
                  Published on{" "}
                  {blog.publishDate || blog.createdAt
                    ? new Date(
                        blog.publishDate || blog.createdAt,
                      ).toLocaleDateString("en-US", {
                        month: "long",
                        day: "numeric",
                        year: "numeric",
                      })
                    : ""}
                </p>
                <hr
                  className="mt-4"
                  style={{ borderTop: "2px solid #f0f0f0", opacity: "1" }}
                />
              </div>

              <style
                dangerouslySetInnerHTML={{
                  __html: `
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
              `,
                }}
              />

              <div
                className="blog-content-body ql-content"
                dangerouslySetInnerHTML={{ __html: blog.content }}
              ></div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}
