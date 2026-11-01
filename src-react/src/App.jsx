import { useEffect, useRef, useState } from 'react'
import useHashRoute from './useHashRoute.js'
import { ARTICULOS, EJERCICIOS } from './data.js'
import Inicio from './pages/Inicio.jsx'
import Videos from './pages/Videos.jsx'
import Articulos from './pages/Articulos.jsx'
import Articulo from './pages/Articulo.jsx'
import Ejercicios from './pages/Ejercicios.jsx'
import Ejercicio from './pages/Ejercicio.jsx'

const NAV = [
  ['inicio', 'Inicio'],
  ['videos', 'Videos'],
  ['articulos', 'Artículos'],
  ['ejercicios', 'Ejercicios'],
]

export default function App() {
  const { vista, id } = useHashRoute()
  const [filtros, setFiltros] = useState({ videos: 'Todos', articulos: 'Todos', ejercicios: 'Todos' })
  const principal = useRef(null)
  const primera = useRef(true)

  const articulo = vista === 'articulos' && id ? ARTICULOS.find((a) => a.id === id) : null
  const ejercicio = vista === 'ejercicios' && id ? EJERCICIOS.find((e) => e.id === id) : null
  const actual = NAV.some(([v]) => v === vista) ? vista : 'inicio'

  const tema = (v) => filtros[v]
  const cambiarTema = (v) => (t) => setFiltros((previo) => ({ ...previo, [v]: t }))

  // Al cambiar de página: título del navegador, foco en el encabezado y vuelta al inicio de la página.
  useEffect(() => {
    const h1 = principal.current && principal.current.querySelector('h1')
    document.title = (h1 ? h1.textContent + ' – ' : '') + 'Savia'
    if (primera.current) { primera.current = false; return }
    if (h1) h1.focus()
    window.scrollTo(0, 0)
  }, [vista, id])

  let contenido
  if (actual === 'videos') contenido = <Videos tema={tema('videos')} setTema={cambiarTema('videos')} />
  else if (actual === 'articulos')
    contenido = articulo ? <Articulo articulo={articulo} /> : <Articulos tema={tema('articulos')} setTema={cambiarTema('articulos')} />
  else if (actual === 'ejercicios')
    contenido = ejercicio
      ? <Ejercicio key={ejercicio.id} ejercicio={ejercicio} />
      : <Ejercicios tema={tema('ejercicios')} setTema={cambiarTema('ejercicios')} />
  else contenido = <Inicio />

  return (
    <>
      <a className="skip-link" href="#contenido">Saltar al contenido</a>
      <header className="header">
        <div className="header__inner">
          <a className="brand" href="#inicio" aria-label="Savia, ir al inicio">
            <span className="brand__logo" aria-hidden="true">S</span>
            <span className="brand__name">Savia</span>
          </a>
          <nav aria-label="Principal">
            <ul className="nav">
              {NAV.map(([v, texto]) => (
                <li key={v}>
                  <a className={'nav__link' + (actual === v ? ' is-active' : '')} href={'#' + v}
                    data-vista={v} aria-current={actual === v ? 'page' : undefined}>
                    {texto}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </header>

      <main id="contenido" tabIndex="-1" ref={principal}>{contenido}</main>

      <footer className="footer">
        <p className="footer__dots" aria-hidden="true"><span /><span /><span /><span /></p>
        <p className="footer__name">Savia · Plataforma de Recursos Educativos</p>
        <p>Videos, artículos y ejercicios para aprender a tu ritmo · Proyecto II · Sprint 1 (React)</p>
      </footer>
    </>
  )
}
