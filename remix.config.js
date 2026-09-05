/**
 * @type {import('@remix-run/dev/config').AppConfig}
 */
module.exports = {
  appDirectory: "app",
  assetsBuildDirectory: "public/build",
  publicPath: "/build/",
  serverBuildDirectory: "build",
  devServerPort: 8002,
  ignoredRouteFiles: [".*"],
  mdx: async () => ({
    rehypePlugins: [
      [(await import("rehype-highlight")).default, {
        languages: {
          vim: (await import('highlight.js/lib/languages/vim')).default
        }
      }],
      (await import("rehype-slug")).default,
      (await import("rehype-autolink-headings")).default,
      [(await import("rehype-toc")).default, {
        headings: ['h2'],
        cssClasses: {
          toc: '',
          list: 'flex flex-wrap m-4 border border-gray-200 rounded hover:bg-gray-100 gap-2 list-none',
          listItem: ''
        },
      }],
    ],
  }),
};
