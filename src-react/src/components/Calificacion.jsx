// Calificación de 0 a 10: round(aciertos / total * 100) / 10.
export function calcularNota(aciertos, total) {
  return Math.round((aciertos / total) * 100) / 10
}

export default function Calificacion({ titulo, aciertos, total }) {
  const nota = calcularNota(aciertos, total)
  const nivel = nota >= 8 ? 'alta' : nota >= 6 ? 'media' : 'baja'
  return (
    <div className={'calificacion calificacion--' + nivel} role="status">
      <span className="calificacion__titulo">{titulo}</span>
      <span className="calificacion__nota">{nota} / 10</span>
      <span className="quiz__resultado">Resultado: {aciertos} de {total} respuestas correctas.</span>
    </div>
  )
}
