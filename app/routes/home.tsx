import type { Route } from "./+types/home";
import { data, useLoaderData, type LoaderFunctionArgs } from "react-router";
import { parseJsonSafely } from "~/lib/utils";
import { configData, ConfigSchema } from "app/config/ui";
import { siteConfig } from "~/config/site";
import { renderBlock } from "~/components/renderBlock";

export function meta({}: Route.MetaArgs) {
  return [
    { title: siteConfig.title },
    { name: "description", content: siteConfig.description },
    // Facebook Meta Tags
    { property: "og:url", content: siteConfig.baseUrl },
    { property: "og:type", content: "website" },
    { property: "og:title", content: siteConfig.title },
    { property: "og:description", content: siteConfig.description },
    { property: "og:image", content: `${siteConfig.baseUrl}/og-image.png` },
    // Twitter Meta Tags
    { name: "twitter:card", content: "summary_large_image" },
    { property: "twitter:domain", content: new URL(siteConfig.baseUrl).hostname },
    { property: "twitter:url", content: siteConfig.baseUrl },
    { name: "twitter:title", content: siteConfig.title },
    { name: "twitter:description", content: siteConfig.description },
    { name: "twitter:image", content: `${siteConfig.baseUrl}/og-image.png` },
  ];
}

export async function loader({}: LoaderFunctionArgs) {
  const config = parseJsonSafely(JSON.stringify(configData), ConfigSchema);

  return data({
    config,
  });
}

export default function Home() {
  const { config } = useLoaderData<typeof loader>();

  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="max-w-2xl mx-auto px-6 space-y-16 w-full">
        {config.map((item, idx) => (
          <div key={idx} className="flex justify-center">
            {renderBlock(item, { key: idx })}
          </div>
        ))}
      </div>
    </div>
  );
}
