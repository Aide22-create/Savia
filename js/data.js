// Contenido educativo de Savia (Sprint 1).
// PB-01: videos · PB-02: artículos y lecturas · PB-03: ejercicios interactivos.

const TEMAS = ['Matemáticas', 'Ciencias naturales', 'Lenguaje']

// Los videos son de YouTube: "youtube" es el identificador que aparece en el enlace
// (youtube.com/watch?v=IDENTIFICADOR). "ejercicio" indica de qué conjunto de preguntas sale el quiz.
const VIDEOS = [
  {
    id: 'fracciones',
    tema: 'Matemáticas',
    titulo: '¿Qué es una fracción?',
    descripcion: 'Video para entender qué es una fracción y qué representan sus partes.',
    // Link original: https://youtu.be/37DTLwh8sUc?si=dSZXZeX6G8s7VlFu
    youtube: '37DTLwh8sUc',
    // Link para el iframe (formato embed):
    embed: 'https://www.youtube.com/embed/37DTLwh8sUc?rel=0',
    ejercicio: 'ej-fracciones',
  },
  {
    id: 'ciclo-del-agua',
    tema: 'Ciencias naturales',
    titulo: 'El ciclo del agua',
    descripcion: 'Video sobre el recorrido del agua en la naturaleza.',
    // Link original: https://youtu.be/zcBnm681O5Q?si=zYBexGuEYhRowvPq
    youtube: 'zcBnm681O5Q',
    // Link para el iframe (formato embed):
    embed: 'https://www.youtube.com/embed/zcBnm681O5Q?rel=0',
    ejercicio: 'ej-agua',
  },
  {
    id: 'sustantivo',
    tema: 'Lenguaje',
    titulo: 'Los sustantivos',
    descripcion: 'Video para reconocer qué son los sustantivos.',
    // Link original: https://youtu.be/p0eyWoajuP8?si=i40NYk-aJytjJKtk
    youtube: 'p0eyWoajuP8',
    // Link para el iframe (formato embed):
    embed: 'https://www.youtube.com/embed/p0eyWoajuP8?rel=0',
    ejercicio: 'ej-sustantivos',
  },
]

// Cada artículo muestra un resumen propio de Savia y enlaza a la lectura completa en su fuente.
const ARTICULOS = [
  {
    id: 'fracciones-vida-diaria',
    tema: 'Matemáticas',
    titulo: 'Las fracciones en la vida diaria',
    resumen: 'Dónde aparecen las fracciones al cocinar, medir el tiempo y comprar.',
    minutos: 2,
    parrafos: [
      'Una fracción representa una o varias partes de un todo que se dividió en partes iguales. No se usa solo en la escuela: aparece en muchas situaciones de todos los días.',
      'En la cocina, las tazas de medir marcan ¼, ⅓ y ½. Si una receta se duplica, las cantidades de cada ingrediente también se duplican y se siguen expresando con fracciones.',
      'En el reloj, “y cuarto” es ¼ de hora y “y media” es ½ hora. En las compras, un descuento del 25 % equivale a ¼ del precio: en un suéter de 35 dólares, el ahorro sería de 8.75 dólares.',
      'Las fracciones también sirven para medir con precisión al cortar madera y para expresar probabilidades. Entender las partes de un todo ayuda a planear, medir y calcular mejor.',
    ],
    fuente: { nombre: 'Study.com', idioma: 'inglés', titulo: 'Fractions in Real Life | Purpose, Importance & Examples',
              url: 'https://study.com/academy/lesson/using-fractions-in-everyday-life-examples-importance.html' },
  },
  {
    id: 'ciclo-agua',
    tema: 'Ciencias naturales',
    titulo: 'El ciclo del agua: fases y etapas',
    resumen: 'Cómo el agua cambia de estado y recorre el planeta una y otra vez.',
    minutos: 2,
    parrafos: [
      'El ciclo del agua es el recorrido continuo que hace el agua entre los mares, la atmósfera y la superficie terrestre. Funciona gracias a la energía del Sol.',
      'Primero ocurre la evaporación: el calor convierte el agua líquida de mares, ríos y lagos en vapor, que sube a la atmósfera. Después viene la condensación: al enfriarse, el vapor forma gotas diminutas que dan origen a las nubes.',
      'Cuando las gotas se juntan y pesan demasiado, caen en forma de lluvia, granizo o nieve; esto se llama precipitación. Parte del agua corre por la superficie y parte se filtra en el suelo hasta llegar de nuevo a ríos, lagos y mares.',
      'Gracias a este ciclo el agua se renueva y se distribuye por todo el planeta. Por eso es importante cuidarla: solo una pequeña parte del agua del planeta es agua dulce disponible para las personas.',
    ],
    fuente: { nombre: 'TodoAgua', idioma: 'español', titulo: 'Qué es el ciclo del agua: fases y etapas',
              url: 'https://www.todoagua.es/que-es-ciclo-agua-fases-etapas/' },
  },
  {
    id: 'sustantivos',
    tema: 'Lenguaje',
    titulo: 'Los sustantivos y sus clases principales',
    resumen: 'Qué es un sustantivo y cómo se clasifican según lo que nombran.',
    minutos: 2,
    parrafos: [
      'El sustantivo es la palabra que sirve para nombrar personas, animales, cosas, lugares, sentimientos e ideas. Por ejemplo: niña, perro, mesa, ciudad, alegría.',
      'Los sustantivos se pueden clasificar de varias maneras. Los comunes nombran de forma general a los seres de una misma clase (río, maestro, país); los propios nombran de manera particular y se escriben con mayúscula inicial (Lupita, México, Guadalajara).',
      'También se distinguen los concretos, que nombran lo que se puede percibir con los sentidos (libro, lluvia), de los abstractos, que nombran ideas o sentimientos (justicia, alegría).',
      'Otra clasificación separa los individuales, que nombran un solo ser (árbol), de los colectivos, que nombran un conjunto (bosque, rebaño), y los contables (libro, libros) de los no contables (agua, arena).',
    ],
    fuente: { nombre: 'Real Academia Española (RAE)', idioma: 'español', titulo: 'Introducción. Principales clases de sustantivos',
              url: 'https://www.rae.es/gram%C3%A1tica/sintaxis/introducci%C3%B3n-principales-clases-de-sustantivos' },
  },
]

