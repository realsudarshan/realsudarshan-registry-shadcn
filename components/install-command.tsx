"use client"

import * as React from "react"
import { Check, Copy } from "lucide-react"

export function InstallCommand({ command }: { command: string }) {
  const [copied, setCopied] = React.useState(false)

  const copy = async () => {
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(command)
      } else {
        throw new Error("Clipboard API unavailable")
      }
    } catch {
      const textarea = document.createElement("textarea")
      textarea.value = command
      textarea.style.position = "fixed"
      textarea.style.opacity = "0"
      document.body.appendChild(textarea)
      textarea.focus()
      textarea.select()
      document.execCommand("copy")
      document.body.removeChild(textarea)
    }

    setCopied(true)
    setTimeout(() => setCopied(false), 1500)
  }

  return (
    <div className="flex items-center justify-between gap-2 rounded-md bg-muted px-3 py-2 text-sm font-mono overflow-x-auto">
      <code className="whitespace-nowrap">{command}</code>
      <button
        onClick={copy}
        className="shrink-0 text-xs border rounded px-2 py-1 hover:bg-accent"
      >
        {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
      </button>
    </div>
  )
}