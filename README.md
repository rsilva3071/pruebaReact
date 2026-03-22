Rick & Morty Character Browser

Una aplicación web de producción para explorar, buscar, filtrar y guardar como favoritos los personajes del universo de Rick and Morty usando la [Rick and Morty API](https://rickandmortyapi.com/).



---

Stack Tecnológico

| Categoría | Tecnología | Versión |
|---|---|---|
| **Framework** | [React](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/) | React 18 · TS 5.x |
| **Bundler** | [Vite](https://vitejs.dev/) (con SWC para Fast Refresh) | 5.x |
| **Estilos** | [Tailwind CSS](https://tailwindcss.com/) + CSS custom properties (tokens de diseño) | 3.x |
| **Componentes UI** | [shadcn/ui](https://ui.shadcn.com/) (primitivos Radix UI) | — |
| **Iconos** | [Lucide React](https://lucide.dev/) | 0.46x |
| **Enrutamiento** | [React Router DOM](https://reactrouter.com/) | v6 |
| **Estado servidor** | [TanStack Query (React Query)](https://tanstack.com/query) | v5 |
| **Estado cliente** | [Redux Toolkit](https://redux-toolkit.js.org/) + [React Redux](https://react-redux.js.org/) | v2 / v9 |
| **Testing** | [Vitest](https://vitest.dev/) + [React Testing Library](https://testing-library.com/) + [Playwright](https://playwright.dev/) | — |
| **Linting** | [ESLint](https://eslint.org/) + TypeScript ESLint | v9 |

---

## 📋 Cómo crear el proyecto desde cero

### 1. Prerrequisitos

- **Node.js** ≥ 18 (recomendado v20+)
- **bun** (recomendado) o **npm** como gestor de paquetes
- **Git** instalado

### 2. Crear el proyecto con Vite

```bash
# Con bun
bun create vite rick-and-morty --template react-swc-ts

# O con npm
npm create vite@latest rick-and-morty -- --template react-swc-ts

cd rick-and-morty
```

### 3. Instalar dependencias principales

```bash
# Dependencias de producción
bun add react-router-dom @tanstack/react-query @reduxjs/toolkit react-redux \
  lucide-react sonner tailwind-merge class-variance-authority clsx \
  tailwindcss-animate @radix-ui/react-slot @radix-ui/react-tooltip \
  @radix-ui/react-toast @radix-ui/react-dialog @radix-ui/react-dropdown-menu \
  @radix-ui/react-select @radix-ui/react-tabs @radix-ui/react-separator \
  @radix-ui/react-scroll-area @radix-ui/react-avatar @radix-ui/react-badge \
  @radix-ui/react-popover @radix-ui/react-checkbox @radix-ui/react-label \
  @radix-ui/react-switch @radix-ui/react-toggle @radix-ui/react-toggle-group \
  @radix-ui/react-accordion @radix-ui/react-alert-dialog \
  @radix-ui/react-aspect-ratio @radix-ui/react-collapsible \
  @radix-ui/react-context-menu @radix-ui/react-hover-card \
  @radix-ui/react-menubar @radix-ui/react-navigation-menu \
  @radix-ui/react-progress @radix-ui/react-radio-group \
  @radix-ui/react-slider vaul cmdk input-otp \
  react-day-picker date-fns react-hook-form @hookform/resolvers zod \
  recharts embla-carousel-react react-resizable-panels next-themes

# Dependencias de desarrollo
bun add -d tailwindcss postcss autoprefixer @tailwindcss/typography \
  vitest @testing-library/react @testing-library/jest-dom jsdom \
  @playwright/test @types/node @types/react @types/react-dom \
  eslint @eslint/js typescript-eslint eslint-plugin-react-hooks \
  eslint-plugin-react-refresh globals
```

### 4. Configurar Tailwind CSS

```bash
npx tailwindcss init -p
```

Editar `tailwind.config.ts`:

```ts
import type { Config } from "tailwindcss";
import tailwindcssAnimate from "tailwindcss-animate";

export default {
  darkMode: ["class"],
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        border: "hsl(var(--border))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        // ... más tokens semánticos
      },
    },
  },
  plugins: [tailwindcssAnimate],
} satisfies Config;
```

### 5. Configurar aliases de TypeScript

En `tsconfig.json`:

```json
{
  "compilerOptions": {
    "paths": {
      "@/*": ["./src/*"]
    }
  }
}
```

En `vite.config.ts`:

```ts
import path from "path";

export default defineConfig({
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
```

### 6. Instalar componentes shadcn/ui

```bash
npx shadcn-ui@latest init
npx shadcn-ui@latest add button card badge skeleton tooltip toast
```

### 7. Crear la estructura de carpetas

```
src/
├── components/          # Componentes reutilizables
│   ├── ui/              # Componentes base shadcn/ui
│   ├── CharacterCard.tsx
│   ├── CharacterCardSkeleton.tsx
│   ├── FavoriteButton.tsx
│   ├── Header.tsx
│   ├── NavLink.tsx
│   ├── PaginationControls.tsx
│   ├── SearchBar.tsx
│   ├── StatusBadge.tsx
│   └── StatusFilter.tsx
├── hooks/               # Custom hooks
│   ├── useCharacters.ts    # Fetch lista de personajes con paginación
│   ├── useCharacter.ts     # Fetch detalle de personaje
│   ├── useDebounce.ts      # Valor con debounce para búsqueda
│   └── use-mobile.tsx      # Detección de viewport móvil
├── pages/               # Componentes de página (rutas)
│   ├── Index.tsx           # Navegador principal de personajes
│   ├── CharacterDetail.tsx # Vista de detalle
│   ├── Favorites.tsx       # Página de favoritos
│   └── NotFound.tsx        # Página 404
├── store/               # Estado global con Redux
│   ├── index.ts            # Configuración del store
│   └── favoritesSlice.ts   # Slice de favoritos con persistencia localStorage
├── types/               # Definiciones de tipos TypeScript
│   └── character.ts        # Interfaces Character, ApiResponse
├── lib/                 # Utilidades
│   └── utils.ts            # Helper cn() para combinar clases
├── test/                # Configuración de tests
│   ├── setup.ts
│   └── example.test.ts
├── App.tsx              # Componente raíz con rutas y providers
├── main.tsx             # Entry point
└── index.css            # Estilos globales, tokens, animaciones
```

---

## ⚙️ Instalación y ejecución (proyecto ya creado)

### Instalar dependencias

```bash
# Con bun (recomendado)
bun install

# O con npm
npm install
```

### Servidor de desarrollo

```bash
bun run dev
# o
npm run dev
```

La app estará disponible en `http://localhost:8080`.

### Build de producción

```bash
bun run build
# o
npm run build
```

### Preview del build

```bash
bun run preview
# o
npm run preview
```

---

## 🧪 Testing

### Tests unitarios (Vitest)

```bash
# Ejecutar una vez
bun run test

# Modo watch
bun run test:watch
```

### Linting

```bash
bun run lint
```

---

## 🌐 API

La app consume la [Rick and Morty API](https://rickandmortyapi.com/api) pública:

| Endpoint | Uso |
|---|---|
| `GET /character?page=N&name=X&status=Y` | Lista paginada con filtros |
| `GET /character/:id` | Detalle de un personaje |

El fetching se gestiona con **TanStack Query** con caching automático, refetch en background y estados de loading/error.

---

## 🎨 Sistema de Diseño

Tema oscuro personalizado con tokens semánticos definidos en `src/index.css`:

| Token | Valor | Uso |
|---|---|---|
| `--background` | `222.2 84% 4.9%` | Fondo principal (espacio profundo) |
| `--primary` | `142 71% 45%` | Acento verde neón |
| `--status-alive` | Verde | Badge "LIVE" |
| `--status-dead` | Rojo | Badge "DEAD" |
| `--status-unknown` | Amarillo | Badge "UNKNOWN" |

- **Tipografía**: `Space Grotesk` (display) + `JetBrains Mono` (monospace)
- **Superficies**: Tarjetas translúcidas con bordes sutiles
- Todos los colores usan formato HSL y se referencian vía clases semánticas de Tailwind

---

## 🏗️ Decisiones de Arquitectura

### Manejo de Estado

| Tipo | Herramienta | Justificación |
|---|---|---|
| Estado servidor (datos API) | TanStack Query | Caching automático, paginación, refetch |
| Estado cliente (favoritos) | Redux Toolkit | Persistencia en `localStorage`, toggle rápido |

### Búsqueda
- Input con debounce de 300ms vía hook `useDebounce` para evitar llamadas excesivas
- Resetea la paginación a página 1 en nueva búsqueda

### Diseño Responsivo
- **Móvil**: Grid de 2 columnas, layout apilado, targets táctiles grandes
- **Tablet**: Grid de 3 columnas
- **Desktop**: Grid de 4 columnas con contenido centrado (max-width 1400px)

### Accesibilidad
- ARIA labels en elementos interactivos
- Navegación por teclado
- Indicadores de foco con anillo verde neón
- Ratios de contraste suficientes

---

## ✨ Funcionalidades

| Feature | Descripción |
|---|---|
| 🔍 Búsqueda | Filtrar personajes por nombre con debounce |
| 🎯 Filtro de Estado | Filtrar por Alive, Dead o Unknown |
| ❤️ Favoritos | Toggle con botón corazón, persistido en localStorage |
| 📋 Dropdown FAVS | Acceso rápido a favoritos desde el header |
| 📄 Detalle | Info completa: especie, género, origen, ubicación |
| 📊 Paginación | Navegar entre páginas de resultados |
| 💀 Skeletons | Estados de carga con placeholders animados |
| 🚫 Estados vacío/error | Mensajes amigables cuando no hay resultados o hay error |
| 🎬 Animaciones | Fade-in, hover scale, shimmer |

---

## 💡 Aspectos destacados de la solución

- **Separación de responsabilidades**: La lógica de API vive en hooks, la UI en componentes, el estado en Redux slice
- **Sistema de tokens de diseño**: Todos los colores fluyen a través de CSS custom properties, haciendo el theming trivial
- **TanStack Query**: Elimina boilerplate para estados de loading/error y da caching gratis
- **Tema oscuro espacial**: Se siente inmersivo y fiel a la marca sin ser caricaturesco

## 🔧 Mejoras con más tiempo

- **JSON Server** para persistencia real de favoritos en backend
- **Actualizaciones optimistas** con TanStack Query mutations
- **Tests E2E** con Playwright cubriendo flujos completos
- **Scroll infinito** como alternativa a paginación
- **Transiciones de página** con Framer Motion
- **Soporte PWA** para acceso offline

## 🐛 Bug / Pain Point resuelto

**Problema**: La Rick and Morty API devuelve error 404 cuando la búsqueda/filtro no tiene resultados (en vez de un array vacío). Esto causaba que se mostrara el estado de error en lugar de un mensaje amigable.

**Solución**: El hook `useCharacters` captura las respuestas 404 y devuelve un result set vacío, permitiendo a la UI mostrar el componente de estado vacío.

---

## 📝 Scripts disponibles

| Script | Descripción |
|---|---|
| `bun run dev` | Servidor de desarrollo en puerto 8080 |
| `bun run build` | Build de producción |
| `bun run preview` | Preview del build |
| `bun run test` | Ejecutar tests unitarios |
| `bun run test:watch` | Tests en modo watch |
| `bun run lint` | Lint con ESLint |

---

