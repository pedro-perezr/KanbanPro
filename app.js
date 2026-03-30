require('dotenv').config();
const express = require('express');
const hbs = require('hbs');
const path = require('path');
const sequelize = require('./config/database');
const { Usuario, Tablero, Lista, Tarjeta } = require('./models');

const authMiddleware = require('./middleware/authMiddleware');
const authRoutes = require('./routes/auth');
const tableroRoutes = require('./routes/tableros');
const listaRoutes = require('./routes/listas');
const tarjetaRoutes = require('./routes/tarjetas');

const app = express();
const PORT = process.env.PORT || 3000;

// Motor de vistas
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));
hbs.registerPartials(path.join(__dirname, 'views'));

// Middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Rutas de la API
app.use('/api/auth', authRoutes);
app.use('/api/tableros', authMiddleware, tableroRoutes);
app.use('/api/tableros/:tableroId/listas', authMiddleware, listaRoutes);
app.use('/api/listas/:listaId/tarjetas', authMiddleware, tarjetaRoutes);

// Rutas de las vistas
app.get('/', function(req, res) {
  res.render('home', { layout: 'layouts/layout', titulo: 'Bienvenido a KanbanPro' });
});

app.get('/register', function(req, res) {
  res.render('register', { layout: 'layouts/layout', titulo: 'Crear Cuenta' });
});

app.get('/login', function(req, res) {
  res.render('login', { layout: 'layouts/layout', titulo: 'Iniciar Sesion' });
});

// Dashboard - obtiene datos reales de la DB
app.get('/dashboard', async function(req, res) {
  try {
    // En el sprint 3 el dashboard carga los datos via API desde el frontend
    // Por ahora renderizamos la vista y el JS del cliente se encarga de pedir los datos
    res.render('dashboard', {
      layout: 'layouts/layout',
      titulo: 'Dashboard - KanbanPro',
      proyecto: 'KanbanPro'
    });
  } catch (error) {
    res.status(500).send('Error al cargar el dashboard');
  }
});

// Sincronizar DB y arrancar servidor
sequelize.sync({ alter: true })
  .then(function() {
    console.log('Base de datos sincronizada');
    app.listen(PORT, function() {
      console.log('Servidor corriendo en http://localhost:' + PORT);
    });
  })
  .catch(function(error) {
    console.error('Error al conectar con la base de datos:', error.message);
  });