const geocode = require('./utils/geocode')
const forecast = require('./utils/prediksiCuaca')
const path = require('path');
const express = require('express');
const hbs = require('hbs');

const app = express();

const direktoriPublic = path.join(__dirname, '../public');
const direktoriViews = path.join(__dirname, '../templates');
const direktoriPartials = path.join(__dirname, '../templates/partials')

app.set('view engine', 'hbs');
app.set('views', direktoriViews);
hbs.registerPartials(direktoriPartials)

app.use(express.static(direktoriPublic));

// Ini halaman/page utama
app.get('', (req, res) => {
    res.render('index', {
        judul: 'Aplikasi Cek Cuaca',
        nama: 'Natasya febriani'
    });
});

// Ini halaman bantuan
app.get('/bantuan', (req, res) => {
    res.render('bantuan', {
        judul: 'Halaman Bantuan',
        teks: 'Ini adalah halaman bantuan',
        teksBantuan: 'Ini adalah teks bantuan'
    });
});

// Ini halaman info cuaca
app.get('/infocuaca', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'Kamu harus memasukkan lokasi yang ingin dicari'
        });
    }
    geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
        if (error) {
            return res.send({ error });
        }
        forecast(latitude, longitude, (error, dataPrediksi) => {
            if (error) {
                return res.send({ error });
            }
            res.send({
                prediksiCuaca: dataPrediksi,
                lokasi: location,
                address: req.query.address
            });
        });
    });
});

// Ini halaman tentang
app.get('/tentang', (req, res) => {
    res.render('tentang', {
        judul: 'Tentang Saya',
        nama: 'Natasya febriani'
    });
});

app.get('/bantuan/*', (req, res) => {
    res.render('404', {
        judul: '404',
        nama: 'Natasya febriani',
        PesanKesalahan: 'Artikel yang dicari tidak ditemukan.'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        judul: '404',
        nama: 'Natasya febriani',
        pesanKesalahan: 'Halaman tidak ditemukan.'
    })
})

// Menjalankan server pada port 4000
app.listen(4000, () => {
    console.log('Server berjalan pada port 4000.');
});
