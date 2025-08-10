
# Menu Tree API Documentation

Aplikasi Menu Tree API adalah RESTful API yang dibuat menggunakan NestJS untuk mengelola struktur menu hierarkis (pohon menu). API ini menyediakan fungsionalitas CRUD (Create, Read, Update, Delete) yang lengkap, penanganan kesalahan global (global error handling), dan dukungan CORS untuk integrasi frontend yang mudah.

---

## Teknologi yang Digunakan

- NestJS
- TypeScript
- TypeORM
- MySQL

---

## Fitur Utama

- **Struktur Menu Hierarkis**  
  Data menu disimpan dalam struktur pohon (tree) dengan relasi `parentId`.

- **Operasi CRUD Lengkap**  
  Dukungan penuh untuk membuat, membaca, memperbarui, dan menghapus data menu.

- **CORS Enabled**  
  API dikonfigurasi untuk menerima permintaan dari berbagai domain.

- **Penanganan Kesalahan Global**  
  Menyediakan respons kesalahan yang konsisten dan informatif.

---

## API Endpoints

| Metode | Endpoint          | Deskripsi                        |
|--------|-------------------|---------------------------------|
| GET    | `/api/menus`      | Mengambil semua data menu dalam struktur pohon. |
| GET    | `/api/menus/:id`  | Mengambil satu data menu berdasarkan ID.         |
| POST   | `/api/menus`      | Membuat data menu baru.                           |
| PUT    | `/api/menus/:id`  | Memperbarui data menu berdasarkan ID.            |
| DELETE | `/api/menus/:id`  | Menghapus data menu berdasarkan ID.              |

---

## Struktur Data (JSON Response)

### Mengambil Semua Menu (GET `/api/menus`)

Struktur respons untuk endpoint ini adalah array objek, di mana setiap objek dapat memiliki properti `children` yang berisi sub-menu.

```json
[
  {
    "id": 1,
    "name": "Dashboard",
    "url": "/dashboard",
    "parentId": null,
    "children": [],
    "orderNo": 1,
    "createdAt": "2025-08-10T16:22:41.000Z",
    "updatedAt": "2025-08-10T16:22:41.000Z"
  }
]
```

---

### Mengambil Satu Menu (GET `/api/menus/:id`)

Respons untuk endpoint ini menampilkan detail satu menu, termasuk properti `parent` jika menu tersebut memiliki induk.

```json
{
  "id": 6,
  "name": "Permissions",
  "url": "/users/permissions",
  "parentId": 2,
  "parent": {
    "id": 2,
    "name": "User Management",
    "url": "/users",
    "parentId": null,
    "orderNo": 2,
    "createdAt": "2025-08-10T16:22:41.000Z",
    "updatedAt": "2025-08-10T16:22:41.000Z"
  },
  "children": [],
  "orderNo": 2,
  "createdAt": "2025-08-10T16:22:41.000Z",
  "updatedAt": "2025-08-10T16:22:41.000Z"
}
```

---

## Cara Menjalankan Proyek

### 1. Clone repositori:

```bash
git clone https://github.com/ioarintoko/menu-tree-nest.git
cd menu-tree-nest
```

### 2. Instal dependensi:

```bash
npm install
```

### 3. Konfigurasi database:

Pengaturan koneksi database dikonfigurasi langsung di file `src/data-source.ts`.  
Harap sesuaikan detail koneksi sesuai dengan lingkungan lokal Anda.

### 4. Jalankan migrasi:

Untuk menyiapkan skema database, jalankan perintah migrasi berikut.  
Catatan: Pastikan untuk menyesuaikan jalur file `data-source.ts` jika diperlukan.

```bash
npx typeorm-ts-node-commonjs migration:run -d "path/to/your/data-source.ts"
```

### 5. Mulai server:

```bash
npm run start:dev
```

---

## Lisensi

Dokumentasi ini disediakan untuk mempermudah penggunaan dan pengembangan Menu Tree API.

---

*Dokumentasi ini dibuat secara otomatis dan profesional agar membantu workflow Anda.*
