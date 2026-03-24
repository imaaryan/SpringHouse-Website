import connectDB from "@/utils/db";
import { Solution } from "@/model/solution.model";
import { Blog } from "@/model/blog.model";
import { City } from "@/model/city.model";
import { Property } from "@/model/property.model";
import { OtherPage } from "@/model/otherPage.model";

export default async function sitemap() {
  const baseUrl = "https://springhouse.in";
  await connectDB();

  // 1. Static Routes
  const staticRoutes = [
    "",
    "/about-us",
    "/blogs",
    "/careers",
    "/faq",
    "/pr",
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: route === "" ? 1 : 0.8,
  }));

  // 2. Dynamic Solutions (/[slug])
  const solutions = await Solution.find({ isActive: true }).select("slug updatedAt").lean();
  const solutionRoutes = solutions.map((s) => ({
    url: `${baseUrl}/${s.slug}`,
    lastModified: s.updatedAt || new Date(),
    changeFrequency: "weekly",
    priority: 0.9,
  }));

  // 3. Dynamic Blogs (/blogs/[slug])
  const blogs = await Blog.find({ isActive: true }).select("slug updatedAt").lean();
  const blogRoutes = blogs.map((b) => ({
    url: `${baseUrl}/blogs/${b.slug}`,
    lastModified: b.updatedAt || new Date(),
    changeFrequency: "weekly",
    priority: 0.7,
  }));

  // 4. Dynamic Other Pages (/[slug])
  const otherPages = await OtherPage.find({ isActive: true }).select("slug updatedAt").lean();
  const otherPageRoutes = otherPages.map((p) => ({
    url: `${baseUrl}/${p.slug}`,
    lastModified: p.updatedAt || new Date(),
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  // 5. Dynamic Cities (/coworking-space/[city-slug]-coworking-space)
  const cities = await City.find({ isActive: true }).select("slug updatedAt").lean();
  const cityRoutes = cities.map((c) => ({
    url: `${baseUrl}/coworking-space/${c.slug}-coworking-space`,
    lastModified: c.updatedAt || new Date(),
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  // 6. Dynamic Properties (/coworking-space/[city-slug]-coworking-space/[property-slug])
  const properties = await Property.find({ isActive: true })
    .populate("city", "slug")
    .select("slug city updatedAt")
    .lean();
  const propertyRoutes = properties
    .filter((p) => p.city?.slug)
    .map((p) => ({
      url: `${baseUrl}/coworking-space/${p.city.slug}-coworking-space/${p.slug}`,
      lastModified: p.updatedAt || new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    }));

  return [
    ...staticRoutes,
    ...solutionRoutes,
    ...blogRoutes,
    ...otherPageRoutes,
    ...cityRoutes,
    ...propertyRoutes,
  ];
}
