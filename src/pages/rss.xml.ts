import type { APIRoute } from "astro";
import rss from "@astrojs/rss";
import { getCollection } from "astro:content";
import sanitizeHtml from "sanitize-html";
import MarkdownIt from "markdown-it";

const parser = new MarkdownIt();

export const GET: APIRoute = async ({ params, request, site }) => {
  const blog = await getCollection("blog");

  return rss({
    // stylesheet: "/styles/rss.xsl",
    // `<title>` field in output xml
    title: "Buzz’s Blog",
    // `<description>` field in output xml
    description: "Un simple blog con Astro",

    xmlns: {
      media: "http://search.yahoo.com/mrss/",
    },
    // Pull in your project "site" from the endpoint context
    // https://docs.astro.build/en/reference/api-reference/#site
    site: site ?? "",
    // Array of `<item>`s in output xml
    // See "Generating items" section for examples using content collections and glob imports
    items: blog.map(({ data, id, body }) => ({
      title: data.title,
      description: data.description,
      pubDate: data.date,
      link: `/posts/${id}`,
      content: sanitizeHtml(parser.render(body), {
        allowedTags: sanitizeHtml.defaults.allowedTags.concat(["img"]),
      }),
      customData: `<media:content
          type="image/${data.image.format === "jpg" ? "jpeg" : "png"}"
          width="${data.image.width}"
          height="${data.image.height}"
          medium="image"
          url="${site + data.image.src}" />
      `,
    })),
    // `<channel>` children in output xml
    // (optional) inject custom xml
    customData: `<language>es-es</language>`,
  });
};
