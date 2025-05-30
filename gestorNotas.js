const fs = require('fs');
const path = require('path');

// Ruta del archivo de notas
const filePath = './notas.json';
const logPath = path.join(__dirname, 'logs.txt');

/**
 * @param {string} accion - Tipo de acción (inicio, agregar, eliminar).
 * @param {string} titulo - Título de la nota (si aplica).
 * @param {string} autor - Quién realizó la acción.
 */
function logEvento(accion, titulo = '', autor = 'sistema') {
  const ahora = new Date();
  const fecha = ahora.toLocaleDateString('es-MX');
  const hora = ahora.toLocaleTimeString('es-MX', { hour12: false });

  let mensaje = '';

  switch (accion) {
    case 'inicio':
      mensaje = `Se inició el sistema. Autor: ${autor}`;
      break;
    case 'agregar':
      mensaje = `Se agregó la nota "${titulo}". Autor: ${autor}`;
      break;
    case 'eliminar':
      mensaje = `Se eliminó la nota "${titulo}". Autor: ${autor}`;
      break;
    default:
      mensaje = `Acción desconocida "${accion}" realizada. Autor: ${autor}`;
      break;
  }

  const linea = `[${fecha} ${hora}] ${mensaje}\n`;
  fs.appendFileSync(logPath, linea, 'utf8');
}
/**
 * Agrega una nueva nota al archivo.
 * @param {string} titulo - El título de la nota.
 * @param {string} contenido - El contenido de la nota.
 */
logEvento('inicio');
function agregarNota(titulo, contenido) {
  let notas = [];
  if (fs.existsSync(filePath)) {
    // PISTA: Aquí debes leer las notas existentes antes de agregar la nueva.
    // COMPLETAR: Usa fs.readFileSync para leer el archivo.
    const nota = fs.readFileSync(filePath, 'utf-8');
    notas = JSON.parse(nota);
  }
  const existe = notas.some(nota => nota.titulo === titulo);
  if (existe) {
    console.log(`\nYa existe una nota con el título "${titulo}". Usa otro título para que se guarde.\n`);
    return;
  }
  const nuevaNota = { titulo, contenido };
  notas.push(nuevaNota);

  // PISTA: Ahora debes sobrescribir el archivo con las notas actualizadas.
  // COMPLETAR: Usa fs.writeFileSync para guardar las notas.
  fs.writeFileSync(filePath, JSON.stringify(notas, null, 2));
  logEvento('agregar', titulo, 'usuario');
  console.log('\nNota agregada con éxito.\n');
}

/**
 * Lista todas las notas guardadas.
 */
function listarNotas() {
  if (fs.existsSync(filePath)) {
    const lista = fs.readFileSync(filePath,'utf-8');
    console.log('\nLista de notas:');
    console.log(JSON.parse(lista)); 
    // PISTA: Debes leer y parsear el contenido del archivo.
    // COMPLETAR: Usa fs.readFileSync para leer y JSON.parse para convertir el contenido.
  } else {
    console.log('\nNo hay notas guardadas.\n');
  }
}

/**
 * Elimina una nota por su título.
 * @param {string} titulo - El título de la nota a eliminar.
 */
function eliminarNota(titulo) {
  if (!titulo) {
    console.log("\nDebes proporcionar un título para eliminar la nota.\n");
    return;
  }
  if (fs.existsSync(filePath)) {
    const datos = fs.readFileSync(filePath, 'utf8');
    let notas = JSON.parse(datos);

    const notasRestantes = notas.filter(nota => nota.titulo !== titulo);

    if (notasRestantes.length === notas.length) {
      // No se encontró ninguna nota con ese título
      console.log(`\nNo se encontró ninguna nota con el título "${titulo}".\n`);
      return;
    }

    // Sobrescribir el archivo, aunque quede vacío
    fs.writeFileSync(filePath, JSON.stringify(notasRestantes, null, 2));

    console.log(`\nNota con el título "${titulo}" eliminada.\n`);
  } else {
    console.log('\nNo hay notas para eliminar.\n');
  }
  logEvento('eliminar', titulo, 'usuario');

}

// Ejecución de ejemplo
agregarNota('Compras', 'Comprar leche y pan.');
agregarNota('Tareas', 'Sacar a pasear al perro.');
agregarNota('Recordatorio', 'Estudiar para el examen del lunes.');
listarNotas();
eliminarNota('Compras');
eliminarNota(`Recordatorio`);
listarNotas();
agregarNota('Ejercicio', '3 sets de entrenamiento con kary');
listarNotas();


