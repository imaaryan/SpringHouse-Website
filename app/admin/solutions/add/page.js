/* eslint-disable @next/next/no-img-element */
/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Loader2, Save, UploadCloud, X, Plus } from "lucide-react";
import PageHeader from "@/app/components/admin/PageHeader";
import {
  FormInput,
  FormTextarea,
  FormSelect,
  FormCheckboxGrid,
  ImageUploader,
} from "@/app/components/admin/FormElements";
import slugify from "slugify";
import SEOForm from "@/app/components/admin/SEOForm";

export default function AddSolutionPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [dependencies, setDependencies] = useState({
    testimonials: [],
  });

  const [formData, setFormData] = useState({
    name: "",
    slug: "",
    description: "",
    isActive: false, // Default Draft
    fourPoints: ["", "", "", ""],
    testimonials: [],
    networking: { title: "", content: "", tooltips: ["", "", ""] },
    ourCommunity: [],
    seo: {
      metaTitle: "",
      metaDescription: "",
      codeSnippet: "",
    },
  });

  // Image States
  const [image, setImage] = useState(null); // Single Featured Image
  const [imagePreview, setImagePreview] = useState(null);

  const [companyImages, setCompanyImages] = useState([]); // Multiple
  const [companyImagePreviews, setCompanyImagePreviews] = useState([]);

  const [networkingImage, setNetworkingImage] = useState(null);
  const [networkingImagePreview, setNetworkingImagePreview] = useState(null);

  const [communityImages, setCommunityImages] = useState([]);
  const [communityImagePreviews, setCommunityImagePreviews] = useState([]);

  // Featured Spaces State: Array of { name: "", image: File|null, preview: "" }
  const [featuredSpaces, setFeaturedSpaces] = useState([
    { name: "", image: null, preview: "" },
  ]);

  // Fetch Dependencies
  useEffect(() => {
    const fetchDependencies = async () => {
      try {
        const res = await fetch("/api/admin/solutions/dependencies");
        const data = await res.json();
        if (data.success) {
          setDependencies(data.data);
        }
      } catch (error) {
        console.error("Failed to fetch dependencies", error);
      }
    };
    fetchDependencies();
  }, []);

  // Handle Input Change
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => {
      const newData = {
        ...prev,
        [name]: type === "checkbox" ? checked : value,
      };

      if (name === "name") {
        newData.slug = slugify(value, { lower: true });
      }

      return newData;
    });
  };

  // Handle Four Points
  const handlePointChange = (index, value) => {
    const newPoints = [...formData.fourPoints];
    newPoints[index] = value;
    setFormData((prev) => ({ ...prev, fourPoints: newPoints }));
  };

  // Handle Checkbox Grid (Testimonials)
  const handleCheckboxChange = (category, id) => {
    setFormData((prev) => {
      const list = prev[category];
      if (list.includes(id)) {
        return { ...prev, [category]: list.filter((item) => item !== id) };
      } else {
        return { ...prev, [category]: [...list, id] };
      }
    });
  };

  // Handle Featured Image
  const handleFeaturedImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  // Handle Company Images
  const handleCompanyImagesChange = (e) => {
    const files = Array.from(e.target.files);
    if (files.length > 0) {
      setCompanyImages((prev) => [...prev, ...files]);
      const newPreviews = files.map((file) => URL.createObjectURL(file));
      setCompanyImagePreviews((prev) => [...prev, ...newPreviews]);
    }
  };

  const removeCompanyImage = (index) => {
    setCompanyImages((prev) => prev.filter((_, i) => i !== index));
    setCompanyImagePreviews((prev) => prev.filter((_, i) => i !== index));
  };

  // Handle Networking Image
  const handleNetworkingImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setNetworkingImage(file);
      setNetworkingImagePreview(URL.createObjectURL(file));
    }
  };

  const handleNetworkingTextChange = (e) => {
    const { name, value } = e.target;
    
    setFormData((prev) => {
      if (name.startsWith("tooltip")) {
        const index = parseInt(name.replace("tooltip", ""), 10) - 1;
        const newTooltips = [...(prev.networking.tooltips || ["", "", ""])];
        newTooltips[index] = value;
        return {
          ...prev,
          networking: { ...prev.networking, tooltips: newTooltips },
        };
      }
      
      return {
        ...prev,
        networking: { ...prev.networking, [name]: value },
      };
    });
  };

  // Handle Community Images
  const handleCommunityImagesChange = (e) => {
    const files = Array.from(e.target.files);
    if (files.length > 0) {
      setCommunityImages((prev) => [...prev, ...files]);
      const newPreviews = files.map((file) => URL.createObjectURL(file));
      setCommunityImagePreviews((prev) => [...prev, ...newPreviews]);
    }
  };

  const removeCommunityImage = (index) => {
    setCommunityImages((prev) => prev.filter((_, i) => i !== index));
    setCommunityImagePreviews((prev) => prev.filter((_, i) => i !== index));
  };

  // Handle Featured Spaces
  const addSpace = () => {
    setFeaturedSpaces((prev) => [
      ...prev,
      { name: "", image: null, preview: "" },
    ]);
  };

  const removeSpace = (index) => {
    setFeaturedSpaces((prev) => prev.filter((_, i) => i !== index));
  };

  const updateSpaceName = (index, value) => {
    const newSpaces = [...featuredSpaces];
    newSpaces[index].name = value;
    setFeaturedSpaces(newSpaces);
  };

  const updateSpaceImage = (index, file) => {
    const newSpaces = [...featuredSpaces];
    newSpaces[index].image = file;
    newSpaces[index].preview = URL.createObjectURL(file);
    setFeaturedSpaces(newSpaces);
  };

  // Submit Form
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const data = new FormData();

      // Basic Fields
      data.append("name", formData.name);
      data.append("slug", formData.slug);
      data.append("description", formData.description);
      data.append("isActive", formData.isActive);

      // SEO
      data.append("seo[metaTitle]", formData.seo.metaTitle);
      data.append("seo[metaDescription]", formData.seo.metaDescription);
      data.append("seo[codeSnippet]", formData.seo.codeSnippet);

      // Arrays
      formData.fourPoints.forEach((point) => data.append("fourPoints", point));
      formData.testimonials.forEach((id) => data.append("testimonials", id));

      // Featured Image
      if (image) data.append("image", image);

      // Company Images
      companyImages.forEach((img) => data.append("companyImages", img));

      // Featured Spaces (Complex)
      featuredSpaces.forEach((space, index) => {
        data.append(`featuredSpaces[${index}][name]`, space.name);
        if (space.image) {
          data.append(`featuredSpaces[${index}][image]`, space.image);
        }
      });

      // Networking
      data.append("networking[title]", formData.networking.title || "");
      data.append("networking[content]", formData.networking.content || "");
      
      if (formData.networking.tooltips) {
        data.append("networking[tooltip1]", formData.networking.tooltips[0] || "");
        data.append("networking[tooltip2]", formData.networking.tooltips[1] || "");
        data.append("networking[tooltip3]", formData.networking.tooltips[2] || "");
      }

      if (networkingImage) {
        data.append("networkingImage", networkingImage);
      }

      // Community Images
      communityImages.forEach((img) => data.append("communityImages", img));

      const res = await fetch("/api/admin/solutions", {
        method: "POST",
        body: data,
      });

      const result = await res.json();

      if (result.success) {
        router.push("/admin/solutions");
      } else {
        alert(result.error || "Failed to create solution");
      }
    } catch (error) {
      console.error("Error creating solution:", error);
      alert("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6 max-w-[1440px] mx-auto w-full"
    >
      <PageHeader
        title="Add New Solutions"
        actions={
          <button
            type="submit"
            disabled={loading}
            className="flex items-center gap-2 rounded-lg bg-brand-primary px-6 py-2.5 text-sm font-medium text-white hover:bg-teal-600 transition shadow-sm uppercase disabled:opacity-50"
          >
            {loading ? (
              <Loader2 className="animate-spin" size={16} />
            ) : (
              <Save size={16} />
            )}
            Save
          </button>
        }
      />

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Main Column - Left */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 space-y-4">
            <FormInput
              label="Name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Managed Office"
              required
            />
            <FormInput
              label="Slug"
              name="slug"
              value={formData.slug}
              onChange={handleChange}
              placeholder="url"
            />
            <FormTextarea
              label="Description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Write Short Description"
              rows={6}
            />
          </div>

          {/* Company Images */}
          <ImageUploader
            label="Company Images"
            images={companyImagePreviews}
            onImageChange={handleCompanyImagesChange}
            onRemoveImage={removeCompanyImage}
          />

          {/* Networking */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h3 className="text-sm font-semibold text-gray-900 mb-4">
              Networking
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="md:col-span-1 border-2 border-dashed border-gray-300 rounded-lg bg-gray-50 flex items-center justify-center relative overflow-hidden h-32">
                {networkingImagePreview ? (
                  <>
                    <img
                      src={networkingImagePreview}
                      alt="Networking"
                      className="w-full h-full object-cover"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        setNetworkingImage(null);
                        setNetworkingImagePreview(null);
                      }}
                      className="absolute top-2 right-2 bg-white flex items-center justify-center rounded-full p-1 shadow-md text-red-500 hover:bg-red-50 z-10"
                    >
                      <X size={14} />
                    </button>
                  </>
                ) : (
                  <label className="cursor-pointer flex flex-col items-center justify-center w-full h-full">
                    <UploadCloud size={24} className="text-gray-400 mb-1" />
                    <span className="text-xs text-gray-500">Upload Image</span>
                    <input
                      type="file"
                      className="hidden"
                      accept="image/*"
                      onChange={handleNetworkingImageChange}
                    />
                  </label>
                )}
              </div>
              <div className="md:col-span-2 space-y-4">
                <FormInput
                  label="Title"
                  name="title"
                  value={formData.networking.title}
                  onChange={handleNetworkingTextChange}
                  placeholder="Networking Title"
                />
                <FormTextarea
                  label="Content"
                  name="content"
                  value={formData.networking.content}
                  onChange={handleNetworkingTextChange}
                  rows={3}
                  placeholder="Networking content..."
                />
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <FormInput
                    label="Tooltip 1"
                    name="tooltip1"
                    value={formData.networking.tooltips?.[0] || ""}
                    onChange={handleNetworkingTextChange}
                    placeholder="Spring House Gurugram"
                  />
                  <FormInput
                    label="Tooltip 2"
                    name="tooltip2"
                    value={formData.networking.tooltips?.[1] || ""}
                    onChange={handleNetworkingTextChange}
                    placeholder="Spring House Gurugram"
                  />
                  <FormInput
                    label="Tooltip 3"
                    name="tooltip3"
                    value={formData.networking.tooltips?.[2] || ""}
                    onChange={handleNetworkingTextChange}
                    placeholder="Spring House Delhi"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Our Community */}
          <section className="space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-[15px] font-bold text-gray-800">
                Our Community
              </h2>
              <label className="cursor-pointer bg-brand-primary text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-teal-600 transition shadow-sm">
                Add Images
                <input
                  type="file"
                  multiple
                  className="hidden"
                  accept="image/*"
                  onChange={(e) => handleCommunityImagesChange(e, true)}
                />
              </label>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 min-h-[160px]">
              {communityImagePreviews.length === 0 ? (
                <div className="flex items-center justify-center h-full text-gray-400 text-sm">
                  No images added yet. Click &apos;Add Images&apos; to upload.
                </div>
              ) : (
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                  {communityImagePreviews.map((preview, i) => (
                    <div
                      key={i}
                      className="h-28 relative rounded-lg overflow-hidden border border-gray-200 group"
                    >
                      <img
                        src={preview}
                        alt="Community"
                        className="w-full h-full object-cover"
                      />
                      <button
                        type="button"
                        onClick={() => removeCommunityImage(i)}
                        className="absolute top-2 right-2 bg-white rounded-full p-1 shadow-md text-red-500 opacity-0 group-hover:opacity-100 transition-opacity z-10"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="14"
                          height="14"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <line x1="18" y1="6" x2="6" y2="18"></line>
                          <line x1="6" y1="6" x2="18" y2="18"></line>
                        </svg>
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </section>

          {/* Featured Spaces (Custom) */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h3 className="text-sm font-semibold text-gray-900 mb-4">
              Featured Spaces
            </h3>
            <div className="space-y-4">
              {featuredSpaces.map((space, index) => (
                <div
                  key={index}
                  className="flex gap-4 items-start p-4 border border-gray-100 rounded-lg bg-gray-50/50"
                >
                  {/* Image Upload for Space */}
                  <label className="flex flex-col items-center justify-center w-24 h-24 shrink-0 rounded-lg border-2 border-dashed border-gray-300 bg-white hover:bg-gray-50 cursor-pointer overflow-hidden">
                    {space.preview ? (
                      <img
                        src={space.preview}
                        alt="Space"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <>
                        <UploadCloud size={20} className="text-gray-400" />
                        <span className="text-[10px] text-gray-500 mt-1 text-center px-1">
                          Upload Image
                        </span>
                      </>
                    )}
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => {
                        if (e.target.files?.[0])
                          updateSpaceImage(index, e.target.files[0]);
                      }}
                    />
                  </label>

                  <div className="flex-1 space-y-2">
                    <label className="block text-xs font-semibold text-gray-700">
                      Content
                    </label>
                    <input
                      type="text"
                      className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:border-brand-primary focus:ring-brand-primary bg-white"
                      placeholder="naraina, arise building, delhi"
                      value={space.name}
                      onChange={(e) => updateSpaceName(index, e.target.value)}
                    />
                  </div>

                  <button
                    type="button"
                    onClick={() => removeSpace(index)}
                    className="text-gray-400 hover:text-red-500 p-1"
                  >
                    <X size={16} />
                  </button>
                </div>
              ))}

              <button
                type="button"
                onClick={addSpace}
                className="flex items-center gap-2 text-sm text-brand-primary font-medium hover:text-teal-700"
              >
                <Plus size={16} /> Add Another Space
              </button>
            </div>
          </div>

          {/* Testimonials */}
          <FormCheckboxGrid
            label="Testimonials"
            name="testimonials"
            options={dependencies.testimonials.map((t) => ({
              value: t._id,
              label: t.clientName,
            }))}
            selectedValues={formData.testimonials}
            onChange={handleCheckboxChange}
          />

          {/* SEO Section */}
          <SEOForm
            values={formData.seo}
            onChange={(newSeo) =>
              setFormData((prev) => ({ ...prev, seo: newSeo }))
            }
          />
        </div>

        {/* Sidebar - Right */}
        <div className="space-y-6">
          {/* Status */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <FormSelect
              label="Property Status"
              name="isActive"
              value={formData.isActive.toString()}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  isActive: e.target.value === "true",
                }))
              }
              options={[
                { value: "false", label: "Draft" },
                { value: "true", label: "Published" },
              ]}
            />
          </div>

          {/* Featured Image */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h3 className="text-sm font-semibold text-gray-700 mb-3">
              Featured Image
            </h3>
            <div className="w-full h-48 rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 flex flex-col items-center justify-center overflow-hidden relative group">
              {imagePreview ? (
                <>
                  <img
                    src={imagePreview}
                    alt="Featured"
                    className="w-full h-full object-cover"
                  />
                  <label className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                    <span className="text-white text-sm font-medium">
                      Change Image
                    </span>
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleFeaturedImageChange}
                    />
                  </label>
                </>
              ) : (
                <label className="flex flex-col items-center justify-center w-full h-full cursor-pointer hover:bg-gray-100 transition-colors">
                  <UploadCloud size={32} className="text-brand-primary mb-2" />
                  <span className="text-sm text-gray-500">
                    Upload / Drag and Drop the Image
                  </span>
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleFeaturedImageChange}
                  />
                </label>
              )}
            </div>
          </div>

          {/* Featured Points */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 space-y-4">
            <h3 className="text-sm font-semibold text-gray-900">
              Featured Points
            </h3>
            {formData.fourPoints.map((point, index) => (
              <input
                key={index}
                type="text"
                value={point}
                onChange={(e) => handlePointChange(index, e.target.value)}
                placeholder={`Point ${index + 1}`}
                className="w-full rounded-lg border border-gray-200 px-4 py-2 text-sm focus:border-brand-primary focus:ring-brand-primary"
              />
            ))}
          </div>
        </div>
      </div>
    </form>
  );
}