// Cada pregunta: opciones, índice de la correcta y explicación que se muestra como retroalimentación.
const EJERCICIOS = [
  {
    id: 'ej-fracciones',
    tema: 'Matemáticas',
    titulo: 'Practica con fracciones',
    preguntas: [
      {
        enunciado: 'En la fracción 3/8, ¿qué indica el número 8?',
        opciones: ['Las partes que tomamos', 'Las partes iguales en que se dividió el todo', 'El resultado de la división', 'El número de enteros'],
        correcta: 1,
        explicacion: 'El denominador (abajo) indica en cuántas partes iguales se dividió el todo.',
      },
      {
        enunciado: 'Una pizza se divide en 8 rebanadas iguales y comes 3. ¿Qué fracción de la pizza comiste?',
        opciones: ['8/3', '3/8', '5/8', '1/3'],
        correcta: 1,
        explicacion: 'Tomaste 3 partes de un total de 8, así que la fracción es 3/8.',
      },
      {
        enunciado: '¿Cuál de estas fracciones es equivalente a 1/2?',
        opciones: ['2/3', '1/3', '2/4', '3/5'],
        correcta: 2,
        explicacion: 'Al multiplicar numerador y denominador de 1/2 por 2 se obtiene 2/4, que vale lo mismo.',
      },
    ],
  },
  {
    id: 'ej-agua',
    tema: 'Ciencias naturales',
    titulo: 'Practica con el ciclo del agua',
    preguntas: [
      {
        enunciado: '¿Cómo se llama el proceso en el que el agua líquida se convierte en vapor por el calor del Sol?',
        opciones: ['Condensación', 'Precipitación', 'Evaporación', 'Filtración'],
        correcta: 2,
        explicacion: 'La evaporación convierte el agua líquida en vapor gracias al calor.',
      },
      {
        enunciado: '¿Qué ocurre durante la condensación?',
        opciones: ['El vapor se enfría y forma gotas y nubes', 'El agua cae como lluvia', 'El agua se congela', 'El agua se filtra en el suelo'],
        correcta: 0,
        explicacion: 'Al enfriarse, el vapor se transforma en pequeñas gotas que forman las nubes.',
      },
      {
        enunciado: '¿Cuál de estas es una forma de precipitación?',
        opciones: ['Evaporación', 'Nieve', 'Transpiración', 'Condensación'],
        correcta: 1,
        explicacion: 'La lluvia, el granizo y la nieve son formas de precipitación.',
      },
    ],
  },
  {
    id: 'ej-sustantivos',
    tema: 'Lenguaje',
    titulo: 'Practica con sustantivos',
    preguntas: [
      {
        enunciado: '¿Cuál de estas palabras es un sustantivo propio?',
        opciones: ['ciudad', 'Guadalajara', 'río', 'maestra'],
        correcta: 1,
        explicacion: 'Guadalajara nombra un lugar en particular y se escribe con mayúscula inicial.',
      },
      {
        enunciado: '¿Cuál es el plural de “ciudad”?',
        opciones: ['ciudads', 'ciudades', 'ciudadas', 'ciudad'],
        correcta: 1,
        explicacion: 'Las palabras que terminan en consonante forman el plural con -es: ciudades.',
      },
      {
        enunciado: '¿Qué palabra de la oración “El perro duerme en la casa” es un sustantivo?',
        opciones: ['duerme', 'en', 'perro', 'el'],
        correcta: 2,
        explicacion: 'Perro nombra a un animal. “Duerme” es un verbo, “en” una preposición y “el” un artículo.',
      },
    ],
  },
]


// Se expone como variable global para que js/app.js pueda leerla sin módulos (funciona al abrir index.html directamente).
window.SAVIA = { TEMAS, VIDEOS, ARTICULOS, EJERCICIOS }
