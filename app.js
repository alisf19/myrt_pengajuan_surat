const express = require('express');
const path = require('path');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const multer = require('multer');
const cors = require('cors');

const app = express();
const port = 3000;

// Configure MySQL connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'myrt'
});

db.connect(err => {
    if (err) {
        console.error('Database connection failed:', err.stack);
        return;
    }
    console.log('Connected to database.');
});

// Set storage engine for multer
const storage = multer.diskStorage({
    destination: './uploads/',
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({
    storage: storage
}).single('lampiran');

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'views')));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Routes
app.get('/', (req, res) => {
    res.redirect('/views/login.html');
});

// Route untuk menampilkan form pengajuan surat
app.get('/pengajuan_surat', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'pengajuan_surat.html'));
});

// Generate ID Pengajuan Surat Baru
app.get('/generate_id_surat', (req, res) => {
    db.query('SELECT MAX(id_surat) AS maxId FROM surat_pengajuan', (err, results) => {
        if (err) {
            console.error(err);
            res.status(500).json({ success: false, message: 'Internal Server Error' });
        } else {
            const lastId = results[0].maxId;
            const newId = lastId ? `SURAT-${parseInt(lastId.split('-')[1]) + 1}` : 'SURAT-1';
            res.json({ newId });
        }
    });
});

app.post('/login', (req, res) => {
    const { username, password, role } = req.body;
    const sql = 'SELECT * FROM users WHERE username = ? AND password = ? AND role = ?';
    db.query(sql, [username, password, role], (err, results) => {
        if (err) throw err;
        if (results.length > 0) {
            if (role === 'Warga') {
                res.redirect('/views/warga_dashboard.html');
            } else if (role === 'RT') {
                res.redirect('/views/rt_dashboard.html');
            }
        } else {
            res.send('Username atau password salah.');
        }
    });
});

app.post('/pengajuan_surat', upload, (req, res) => {
    const { id_surat, nama, nohp, jenis_surat, deskripsi, tanggal, informasi_tambahan } = req.body;
    const lampiran = req.file ? req.file.filename : null;

    const sql = `INSERT INTO surat_pengajuan (id_surat, nama, nohp, jenis_surat, deskripsi, tanggal, informasi_tambahan, lampiran) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;
    const values = [id_surat, nama, nohp, jenis_surat, deskripsi, tanggal, informasi_tambahan, lampiran];

    db.query(sql, values, (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).json({ success: false, message: 'Internal Server Error' });
        } else {
            res.status(200).json({ success: true, message: 'Pengajuan surat berhasil diajukan' });
        }
    });
});



// Route untuk halaman warga dashboard
app.get('/views/warga_dashboard.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'warga_dashboard.html'));
});

// akses semua file statis dalam folder views dan public
app.use('/views', express.static(path.join(__dirname, 'views')));
app.use('/public', express.static(path.join(__dirname, 'public')));

// Route untuk mendapatkan riwayat pengajuan surat
app.get('/cek_riwayat_pengajuan_surat', (req, res) => {
    const sql = 'SELECT id_surat, nama, jenis_surat, tanggal, status FROM surat_pengajuan';
    db.query(sql, (err, results) => {
        if (err) {
            console.error(err);
            res.status(500).json({ success: false, message: 'Internal Server Error' });
        } else {
            // Format tanggal menjadi ISO 8601
            results.forEach(result => {
                const date = new Date(result.tanggal);
                if (!isNaN(date)) {
                    result.tanggal = date.toISOString();
                } else {
                    console.error('Invalid date:', result.tanggal);
                }
            });
            res.json({ success: true, data: results });
        }
    });
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
