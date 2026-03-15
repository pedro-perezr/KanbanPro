const sequelize = require('./config/database');
const { Usuario, Tablero, Lista, Tarjeta } = require('./models/index');

async function testCrud() {
  await sequelize.authenticate();
  await sequelize.sync();

  // CREAR
  const nuevaTarjeta = await Tarjeta.create({
    titulo: 'Nueva tarea de prueba',
    descripcion: 'Creada desde test-crud.js',
    ListaId: 1,
  });
  console.log(`Tarjeta creada: ${nuevaTarjeta.titulo} (ID: ${nuevaTarjeta.id})`);

  // LEER
  const tablero = await Tablero.findByPk(1, {
    include: {
      model: Lista,
      include: Tarjeta,
    },
  });
  console.log('Tablero con listas y tarjetas:');
  console.log(JSON.stringify(tablero, null, 2));

  // ACTUALIZAR
  await Tarjeta.update(
    { titulo: 'Tarea actualizada' },
    { where: { id: nuevaTarjeta.id } }
  );
  console.log(`Tarjeta ID ${nuevaTarjeta.id} actualizada.`);

  // BORRAR
  await Tarjeta.destroy({ where: { id: nuevaTarjeta.id } });
  console.log(`Tarjeta ID ${nuevaTarjeta.id} eliminada.`);

  await sequelize.close();
}

testCrud();