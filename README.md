# Savia – Plataforma de Recursos Educativos

Sitio web educativo que facilita el acceso a recursos digitales para estudiantes de diferentes edades.
Este repositorio contiene el **Sprint 1** del proyecto (Proyecto II, Licenciatura en Desarrollo de Sistemas Web).

**Alumna:** Aide Sánchez Sánchez

## Qué incluye el Sprint 1

| Historia | Recurso | Dónde verlo |
|---|---|---|
| PB-01 | Videos educativos de YouTube (con miniatura), filtro por tema y un quiz de 3 preguntas después de cada video | `#videos` |
| PB-02 | Artículos y lecturas: resumen de Savia y enlace al artículo completo en su fuente | `#articulos` |
| PB-03 | Ejercicios interactivos con retroalimentación inmediata y opción de repetir | `#ejercicios` |

Los cuestionarios (PB-04), los recursos accesibles (PB-05), el material descargable (PB-06) y las guías de estudio (PB-07) pertenecen al Sprint 2.

## Tecnologías

HTML5, CSS3 y JavaScript simple. No usa librerías ni necesita instalar nada. Los videos se incrustan desde YouTube, así que se necesita conexión a internet para verlos.

## Cómo ejecutarlo

1. Descarga o clona el repositorio.
2. Copia tu imagen de portada como `img/aprendizaje.jpg`.
3. Da doble clic en **`Abrir_Savia.bat`**. Se abre una ventana negra (déjala abierta) y el navegador carga el sitio en `http://localhost:8080`. Para detenerlo, cierra esa ventana.

Otra opción: en VS Code, clic derecho en `index.html` → *Open with Live Server*.

Los videos de YouTube solo se reproducen dentro del sitio cuando se abre desde una dirección `http://…` (como las anteriores) o publicado en GitHub Pages. Si abres `index.html` con doble clic (`file:///`), YouTube lo bloquea.

## Estructura

```
index.html            Página principal y estructura del sitio
css/styles.css        Estilos (diseño adaptable y accesible)
js/data.js            Contenido: videos (YouTube), artículos con su fuente y preguntas
js/app.js             Lógica: navegación, filtros, reproductor, quiz y ejercicios
img/aprendizaje.jpg   Imagen de portada del inicio (la agregas tú)
Abrir_Savia.bat       Inicia el sitio con doble clic (usa servidor.ps1)
servidor.ps1          Servidor local con PowerShell, sin instalar nada
docs/capturas/        Capturas de pantalla del sitio en ejecución
```

## Si un video muestra error

- **Dice que abras «Abrir_Savia.bat» o Live Server:** el sitio se abrió con doble clic en `index.html`. Ábrelo con `Abrir_Savia.bat`.
- **Windows muestra «Windows protegió su PC» al abrir el .bat:** pulsa *Más información* → *Ejecutar de todos modos*. El archivo solo inicia un servidor local con el PowerShell de Windows.
- **El video dice que no se puede reproducir en otros sitios:** el dueño del video bloqueó la reproducción incrustada. Cambia el video en `js/data.js`.

## Pruebas manuales (lista de verificación)

- [ ] **PB-01:** en *Videos* hay 3 videos con miniatura; al hacer clic se reproducen; debajo de cada uno hay un quiz que al terminar muestra el resultado; el filtro por tema cambia la lista.
- [ ] **PB-02:** en *Artículos* hay 3 artículos; «Leer artículo» abre el resumen, «Leer el artículo completo» abre la fuente en otra pestaña y «Volver» regresa al listado.
- [ ] **PB-03:** en *Ejercicios*, al elegir una respuesta aparece «¡Correcto!» o «Incorrecto.» con la explicación; al terminar se puede repetir.
- [ ] El sitio se ve bien en computadora y en teléfono, y se puede usar con el teclado (Tab y Enter).

## Cómo publicarlo en GitHub

1. Crea una cuenta en <https://github.com> y un repositorio nuevo llamado `savia` (público, sin README).
2. En una terminal, dentro de esta carpeta:

```bash
git init
git add .
git commit -m "Sprint 1: videos, artículos y ejercicios interactivos"
git branch -M main
git remote add origin https://github.com/TU-USUARIO/savia.git
git push -u origin main
```

3. (Opcional) Para tener el sitio en línea: en GitHub ve a **Settings → Pages**, elige **Deploy from a branch**, rama `main` y carpeta `/ (root)`. En unos minutos el sitio quedará en `https://TU-USUARIO.github.io/savia/`.
4. Copia el enlace del repositorio y pégalo en tu documento, en la sección «Funcionalidad del código del sprint».
