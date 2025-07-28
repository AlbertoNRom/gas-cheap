# Gas Cheap 🚗⛽

Una aplicación web responsive y moderna para encontrar las gasolineras más baratas cerca de tu ubicación. Desarrollada con Next.js 15, Tailwind CSS 4, TypeScript y shadcn/ui.

## 🌟 Características

- **Geolocalización GPS**: Detecta automáticamente tu ubicación para encontrar gasolineras cercanas
- **Priorización flexible**: Elige entre precio más bajo o distancia más corta
- **Interfaz responsive**: Diseño optimizado para móviles, tablets y escritorio
- **Accesibilidad AA**: Cumple con estándares de accesibilidad web
- **Tiempo real**: Datos actualizados de precios y ubicaciones
- **Diseño moderno**: Interfaz atractiva con esquema de colores azul y blanco

## 🛠️ Tecnologías utilizadas

- **Framework**: Next.js 15 con App Router
- **Lenguaje**: TypeScript
- **Estilos**: Tailwind CSS 4
- **Componentes**: shadcn/ui
- **Iconos**: Lucide React
- **Geolocalización**: Web Geolocation API
- **Linting**: ESLint

## 🚀 Instalación y uso

1. **Clona el repositorio**:
   ```bash
   git clone https://github.com/tu-usuario/gas-cheap.git
   cd gas-cheap
   ```

2. **Instala las dependencias**:
   ```bash
   npm install
   ```

3. **Ejecuta el servidor de desarrollo**:
   ```bash
   npm run dev
   ```

4. **Abre tu navegador** en [http://localhost:3000](http://localhost:3000)

## 📱 Funcionalidades

### Selector de prioridad
- **Precio**: Encuentra las gasolineras con los precios más bajos
- **Distancia**: Encuentra las gasolineras más cercanas a tu ubicación

### Lista de gasolineras
- Información detallada de cada gasolinera (nombre, dirección, precio, distancia)
- Servicios disponibles (autolavado, tienda, cafetería, etc.)
- Indicadores visuales para las mejores opciones
- Botón directo para navegación con Google Maps

### Características técnicas
- Responsive design para todos los dispositivos
- Carga optimizada con lazy loading
- Manejo de errores de geolocalización
- Estados de carga intuitivos

## 🎨 Diseño

- **Colores principales**: Esquema azul con texto blanco
- **Accesibilidad**: Contraste AA compliant
- **Tipografía**: Geist Sans y Geist Mono
- **Iconografía**: Lucide React icons

## 📂 Estructura del proyecto

```
src/
├── app/                    # App Router de Next.js
│   ├── globals.css        # Estilos globales y variables CSS
│   ├── layout.tsx         # Layout principal con SEO
│   └── page.tsx           # Página principal
├── components/            # Componentes React
│   ├── ui/               # Componentes de shadcn/ui
│   ├── GasStationFinder.tsx
│   ├── GasStationCard.tsx
│   └── LoadingSpinner.tsx
├── hooks/                # Custom hooks
│   └── useGeolocation.ts
├── services/             # Servicios y APIs
│   └── gasStationService.ts
├── types/                # Definiciones de TypeScript
│   └── index.ts
└── lib/                  # Utilidades
    └── utils.ts
```

## 🔧 Scripts disponibles

```bash
# Desarrollo
npm run dev

# Construcción para producción
npm run build

# Iniciar servidor de producción
npm start

# Linting
npm run lint
```

## 🌐 SEO y metadatos

La aplicación incluye metadatos optimizados para SEO:
- Títulos y descripciones descriptivos
- Open Graph tags para redes sociales
- Twitter Card metadata
- Structured data para motores de búsqueda

## 📱 Compatibilidad

- **Navegadores**: Chrome, Firefox, Safari, Edge (últimas 2 versiones)
- **Dispositivos**: Móviles, tablets, escritorio
- **Geolocalización**: Requiere HTTPS en producción

## 🤝 Contribuir

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo `LICENSE` para más detalles.

## 🙏 Agradecimientos

- [Next.js](https://nextjs.org/) por el framework
- [Tailwind CSS](https://tailwindcss.com/) por los estilos
- [shadcn/ui](https://ui.shadcn.com/) por los componentes
- [Lucide](https://lucide.dev/) por los iconos

---

**Gas Cheap** - Encuentra las mejores gasolineras cerca de ti 🚗⛽
