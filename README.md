# 📚 Biblioteca Pública - Prueba Técnica Frontend

Aplicación web para una biblioteca pública que permite consultar, visualizar y crear registros de libros, construida con **Next.js 13+ App Router**, **TypeScript**, **Tailwind CSS** y **React Query**.

> Prueba técnica para ORUS SYSTEM — consumo de la API pública [JSONPlaceholder](https://jsonplaceholder.typicode.com/).

---

## 🚀 Demo

🔗 **Deploy en Vercel:** [https://tu-proyecto.vercel.app](https://tu-proyecto.vercel.app)

📦 **Repositorio:** [https://github.com/tu-usuario/tu-proyecto](https://github.com/tu-usuario/tu-proyecto)

---

## 🧰 Stack Tecnológico

| Categoría | Tecnología |
|-----------|------------|
| Framework | Next.js 14 (App Router) |
| Lenguaje | TypeScript |
| Estilos | Tailwind CSS |
| Gestión de datos | TanStack Query (React Query) v5 |
| Validación | Validación nativa de formularios |
| Deploy | Vercel |

---

## ✨ Funcionalidades implementadas

### 📖 Listado de libros (`/`)
- Consumo del endpoint `GET /posts` con los primeros 100 registros.
- Tabla responsive con columnas `id`, `title` y `body` (truncado a 50 caracteres).
- **Paginación** en frontend con selector de 10, 20 o 50 items por página.
- **Búsqueda por título** con debounce de 300 ms.
- **Ordenamiento** ascendente/descendente por `id` o `title`.
- Modal para ver contenido completo del body sin salir de la vista.
- Botón para abrir modal de creación de nuevo registro.

### 🔍 Detalle del libro (`/posts/[id]`)
- Ruta dinámica con fetch de `GET /posts/:id`.
- Estados visuales de `loading` (skeleton) y `error` (con opción de reintentar).
- Botón para regresar al listado.

### ➕ Creación de registros
- Modal con formulario validado (`title`, `body`, `userId` del 1 al 5).
- Envío con `POST /posts` usando `useMutation`.
- Feedback visual de loading, éxito y error.
- El post creado se añade al cache local (la API no persiste los cambios).
- Botón de cancelar que cierra el modal sin guardar.

---

## 🏗️ Arquitectura

### Server vs Client Components

Se cumple con el requisito de usar al menos un componente de cada tipo:

- **Server Components:**
  - `app/page.tsx` — carga inicial del listado (fetch server-side).
  - `app/posts/[id]/page.tsx` — renderiza el detalle del post.

- **Client Components:**
  - `PostsTable` — maneja búsqueda, ordenamiento y paginación.
  - `CreatePostModal` — formulario con estado y mutación.
  - `PostBodyModal` — modal para ver el body completo.

### Estructura de carpetas

```
app/
├── layout.tsx              # Root layout + providers
├── page.tsx                # Listado principal (Server Component)
├── providers.tsx           # QueryClientProvider
├── posts/
│   └── [id]/
│       └── page.tsx        # Detalle del post
├── components/
│   ├── PostsTable.tsx
│   ├── CreatePostModal.tsx
│   ├── PostBodyModal.tsx
│   ├── SearchBar.tsx
│   ├── Pagination.tsx
│   └── ui/
│       ├── Skeleton.tsx
│       └── ErrorState.tsx
├── lib/
│   ├── api.ts              # Funciones de fetch
│   ├── types.ts            # Tipos de TypeScript
│   └── hooks/
│       └── useDebounce.ts
└── globals.css
```

---

## 🛠️ Instalación y uso

### Prerrequisitos
- Node.js 18.17 o superior
- npm, yarn o pnpm

### Pasos

```bash
# 1. Clonar el repositorio
git clone https://github.com/tu-usuario/tu-proyecto.git
cd tu-proyecto

# 2. Instalar dependencias
npm install

# 3. Ejecutar en desarrollo
npm run dev

# 4. Abrir en el navegador
# http://localhost:3000
```

### Scripts disponibles

| Comando | Descripción |
|---------|-------------|
| `npm run dev` | Levanta el servidor de desarrollo |
| `npm run build` | Genera el build de producción |
| `npm start` | Ejecuta el build de producción |
| `npm run lint` | Revisa el código con ESLint |

---

## 🎨 Decisiones técnicas

- **React Query** en vez de fetch nativo porque cubre loading/error/cache de forma declarativa, evita lógica repetida y permite invalidar queries tras mutaciones.
- **Paginación en frontend** ya que JSONPlaceholder devuelve los 100 posts en una sola llamada; paginar en cliente es más rápido y evita llamadas innecesarias.
- **Debounce custom** (hook propio de 10 líneas) en lugar de instalar lodash, para mantener el bundle ligero.
- **Tailwind CSS** por su rapidez de iteración y por evitar configurar un sistema de diseño completo para una prueba.
- **Optimistic update en creación**: el nuevo post se agrega manualmente al cache con `setQueryData`, simulando persistencia ya que la API de JSONPlaceholder no guarda los cambios reales.

---

## ⚠️ Notas sobre la API

JSONPlaceholder es una API **de simulación**:

- El endpoint `POST /posts` retorna un objeto con `id: 101`, pero **no persiste** el registro.
- Por esta razón, los posts creados solo son visibles en la sesión actual gracias al cache de React Query.
- Al recargar la página, los datos vuelven al estado original de la API.

---

## 📱 Responsive Design

La interfaz está optimizada para:

- 📱 Mobile (< 640px) — tabla convertida en tarjetas apiladas.
- 💻 Tablet (640px - 1024px) — tabla con columnas visibles.
- 🖥️ Desktop (> 1024px) — layout completo con espaciado generoso.

---

## ✅ Checklist de requisitos

### Funcionales
- [x] Listado de libros con id, title y body truncado
- [x] Ver contenido completo (modal)
- [x] Paginación frontend
- [x] Selector de cantidad por página (10, 20, 50)
- [x] Búsqueda por título con debounce ≥ 300 ms
- [x] Ordenamiento por id o title
- [x] Detalle en ruta `/posts/[id]`
- [x] Botón para regresar al listado
- [x] Estados de loading y error
- [x] Modal de creación con validación
- [x] POST a la API con feedback visual
- [x] Botón cancelar

### Técnicos obligatorios
- [x] Next.js 13+ con App Router
- [x] TypeScript
- [x] Al menos 1 Server Component y 1 Client Component
- [x] React Query para manejo de datos
- [x] Diseño responsive
- [x] Estados visuales claros (skeleton, error)

### Extras
- [x] Tailwind CSS como librería UI
- [x] Deploy en Vercel

---

## 👤 Autor

**Tu Nombre**
- GitHub: [@tu-usuario](https://github.com/tu-usuario)
- Email: tu-email@ejemplo.com

---

## 📄 Licencia

Proyecto desarrollado como prueba técnica para **ORUS SYSTEM**.
