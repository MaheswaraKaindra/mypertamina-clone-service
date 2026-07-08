# MyPertamina App Service Mock - API Documentation

## 1. Overview

Service ini adalah tiruan dari **MyPertamina Apps/vendor API**.

Service ini digunakan untuk mensimulasikan data dari aplikasi MyPertamina seperti:

- login user
- profil user
- saldo
- poin
- kendaraan
- transaksi
- voucher
- notifikasi

Service ini **tidak boleh diakses langsung database-nya oleh backend web**. Backend web harus mengambil data melalui API.

Arsitektur integrasi:

```text
Frontend Web MyPertamina
        ↓
Backend Web MyPertamina
        ↓ HTTP API
MyPertamina App Service Mock
        ↓
Database Lokal
```

---

## 2. Base URL

Untuk local development:

```text
http://localhost:4000/api
```

Contoh:

```text
http://localhost:4000/api/auth/login
```

---

## 3. Dummy Account

Gunakan akun berikut untuk testing:

```text
Phone    : 081234567890
Password : password123
```

---

## 4. Authentication

Beberapa endpoint membutuhkan token JWT.

Setelah login berhasil, response akan berisi token:

```json
{
  "success": true,
  "message": "Login berhasil",
  "data": {
    "token": "TOKEN_JWT",
    "user": {
      "id": 1,
      "name": "Budi Santoso",
      "email": "budi@example.com",
      "phone": "081234567890",
      "status": "active"
    }
  }
}
```

Token tersebut dipakai pada endpoint yang membutuhkan login.

Format header:

```http
Authorization: Bearer TOKEN_JWT
```

---

## 5. Standard Response Format

### Success Response

```json
{
  "success": true,
  "message": "Data berhasil diambil",
  "data": {}
}
```

### Error Response

```json
{
  "success": false,
  "message": "Terjadi kesalahan"
}
```

---

# 6. API Endpoint List

| Method | Endpoint | Auth Required | Status | Description |
|---|---|---:|---|---|
| POST | `/api/auth/login` | No | READY | Login user |
| GET | `/api/users/me` | Yes | READY | Mengambil profil user |
| GET | `/api/balance` | Yes | READY | Mengambil saldo user |
| GET | `/api/points` | Yes | READY | Mengambil poin user |
| GET | `/api/vehicles` | Yes | READY / IN PROGRESS | Mengambil daftar kendaraan |
| GET | `/api/transactions` | Yes | READY / IN PROGRESS | Mengambil riwayat transaksi |
| GET | `/api/vouchers` | Yes | TODO | Mengambil voucher user |
| GET | `/api/notifications` | Yes | TODO | Mengambil notifikasi user |

---

# 7. Auth API

## 7.1 Login User

### Endpoint

```http
POST /api/auth/login
```

### Full URL

```http
POST http://localhost:4000/api/auth/login
```

### Auth Required

```text
No
```

### Headers

```http
Content-Type: application/json
```

### Request Body

```json
{
  "phone": "081234567890",
  "password": "password123"
}
```

### Success Response

```json
{
  "success": true,
  "message": "Login berhasil",
  "data": {
    "token": "jwt_token_here",
    "user": {
      "id": 1,
      "name": "Budi Santoso",
      "email": "budi@example.com",
      "phone": "081234567890",
      "status": "active"
    }
  }
}
```

### Error Response - Field Kosong

```json
{
  "success": false,
  "message": "Nomor HP dan password wajib diisi"
}
```

### Error Response - Login Salah

```json
{
  "success": false,
  "message": "Nomor HP atau password salah"
}
```

### Error Response - Akun Tidak Aktif

```json
{
  "success": false,
  "message": "Akun tidak aktif"
}
```

---

# 8. User API

## 8.1 Get Current User Profile

Endpoint ini digunakan untuk mengambil profil user berdasarkan token login.

### Endpoint

```http
GET /api/users/me
```

### Full URL

```http
GET http://localhost:4000/api/users/me
```

### Auth Required

```text
Yes
```

### Headers

```http
Authorization: Bearer TOKEN_JWT
```

