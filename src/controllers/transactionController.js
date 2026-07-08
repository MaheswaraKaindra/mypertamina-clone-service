const db = require("../config/db");

const getTransactions = async (req, res) => {
  try {
    const [transactions] = await db.query(
      `
      SELECT
        t.id,
        t.user_id,
        t.vehicle_id,
        t.transaction_code,
        t.spbu_name,
        t.fuel_type,
        t.liters,
        t.amount,
        t.payment_method,
        t.transaction_date,
        t.created_at,
        v.plate_number,
        v.vehicle_type
      FROM transactions t
      LEFT JOIN vehicles v ON t.vehicle_id = v.id
      WHERE t.user_id = ?
      ORDER BY t.transaction_date DESC
      `,
      [req.user.id]
    );

    return res.json({
      success: true,
      message: "Data transaksi berhasil diambil",
      data: {
        transactions,
      },
    });
  } catch (error) {
    console.error("Get transactions error:", error);

    return res.status(500).json({
      success: false,
      message: "Terjadi kesalahan pada server",
    });
  }
};

module.exports = {
  getTransactions,
};