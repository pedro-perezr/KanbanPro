const sequelize = require('./config/database');
const { Usuario, Tablero, Lista, Tarjeta } = require('./models/index');

async function seed() {
  await sequelize.authenticate();
  await sequelize.sync({ force: true });
  console.log('Las tablas han sido creadas.');

  const u1 = await Usuario.create({ nombre: 'Carlos', email: 'carlos@example.com' });
  const u2 = await Usuario.create({ nombre: 'Ana', email: 'ana@example.com' });

  const t1 = await Tablero.create({ titulo: 'Proyecto Web', UsuarioId: u1.id });
  const t2 = await Tablero.create({ titulo: 'App Mobile', UsuarioId: u1.id });
  const t3 = await Tablero.create({ titulo: 'Rediseno UI', UsuarioId: u2.id });

  const l1 = await Lista.create({ titulo: 'Por hacer', TableroId: t1.id });
  const l2 = await Lista.create({ titulo: 'En progreso', TableroId: t1.id });
  const l3 = await Lista.create({ titulo: 'Por hacer', TableroId: t2.id });

  await Tarjeta.create({ titulo: 'Disenar base de datos', descripcion: 'Crear modelos con Sequelize', ListaId: l1.id });
  await Tarjeta.create({ titulo: 'Crear endpoints', descripcion: 'Definir rutas de la API', ListaId: l1.id });
  await Tarjeta.create({ titulo: 'Conectar frontend', descripcion: 'Integrar con React', ListaId: l2.id });
  await Tarjeta.create({ titulo: 'Configurar entorno', descripcion: 'Setup inicial del proyecto', ListaId: l3.id });

  console.log('La Base de datos ha sido poblada con datos de ejemplo.');
  await sequelize.close();
}

seed();