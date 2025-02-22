const express = require('express');
const mysql = require('mysql');

const app = express();
const port = 3000;

app.use(express.json());

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'password123', 
    database: 'testdb'
});

db.connect(err => {
    if (err) {
        console.error('Error de conexión:', err);
        return;
    }
    console.log('Conectado a la base de datos');
});

app.post('/insert', (req, res) => {
    const { username, email } = req.body;

    const query = `INSERT INTO users (username, email) VALUES ('${username}', '${email}')`;

    db.query(query, (err, result) => {
        if (err) {
            res.status(500).send('Error al insertar datos');
            return;
        }
        res.send('Datos insertados correctamente');
    });
});

app.get('/users', (req, res) => {
    db.query('SELECT * FROM users', (err, results) => {
        if (err) {
            res.status(500).send('Error en la consulta');
            return;
        }
        res.json(results); 
    });
});

// Iniciar servidor
app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});
