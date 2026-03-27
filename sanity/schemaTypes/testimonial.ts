import {defineField, defineType} from "sanity";

export const testimonialType = defineType({
  name: "testimonial",
  title: "Testimonials",
  type: "document",
  fields: [
    defineField({name: "name", title: "Name", type: "string", validation: (rule) => rule.required()}),
    defineField({name: "role", title: "Role", type: "string"}),
    defineField({name: "car", title: "Related Car Label", type: "string"}),
    defineField({
      name: "rating",
      title: "Rating",
      type: "number",
      validation: (rule) => rule.min(1).max(5),
      initialValue: 5,
    }),
    defineField({name: "text", title: "Quote", type: "text", rows: 5, validation: (rule) => rule.required()}),
  ],
});
