import { useState } from 'react'
import { VIDEOS, EJERCICIOS } from '../data.js'
import Filtro from '../components/Filtro.jsx'
import Etiqueta from '../components/Etiqueta.jsx'
import VideoYouTube from '../components/VideoYouTube.jsx'
import Quiz, { estadoInicial } from '../components/Quiz.jsx'

// PB-01 · Videos educativos (YouTube) con quiz de 5 preguntas y calificación por sección.
export default function Videos({ tema, setTema }) {
  // El avance de cada quiz se guarda aquí para no perderlo al cambiar el filtro.
  const [estados, setEstados] = useState({})
  const lista = tema === 'Todos' ? VIDEOS : VIDEOS.filter((v) => v.tema === tema)

  return (
    <section className="container" aria-labelledby="t-videos">
      <h1 id="t-videos" tabIndex="-1">Videos educativos</h1>
      <p className="lead">Mira los videos y, al terminar cada uno, responde el quiz para comprobar lo que aprendiste.</p>
      <Filtro valor={tema} onCambio={setTema} />
      <p className="count" role="status">{lista.length} {lista.length === 1 ? 'video' : 'videos'}</p>

      <ul className="grid grid--videos">
        {lista.map((v, n) => {
          const set = EJERCICIOS.find((e) => e.id === v.ejercicio)
          return (
            <li key={v.id} className="media-card">
              <VideoYouTube src={v.embed} titulo={v.titulo} />
              <div className="media-card__body">
                <span className="media-card__num">Video {n + 1}</span>
                <Etiqueta tema={v.tema} />
                <h2>{v.titulo}</h2>
                <p>{v.descripcion}</p>
                <p className="media-card__link">
                  ¿No carga el video?{' '}
                  <a href={'https://www.youtube.com/watch?v=' + v.youtube} target="_blank" rel="noopener noreferrer">
                    Ábrelo en YouTube
                  </a>
                </p>
              </div>
              <Quiz
                idBase={v.id}
                titulo={'Quiz del video: ' + v.titulo}
                tituloNota="Calificación de esta sección"
                preguntas={set.preguntas}
                estado={estados[v.id] || estadoInicial}
                setEstado={(nuevo) => setEstados((previo) => ({ ...previo, [v.id]: nuevo }))}
              />
            </li>
          )
        })}
      </ul>
    </section>
  )
}
