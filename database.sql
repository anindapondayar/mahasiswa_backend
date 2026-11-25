CREATE DATABASE db_mahasiswa;
USE db_mahasiswa;

CREATE TABLE mahasiswa (
    nim VARCHAR(20) PRIMARY KEY,
    nama VARCHAR(100) NOT NULL,
    alamat TEXT,
    tgl_lahir DATE,
    jurusan VARCHAR(100)
);

-- Contoh data untuk pengujian
INSERT INTO mahasiswa (nim, nama, alamat, tgl_lahir, jurusan) VALUES
('23001', 'Rafa', 'Sorong', '2004-05-12', 'Sistem Informasi'),
('23002', 'Alice', 'Manokwari', '2003-09-20', 'Teknik Informatika');
