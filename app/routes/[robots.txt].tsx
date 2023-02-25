import { LoaderFunction } from "@remix-run/node";

export const loader: LoaderFunction = () => {
  const content = `
    User-agent: *
    Disallow: 
    Disallow: /admin
    Sitemap: http://jackdevries.com/sitemap.xml
  `;
  return new Response(content, {
    status: 200,
    headers: {
      "Content-Type": "text/plain",
      encoding: "UTF-8",
    },
  });
};
