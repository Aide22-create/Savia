import { useEffect, useRef } from 'react'
import Calificacion from './Calificacion.jsx'

export const estadoInicial = { i: 0, elegida: null, aciertos: 0 }

// Quiz de una pregunta a la vez con retroalimentación inmediata y calificación final.
// El estado ({ i, elegida, aciertos }) lo guarda quien usa el componente.
export default function Quiz({ idBase, titulo, tituloNota, textoRepetir = 'Repetir quiz', preguntas, estado, setEstado }) {
  const total = preguntas.length
  const { i, elegida, aciertos } = estado
  const enfocar = useRef(false)
  const contenedor = useRef(null)

  // Después de responder o avanzar, el foco pasa al botón que toca (accesibilidad con teclado).
  useEffect(() => {
    if (!enfocar.current) return
    enfocar.current = false
    const destino =
      contenedor.current.querySelector('.js-foco') || contenedor.current.querySelector('.option')
    if (destino) destino.focus()
  })

  const cambiar = (nuevo) => { enfocar.current = true; setEstado(nuevo) }

  if (i >= total) {
    const mensaje =
      aciertos === total ? '¡Excelente! Respondiste todo bien.'
      : aciertos >= Math.ceil(total / 2) ? 'Vas muy bien. Repasa el tema para reforzar lo que falló.'
      : 'Vuelve a repasar el tema y vuelve a intentarlo.'
    return (
      <div className="quiz" id={'quiz-' + idBase} ref={contenedor}>
        <h3>{titulo}</h3>
        <div className="progreso" aria-hidden="true"><span style={{ width: '100%' }} /></div>
        <Calificacion titulo={tituloNota} aciertos={aciertos} total={total} />
        <p>{mensaje}</p>
        <button type="button" className="btn js-foco" id={'btn-repetir-' + idBase}
          onClick={() => cambiar(estadoInicial)}>
          {textoRepetir}
        </button>
      </div>
    )
  }

  const p = preguntas[i]
  const respondida = elegida !== null
  const acerto = respondida && elegida === p.correcta

  return (
    <div className="quiz" id={'quiz-' + idBase} ref={contenedor}>
      <h3>{titulo}</h3>
      <div className="progreso" aria-hidden="true">
        <span style={{ width: Math.round((i / total) * 100) + '%' }} />
      </div>
      <p className="meta" aria-live="polite">Pregunta {i + 1} de {total}</p>
      <fieldset className="question">
        <legend>{p.enunciado}</legend>
        <div className="options">
          {p.opciones.map((texto, n) => {
            let clase = 'option'
            if (respondida && n === p.correcta) clase += ' is-correct'
            else if (respondida && n === elegida) clase += ' is-wrong'
            return (
              <button key={n} type="button" className={clase} disabled={respondida}
                onClick={() => cambiar({ i, elegida: n, aciertos: aciertos + (n === p.correcta ? 1 : 0) })}>
                <span className="option__letter" aria-hidden="true">{String.fromCharCode(65 + n)}</span>
                {texto}
              </button>
            )
          })}
        </div>
      </fieldset>
      <div className="feedback-area" aria-live="polite">
        {respondida && (
          <div className={'feedback ' + (acerto ? 'feedback--ok' : 'feedback--bad')}>
            <strong>{acerto ? '¡Correcto!' : 'Incorrecto.'}</strong>{' '}
            {!acerto && 'La respuesta correcta es «' + p.opciones[p.correcta] + '». '}
            {p.explicacion}
          </div>
        )}
      </div>
      {respondida && (
        <button type="button" className="btn js-foco" id={'btn-sig-' + idBase}
          onClick={() => cambiar({ i: i + 1, elegida: null, aciertos })}>
          {i + 1 === total ? 'Ver resultado' : 'Siguiente pregunta'}
        </button>
      )}
    </div>
  )
}
