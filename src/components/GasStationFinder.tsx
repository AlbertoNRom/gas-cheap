"use client"

import { Clock, Fuel, MapPin, Star } from "lucide-react"
import { useCallback, useEffect } from "react"
import { GasStationCard } from "@/components/GasStationCard"
import { GasStationSkeleton, PrioritySelectorSkeleton, Skeleton } from "@/components/Skeleton"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { useGasStationFinderReducer } from "@/hooks/useGasStationFinderReducer"
import { useGeolocation } from "@/hooks/useGeolocation"
import { useInfiniteScroll } from "@/hooks/useInfiniteScroll"
import { getGasStations } from "@/services/gasStationService"
import type { PriorityType } from "@/types"

export function GasStationFinder() {
	const {
		location,
		error: locationError,
		loading: locationLoading,
		requestLocation,
	} = useGeolocation()
	const [state, dispatch] = useGasStationFinderReducer()
	const handleLoadMore = useCallback(() => dispatch({ type: "INCREASE_VISIBLE" }), [dispatch])
	const { sentinelRef } = useInfiniteScroll({
		canLoadMore: state.visibleCount < state.gasStations.length,
		loading: state.loading,
		onLoadMore: handleLoadMore,
		rootMargin: "300px",
	})

	const fetchGasStations = useCallback(async () => {
		if (!location) return

		dispatch({ type: "FETCH_START" })
		try {
			const stations = await getGasStations(location, state.priority, 15)
			dispatch({ type: "FETCH_SUCCESS", payload: stations })
		} catch (error) {
			console.error("Error fetching gas stations:", error)
			dispatch({ type: "FETCH_ERROR", payload: "Error al buscar gasolineras. Inténtalo de nuevo." })
		}
	}, [location, state.priority, dispatch])

	useEffect(() => {
		if (location) {
			fetchGasStations()
		}
	}, [location, fetchGasStations])

	useEffect(() => {
		if (!location && !locationLoading && !locationError) {
			requestLocation()
		}
	}, [location, locationLoading, locationError, requestLocation])

	useEffect(() => {}, [])

	const handlePriorityChange = (checked: boolean) => {
		const priorityMap: Record<"true" | "false", PriorityType> = { true: "distance", false: "price" }
		const nextPriority = priorityMap[String(checked) as "true" | "false"]
		dispatch({ type: "SET_PRIORITY", payload: nextPriority })
	}

	if (locationLoading) {
		return (
			<div className="space-y-6">
				<PrioritySelectorSkeleton />
				<GasStationSkeleton />
			</div>
		)
	}

	if (locationError) {
		return (
			<div className="flex flex-col items-center justify-center min-h-[400px] space-y-4">
				<div className="text-center space-y-2">
					<MapPin className="h-12 w-12 text-muted-foreground mx-auto" />
					<h3 className="text-lg font-semibold">Error de ubicación</h3>
					<p className="text-muted-foreground max-w-md">{locationError.message}</p>
				</div>
				<Button onClick={requestLocation} className="bg-primary-safe">
					Intentar de nuevo
				</Button>
			</div>
		)
	}

	if (!location) {
		return (
			<div className="flex flex-col items-center justify-center min-h-[400px] space-y-4">
				<div className="text-center space-y-2">
					<MapPin className="h-12 w-12 text-muted-foreground mx-auto" />
					<h3 className="text-lg font-semibold">Ubicación requerida</h3>
					<p className="text-muted-foreground max-w-md">
						Necesitamos tu ubicación para encontrar las gasolineras más cercanas.
					</p>
				</div>
				<Button onClick={requestLocation} className="bg-primary-safe">
					Permitir ubicación
				</Button>
			</div>
		)
	}

	return (
		<div className="space-y-6">
			<Card className="card-depth">
				<CardHeader>
					<CardTitle className="flex items-center gap-2">
						<Star className="h-5 w-5" />
						¿Qué priorizas?
					</CardTitle>
				</CardHeader>
				<CardContent>
					<div className="flex items-center justify-between">
						<div className="space-y-1">
							<div className="flex items-center gap-2">
								<Fuel className="h-4 w-4" />
								<span
									className={
										state.priority === "price"
											? "font-semibold text-accent"
											: "text-muted-foreground"
									}
								>
									Precio más bajo
								</span>
							</div>
							<p className="text-sm text-muted-foreground">Encuentra las gasolineras más baratas</p>
						</div>

						<Switch
							checked={state.priority === "distance"}
							onCheckedChange={handlePriorityChange}
							className="data-[state=checked]:bg-accent"
						/>

						<div className="space-y-1 text-right">
							<div className="flex items-center gap-2 justify-end">
								<span
									className={
										state.priority === "distance"
											? "font-semibold text-accent"
											: "text-muted-foreground"
									}
								>
									Distancia más corta
								</span>
								<Clock className="h-4 w-4" />
							</div>
							<p className="text-sm text-muted-foreground">
								Encuentra las gasolineras más cercanas
							</p>
						</div>
					</div>
				</CardContent>
			</Card>

			<div className="space-y-4">
				<div className="flex items-center justify-between">
					<h2 className="text-xl font-semibold">
						Gasolineras {state.priority === "price" ? "más baratas" : "más cercanas"}
					</h2>
					{state.gasStations.length > 0 && (
						<p className="text-sm text-muted-foreground">
							{state.gasStations.length} resultados encontrados
						</p>
					)}
				</div>

				{state.loading ? (
					<div className="space-y-6">
						<GasStationSkeleton />
					</div>
				) : state.error ? (
					<Card className="card-depth">
						<CardContent className="pt-6">
							<div className="text-center space-y-2">
								<p className="text-destructive">{state.error}</p>
								<Button onClick={fetchGasStations} variant="outline">
									Reintentar
								</Button>
							</div>
						</CardContent>
					</Card>
				) : state.gasStations.length === 0 ? (
					<Card className="card-depth">
						<CardContent className="pt-6">
							<div className="text-center space-y-2">
								<Fuel className="h-8 w-8 text-muted-foreground mx-auto" />
								<p className="text-muted-foreground">No se encontraron gasolineras en tu área.</p>
							</div>
						</CardContent>
					</Card>
				) : (
					<div className="grid gap-4">
						{state.gasStations.slice(0, state.visibleCount).map((station, index) => (
							<GasStationCard
								key={station.id}
								station={station}
								priority={state.priority}
								rank={index + 1}
							/>
						))}
						<div ref={sentinelRef} className="h-8" />
						{state.visibleCount < state.gasStations.length && (
							<div className="flex items-center justify-center py-2">
-                <Clock className="h-4 w-4 animate-pulse text-muted-foreground" />
-                <span className="ml-2 text-sm text-muted-foreground">Cargando más...</span>
+                <Skeleton className="h-4 w-4 rounded-full" />
+                <Skeleton className="h-4 w-24 ml-2" />
              </div>
            )}
					</div>
				)}
			</div>
		</div>
	)
}
