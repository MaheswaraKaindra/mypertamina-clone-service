const bcrypt = require("bcryptjs");
const db = require("../config/db");

const seed = async () => {
  try {
    const password = "password123";
    const passwordHash = await bcrypt.hash(password, 10);

    const [userResult] = await db.query(
      `
      INSERT INTO users (name, email, phone, password_hash, status)
      VALUES (?, ?, ?, ?, ?)
      ON DUPLICATE KEY UPDATE
        id = LAST_INSERT_ID(id),
        name = VALUES(name),
        password_hash = VALUES(password_hash),
        status = VALUES(status)
      `,
      [
        "Budi Santoso",
        "budi@example.com",
        "081234567890",
        passwordHash,
        "active",
      ]
    );

    const userId = userResult.insertId;

    await db.query(
      `
      INSERT INTO user_balances (user_id, balance, currency)
      VALUES (?, ?, ?)
      ON DUPLICATE KEY UPDATE
        balance = VALUES(balance),
        currency = VALUES(currency)
      `,
      [userId, 250000, "IDR"]
    );

    await db.query(
      `
      INSERT INTO user_points (user_id, total_points)
      VALUES (?, ?)
      ON DUPLICATE KEY UPDATE
        total_points = VALUES(total_points)
      `,
      [userId, 12500]
    );

    await db.query(
      `
      INSERT INTO vehicles 
      (user_id, plate_number, vehicle_type, fuel_type, is_subsidized, qr_code, status)
      VALUES (?, ?, ?, ?, ?, ?, ?)
      `,
      [
        userId,
        "B 1234 ABC",
        "Toyota Avanza",
        "Pertalite",
        true,
        "QR-MYPERTAMINA-B1234ABC",
        "active",
      ]
    );

    await db.query(
      `
      INSERT IGNORE INTO transactions
      (user_id, vehicle_id, transaction_code, spbu_name, fuel_type, liters, amount, payment_method, transaction_date)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
      `,
      [
        userId,
        1,
        "TRX-0001",
        "SPBU 31.123.01",
        "Pertalite",
        20,
        200000,
        "LinkAja",
        "2026-07-08 09:00:00",
      ]
    );

    await db.query(
      `
      INSERT IGNORE INTO vouchers
      (user_id, voucher_code, title, description, value, status, expired_at)
      VALUES (?, ?, ?, ?, ?, ?, ?)
      `,
      [
        userId,
        "VCR-MYPERTAMINA-001",
        "Voucher Cashback BBM",
        "Voucher cashback untuk pembelian BBM berikutnya",
        10000,
        "active",
        "2026-12-31 23:59:59",
      ]
    );

    await db.query(
      `
      INSERT INTO notifications
      (user_id, title, message, is_read)
      VALUES (?, ?, ?, ?)
      `,
      [
        userId,
        "Selamat Datang di MyPertamina",
        "Akun kamu berhasil terhubung dengan MyPertamina App Service Mock.",
        false,
      ]
    );

    console.log("Seeder berhasil dijalankan");
    console.log("Phone: 081234567890");
    console.log("Password: password123");

    process.exit(0);
  } catch (error) {
    console.error("Seeder gagal:", error);
    process.exit(1);
  }
};

seed();