### Success Response

```json
{
  "success": true,
  "message": "Data user berhasil diambil",
  "data": {
    "user": {
      "id": 1,
      "name": "Budi Santoso",
      "email": "budi@example.com",
      "phone": "081234567890",
      "status": "active",
      "created_at": "2026-07-08T00:00:00.000Z",
      "updated_at": "2026-07-08T00:00:00.000Z"
    }
  }
}
```

### Error Response - Token Tidak Ada

```json
{
  "success": false,
  "message": "Token tidak ditemukan"
}
```

### Error Response - Token Tidak Valid

```json
{
  "success": false,
  "message": "Token tidak valid atau sudah expired"
}
```

---

# 9. Balance API

## 9.1 Get User Balance

Endpoint ini digunakan untuk mengambil saldo user.

### Endpoint

```http
GET /api/balance
```

### Full URL

```http
GET http://localhost:4000/api/balance
```

### Auth Required

```text
Yes
```

### Headers

```http
Authorization: Bearer TOKEN_JWT
```

### Success Response

```json
{
  "success": true,
  "message": "Data saldo berhasil diambil",
  "data": {
    "balance": {
      "id": 1,
      "user_id": 1,
      "balance": "250000.00",
      "currency": "IDR",
      "updated_at": "2026-07-08T00:00:00.000Z"
    }
  }
}
```

### Success Response - Saldo Belum Ada

```json
{
  "success": true,
  "message": "Saldo belum tersedia",
  "data": {
    "balance": {
      "user_id": 1,
      "balance": 0,
      "currency": "IDR"
    }
  }
}
```

---

# 10. Points API

## 10.1 Get User Points

Endpoint ini digunakan untuk mengambil total poin user.

### Endpoint

```http
GET /api/points
```

### Full URL

```http
GET http://localhost:4000/api/points
```

### Auth Required

```text
Yes
```

### Headers

```http
Authorization: Bearer TOKEN_JWT
```

### Success Response

```json
{
  "success": true,
  "message": "Data poin berhasil diambil",
  "data": {
    "points": {
      "id": 1,
      "user_id": 1,
      "total_points": 12500,
      "updated_at": "2026-07-08T00:00:00.000Z"
    }
  }
}
```

### Success Response - Poin Belum Ada

```json
{
  "success": true,
  "message": "Poin belum tersedia",
  "data": {
    "points": {
      "user_id": 1,
      "total_points": 0
    }
  }
}
```

---

# 11. Vehicle API

## 11.1 Get User Vehicles

Endpoint ini digunakan untuk mengambil daftar kendaraan milik user.

### Endpoint

```http
GET /api/vehicles
```

### Full URL

```http
GET http://localhost:4000/api/vehicles
```

### Auth Required

```text
Yes
```

### Headers

```http
Authorization: Bearer TOKEN_JWT
```

### Success Response

```json
{
  "success": true,
  "message": "Data kendaraan berhasil diambil",
  "data": {
    "vehicles": [
      {
        "id": 1,
        "user_id": 1,
        "plate_number": "B 1234 ABC",
        "vehicle_type": "Toyota Avanza",
        "fuel_type": "Pertalite",
        "is_subsidized": 1,
        "qr_code": "QR-MYPERTAMINA-B1234ABC",
        "status": "active",
        "created_at": "2026-07-08T00:00:00.000Z",
        "updated_at": "2026-07-08T00:00:00.000Z"
      }
    ]
  }
}
```

### Success Response - Data Kosong

```json
{
  "success": true,
  "message": "Data kendaraan berhasil diambil",
  "data": {
    "vehicles": []
  }
}
```

---

# 12. Transaction API

## 12.1 Get User Transactions

Endpoint ini digunakan untuk mengambil riwayat transaksi user.

### Endpoint

```http
GET /api/transactions
```

### Full URL

```http
GET http://localhost:4000/api/transactions
```

### Auth Required

```text
Yes
```

### Headers

```http
Authorization: Bearer TOKEN_JWT
```

### Success Response

