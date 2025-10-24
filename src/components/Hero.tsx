import { Clock, Fuel, MapPin, Star } from "lucide-react"
import { Card } from "@/components/ui/card"

export function Hero() {
	return (
		<div className="relative">
			{/* Hero Section */}
			<div className="text-center space-y-6 mb-12">
				<div className="flex items-center justify-center gap-3 mb-4">
					<div className="flex items-center justify-center w-16 h-16 bg-primary rounded-2xl shadow-lg">
						<Fuel className="h-8 w-8 text-primary-foreground" />
					</div>
					<div className="text-left">
						<h1 className="text-3xl font-bold text-foreground">Gas Cheap</h1>
						<p className="text-muted-foreground">Gasolineras baratas cerca de ti</p>
					</div>
				</div>

				<h2 className="text-4xl sm:text-5xl font-bold text-foreground leading-tight">
					Encuentra las mejores
					<span className="block text-primary">gasolineras</span>
				</h2>

				<p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
					Descubre las gasolineras más baratas o cercanas según tus preferencias. Ahorra tiempo y
					dinero en cada repostaje con datos en tiempo real.
				</p>
			</div>

			{/* Features Grid */}
			<div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
				<Card className="card-depth p-6 text-center">
					<div className="flex items-center justify-center w-12 h-12 bg-primary/10 rounded-lg mx-auto mb-4">
						<MapPin className="h-6 w-6 text-primary" />
					</div>
					<h3 className="font-semibold text-foreground mb-2">Ubicación GPS</h3>
					<p className="text-sm text-muted-foreground">
						Encuentra gasolineras cercanas usando tu ubicación actual
					</p>
				</Card>

				<Card className="card-depth p-6 text-center">
					<div className="flex items-center justify-center w-12 h-12 bg-primary/10 rounded-lg mx-auto mb-4">
						<Clock className="h-6 w-6 text-primary" />
					</div>
					<h3 className="font-semibold text-foreground mb-2">Tiempo Real</h3>
					<p className="text-sm text-muted-foreground">
						Precios actualizados constantemente para mejores decisiones
					</p>
				</Card>

				<Card className="card-depth p-6 text-center">
					<div className="flex items-center justify-center w-12 h-12 bg-primary/10 rounded-lg mx-auto mb-4">
						<Star className="h-6 w-6 text-primary" />
					</div>
					<h3 className="font-semibold text-foreground mb-2">Mejor Precio</h3>
					<p className="text-sm text-muted-foreground">
						Algoritmo inteligente para encontrar las mejores ofertas
					</p>
				</Card>
			</div>

			{/* Stats */}
			<div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
				<div className="text-center">
					<div className="text-2xl font-bold text-primary">500+</div>
					<div className="text-sm text-muted-foreground">Gasolineras</div>
				</div>
				<div className="text-center">
					<div className="text-2xl font-bold text-primary">24/7</div>
					<div className="text-sm text-muted-foreground">Disponible</div>
				</div>
				<div className="text-center">
					<div className="text-2xl font-bold text-primary">€0.15</div>
					<div className="text-sm text-muted-foreground">Ahorro promedio</div>
				</div>
				<div className="text-center">
					<div className="text-2xl font-bold text-primary">5★</div>
					<div className="text-sm text-muted-foreground">Valoración</div>
				</div>
			</div>
		</div>
	)
}
