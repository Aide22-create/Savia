import Etiqueta from '../components/Etiqueta.jsx'

// PB-02 · Un artículo: resumen de Savia y enlace a la fuente original.
export default function Articulo({ articulo: a }) {
  return (
    <article className="container article" aria-labelledby="t-articulo">
      <a className="btn btn--ghost" href="#articulos">← Volver a artículos</a>
      <Etiqueta tema={a.tema} />
      <h1 id="t-articulo" tabIndex="-1">{a.titulo}</h1>
      <p className="meta">Lectura de {a.minutos} minutos</p>
      {a.parrafos.map((p, n) => <p key={n}>{p}</p>)}
      {a.fuente && (
        <div className="fuente">
          <p>
            Este es un resumen de Savia. Para leer el artículo completo, visita la fuente: {a.fuente.nombre} ({a.fuente.idioma}).
          </p>
          <a className="btn" href={a.fuente.url} target="_blank" rel="noopener noreferrer">Leer el artículo completo</a>
        </div>
      )}
    </article>
  )
}