```json
{
  "success": true,
  "message": "Data transaksi berhasil diambil",
  "data": {
    "transactions": [
      {
        "id": 1,
        "user_id": 1,
        "vehicle_id": 1,
        "transaction_code": "TRX-0001",
        "spbu_name": "SPBU 31.123.01",
        "fuel_type": "Pertalite",
        "liters": "20.00",
        "amount": "200000.00",
        "payment_method": "LinkAja",
        "transaction_date": "2026-07-08T02:00:00.000Z",
        "created_at": "2026-07-08T00:00:00.000Z",
        "plate_number": "B 1234 ABC",
        "vehicle_type": "Toyota Avanza"
      }
    ]
  }
}
```

### Success Response - Data Kosong

```json
{
  "success": true,
  "message": "Data transaksi berhasil diambil",
  "data": {
    "transactions": []
  }
}
```

---

# 13. Voucher API

## 13.1 Get User Vouchers

Endpoint ini digunakan untuk mengambil daftar voucher milik user.

### Endpoint

```http
GET /api/vouchers
```

### Full URL

```http
GET http://localhost:4000/api/vouchers
```

### Auth Required

```text
Yes
```

### Status

```text
TODO
```

### Headers

```http
Authorization: Bearer TOKEN_JWT
```

### Expected Success Response

```json
{
  "success": true,
  "message": "Data voucher berhasil diambil",
  "data": {
    "vouchers": [
      {
        "id": 1,
        "user_id": 1,
        "voucher_code": "VCR-MYPERTAMINA-001",
        "title": "Voucher Cashback BBM",
        "description": "Voucher cashback untuk pembelian BBM berikutnya",
        "value": "10000.00",
        "status": "active",
        "expired_at": "2026-12-31T16:59:59.000Z",
        "created_at": "2026-07-08T00:00:00.000Z"
      }
    ]
  }
}
```

### Expected Success Response - Data Kosong

```json
{
  "success": true,
  "message": "Data voucher berhasil diambil",
  "data": {
    "vouchers": []
  }
}
```

---

# 14. Notification API

## 14.1 Get User Notifications

Endpoint ini digunakan untuk mengambil notifikasi user.

### Endpoint

```http
GET /api/notifications
```

### Full URL

```http
GET http://localhost:4000/api/notifications
```

### Auth Required

```text
Yes
```

### Status

```text
TODO
```

### Headers

```http
Authorization: Bearer TOKEN_JWT
```

### Expected Success Response

```json
{
  "success": true,
  "message": "Data notifikasi berhasil diambil",
  "data": {
    "notifications": [
      {
        "id": 1,
        "user_id": 1,
        "title": "Selamat Datang di MyPertamina",
        "message": "Akun kamu berhasil terhubung dengan MyPertamina App Service Mock.",
        "is_read": 0,
        "created_at": "2026-07-08T00:00:00.000Z"
      }
    ]
  }
}
```

### Expected Success Response - Data Kosong

```json
{
  "success": true,
  "message": "Data notifikasi berhasil diambil",
  "data": {
    "notifications": []
  }
}
```

---

# 15. Database Schema

File database schema disimpan di:

```text
src/db/schema.sql
```

Isi schema:

