const bcrypt = require("bcryptjs");
const db = require("../config/db");

const createDummyUser = async () => {
  try {
    const password = "password123";
    const passwordHash = await bcrypt.hash(password, 10);

    await db.query(
      `
      INSERT INTO users (name, email, phone, password_hash, status)
      VALUES (?, ?, ?, ?, ?)
      ON DUPLICATE KEY UPDATE
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

    console.log("Dummy user berhasil dibuat");
    console.log("Phone: 081234567890");
    console.log("Password: password123");

    process.exit(0);
  } catch (error) {
    console.error("Gagal membuat dummy user:", error);
    process.exit(1);
  }
};

createDummyUser();