export default {
  getSiteData: () => require("./data.json"),
  getRoutes: () => [
    {
      path: "/",
      template: "src/pages/index",
    },
  ],
};
