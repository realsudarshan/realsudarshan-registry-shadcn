import { mkdir, readFile, writeFile } from "node:fs/promises"
import path from "node:path"
import { fileURLToPath } from "node:url"

const rootDirectory = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  ".."
)
const registryPath = path.join(rootDirectory, "registry.json")
const docsDirectory = path.join(rootDirectory, "docs")

const registry = JSON.parse(await readFile(registryPath, "utf8"))

await mkdir(docsDirectory, { recursive: true })

await Promise.all(
  registry.items.map((item) => {
    const contents = `---
title: ${item.title}
description: ${item.description}
---

# ${item.title}

${item.description}
`

    return writeFile(path.join(docsDirectory, `${item.name}.md`), contents)
  })
)