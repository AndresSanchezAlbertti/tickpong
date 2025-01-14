import express from 'express';
import { Sequelize, DataTypes } from 'sequelize';
import cors from 'cors';

const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

// Conectar a MySQL
const sequelize = new Sequelize('jugadorespong', 'root', 'root', {
  host: 'localhost',
  dialect: 'mysql',
  port: 3306, // Cambia esto si usas un puerto diferente para MySQL
});

// Verificar la conexión a la base de datos
try {
  await sequelize.authenticate();
  console.log('Conexión a la base de datos establecida correctamente.');
} catch (error) {
  console.error('No se pudo conectar a la base de datos:', error);
}

// Definir un modelo
const Jugador = sequelize.define('Jugador', {
  nombre: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  apellido: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  fecha_nacimiento: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  edad: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  anio_ingreso: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  direccion: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  telefono: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  telefono_emergencia: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

// Sincronizar el modelo con la base de datos
await sequelize.sync();
console.log('Base de datos y tablas sincronizadas');

// Rutas de la API
app.get('/jugadores', async (req, res) => {
  try {
    const { id } = req.query; // Obtén los parámetros de búsqueda desde la URL
    const whereClause = {};

    if (id) whereClause.nombre = id;
    

    const jugadores = await Jugador.findAll({ where: whereClause }); // Busca en la base de datos
    res.json(jugadores);
  } catch (error) {
    console.error('Error al buscar jugadores:', error);
    res.status(500).json({ error: 'Error al buscar jugadores' });
  }
});
app.get('/jugadores/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const jugador = await Jugador.findByPk(id);
    if (jugador) {
      res.json(jugador);
    } else {
      res.status(404).json({ error: 'Jugador no encontrado' });
    }
  } catch (error) {
    console.error('Error al buscar jugador', error);
    res.status(500).json({ error: 'Error al buscar jugador' });
  }
});

app.post('/jugadores', async (req, res) => {
  const {
    nombre,
    apellido,
    fecha_nacimiento,
    edad,
    anio_ingreso,
    direccion,
    telefono,
    telefono_emergencia,
  } = req.body;

  if (!nombre || !apellido || !fecha_nacimiento || !edad || !anio_ingreso || !direccion || !telefono || !telefono_emergencia) {
    return res.status(400).json({ error: 'Por favor, completa todos los campos.' });
  }

  try {
    const nuevoJugador = await Jugador.create(req.body);
    res.json(nuevoJugador);
  } catch (error) {
    console.error('Error al agregar el jugador', error);
    res.status(500).json({ error: 'Error al agregar el jugador' });
  }
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});