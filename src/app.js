const geocode = require('./utils/geocode')
const forecast = require('./utils/prediksiCuaca')
const path = require('path');
const express = require('express');
const hbs = require('hbs');

const app = express();
const port = process.env.PORT || 3000

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
        nama: 'Maharani Safitri'
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

// Ini halaman berita
app.get('/berita', (req, res) => {
    res.render('berita', {
        judul: 'Halaman Berita',
        berita1: {
            judul: 'Peresmian Gedung Baru',
            isi: 'Pada hari ini, gedung baru perusahaan kami resmi diresmikan oleh CEO kami. Gedung ini dilengkapi dengan fasilitas modern dan teknologi terkini yang diharapkan dapat meningkatkan produktivitas dan kenyamanan bagi seluruh karyawan.'
        },
        berita2: {
            judul: 'Peluncuran Produk Baru',
            isi: 'Kami dengan bangga mengumumkan peluncuran produk terbaru kami, yaitu smartphone generasi terbaru yang dilengkapi dengan teknologi canggih dan fitur inovatif. Produk ini dirancang untuk memberikan pengalaman pengguna yang lebih baik dan memenuhi kebutuhan teknologi saat ini.'
        }
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
        nama: 'Maharani Safitri'
    });
});

app.get('/bantuan/*', (req, res) => {
    res.render('404', {
        judul: '404',
        nama: 'Maharani Safitri',
        PesanKesalahan: 'Artikel yang dicari tidak ditemukan.'
    })
})



app.get('*', (req, res) => {
    res.render('404', {
        judul: '404',
        nama: 'Maharani Safitri',
        pesanKesalahan: 'Halaman tidak ditemukan.'
    })
})

// Menjalankan server pada port 4000
app.listen(port, () => {
    console.log('Server berjalan pada port  '+ port);
});
