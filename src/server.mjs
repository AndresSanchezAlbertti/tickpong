import express from 'express';
import { Sequelize, DataTypes } from 'sequelize';
import cors from 'cors';
import axios from 'axios';


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

// Definir un modelo para la tabla Jugador
const Jugador = sequelize.define('Jugador', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
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

// Definir un modelo para la tabla WebScrapingData
const WebScrapingData = sequelize.define('WebScrapingData', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  content: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
});

// Sincronizar los modelos con la base de datos
await sequelize.sync();
console.log('Database & tables created!');

// Función para realizar web scraping
const scrapeWebsite = async (url) => {
  try {
    const { data } = await axios.get(url);
    const $ = cheerio.load(data);
    const title = $('title').text();
    const content = $('body').text();
    return { title, content };
  } catch (error) {
    console.error('Error al realizar web scraping', error);
    throw error;
  }
};

// Endpoint para obtener un jugador por ID
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

// Endpoint para eliminar un jugador por ID
app.delete('/jugadores/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const jugador = await Jugador.findByPk(id);
    if (jugador) {
      await jugador.destroy();
      res.json({ message: 'Jugador eliminado exitosamente' });
    } else {
      res.status(404).json({ error: 'Jugador no encontrado' });
    }
  } catch (error) {
    console.error('Error al eliminar jugador', error);
    res.status(500).json({ error: 'Error al eliminar jugador' });
  }
});

// Endpoint para agregar un jugador
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

// Endpoint para modificar un jugador por ID
app.patch('/jugadores/:id', async (req, res) => {
  const { id } = req.params;
  const updates = req.body;
  try {
    const jugador = await Jugador.findByPk(id);
    if (jugador) {
      await jugador.update(updates);
      res.json(jugador);
    } else {
      res.status(404).json({ error: 'Jugador no encontrado' });
    }
  } catch (error) {
    console.error('Error al modificar jugador', error);
    res.status(500).json({ error: 'Error al modificar jugador' });
  }
});

// Endpoint para realizar web scraping y almacenar los datos en la base de datos


// Iniciar el servidor
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});