import type { Route } from "./+types/home";
import { data, useLoaderData, type LoaderFunctionArgs } from "react-router";
import { parseJsonSafely } from "~/lib/utils";
import { configData, ConfigSchema } from "app/config/ui";
import { DrumKit } from "~/components/DrumKit/DrumKit";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Zac Clark" },
    { name: "description", content: "A software engineer based in Boston" },
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
    <div className="min-h-screen bg-black">
      <div className="max-w-2xl mx-auto px-6 py-16 space-y-16">
        {config.map((item, idx) => {
          switch (item.typename) {
            case "DrumKit":
              return <DrumKit key={idx} block={item} />;
            default:
              return null;
          }
        })}
      </div>
    </div>
  );
}
