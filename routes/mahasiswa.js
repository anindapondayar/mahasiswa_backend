const express = require('express');
const router = express.Router();
const db = require('../config/database');

// Menampilkan semua data mahasiswa
router.get('/', (req, res) => {
    const sql = 'SELECT * FROM mahasiswa ORDER BY nim ASC';
    db.query(sql, (err, result) => {
        if (err) {
            return res.status(500).json({ pesan: 'Gagal mengambil data mahasiswa' });
        }
        res.json(result);
    });
});

// Menampilkan satu data mahasiswa berdasarkan NIM
router.get('/:nim', (req, res) => {
    const sql = 'SELECT * FROM mahasiswa WHERE nim = ?';
    db.query(sql, [req.params.nim], (err, result) => {
        if (err) {
            return res.status(500).json({ pesan: 'Gagal mengambil data mahasiswa' });
        }
        if (result.length === 0) {
            return res.status(404).json({ pesan: 'Data mahasiswa tidak ditemukan' });
        }
        res.json(result[0]);
    });
});

// Menambahkan data mahasiswa
router.post('/', (req, res) => {
    const { nim, nama, alamat, tgl_lahir, jurusan } = req.body;
    const sql = 'INSERT INTO mahasiswa (nim, nama, alamat, tgl_lahir, jurusan) VALUES (?, ?, ?, ?, ?)';

    db.query(sql, [nim, nama, alamat, tgl_lahir, jurusan], (err, result) => {
        if (err) {
            return res.status(500).json({ pesan: 'Gagal menambahkan data. Pastikan NIM belum digunakan.' });
        }
        res.status(201).json({ pesan: 'Data mahasiswa berhasil ditambahkan' });
    });
});

// Mengubah data mahasiswa berdasarkan NIM
router.put('/:nim', (req, res) => {
    const { nama, alamat, tgl_lahir, jurusan } = req.body;
    const sql = 'UPDATE mahasiswa SET nama = ?, alamat = ?, tgl_lahir = ?, jurusan = ? WHERE nim = ?';

    db.query(sql, [nama, alamat, tgl_lahir, jurusan, req.params.nim], (err, result) => {
        if (err) {
            return res.status(500).json({ pesan: 'Gagal mengubah data mahasiswa' });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ pesan: 'Data mahasiswa tidak ditemukan' });
        }
        res.json({ pesan: 'Data mahasiswa berhasil diubah' });
    });
});

// Menghapus data mahasiswa berdasarkan NIM
router.delete('/:nim', (req, res) => {
    const sql = 'DELETE FROM mahasiswa WHERE nim = ?';

    db.query(sql, [req.params.nim], (err, result) => {
        if (err) {
            return res.status(500).json({ pesan: 'Gagal menghapus data mahasiswa' });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ pesan: 'Data mahasiswa tidak ditemukan' });
        }
        res.json({ pesan: 'Data mahasiswa berhasil dihapus' });
    });
});

module.exports = router;
