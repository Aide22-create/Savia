/* Savia – Sprint 1
 * PB-01 Videos educativos · PB-02 Artículos y lecturas · PB-03 Ejercicios interactivos
 * JavaScript simple (sin librerías). La navegación usa el hash de la URL: #inicio, #videos,
 * #articulos, #articulos/<id>, #ejercicios, #ejercicios/<id>.
 */
(function () {
  'use strict';

  var D = window.SAVIA;
  var main = document.getElementById('contenido');

  // Estado de la interfaz
  var filtroTema = { videos: 'Todos', articulos: 'Todos', ejercicios: 'Todos' };
  var ejercicio = { id: null, indice: 0, elegida: null, aciertos: 0 };
  var quizEstado = {};   // avance del quiz de cada video: { i, elegida, aciertos }

  /* ---------- utilidades ---------- */

  // Crea un elemento: h('p', {class: 'x'}, 'texto', otroNodo)
  function h(tag, attrs) {
    var el = document.createElement(tag);
    Object.keys(attrs || {}).forEach(function (k) {
      var v = attrs[k];
      if (v === false || v === null || v === undefined) return;
      if (k === 'class') el.className = v;
      else if (k.indexOf('on') === 0) el.addEventListener(k.slice(2), v);
      else el.setAttribute(k, v === true ? '' : v);
    });
    for (var i = 2; i < arguments.length; i++) {
      var c = arguments[i];
      if (c === null || c === undefined || c === false) continue;
      el.appendChild(typeof c === 'string' ? document.createTextNode(c) : c);
    }
    return el;
  }

  function plural(n, uno, varios) { return n + ' ' + (n === 1 ? uno : varios); }
  function porTema(lista, tema) { return tema === 'Todos' ? lista : lista.filter(function (i) { return i.tema === tema; }); }
  function buscar(lista, id) { return lista.filter(function (i) { return i.id === id; })[0]; }

  /* ---------- componentes ---------- */

  // Botones para filtrar por tema (compartido por videos, artículos y ejercicios)
  function filtro(vista) {
    var grupo = h('div', { class: 'filter', role: 'group', 'aria-label': 'Filtrar por tema' });
    ['Todos'].concat(D.TEMAS).forEach(function (t) {
      var activo = filtroTema[vista] === t;
      grupo.appendChild(h('button', {
        type: 'button',
        class: 'chip' + (activo ? ' is-active' : ''),
        'aria-pressed': activo ? 'true' : 'false',
        onclick: function () { filtroTema[vista] = t; render(vista, true); }
      }, t));
    });
    return grupo;
  }

  function etiqueta(texto) { return h('span', { class: 'tag', 'data-tema': texto }, texto); }

  /* ---------- vistas ---------- */

  function vistaInicio() {
    var recursos = [
      { vista: 'videos', titulo: 'Videos educativos', texto: 'Comprende los temas de manera visual y sencilla.', total: D.VIDEOS.length, icono: '▶' },
      { vista: 'articulos', titulo: 'Artículos y lecturas', texto: 'Amplía tus conocimientos con lecturas breves.', total: D.ARTICULOS.length, icono: '📖' },
      { vista: 'ejercicios', titulo: 'Ejercicios interactivos', texto: 'Practica y recibe retroalimentación al instante.', total: D.EJERCICIOS.length, icono: '✎' }
    ];
    var tarjetas = h('ul', { class: 'cards' });
    recursos.forEach(function (r) {
      tarjetas.appendChild(h('li', { class: 'card' },
        h('span', { class: 'card__icon', 'aria-hidden': 'true' }, r.icono),
        h('h3', null, r.titulo),
        h('p', null, r.texto),
        h('p', { class: 'card__count' }, r.total + ' disponibles'),
        h('a', { class: 'btn', href: '#' + r.vista }, 'Ver ' + r.titulo.toLowerCase())
      ));
    });
    var temasHero = h('p', { class: 'hero__temas' }, 'Temas disponibles:');
    D.TEMAS.forEach(function (t) { temasHero.appendChild(h('span', { class: 'tag', 'data-tema': t }, t)); });
    // Imagen de portada: guarda aprendizaje.jpg en la carpeta img/. Si no está, el inicio se ve sin imagen.
    var hero = h('div', { class: 'hero hero--img' },
      h('div', null,
        h('h1', { tabindex: '-1' }, 'Aprende a tu ritmo con Savia'),
        h('p', null, 'Savia reúne recursos educativos digitales para estudiantes de diferentes edades, organizados por tema para que encuentres lo que necesitas de manera sencilla.'),
        temasHero
      ),
      h('img', {
        class: 'hero__img', src: 'img/aprendizaje.jpg', alt: 'Imagen sobre el aprendizaje',
        onerror: function (ev) {
          // Si no está en img/, se busca junto a index.html; si tampoco está, el inicio se ve sin imagen.
          if (!ev.target.dataset.intento) { ev.target.dataset.intento = '1'; ev.target.src = 'aprendizaje.jpg'; return; }
          hero.className = 'hero'; ev.target.remove();
        }
      })
    );
    var datos = h('ul', { class: 'stats' });
    [['▶', D.VIDEOS.length, 'videos con quiz'], ['📖', D.ARTICULOS.length, 'artículos para leer'], ['✎', D.EJERCICIOS.length, 'ejercicios con retroalimentación'], ['★', D.TEMAS.length, 'temas para aprender']].forEach(function (d) {
      datos.appendChild(h('li', { class: 'stats__item' }, h('span', { class: 'stats__icon', 'aria-hidden': 'true' }, d[0]), h('strong', null, String(d[1])), h('span', null, d[2])));
    });
    return h('section', { class: 'container' },
      hero,
      datos,
      h('h2', { class: 'sr-only' }, 'Recursos disponibles'),
      tarjetas
    );
  }

  // Video de YouTube incrustado con <iframe>. YouTube muestra la miniatura con su botón de play
  // y, al hacer clic, el video se reproduce aquí mismo, sin salir del sitio.
  function reproductorYouTube(v) {
    var caja = h('div', { class: 'yt__box' });
    // El <iframe> de cada video está escrito en index.html (etiqueta <template id="video-...">).
    var plantilla = document.getElementById('video-' + v.id);
    if (plantilla) {
      caja.appendChild(plantilla.content.cloneNode(true));
      var f = caja.querySelector('iframe');
      if (f) f.setAttribute('title', 'Video: ' + v.titulo);
    } else {
      caja.appendChild(h('iframe', { width: '560', height: '315', src: v.embed, title: 'Video: ' + v.titulo, frameborder: '0',
        allow: 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share',
        referrerpolicy: 'strict-origin-when-cross-origin', allowfullscreen: true }));
    }
    return caja;
  }

  // Quiz que aparece después de cada video. Muestra el resultado y la calificación al final.
  function quizDeVideo(v) {
    var set = buscar(D.EJERCICIOS, v.ejercicio);
    var st = quizEstado[v.id] || (quizEstado[v.id] = { i: 0, elegida: null, aciertos: 0 });
    var cont = h('div', { class: 'quiz', id: 'quiz-' + v.id });

    function pintar(enfocar) {
      var total = set.preguntas.length;
      var nodos = [h('h3', null, 'Quiz del video: ' + v.titulo),
        h('div', { class: 'progreso', 'aria-hidden': 'true' }, h('span', { style: 'width:' + Math.round(Math.min(st.i, total) / total * 100) + '%' }))];

      if (st.i >= total) {
        var msg = st.aciertos === total ? '¡Excelente! Respondiste todo bien.'
                : st.aciertos >= Math.ceil(total / 2) ? 'Vas muy bien. Repasa el video para reforzar lo que falló.'
                : 'Vuelve a ver el video y vuelve a intentarlo.';
        var nota = Math.round(st.aciertos / total * 100) / 10;
        nodos.push(h('div', { class: 'calificacion ' + (nota >= 8 ? 'calificacion--alta' : nota >= 6 ? 'calificacion--media' : 'calificacion--baja'), role: 'status' },
          h('span', { class: 'calificacion__titulo' }, 'Calificación de esta sección'),
          h('span', { class: 'calificacion__nota' }, String(nota) + ' / 10'),
          h('span', { class: 'quiz__resultado' }, 'Resultado: ' + st.aciertos + ' de ' + total + ' respuestas correctas.')));
        nodos.push(h('p', null, msg));
        nodos.push(h('button', { type: 'button', class: 'btn', id: 'btn-repetir-' + v.id,
          onclick: function () { st.i = 0; st.elegida = null; st.aciertos = 0; pintar(true); } }, 'Repetir quiz'));
      } else {
        var p = set.preguntas[st.i];
        var respondida = st.elegida !== null;
        var acerto = respondida && st.elegida === p.correcta;
        nodos.push(h('p', { class: 'meta', 'aria-live': 'polite' }, 'Pregunta ' + (st.i + 1) + ' de ' + total));
        var opciones = h('div', { class: 'options' });
        p.opciones.forEach(function (texto, i) {
          var estado = '';
          if (respondida && i === p.correcta) estado = ' is-correct';
          else if (respondida && i === st.elegida) estado = ' is-wrong';
          opciones.appendChild(h('button', {
            type: 'button', class: 'option' + estado, disabled: respondida,
            onclick: function () { st.elegida = i; if (i === p.correcta) st.aciertos++; pintar(true); }
          }, h('span', { class: 'option__letter', 'aria-hidden': 'true' }, String.fromCharCode(65 + i)), texto));
        });
        nodos.push(h('fieldset', { class: 'question' }, h('legend', null, p.enunciado), opciones));
        var area = h('div', { class: 'feedback-area', 'aria-live': 'polite' });
        if (respondida) {
          area.appendChild(h('div', { class: 'feedback ' + (acerto ? 'feedback--ok' : 'feedback--bad') },
            h('strong', null, acerto ? '¡Correcto!' : 'Incorrecto.'),
            ' ' + (acerto ? '' : 'La respuesta correcta es «' + p.opciones[p.correcta] + '». ') + p.explicacion));
        }
        nodos.push(area);
        if (respondida) {
          nodos.push(h('button', { type: 'button', class: 'btn', id: 'btn-sig-' + v.id,
            onclick: function () { st.i++; st.elegida = null; pintar(true); } },
            st.i + 1 === total ? 'Ver resultado' : 'Siguiente pregunta'));
        }
      }
      cont.replaceChildren.apply(cont, nodos);
      if (enfocar) {
        var f = cont.querySelector('#btn-sig-' + v.id + ', #btn-repetir-' + v.id) || cont.querySelector('.option');
        if (f) f.focus();
      }
    }
    pintar(false);
    return cont;
  }

  // PB-01 · Videos educativos (YouTube) con quiz
  function vistaVideos() {
    var videos = porTema(D.VIDEOS, filtroTema.videos);
    var grid = h('ul', { class: 'grid grid--videos' });
    videos.forEach(function (v, n) {
      grid.appendChild(h('li', { class: 'media-card' },
        reproductorYouTube(v),
        h('div', { class: 'media-card__body' },
          h('span', { class: 'media-card__num' }, 'Video ' + (n + 1)),
          etiqueta(v.tema),
          h('h2', null, v.titulo),
          h('p', null, v.descripcion),
          h('p', { class: 'media-card__link' }, '¿No carga el video? ',
            h('a', { href: 'https://www.youtube.com/watch?v=' + v.youtube, target: '_blank', rel: 'noopener noreferrer' }, 'Ábrelo en YouTube'))
        ),
        quizDeVideo(v)
      ));
    });
    return h('section', { class: 'container', 'aria-labelledby': 't-videos' },
      h('h1', { id: 't-videos', tabindex: '-1' }, 'Videos educativos'),
      h('p', { class: 'lead' }, 'Mira los videos y, al terminar cada uno, responde el quiz para comprobar lo que aprendiste.'),
      filtro('videos'),
      h('p', { class: 'count', role: 'status' }, plural(videos.length, 'video', 'videos')),
      grid
    );
  }

  // PB-02 · Artículos y lecturas
  function vistaArticulos() {
    var lista = porTema(D.ARTICULOS, filtroTema.articulos);
    var ul = h('ul', { class: 'list' });
    lista.forEach(function (a) {
      ul.appendChild(h('li', { class: 'list__item' },
        etiqueta(a.tema),
        h('h2', null, a.titulo),
        h('p', null, a.resumen),
        h('p', { class: 'meta' }, 'Lectura de ' + a.minutos + ' minutos'),
        h('a', { class: 'btn', href: '#articulos/' + a.id, 'aria-label': 'Leer artículo: ' + a.titulo }, 'Leer artículo')
      ));
    });
    return h('section', { class: 'container', 'aria-labelledby': 't-articulos' },
      h('h1', { id: 't-articulos', tabindex: '-1' }, 'Artículos y lecturas'),
      h('p', { class: 'lead' }, 'Amplía tus conocimientos con lecturas educativas sobre los temas que estudias.'),
      filtro('articulos'),
      h('p', { class: 'count', role: 'status' }, plural(lista.length, 'artículo', 'artículos')),
      ul
    );
  }

  function vistaArticulo(a) {
    var art = h('article', { class: 'container article', 'aria-labelledby': 't-articulo' },
      h('a', { class: 'btn btn--ghost', href: '#articulos' }, '← Volver a artículos'),
      etiqueta(a.tema),
      h('h1', { id: 't-articulo', tabindex: '-1' }, a.titulo),
      h('p', { class: 'meta' }, 'Lectura de ' + a.minutos + ' minutos')
    );
    a.parrafos.forEach(function (p) { art.appendChild(h('p', null, p)); });
    if (a.fuente) {
      art.appendChild(h('div', { class: 'fuente' },
        h('p', null, 'Este es un resumen de Savia. Para leer el artículo completo, visita la fuente: ' + a.fuente.nombre + ' (' + a.fuente.idioma + ').'),
        h('a', { class: 'btn', href: a.fuente.url, target: '_blank', rel: 'noopener noreferrer' }, 'Leer el artículo completo')
      ));
    }
    return art;
  }

  // PB-03 · Ejercicios interactivos con retroalimentación
  function vistaEjercicios() {
    var lista = porTema(D.EJERCICIOS, filtroTema.ejercicios);
    var ul = h('ul', { class: 'list' });
    lista.forEach(function (e) {
      ul.appendChild(h('li', { class: 'list__item' },
        etiqueta(e.tema),
        h('h2', null, e.titulo),
        h('p', null, e.preguntas.length + ' preguntas con retroalimentación'),
        h('a', { class: 'btn', href: '#ejercicios/' + e.id, 'aria-label': 'Comenzar ejercicio: ' + e.titulo }, 'Comenzar')
      ));
    });
    return h('section', { class: 'container', 'aria-labelledby': 't-ejercicios' },
      h('h1', { id: 't-ejercicios', tabindex: '-1' }, 'Ejercicios interactivos'),
      h('p', { class: 'lead' }, 'Practica lo aprendido y recibe retroalimentación inmediata en cada respuesta.'),
      filtro('ejercicios'),
      h('p', { class: 'count', role: 'status' }, plural(lista.length, 'ejercicio', 'ejercicios')),
      ul
    );
  }

  function vistaEjercicio(e) {
    return h('section', { class: 'container', 'aria-labelledby': 't-ejercicio' },
      h('a', { class: 'btn btn--ghost', href: '#ejercicios' }, '← Volver a ejercicios'),
      etiqueta(e.tema),
      h('h1', { id: 't-ejercicio', tabindex: '-1' }, e.titulo),
      panelEjercicio(e)
    );
  }

  // Una pregunta a la vez; al elegir una opción se muestra si es correcta y por qué.
  function panelEjercicio(e) {
    var total = e.preguntas.length;
    var panel = h('div', { class: 'panel', id: 'panel-ejercicio' });

    if (ejercicio.indice >= total) {
      panel.setAttribute('role', 'status');
      panel.appendChild(h('h2', null, '¡Ejercicio completado!'));
      var nota = Math.round(ejercicio.aciertos / total * 100) / 10;
      panel.appendChild(h('div', { class: 'calificacion ' + (nota >= 8 ? 'calificacion--alta' : nota >= 6 ? 'calificacion--media' : 'calificacion--baja') },
        h('span', { class: 'calificacion__titulo' }, 'Tu calificación'),
        h('span', { class: 'calificacion__nota' }, String(nota) + ' / 10'),
        h('span', { class: 'quiz__resultado' }, 'Resultado: ' + ejercicio.aciertos + ' de ' + total + ' respuestas correctas.')));
      panel.appendChild(h('p', null, 'Puedes repetirlo las veces que quieras para seguir practicando.'));
      panel.appendChild(h('button', {
        type: 'button', class: 'btn',
        onclick: function () { ejercicio.indice = 0; ejercicio.elegida = null; ejercicio.aciertos = 0; refrescarEjercicio(e); }
      }, 'Repetir ejercicio'));
      return panel;
    }

    var p = e.preguntas[ejercicio.indice];
    var respondida = ejercicio.elegida !== null;
    var acerto = respondida && ejercicio.elegida === p.correcta;

    panel.appendChild(h('p', { class: 'meta', 'aria-live': 'polite' }, 'Pregunta ' + (ejercicio.indice + 1) + ' de ' + total));

    var opciones = h('div', { class: 'options' });
    p.opciones.forEach(function (texto, i) {
      var estado = '';
      if (respondida && i === p.correcta) estado = ' is-correct';
      else if (respondida && i === ejercicio.elegida) estado = ' is-wrong';
      opciones.appendChild(h('button', {
        type: 'button',
        class: 'option' + estado,
        disabled: respondida,
        onclick: function () { ejercicio.elegida = i; if (i === p.correcta) ejercicio.aciertos++; refrescarEjercicio(e, true); }
      }, h('span', { class: 'option__letter', 'aria-hidden': 'true' }, String.fromCharCode(65 + i)), texto));
    });
    panel.appendChild(h('fieldset', { class: 'question' }, h('legend', null, p.enunciado), opciones));

    var area = h('div', { class: 'feedback-area', 'aria-live': 'polite' });
    if (respondida) {
      var msg = h('div', { class: 'feedback ' + (acerto ? 'feedback--ok' : 'feedback--bad') },
        h('strong', null, acerto ? '¡Correcto!' : 'Incorrecto.'),
        ' ' + (acerto ? '' : 'La respuesta correcta es «' + p.opciones[p.correcta] + '». ') + p.explicacion
      );
      area.appendChild(msg);
    }
    panel.appendChild(area);

    if (respondida) {
      panel.appendChild(h('button', {
        type: 'button', class: 'btn', id: 'btn-siguiente',
        onclick: function () { ejercicio.indice++; ejercicio.elegida = null; refrescarEjercicio(e); }
      }, ejercicio.indice + 1 === total ? 'Terminar' : 'Siguiente pregunta'));
    }
    return panel;
  }

  // Sustituye solo el panel del ejercicio (no recarga la página).
  function refrescarEjercicio(e, enfocarSiguiente) {
    var viejo = document.getElementById('panel-ejercicio');
    var nuevo = panelEjercicio(e);
    viejo.parentNode.replaceChild(nuevo, viejo);
    var sig = document.getElementById('btn-siguiente');
    if (enfocarSiguiente && sig) sig.focus();
    else if (!sig) { var foco = nuevo.querySelector('.option, .btn'); if (foco) foco.focus(); }
  }

  /* ---------- enrutador ---------- */

  function render(vista, conservarFoco) {
    var contenido;
    var partes = (location.hash || '#inicio').slice(1).split('/');
    var actual = partes[0] || 'inicio';
    var id = partes[1];
    if (vista) { actual = vista; id = undefined; }

    if (actual === 'videos') contenido = vistaVideos();
    else if (actual === 'articulos') {
      var a = id && buscar(D.ARTICULOS, id);
      contenido = a ? vistaArticulo(a) : vistaArticulos();
    } else if (actual === 'ejercicios') {
      var e = id && buscar(D.EJERCICIOS, id);
      if (e && ejercicio.id !== e.id) { ejercicio = { id: e.id, indice: 0, elegida: null, aciertos: 0 }; }
      contenido = e ? vistaEjercicio(e) : vistaEjercicios();
    } else { actual = 'inicio'; contenido = vistaInicio(); }

    main.replaceChildren(contenido);
    document.title = (contenido.querySelector('h1') ? contenido.querySelector('h1').textContent + ' – ' : '') + 'Savia';

    Array.prototype.forEach.call(document.querySelectorAll('.nav__link'), function (a2) {
      var on = a2.getAttribute('data-vista') === actual;
      a2.classList.toggle('is-active', on);
      if (on) a2.setAttribute('aria-current', 'page'); else a2.removeAttribute('aria-current');
    });

    if (conservarFoco) {
      var activo = main.querySelector('.chip.is-active');
      if (activo) activo.focus();
    } else if (!render.primera) {
      var titulo = main.querySelector('h1');
      if (titulo) titulo.focus();
      window.scrollTo(0, 0);
    }
    render.primera = false;
  }
  render.primera = true;

  window.addEventListener('hashchange', function () { render(); });
  render();
})();