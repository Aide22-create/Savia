import { useEffect, useState } from 'react'

// Navegación sencilla con el hash de la URL: #inicio, #videos, #articulos/<id>, #ejercicios/<id>.
function leerHash() {
  const partes = (window.location.hash || '#inicio').slice(1).split('/')
  return { vista: partes[0] || 'inicio', id: partes[1] }
}

export default function useHashRoute() {
  const [ruta, setRuta] = useState(leerHash)
  useEffect(() => {
    const alCambiar = () => setRuta(leerHash())
    window.addEventListener('hashchange', alCambiar)
    return () => window.removeEventListener('hashchange', alCambiar)
  }, [])
  return ruta
}
