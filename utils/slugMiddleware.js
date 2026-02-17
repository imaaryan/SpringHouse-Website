import slugify from "slugify";

export const applySlugify = (schema, sourceField = "name") => {
  schema.pre("save", function (next) {
    if (this.slug) {
      this.slug = slugify(this.slug, { lower: true, strict: true });
    } else if (this[sourceField]) {
      this.slug = slugify(this[sourceField], { lower: true, strict: true });
    }
    next();
  });
};
