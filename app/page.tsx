import * as React from "react"
import { OpenInV0Button } from "@/components/open-in-v0-button"
import { InstallCommand } from "@/components/install-command"
import { Github } from "lucide-react"
import { HelloWorld } from "@/registry/new-york/blocks/hello-world/hello-world"
import { ExampleForm } from "@/registry/new-york/blocks/example-form/example-form"
import PokemonPage from "@/registry/new-york/blocks/complex-component/page"
import { ExampleCard } from "@/registry/new-york/blocks/example-with-css/example-card"
import registry from "@/registry.json"
import { SimpleBadge } from "@/registry/new-york/blocks/simple-badge/simple-badge"

const REGISTRY_ITEMS = [
  { name: "hello-world", component: <HelloWorld /> },
  { name: "example-form", component: <ExampleForm /> },
  { name: "complex-component", component: <PokemonPage /> },
  { name: "example-with-css", component: <ExampleCard /> },
  { name: "simple-badge", component: <SimpleBadge /> },
]

export default function Home() {
  return (
    <div className="max-w-3xl mx-auto flex flex-col min-h-svh px-4 py-8 gap-8">
      <header className="flex flex-col gap-1">
        <h1 className="text-3xl font-bold tracking-tight">{registry.name}</h1>
        <p className="text-muted-foreground">
          A custom registry for distributing code using shadcn.
        </p>
      </header>

      <main className="flex flex-col flex-1 gap-8">
        {REGISTRY_ITEMS.map(({ name, component }) => {
          const item = registry.items.find((i) => i.name === name)
          const command = `npx shadcn add ${registry.homepage}/r/${name}.json`

          return (
            <div
              key={name}
              className="flex flex-col gap-4 border rounded-lg p-4 min-h-[450px] relative"
            >
              <div className="flex flex-col gap-1 sm:pl-3">
                <div className="flex items-center justify-between">
                  <h2 className="text-base font-semibold">
                    {item?.title ?? name}
                  </h2>
                  <div className="flex items-center gap-2">
                    <a
                      href={`https://github.com/realsudarshan/realsudarshan-registry-shadcn/blob/main/docs/${name}.md`}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={`View ${item?.title ?? name} documentation on GitHub`}
                      className="inline-flex h-9 w-9 items-center justify-center rounded-md border text-sm transition-colors hover:bg-accent hover:text-accent-foreground"
                    >
                      <Github className="h-4 w-4" />
                    </a>
                    <OpenInV0Button name={name} className="w-fit" />
                  </div>
                </div>
                {item?.description && (
                  <p className="text-sm text-muted-foreground">
                    {item.description}
                  </p>
                )}
              </div>

              <InstallCommand command={command} />

              <div className="flex items-center justify-center min-h-[350px] relative">
                {component}
              </div>
            </div>
          )
        })}
      </main>
    </div>
  )
}