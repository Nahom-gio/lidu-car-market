const singletonTypes = new Set(["siteSettings", "homePage", "aboutPage"]);

export const structure = (S: any) =>
  S.list()
    .title("Content")
    .items([
      S.listItem()
        .title("Site Settings")
        .child(S.document().schemaType("siteSettings").documentId("siteSettings")),
      S.listItem()
        .title("Home Page")
        .child(S.document().schemaType("homePage").documentId("homePage")),
      S.listItem()
        .title("About Page")
        .child(S.document().schemaType("aboutPage").documentId("aboutPage")),
      S.divider(),
      S.documentTypeListItem("car").title("Cars"),
      S.documentTypeListItem("testimonial").title("Testimonials"),
    ]);

export const singletonPluginConfig = {
  templates: (templates: {schemaType: string}[]) =>
    templates.filter((template) => !singletonTypes.has(template.schemaType)),
};
