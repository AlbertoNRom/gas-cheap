import { useEffect, useRef } from "react"

export type UseInfiniteScrollOptions = {
  canLoadMore: boolean
  loading?: boolean
  onLoadMore: () => void
  rootMargin?: string
}

export function useInfiniteScroll({ canLoadMore, loading = false, onLoadMore, rootMargin = "300px" }: UseInfiniteScrollOptions) {
  const sentinelRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const el = sentinelRef.current
    if (!el) return

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && canLoadMore && !loading) {
          onLoadMore()
        }
      })
    }, { rootMargin })

    observer.observe(el)
    return () => observer.disconnect()
  }, [canLoadMore, loading, onLoadMore, rootMargin])

  return { sentinelRef }
}