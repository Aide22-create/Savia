import { useState } from 'react'
import Etiqueta from '../components/Etiqueta.jsx'
import Quiz, { estadoInicial } from '../components/Quiz.jsx'

// PB-03 · Un ejercicio: una pregunta a la vez, retroalimentación y calificación final.
export default function Ejercicio({ ejercicio: e }) {
  const [estado, setEstado] = useState(estadoInicial)
  return (
    <section className="container" aria-labelledby="t-ejercicio">
      <a className="btn btn--ghost" href="#ejercicios">← Volver a ejercicios</a>
      <Etiqueta tema={e.tema} />
      <h1 id="t-ejercicio" tabIndex="-1">{e.titulo}</h1>
      <div className="panel" id="panel-ejercicio">
        <Quiz
          idBase={e.id}
          titulo="Responde cada pregunta"
          tituloNota="Tu calificación"
          textoRepetir="Repetir ejercicio"
          preguntas={e.preguntas}
          estado={estado}
          setEstado={setEstado}
        />
      </div>
    </section>
  )
}
