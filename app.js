const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));
hbs.registerPartials(path.join(__dirname, 'views'));

app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function(req, res) {
  res.render('home', { layout: 'layouts/layout', titulo: 'Bienvenido a KanbanPro' });
});

app.get('/register', function(req, res) {
  res.render('register', { layout: 'layouts/layout', titulo: 'Crear Cuenta' });
});

app.get('/login', function(req, res) {
  res.render('login', { layout: 'layouts/layout', titulo: 'Iniciar Sesion' });
});

app.get('/dashboard', function(req, res) {
  var contenidoArchivo = fs.readFileSync(path.join(__dirname, 'data.json'), 'utf8');
  var datos = JSON.parse(contenidoArchivo);
  res.render('dashboard', {
    layout: 'layouts/layout',
    titulo: 'Dashboard - ' + datos.proyecto,
    proyecto: datos.proyecto,
    tableros: datos.tableros
  });
});

// Agregar nueva tarjeta
app.post('/nueva-tarjeta', function(req, res) {
  var tituloNuevo = req.body.titulo;
  var descripcionNueva = req.body.descripcion;
  var listaId = parseInt(req.body.listaId);
  var tableroId = parseInt(req.body.tableroId);
  var colorNuevo = req.body.color || '#4f6ef7';

  var datos = JSON.parse(fs.readFileSync(path.join(__dirname, 'data.json'), 'utf8'));

  var tableroEncontrado = datos.tableros.find(function(t) { return t.id === tableroId; });
  if (!tableroEncontrado) tableroEncontrado = datos.tableros[0];

  var listaEncontrada = tableroEncontrado.listas.find(function(l) { return l.id === listaId; });
  if (!listaEncontrada) listaEncontrada = tableroEncontrado.listas[0];

  listaEncontrada.tarjetas.push({
    id: Date.now(),
    titulo: tituloNuevo,
    descripcion: descripcionNueva || '',
    color: colorNuevo
  });

  fs.writeFileSync(path.join(__dirname, 'data.json'), JSON.stringify(datos, null, 2), 'utf8');
  res.redirect('/dashboard');
});

// Eliminar tarjeta
app.post('/eliminar-tarjeta', function(req, res) {
  var tarjetaId = parseInt(req.body.tarjetaId);
  var listaId = parseInt(req.body.listaId);

  var datos = JSON.parse(fs.readFileSync(path.join(__dirname, 'data.json'), 'utf8'));

  datos.tableros.forEach(function(tablero) {
    tablero.listas.forEach(function(lista) {
      if (lista.id === listaId) {
        lista.tarjetas = lista.tarjetas.filter(function(t) { return t.id !== tarjetaId; });
      }
    });
  });

  fs.writeFileSync(path.join(__dirname, 'data.json'), JSON.stringify(datos, null, 2), 'utf8');
  res.redirect('/dashboard');
});

// Renombrar tablero
app.post('/renombrar-tablero', function(req, res) {
  var tableroId = parseInt(req.body.tableroId);
  var nuevoNombre = req.body.nombre;

  var datos = JSON.parse(fs.readFileSync(path.join(__dirname, 'data.json'), 'utf8'));

  var tablero = datos.tableros.find(function(t) { return t.id === tableroId; });
  if (tablero) tablero.nombre = nuevoNombre;

  fs.writeFileSync(path.join(__dirname, 'data.json'), JSON.stringify(datos, null, 2), 'utf8');
  res.redirect('/dashboard');
});

// Renombrar lista
app.post('/renombrar-lista', function(req, res) {
  var listaId = parseInt(req.body.listaId);
  var nuevoNombre = req.body.nombre;

  var datos = JSON.parse(fs.readFileSync(path.join(__dirname, 'data.json'), 'utf8'));

  datos.tableros.forEach(function(tablero) {
    tablero.listas.forEach(function(lista) {
      if (lista.id === listaId) lista.nombre = nuevoNombre;
    });
  });

  fs.writeFileSync(path.join(__dirname, 'data.json'), JSON.stringify(datos, null, 2), 'utf8');
  res.redirect('/dashboard');
});

// Crear nuevo tablero
app.post('/nuevo-tablero', function(req, res) {
  var nombreTablero = req.body.nombre || 'Nuevo Tablero';

  var datos = JSON.parse(fs.readFileSync(path.join(__dirname, 'data.json'), 'utf8'));

  datos.tableros.push({
    id: Date.now(),
    nombre: nombreTablero,
    listas: [
      { id: Date.now() + 1, nombre: 'Por Hacer', tarjetas: [] },
      { id: Date.now() + 2, nombre: 'En Progreso', tarjetas: [] },
      { id: Date.now() + 3, nombre: 'Terminado', tarjetas: [] }
    ]
  });

  fs.writeFileSync(path.join(__dirname, 'data.json'), JSON.stringify(datos, null, 2), 'utf8');
  res.redirect('/dashboard');
});

// Eliminar tablero
app.post('/eliminar-tablero', function(req, res) {
  var tableroId = parseInt(req.body.tableroId);

  var datos = JSON.parse(fs.readFileSync(path.join(__dirname, 'data.json'), 'utf8'));
  datos.tableros = datos.tableros.filter(function(t) { return t.id !== tableroId; });

  fs.writeFileSync(path.join(__dirname, 'data.json'), JSON.stringify(datos, null, 2), 'utf8');
  res.redirect('/dashboard');
});

// Agregar nueva lista (columna)
app.post('/nueva-lista', function(req, res) {
  var tableroId = parseInt(req.body.tableroId);
  var nombreLista = req.body.nombre || 'Nueva Lista';

  var datos = JSON.parse(fs.readFileSync(path.join(__dirname, 'data.json'), 'utf8'));

  var tablero = datos.tableros.find(function(t) { return t.id === tableroId; });
  if (tablero) {
    tablero.listas.push({
      id: Date.now(),
      nombre: nombreLista,
      tarjetas: []
    });
  }

  fs.writeFileSync(path.join(__dirname, 'data.json'), JSON.stringify(datos, null, 2), 'utf8');
  res.redirect('/dashboard');
});

// Eliminar lista (columna)
app.post('/eliminar-lista', function(req, res) {
  var listaId = parseInt(req.body.listaId);
  var tableroId = parseInt(req.body.tableroId);

  var datos = JSON.parse(fs.readFileSync(path.join(__dirname, 'data.json'), 'utf8'));

  var tablero = datos.tableros.find(function(t) { return t.id === tableroId; });
  if (tablero) {
    tablero.listas = tablero.listas.filter(function(l) { return l.id !== listaId; });
  }

  fs.writeFileSync(path.join(__dirname, 'data.json'), JSON.stringify(datos, null, 2), 'utf8');
  res.redirect('/dashboard');
});

app.listen(PORT, function() {
  console.log('Servidor de KanbanPro corriendo en http://localhost:' + PORT);
  console.log('Presiona Ctrl+C para detenerlo');
});