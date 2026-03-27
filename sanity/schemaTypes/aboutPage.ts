import {defineArrayMember, defineField, defineType} from "sanity";

export const aboutPageType = defineType({
  name: "aboutPage",
  title: "About Page",
  type: "document",
  fields: [
    defineField({name: "heroEyebrow", title: "Hero Eyebrow", type: "string"}),
    defineField({
      name: "heroTitle",
      title: "Hero Title",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "heroDescription",
      title: "Hero Description",
      type: "text",
      rows: 4,
    }),
    defineField({
      name: "whoWeAreTitle",
      title: "Who We Are Title",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "whoWeAre",
      title: "Who We Are Paragraphs",
      type: "array",
      of: [defineArrayMember({type: "text", rows: 4})],
    }),
    defineField({
      name: "snapshotTitle",
      title: "Snapshot Section Title",
      type: "string",
    }),
    defineField({
      name: "snapshotItems",
      title: "Snapshot Items",
      type: "array",
      validation: (rule) => rule.max(3),
      of: [
        defineArrayMember({
          type: "object",
          fields: [
            defineField({name: "label", title: "Label", type: "string"}),
            defineField({name: "value", title: "Value", type: "text", rows: 3}),
          ],
          preview: {
            select: {
              title: "label",
              subtitle: "value",
            },
          },
        }),
      ],
      description: "These are the cards inside the Showroom Snapshot box. Add up to 3 items.",
    }),
    defineField({
      name: "pillars",
      title: "Feature Cards",
      type: "array",
      validation: (rule) => rule.max(3),
      of: [
        defineArrayMember({
          type: "object",
          fields: [
            defineField({name: "title", title: "Title", type: "string"}),
            defineField({name: "description", title: "Description", type: "text", rows: 4}),
          ],
          preview: {
            select: {
              title: "title",
              subtitle: "description",
            },
          },
        }),
      ],
      description: "These are the three cards below the main About content. Add up to 3 cards.",
    }),
  ],
});
