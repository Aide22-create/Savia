import { TEMAS } from '../data.js'

// Botones para filtrar por tema (se usa en videos, artículos y ejercicios).
export default function Filtro({ valor, onCambio }) {
  return (
    <div className="filter" role="group" aria-label="Filtrar por tema">
      {['Todos', ...TEMAS].map((t) => (
        <button
          key={t}
          type="button"
          className={'chip' + (valor === t ? ' is-active' : '')}
          aria-pressed={valor === t}
          onClick={() => onCambio(t)}
        >
          {t}
        </button>
      ))}
    </div>
  )
}
