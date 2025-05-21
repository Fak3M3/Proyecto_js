const fs = require('fs');

// Ruta del archivo de notas
const filePath = './notas.json';

/**
 * Agrega una nueva nota al archivo.
 * @param {string} titulo - El título de la nota.
 * @param {string} contenido - El contenido de la nota.
 */
function agregarNota(titulo, contenido) {
  let notas = [];
  if (fs.existsSync(filePath)) {
    // PISTA: Aquí debes leer las notas existentes antes de agregar la nueva.
    // COMPLETAR: Usa fs.readFileSync para leer el archivo.
    const nota = fs.readFileSync(filePath, 'utf8');
    notas = JSON.parse(nota);
  }
  const existe = notas.some(nota => nota.titulo === titulo);
  if (existe) {
    console.log(`Ya existe una nota con el título "${titulo}". Usa otro título para que se guarde.`);
    return;
  }
  const nuevaNota = { titulo, contenido };
  notas.push(nuevaNota);

  // PISTA: Ahora debes sobrescribir el archivo con las notas actualizadas.
  // COMPLETAR: Usa fs.writeFileSync para guardar las notas.
  fs.writeFileSync(filePath, JSON.stringify(notas, null, 2));
  console.log('Nota agregada con éxito.');
}

/**
 * Lista todas las notas guardadas.
 */
function listarNotas() {
  if (fs.existsSync(filePath)) {
    // PISTA: Debes leer y parsear el contenido del archivo.
    // COMPLETAR: Usa fs.readFileSync para leer y JSON.parse para convertir el contenido.
  } else {
    console.log('No hay notas guardadas.');
  }
}

/**
 * Elimina una nota por su título.
 * @param {string} titulo - El título de la nota a eliminar.
 */
function eliminarNota(titulo) {
  if (fs.existsSync(filePath)) {
    const data = fs.readFileSync(filePath, 'utf8');
    let notas = JSON.parse(data);

    // Filtrar las notas y eliminar la que coincida con el título
    const notasRestantes = notas.filter(nota => nota.titulo !== titulo);

    // Verificar si el archivo ya está vacío después de eliminar la nota
    if (notasRestantes.length === 0) {
      console.log('No hay notas para eliminar.');
      return; // No se realiza la escritura porque el archivo quedaría vacío
    }

    // Sobrescribir el archivo con las notas restantes
    fs.writeFileSync(filePath, JSON.stringify(notasRestantes, null, 2));
    console.log(`Nota con título "${titulo}" eliminada.`);
  } else {
    console.log('No hay notas para eliminar.');
  }
}

// Ejecución de ejemplo
agregarNota('Compras', 'Comprar leche y pan.');
agregarNota('Tareas', 'Sacar a pasear al perro.');
agregarNota('Recordatorio', 'Estudiar para el examen del lunes.');
listarNotas();
eliminarNota('Compras');
eliminarNota(`Recordatorio`);
agregarNota('Compras', 'Comprar leche y pan.');
agregarNota('Recordatorio', 'Estudiar para el examen del lunes.');



// ### Pistas para Resolver el Proyecto ###
// Formato del archivo `notas.json`:
[
  { "titulo": "Compras", "contenido": "Comprar leche y pan." },
  { "titulo": "Trabajo", "contenido": "Terminar reporte semanal." }
]

// #### Operaciones clave: ###
// 1. Para leer las notas existentes:
const data = fs.readFileSync(filePath, 'utf8');
const notas = JSON.parse(data);

// 2. Para guardar las notas actualizadas:
fs.writeFileSync(filePath, JSON.stringify(notas, null, 2));

// 3. Filtrar notas para eliminar:
const notasRestantes = notas.filter((nota) => nota.titulo !== titulo);