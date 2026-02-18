import { writeFile, mkdir } from "fs/promises";
import path from "path";

/**
 * Uploads a file to the specified directory.
 * @param {File} file - The file object from request.formData()
 * @param {string} folderName - The subfolder within the base directory
 * @param {string} baseDir - The base directory (default: "public/assets")
 * @returns {Promise<string>} - The path to the uploaded file (relative to public for assets, or absolute/relative for private)
 */
export async function uploadImage(file, folderName, baseDir = "public/assets") {
  if (!file) return null;

  const buffer = Buffer.from(await file.arrayBuffer());
  const filename = Date.now() + "_" + file.name.replaceAll(" ", "_");

  // Ensure the directory exists
  const uploadDir = path.join(process.cwd(), baseDir, folderName);
  await mkdir(uploadDir, { recursive: true });

  const filePath = path.join(uploadDir, filename);
  await writeFile(filePath, buffer);

  // Return path suited for public access if in public/assets
  if (baseDir.startsWith("public/")) {
    // Remove "public" from the start to make it a URL path
    return `/${baseDir.replace("public/", "")}/${folderName}/${filename}`;
  }

  // For private files, return the relative path from root (or simple identifier)
  return `${baseDir}/${folderName}/${filename}`;
}
