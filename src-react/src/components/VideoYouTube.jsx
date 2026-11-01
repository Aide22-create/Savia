// Video de YouTube incrustado con <iframe>. YouTube muestra la miniatura con su botón de play
// y, al hacer clic, el video se reproduce aquí mismo, sin salir del sitio.
export default function VideoYouTube({ src, titulo }) {
  return (
    <div className="yt__box">
      <iframe
        width="560"
        height="315"
        src={src}
        title={'Video: ' + titulo}
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerPolicy="strict-origin-when-cross-origin"
        allowFullScreen
      />
    </div>
  )
}
