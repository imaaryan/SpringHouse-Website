import mongoose from "mongoose";

const footerSchema = new mongoose.Schema(
  {
    // 1. Top columns (Company, Locations, Solutions)
    columns: [
      {
        title: { type: String, required: true },
        links: [
          {
            label: { type: String, required: true },
            url: { type: String, required: true },
          },
        ],
      },
    ],

    // 2. Bottom paragraph/block links (Discover, Office Solutions, Events)
    bottomBlocks: [
      {
        title: { type: String, required: true },
        links: [
          {
            label: { type: String, required: true },
            url: { type: String, required: true },
          },
        ],
      },
    ],

    // 3. Social Media Icons URLs
    socialLinks: {
      instagram: { type: String, default: "" },
      facebook: { type: String, default: "" },
      linkedin: { type: String, default: "" },
    },

    // 4. Contact and Address section
    contactInfo: {
      address: { type: String, default: "" },
      phone: { type: String, default: "" },
      whatsapp: { type: String, default: "" },
      email: { type: String, default: "" },
    },
  },
  { timestamps: true },
);

const Footer = mongoose.models.Footer || mongoose.model("Footer", footerSchema);

export default Footer;
