const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const mahasiswaRoutes = require('./routes/mahasiswa');
app.use('/api/mahasiswa', mahasiswaRoutes);

app.get('/', (req, res) => {
    res.send('API Data Mahasiswa berjalan');
});

app.listen(PORT, () => {
    console.log(`Server berjalan di http://localhost:${PORT}`);
});
