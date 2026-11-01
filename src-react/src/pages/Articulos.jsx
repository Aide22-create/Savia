import { ARTICULOS } from '../data.js'
import Filtro from '../components/Filtro.jsx'
import Etiqueta from '../components/Etiqueta.jsx'

// PB-02 · Lista de artículos y lecturas
export default function Articulos({ tema, setTema }) {
  const lista = tema === 'Todos' ? ARTICULOS : ARTICULOS.filter((a) => a.tema === tema)
  return (
    <section className="container" aria-labelledby="t-articulos">
      <h1 id="t-articulos" tabIndex="-1">Artículos y lecturas</h1>
      <p className="lead">Amplía tus conocimientos con lecturas educativas sobre los temas que estudias.</p>
      <Filtro valor={tema} onCambio={setTema} />
      <p className="count" role="status">{lista.length} {lista.length === 1 ? 'artículo' : 'artículos'}</p>
      <ul className="list">
        {lista.map((a) => (
          <li key={a.id} className="list__item">
            <Etiqueta tema={a.tema} />
            <h2>{a.titulo}</h2>
            <p>{a.resumen}</p>
            <p className="meta">Lectura de {a.minutos} minutos</p>
            <a className="btn" href={'#articulos/' + a.id} aria-label={'Leer artículo: ' + a.titulo}>Leer artículo</a>
          </li>
        ))}
      </ul>
    </section>
  )
}
