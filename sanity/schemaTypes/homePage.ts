import {defineArrayMember, defineField, defineType} from "sanity";

export const homePageType = defineType({
  name: "homePage",
  title: "Home Page",
  type: "document",
  fields: [
    defineField({
      name: "heroEyebrow",
      title: "Hero Eyebrow",
      type: "string",
    }),
    defineField({
      name: "heroTitle",
      title: "Hero Title",
      type: "text",
      rows: 3,
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "heroDescription",
      title: "Hero Description",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "heroCtaLabel",
      title: "Hero CTA Label",
      type: "string",
    }),
    defineField({
      name: "heroImage",
      title: "Hero Image",
      type: "image",
      options: {hotspot: true},
    }),
    defineField({
      name: "heroImageAlt",
      title: "Hero Image Alt",
      type: "string",
    }),
    defineField({
      name: "categoriesEyebrow",
      title: "Categories Eyebrow",
      type: "string",
    }),
    defineField({
      name: "categoriesTitle",
      title: "Categories Title",
      type: "string",
    }),
    defineField({
      name: "categories",
      title: "Category Cards",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          fields: [
            defineField({
              name: "name",
              title: "Name",
              type: "string",
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: "filterValue",
              title: "Filter Value",
              type: "string",
              description: "Must match the category value used on car documents, for example SUV or Sedan.",
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: "image",
              title: "Image",
              type: "image",
              options: {hotspot: true},
            }),
          ],
          preview: {
            select: {
              title: "name",
              subtitle: "filterValue",
              media: "image",
            },
          },
        }),
      ],
      description: "These are the cards shown in the homepage category slider.",
    }),
  ],
});