```sql
CREATE DATABASE IF NOT EXISTS mypertamina_app_mock
CHARACTER SET utf8mb4
COLLATE utf8mb4_unicode_ci;

USE mypertamina_app_mock;

CREATE TABLE IF NOT EXISTS users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(100) UNIQUE,
  phone VARCHAR(20) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  status ENUM('active', 'inactive') DEFAULT 'active',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS user_balances (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL UNIQUE,
  balance DECIMAL(15,2) NOT NULL DEFAULT 0,
  currency VARCHAR(10) DEFAULT 'IDR',
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS user_points (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL UNIQUE,
  total_points INT NOT NULL DEFAULT 0,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS vehicles (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  plate_number VARCHAR(20) NOT NULL,
  vehicle_type VARCHAR(100),
  fuel_type VARCHAR(50),
  is_subsidized BOOLEAN DEFAULT FALSE,
  qr_code VARCHAR(255),
  status ENUM('active', 'inactive') DEFAULT 'active',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS transactions (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  vehicle_id INT NULL,
  transaction_code VARCHAR(100) UNIQUE NOT NULL,
  spbu_name VARCHAR(150),
  fuel_type VARCHAR(50),
  liters DECIMAL(10,2),
  amount DECIMAL(15,2) NOT NULL,
  payment_method VARCHAR(50),
  transaction_date DATETIME NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (vehicle_id) REFERENCES vehicles(id) ON DELETE SET NULL
);

CREATE TABLE IF NOT EXISTS vouchers (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  voucher_code VARCHAR(100) UNIQUE NOT NULL,
  title VARCHAR(150) NOT NULL,
  description TEXT,
  value DECIMAL(15,2) DEFAULT 0,
  status ENUM('active', 'used', 'expired') DEFAULT 'active',
  expired_at DATETIME,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS notifications (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  title VARCHAR(150) NOT NULL,
  message TEXT NOT NULL,
  is_read BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);
```

---

# 16. Environment Configuration

Buat file `.env` di root project.

Contoh isi:

```env
PORT=4000

DB_HOST=localhost
DB_USER=root
DB_PASSWORD=
DB_NAME=mypertamina_app_mock

JWT_SECRET=change_this_secret_key
JWT_EXPIRES_IN=1d
```

Jangan commit file `.env`.

Buat juga file `.env.example` agar developer lain bisa menyalin formatnya:

```env
PORT=4000

DB_HOST=localhost
DB_USER=root
DB_PASSWORD=
DB_NAME=mypertamina_app_mock

JWT_SECRET=change_this_secret_key
JWT_EXPIRES_IN=1d
```

---

# 17. Local Setup Guide

## 17.1 Install Dependencies

```bash
npm install
```

## 17.2 Setup Environment

Copy `.env.example` menjadi `.env`.

```bash
cp .env.example .env
```

Sesuaikan konfigurasi database di `.env`.

## 17.3 Generate Database Schema

```bash
npm run db:schema
```

## 17.4 Insert Dummy Data

```bash
npm run db:seed
```

## 17.5 Run Service

```bash
npm run dev
```

Service akan berjalan di:

```text
http://localhost:4000
```

---

# 18. Package Scripts

Tambahkan script berikut di `package.json`:

```json
{
  "scripts": {
    "dev": "nodemon src/index.js",
    "start": "node src/index.js",
    "db:schema": "mysql -u root -p < src/db/schema.sql",
    "db:seed": "node src/db/seed.js"
  }
}
```

---

# 19. Testing Flow

## Step 1 - Login

```http
POST http://localhost:4000/api/auth/login
```

Body:

```json
{
  "phone": "081234567890",
  "password": "password123"
}
```

Copy token dari response.

## Step 2 - Get Profile

```http
GET http://localhost:4000/api/users/me
```

Header:

```http
Authorization: Bearer TOKEN_JWT
```

## Step 3 - Get Balance

```http
GET http://localhost:4000/api/balance
```

Header:

```http
Authorization: Bearer TOKEN_JWT
```

## Step 4 - Get Points

```http
GET http://localhost:4000/api/points
```

Header:

```http
Authorization: Bearer TOKEN_JWT
```

## Step 5 - Get Vehicles

```http
GET http://localhost:4000/api/vehicles
```

Header:

```http
Authorization: Bearer TOKEN_JWT
```

## Step 6 - Get Transactions

```http
GET http://localhost:4000/api/transactions
```

Header:

```http
Authorization: Bearer TOKEN_JWT
```

## Step 7 - Get Vouchers

```http
GET http://localhost:4000/api/vouchers
```

Header:

```http
Authorization: Bearer TOKEN_JWT
```

## Step 8 - Get Notifications

```http
GET http://localhost:4000/api/notifications
```

Header:

```http
Authorization: Bearer TOKEN_JWT
```

---

# 20. Integration Guide for Backend Web Developer

Backend web tidak boleh akses database app service secara langsung.

Gunakan environment variable di backend web:

