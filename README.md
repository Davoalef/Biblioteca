# 📚 Biblioteca Pública — Prueba Técnica Frontend

Aplicación web para una biblioteca pública que permite consultar, visualizar y crear registros de libros. Construida con **Next.js 16**, **TypeScript**, **Tailwind CSS** y **TanStack Query**.

> Prueba técnica para **ORUS SYSTEM** — consumo de la API pública [JSONPlaceholder](https://jsonplaceholder.typicode.com/).

---

## 🚀 Demo

🔗 **Deploy en Vercel:** [https://biblioteca-ashen-two.vercel.app/](https://biblioteca-ashen-two.vercel.app/)

📦 **Repositorio:** [https://github.com/Davoalef/Biblioteca](https://github.com/Davoalef/Biblioteca)

---

## 🧰 Stack Tecnológico

| Categoría         | Tecnología                         |
| ----------------- | ---------------------------------- |
| Framework         | Next.js 16 (App Router)            |
| Lenguaje          | TypeScript                         |
| Estilos           | Tailwind CSS                       |
| Gestión de datos  | TanStack Query (React Query) + fetch nativo |
| Iconos            | lucide-react + react-icons         |
| Fuentes           | Geist Sans / Geist Mono            |
| Deploy            | Vercel                             |

---

## ✨ Funcionalidades implementadas

### 📖 Listado de libros (`/`)
- Consumo del endpoint `GET /posts` desde un **Server Component**.
- Cards visuales con portada flotante, estilo "estantería de librería".
- Columnas `id`, `title` y `body` (truncado a 50 caracteres).
- **Paginación frontend** con ellipsis inteligente (`[1] [2] [3] ••• [10]` según posición).
- **Selector** de cantidad por página: 10, 20 o 50 libros.
- **Búsqueda por título** con debounce custom de 300 ms.
- **Ordenamiento** ascendente/descendente por `id` o `title`.
- **Sidebar sticky** con los controles de búsqueda, orden y paginación.
- Botón "Ver más" que navega al detalle de cada libro.

### 🔍 Detalle del libro (`/posts/[id]`)
- Ruta dinámica que consume `GET /posts/:id`.
- Layout tipo **ficha de producto e-commerce** (portada + metadata + acciones).
- Estados nativos de Next.js: `loading.tsx`, `error.tsx` y `not-found.tsx`.
- Metadata dinámica para SEO (`generateMetadata`).
- **Carrusel de libros relacionados** con scroll por arrastre del mouse (drag-to-scroll).
- Botón para regresar al catálogo.

### ➕ Creación de registros (modal)
- Modal accesible desde el navbar con botón "Nuevo libro".
- Formulario con campos `title`, `body` y `userId` (select 1-5).
- Validación de longitud mínima en cada campo.
- Envío con `POST /posts` usando **`useMutation`** de React Query.
- Feedback visual con 3 estados: loading (spinner), éxito (toast verde con ID) y error (banner rojo).
- Cierre con tecla ESC y bloqueo de scroll del body.

### 🎨 Landing page
- **Banner hero** con degradado azul-morado, ilustración y CTAs.
- **Features bar** con 4 beneficios (convertida en carrusel en móvil).
- **Navbar sticky** con efecto glassmorphism (backdrop blur).
- **Footer** con fondo de ondas decorativas, links de navegación y redes sociales.

---

## 🏗️ Arquitectura

### Server vs Client Components

Se cumple el requisito mediante una separación consciente de responsabilidades:

**Server Components (renderizado en servidor):**
- `app/page.tsx` — Home, fetch del listado.
- `app/posts/[id]/page.tsx` — detalle del post.
- `app/layout.tsx` — estructura base.
- `Banner.tsx`, `Footer.tsx`, `FeaturesBar.tsx` — UI estática.

**Client Components (interactivos):**
- `PostsList.tsx` — estado de búsqueda, orden y paginación.
- `CreatePostModal.tsx` — formulario + mutación con React Query.
- `PostModal.tsx` — modal controlado.
- `Navbar.tsx` — controla el estado del modal de creación.
- `RelatedPosts.tsx` — carrusel con drag-to-scroll.
- `providers.tsx` — `QueryClientProvider`.

### Manejo de datos: estrategia híbrida

- **Fetch nativo** en Server Components para lecturas (home y detalle) — aprovecha el cache de Next.js (`revalidate: 60`).
- **React Query (`useMutation`)** para la creación de posts — manejo declarativo de loading/éxito/error.

---

## 🛠️ Instalación y uso

### Prerrequisitos
- Node.js 18.17 o superior
- npm (o yarn / pnpm)

### Variables de entorno

Crea un archivo `.env.local` en la raíz con:

```env
NEXT_PUBLIC_API_BASE_URL=https://jsonplaceholder.typicode.com
```

### Pasos

```bash
# 1. Clonar el repositorio
git clone https://github.com/Davoalef/Biblioteca.git
cd Biblioteca

# 2. Instalar dependencias
npm install

# 3. Ejecutar en desarrollo
npm run dev

# 4. Abrir en el navegador
# http://localhost:3000
```

### Scripts disponibles

| Comando         | Descripción                         |
| --------------- | ----------------------------------- |
| `npm run dev`   | Levanta el servidor de desarrollo   |
| `npm run build` | Genera el build de producción       |
| `npm start`     | Ejecuta el build de producción      |
| `npm run lint`  | Revisa el código con ESLint         |

---

## 🎨 Decisiones técnicas

- **Next.js App Router** por ser lo recomendado en Next.js 13+ y permitir mezclar Server y Client Components de forma natural.
- **Estrategia híbrida de datos** (fetch nativo para Server, React Query para mutación) — demuestra dominio de ambos patrones y los usa en el caso apropiado de cada uno.
- **Paginación frontend** ya que JSONPlaceholder devuelve los 100 posts en una sola llamada — paginar en cliente evita llamadas innecesarias y permite filtrado/orden sin refetch.
- **Hook custom de debounce** en lugar de instalar `lodash` — 10 líneas vs 70 KB de dependencia.
- **Convenciones de Next.js** (`loading.tsx`, `error.tsx`, `not-found.tsx`) en lugar de manejarlas manualmente con `useState` — aprovecha el Suspense y Error Boundary integrados.
- **Tailwind CSS** por velocidad de iteración y para evitar crear un sistema de diseño completo en una prueba.
- **lucide-react + react-icons**: lucide para iconos generales (flechas, checks, X), react-icons para logos de marcas (GitHub, LinkedIn) — lucide eliminó los iconos de marcas en su v1.
- **Variables de entorno tipadas** (`NEXT_PUBLIC_API_BASE_URL`) con validación al inicio, para evitar configuraciones rotas en producción.

---

## ⚠️ Notas sobre la API

JSONPlaceholder es una **API de simulación**:

- `GET /posts` y `GET /posts/:id` devuelven datos reales consistentes.
- `POST /posts` responde con **status 201** y el objeto creado con `id: 101`, pero **no persiste** los cambios.

---

## 📱 Responsive Design

La interfaz se adapta a los siguientes breakpoints:

- 📱 **Mobile (< 640px):** 1 columna en el grid, cards apiladas, features en carrusel.
- 🖥️ **Desktop (≥ 1024px):** grid de 2 columnas + sidebar sticky con controles.

---

## ✅ Checklist de requisitos

### Funcionales
- [x] Listado de libros con `id`, `title` y `body` truncado a 50 caracteres
- [x] Ver contenido completo (navegación a ruta de detalle)
- [x] Paginación frontend con ellipsis inteligente
- [x] Selector de cantidad por página (10, 20, 50)
- [x] Búsqueda por título con debounce ≥ 300 ms
- [x] Ordenamiento por `id` o `title`
- [x] Detalle en ruta `/posts/[id]`
- [x] Botón para regresar al listado
- [x] Estados de loading y error
- [x] Modal de creación con validación
- [x] POST a la API con feedback visual
- [x] Botón cancelar

### Técnicos obligatorios
- [x] Next.js 13+ con App Router (**Next.js 16**)
- [x] TypeScript
- [x] Al menos 1 Server Component y 1 Client Component
- [x] Manejo de datos: fetch nativo + React Query
- [x] Diseño responsive
- [x] Estados visuales claros (skeleton + error)

### Extras
- [x] Tailwind CSS como librería UI
- [x] Deploy en Vercel
- [x] Carrusel drag-to-scroll

---

## 👤 Autor

**David Alejandro Obando** — *DavoAlef*

- GitHub: [@Davoalef](https://github.com/Davoalef)
- Repositorio: [Biblioteca](https://github.com/Davoalef/Biblioteca)

---

## 📄 Licencia

Proyecto desarrollado como prueba técnica para **ORUS SYSTEM**.
