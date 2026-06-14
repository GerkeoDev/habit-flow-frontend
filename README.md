# HabitFlow Frontend

Aplicación web para tracking de hábitos construida con React.

## Stack

React 19 · Vite 8 · Tailwind CSS 4 · React Router 7 · Axios · dayjs

## Variables de entorno

Crear archivo `.env` en la raíz del proyecto:

```env
VITE_API_URL=http://localhost:8000/api/
```

Para producción, cambiar por la URL del backend deployado.

## Instalación

```bash
npm install
npm run dev
```

## Scripts

| Comando            | Descripción                     |
|--------------------|---------------------------------|
| `npm run dev`      | Inicia servidor de desarrollo   |
| `npm run build`    | Genera build de producción      |
| `npm run preview`  | Previsualiza el build           |
| `npm run lint`     | Ejecuta ESLint                  |

## Funcionalidades

- **Autenticación**: registro, inicio de sesión, JWT con refresh automático vía cookies
- **CRUD de hábitos**: crear, listar, editar y eliminar hábitos
- **Check-in diario**: marcar/desmarcar cumplimiento por día
- **Rachas**: cálculo de racha actual y mejor racha histórica
- **Navegación**: sidebar con acceso a Dashboard, Hábitos, Perfil y cierre de sesión
- **Protección de rutas**: redirección automática según estado de autenticación

## API

Todas las peticiones se realizan mediante Axios con `withCredentials: true` para el envío de cookies.

| Método | Endpoint               | Descripción                    |
|--------|------------------------|--------------------------------|
| POST   | `/login`               | Iniciar sesión                |
| POST   | `/register`            | Registrar usuario             |
| POST   | `/logout`              | Cerrar sesión                 |
| GET    | `/me`                  | Obtener usuario actual        |
| GET    | `/habits`              | Listar hábitos                |
| POST   | `/habits`              | Crear hábito                  |
| PUT    | `/habits/:id`          | Actualizar hábito             |
| PUT    | `/habits/:id/check`    | Marcar/desmarcar día          |
| DELETE | `/habits/:id`          | Eliminar hábito               |

## Deploy

Configurado para **Vercel** con `vercel.json` que incluye rewrites SPA para manejo de rutas del lado cliente.
