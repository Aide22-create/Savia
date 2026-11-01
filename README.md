# Savia – Plataforma de Recursos Educativos

Sitio web educativo que facilita el acceso a recursos digitales para estudiantes de diferentes edades.
Este repositorio contiene el **Sprint 1** del proyecto (Proyecto II, Licenciatura en Desarrollo de Sistemas Web), desarrollado con **React**.

**Alumna:** Aide Sánchez Sánchez

**Sitio publicado:** https://aide22-create.github.io/Savia/

## Qué incluye el Sprint 1

| Historia | Recurso | Dónde verlo |
|---|---|---|
| PB-01 | Videos educativos de YouTube (con miniatura), filtro por tema y un quiz de 5 preguntas después de cada video, con calificación de 0 a 10 | `#videos` |
| PB-02 | Artículos y lecturas: resumen de Savia y enlace al artículo completo en su fuente | `#articulos` |
| PB-03 | Ejercicios interactivos de 5 preguntas con retroalimentación inmediata, calificación y opción de repetir | `#ejercicios` |

Los cuestionarios (PB-04), los recursos accesibles (PB-05), el material descargable (PB-06) y las guías de estudio (PB-07) pertenecen al Sprint 2, que está pendiente.

## Tecnologías

React 19 y Vite para el código fuente (`src-react/`), HTML5 y CSS3. Los videos se incrustan desde YouTube, así que se necesita conexión a internet para verlos.

## Estructura del repositorio

```
src-react/            Código fuente en React
  index.html            Página base
  package.json          Dependencias y comandos (npm run dev, npm run build)
  vite.config.js        Configuración de Vite (el sitio compilado se escribe en la raíz)
  src/
    main.jsx            Punto de entrada
    App.jsx             Encabezado, pie de página y navegación
    useHashRoute.js     Navegación por el hash de la dirección (#videos, #articulos/...)
    data.js             Contenido: videos, artículos y preguntas
    styles.css          Estilos
    components/         Filtro, Etiqueta, Calificacion, Quiz, VideoYouTube
    pages/              Inicio, Videos, Articulos, Articulo, Ejercicios, Ejercicio
index.html, assets/   Versión compilada que publica GitHub Pages
img/aprendizaje.jpg   Imagen de portada
css/, js/             Primera versión del Sprint 1 en JavaScript simple (se conserva como referencia)
docs/                 Capturas de pantalla de evidencia
```

## Cómo ejecutarlo

Necesitas tener instalado [Node.js](https://nodejs.org/).

```
cd src-react
npm install
npm run dev
```

`npm run dev` abre el sitio en una dirección `http://localhost:...` donde los videos sí se reproducen.
Para generar de nuevo la versión que se publica: `npm run build` (escribe `index.html` y `assets/` en la raíz del repositorio).

Los videos de YouTube solo se reproducen dentro del sitio cuando se abre desde una dirección `http://...` o publicado en GitHub Pages. Si abres `index.html` con doble clic (`file:///`), YouTube lo bloquea.

## Publicación

GitHub Pages: *Settings → Pages → Deploy from a branch → `main` → `/ (root)`*.
