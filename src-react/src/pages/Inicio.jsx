import { useState } from 'react'
import { TEMAS, VIDEOS, ARTICULOS, EJERCICIOS } from '../data.js'

const RECURSOS = [
  { vista: 'videos', titulo: 'Videos educativos', texto: 'Comprende los temas de manera visual y sencilla.', total: VIDEOS.length, icono: '▶' },
  { vista: 'articulos', titulo: 'Artículos y lecturas', texto: 'Amplía tus conocimientos con lecturas breves.', total: ARTICULOS.length, icono: '📖' },
  { vista: 'ejercicios', titulo: 'Ejercicios interactivos', texto: 'Practica y recibe retroalimentación al instante.', total: EJERCICIOS.length, icono: '✎' },
]

const DATOS = [
  ['▶', VIDEOS.length, 'videos con quiz'],
  ['📖', ARTICULOS.length, 'artículos para leer'],
  ['✎', EJERCICIOS.length, 'ejercicios con retroalimentación'],
  ['★', TEMAS.length, 'temas para aprender'],
]

export default function Inicio() {
  // Imagen de portada: img/aprendizaje.jpg (o aprendizaje.jpg junto a index.html).
  // Si no está, el inicio se muestra sin imagen.
  const [fuente, setFuente] = useState('img/aprendizaje.jpg')
  const [conImagen, setConImagen] = useState(true)

  const alFallar = () => {
    if (fuente === 'img/aprendizaje.jpg') setFuente('aprendizaje.jpg')
    else setConImagen(false)
  }

  return (
    <section className="container">
      <div className={'hero' + (conImagen ? ' hero--img' : '')}>
        <div>
          <h1 tabIndex="-1">Aprende a tu ritmo con Savia</h1>
          <p>
            Savia reúne recursos educativos digitales para estudiantes de diferentes edades, organizados por
            tema para que encuentres lo que necesitas de manera sencilla.
          </p>
          <p className="hero__temas">
            Temas disponibles:
            {TEMAS.map((t) => <span key={t} className="tag" data-tema={t}>{t}</span>)}
          </p>
        </div>
        {conImagen && (
          <img className="hero__img" src={fuente} alt="Imagen sobre el aprendizaje" onError={alFallar} />
        )}
      </div>

      <ul className="stats">
        {DATOS.map(([icono, numero, texto]) => (
          <li key={texto} className="stats__item">
            <span className="stats__icon" aria-hidden="true">{icono}</span>
            <strong>{numero}</strong>
            <span>{texto}</span>
          </li>
        ))}
      </ul>

      <h2 className="sr-only">Recursos disponibles</h2>
      <ul className="cards">
        {RECURSOS.map((r) => (
          <li key={r.vista} className="card">
            <span className="card__icon" aria-hidden="true">{r.icono}</span>
            <h3>{r.titulo}</h3>
            <p>{r.texto}</p>
            <p className="card__count">{r.total} disponibles</p>
            <a className="btn" href={'#' + r.vista}>Ver {r.titulo.toLowerCase()}</a>
          </li>
        ))}
      </ul>
    </section>
  )
}