```env
APP_SERVICE_BASE_URL=http://localhost:4000/api
```

Contoh client service:

```js
const axios = require("axios");

const APP_SERVICE_BASE_URL = process.env.APP_SERVICE_BASE_URL;

const loginToAppService = async (payload) => {
  const response = await axios.post(
    `${APP_SERVICE_BASE_URL}/auth/login`,
    payload
  );

  return response.data;
};

const getUserProfile = async (token) => {
  const response = await axios.get(
    `${APP_SERVICE_BASE_URL}/users/me`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};

const getBalance = async (token) => {
  const response = await axios.get(
    `${APP_SERVICE_BASE_URL}/balance`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};

const getPoints = async (token) => {
  const response = await axios.get(
    `${APP_SERVICE_BASE_URL}/points`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};

module.exports = {
  loginToAppService,
  getUserProfile,
  getBalance,
  getPoints,
};
```

---

# 21. Integration Guide for Frontend Developer

Frontend tidak langsung hit app service.

Alur yang benar:

```text
Frontend
    ↓
Backend Web
    ↓
App Service Mock
```

Contoh alur login:

```text
1. User input phone dan password di frontend.
2. Frontend request ke backend web.
3. Backend web meneruskan request ke app service.
4. App service validasi user dan membuat token.
5. Backend web menerima response dari app service.
6. Backend web mengembalikan data login ke frontend.
7. Frontend menyimpan token.
8. Frontend menggunakan token untuk request data berikutnya ke backend web.
```

Mapping endpoint:

| Frontend Request | Backend Web Endpoint | App Service Endpoint |
|---|---|---|
| Login | `POST /api/auth/login` | `POST /api/auth/login` |
| Profile | `GET /api/me` | `GET /api/users/me` |
| Saldo | `GET /api/balance` | `GET /api/balance` |
| Poin | `GET /api/points` | `GET /api/points` |
| Kendaraan | `GET /api/vehicles` | `GET /api/vehicles` |
| Transaksi | `GET /api/transactions` | `GET /api/transactions` |
| Voucher | `GET /api/vouchers` | `GET /api/vouchers` |
| Notifikasi | `GET /api/notifications` | `GET /api/notifications` |

---

# 22. Error Handling Notes

## Token Tidak Ada

Response:

```json
{
  "success": false,
  "message": "Token tidak ditemukan"
}
```

## Token Tidak Valid atau Expired

Response:

```json
{
  "success": false,
  "message": "Token tidak valid atau sudah expired"
}
```

## Login Salah

Response:

```json
{
  "success": false,
  "message": "Nomor HP atau password salah"
}
```

## Server Error

Response:

```json
{
  "success": false,
  "message": "Terjadi kesalahan pada server"
}
```

---

# 23. Notes for Developers

- Jangan commit file `.env`.
- Jangan commit token JWT.
- Jangan commit GitHub Personal Access Token.
- Gunakan `.env.example` untuk dokumentasi environment variable.
- Semua endpoint user data wajib memakai Bearer Token.
- Backend web hanya boleh akses data app service melalui API.
- Frontend tidak boleh langsung hit app service.
- Jika token expired, lakukan login ulang.
- Untuk environment baru, jalankan `npm run db:schema` lalu `npm run db:seed`.
- Database lokal digunakan sebagai simulasi cloud/vendor.
- Service ini hanya tiruan untuk kebutuhan project clone.

---

# 24. Current Development Status

## Sudah Aman

```text
POST /api/auth/login
GET  /api/users/me
GET  /api/balance
GET  /api/points
```

## Sedang Dikerjakan / Berikutnya

```text
GET /api/vehicles
GET /api/transactions
```

## Belum Dikerjakan

```text
GET /api/vouchers
GET /api/notifications
```

---

# 25. Kesimpulan

MyPertamina App Service Mock ini dibuat sebagai pengganti sementara vendor/cloud API.

Backend web harus menganggap service ini sebagai API eksternal.

Dengan begitu, integrasi tetap sesuai requirement:

```text
Integrasi dilakukan melalui API, bukan akses database langsung.
```