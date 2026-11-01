import { EJERCICIOS } from '../data.js'
import Filtro from '../components/Filtro.jsx'
import Etiqueta from '../components/Etiqueta.jsx'

// PB-03 · Lista de ejercicios interactivos
export default function Ejercicios({ tema, setTema }) {
  const lista = tema === 'Todos' ? EJERCICIOS : EJERCICIOS.filter((e) => e.tema === tema)
  return (
    <section className="container" aria-labelledby="t-ejercicios">
      <h1 id="t-ejercicios" tabIndex="-1">Ejercicios interactivos</h1>
      <p className="lead">Practica lo aprendido y recibe retroalimentación inmediata en cada respuesta.</p>
      <Filtro valor={tema} onCambio={setTema} />
      <p className="count" role="status">{lista.length} {lista.length === 1 ? 'ejercicio' : 'ejercicios'}</p>
      <ul className="list">
        {lista.map((e) => (
          <li key={e.id} className="list__item">
            <Etiqueta tema={e.tema} />
            <h2>{e.titulo}</h2>
            <p>{e.preguntas.length} preguntas con retroalimentación</p>
            <a className="btn" href={'#ejercicios/' + e.id} aria-label={'Comenzar ejercicio: ' + e.titulo}>Comenzar</a>
          </li>
        ))}
      </ul>
    </section>
  )
}
