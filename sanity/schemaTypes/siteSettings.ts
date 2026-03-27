import {defineArrayMember, defineField, defineType} from "sanity";

export const siteSettingsType = defineType({
  name: "siteSettings",
  title: "Site Settings",
  type: "document",
  fields: [
    defineField({
      name: "siteName",
      title: "Site Name",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "shortName",
      title: "Short Name (optional)",
      type: "string",
      description: "Not currently used on the frontend. You can leave this empty.",
    }),
    defineField({
      name: "city",
      title: "City",
      type: "string",
    }),
    defineField({
      name: "phoneDisplay",
      title: "Displayed Phone Number",
      type: "string",
      description: "This is the phone number visitors see on the website. Example: 0944 119 907",
    }),
    defineField({
      name: "phoneHref",
      title: "Clickable Call Link",
      type: "string",
      description: "Use a tel link. Example: tel:0944119907",
      validation: (rule) =>
        rule.custom((value) => {
          if (!value) return true;
          return value.startsWith("tel:") ? true : "Use a tel: link, for example tel:0944119907";
        }),
    }),
    defineField({
      name: "whatsAppHref",
      title: "WhatsApp Link",
      type: "url",
    }),
    defineField({
      name: "address",
      title: "Address",
      type: "string",
    }),
    defineField({
      name: "directionsHref",
      title: "Directions Link",
      type: "url",
      description: "Used by the Get Directions button on the car detail page.",
    }),
    defineField({
      name: "mapEmbedHref",
      title: "Map Embed URL",
      type: "string",
      description:
        "Must be a Google Maps embed URL, not a normal Google Maps page URL. Example: https://www.google.com/maps/embed?...",
      validation: (rule) =>
        rule.custom((value) => {
          if (!value) return true;
          return value.includes("google.com/maps/embed")
            ? true
            : "Use a Google Maps embed URL that contains google.com/maps/embed";
        }),
    }),
    defineField({
      name: "socialLinks",
      title: "Social Links",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          fields: [
            defineField({name: "label", title: "Label", type: "string"}),
            defineField({name: "href", title: "URL", type: "url"}),
          ],
          preview: {
            select: {
              title: "label",
              subtitle: "href",
            },
          },
        }),
      ],
    }),
    defineField({
      name: "seoTitle",
      title: "SEO Title",
      type: "string",
      description: "Used for the site title in search engines and browser tabs.",
    }),
    defineField({
      name: "seoDescription",
      title: "SEO Description",
      type: "text",
      rows: 4,
      description: "Used for the search engine summary/description of the site.",
    }),
  ],
});
