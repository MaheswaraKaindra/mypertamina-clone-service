const db = require("../config/db");

const getBalance = async (req, res) => {
  try {
    const [balances] = await db.query(
      `
      SELECT id, user_id, balance, currency, updated_at
      FROM user_balances
      WHERE user_id = ?
      LIMIT 1
      `,
      [req.user.id]
    );

    if (balances.length === 0) {
      return res.json({
        success: true,
        message: "Saldo belum tersedia",
        data: {
          balance: {
            user_id: req.user.id,
            balance: 0,
            currency: "IDR",
          },
        },
      });
    }

    return res.json({
      success: true,
      message: "Data saldo berhasil diambil",
      data: {
        balance: balances[0],
      },
    });
  } catch (error) {
    console.error("Get balance error:", error);

    return res.status(500).json({
      success: false,
      message: "Terjadi kesalahan pada server",
    });
  }
};

module.exports = {
  getBalance,
};