"use client"

import type * as React from "react"
import * as SwitchPrimitive from "@radix-ui/react-switch"

import { cn } from "@/lib/utils"

function Switch({
  className,
  ...props
}: React.ComponentProps<typeof SwitchPrimitive.Root>) {
  return (
    <SwitchPrimitive.Root
      data-slot="switch"
      className={cn(
        "peer data-[state=checked]:bg-white data-[state=unchecked]:bg-white/20 focus-visible:border-ring focus-visible:ring-ring/50 inline-flex h-8 w-16 shrink-0 items-center rounded-full border-4 border-white/30 shadow-lg transition-all outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50 backdrop-blur-sm",
        className
      )}
      {...props}
    >
      <SwitchPrimitive.Thumb
        data-slot="switch-thumb"
        className={cn(
          "bg-white pointer-events-none block size-6 rounded-full ring-0 transition-transform data-[state=checked]:translate-x-8 data-[state=unchecked]:translate-x-1 shadow-md"
        )}
      />
    </SwitchPrimitive.Root>
  )
}

export { Switch }
