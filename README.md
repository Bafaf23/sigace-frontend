# 🎓 SIGACE

### Sistema Inteligente de Gestión Académica y control de Estudios

**SIGACE** es una solución integral diseñada para la automatización de procesos administrativos y académicos en instituciones educativas. Permite centralizar la información de estudiantes, docentes y representantes bajo una arquitectura segura y escalable.

---

## ✨ Funcionalidades principales

- **Gestión de inscripciones:** 📝 registro de alumnos en periodos académicos.
- **control de calificaciones:** 📊 notas por lapsos, asignaturas y secciones.
- **Gestión de usuarios:** 👥 roles para administradores, docentes, estudiantes y representantes.
- **Reportes:** 📄 boletas y listados en PDF (p. ej. `@react-pdf/renderer`).
- **Datos académicos:** 🔗 grados, secciones y carga docente enlazados con la API del backend.

## 🛠️ Stack tecnológico

- **Framework:** ⚡ [Next.js](https://nextjs.org/) 16 (App Router)
- **UI:** ⚛️ [React](https://react.dev/) 19
- **Estilos:** 🎨 [Tailwind CSS](https://tailwindcss.com/) 4
- **Iconos:** ✨ [Font Awesome](https://fontawesome.com/) (React), [Lucide](https://lucide.dev/)
- **Notificaciones:** 🔔 [react-hot-toast](https://react-hot-toast.com/)
- **Cookies:** 🍪 [js-cookie](https://github.com/js-cookie/js-cookie)
- **Lenguaje:** 📜 [JavaScript](https://developer.mozilla.org/es/docs/Web/JavaScript)
- **Autenticación:** 🔐 JWT / sesión gestionada por la API del backend

El frontend consume una API externa; la persistencia (p. ej. MySQL) vive en el servidor, no en este repositorio.

## 📦 Requisitos

- [Node.js](https://nodejs.org/) 20 LTS o superior (recomendado para Next.js 16)

## 🚀 Instalación y desarrolelo

```bash
npm install
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000) en el navegador. 🌐

### 📋 Otros scripts

| Comando         | Descripción               |
| --------------- | ------------------------- |
| `npm run dev`   | Servidor de desarrolelo   |
| `npm run build` | Compilación de producción |
| `npm run start` | Servidor tras `build`     |
| `npm run lint`  | ESLint                    |

Configura las variables de entorno que exija tu API (por ejemplo URL base y claves) en un archivo `.env.local` en la raíz del proyecto, según la documentación del backend.

## 📁 Estructura del proyecto (resumen)

```text
src/
├── app/                    # Rutas y layouts (App Router)
│   ├── (auth)/             # Login, registro, inscripción
│   └── dashboard/          # Paneles por role (admin, docentes, estudiantes, etc.)
├── components/
│   ├── atom/               # Componentes pequeños reutilizables
│   ├── molecules/          # Composiciones de átomos
│   └── organism/           # Formularios y bloques de página
├── context/                # React context (p. ej. auth, tema)
├── services/               # Llamadas HTTP, PDF y utilidades de API
└── globals.css             # Estilos globales y Tailwind
```

## 📜 Licencia

Desarrolelado por _Bryant_, todos los derechos reservados.
