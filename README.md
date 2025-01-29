# FE-Canteen

## How to run?

Untuk menjalankan proyek ini, pastikan API *backend* sudah berjalan. Ikuti petunjuk pada file README.md pada repositori `https://github.com/denishazzahra/ BE-Canteen.git`.

1. Buka terminal pada lokasi folder tujuan
2. *Clone* repositori ini dengan mengetikkan `git clone https://github.com/denishazzahra/FE-Canteen.git` pada terminal.
3. Masuk ke folder FE-Canteen dengan perintah `cd FE-Canteen`.
4. Buat file .env dan isi berdasarkan *template* pada *file* .env.example. Base URL harus sesuai dengan *backend*.
5. *Install* semua *dependency* proyek dengan perintah `npm i`.
6. Jalankan proyek dengan perintah `npm run start`.

## Endpoints

1. `/` : Tampilan menu untuk umum, bisa menambahkan menu ke *cart*
2. `/admin` : Halaman login admin
3. `/admin/home` : Halaman *dashboard* admin, bisa untuk input kategori dan menu
4. `/admin/menu` : Halaman *preview* menu
5. `/admin/menu/update/:id` : Halaman *update* menu
6. `/admin/category` : Halaman *list* kategori
7. `/admin/category/update/:id` : Halaman *update* kategori
