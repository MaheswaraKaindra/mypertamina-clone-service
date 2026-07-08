const db = require("../config/db");

const getVouchers = async (req, res) => {
  try {
    const [vouchers] = await db.query(
      `
      SELECT
        id,
        user_id,
        voucher_code,
        title,
        description,
        value,
        status,
        expired_at,
        created_at
      FROM vouchers
      WHERE user_id = ?
      ORDER BY created_at DESC
      `,
      [req.user.id]
    );

    return res.json({
      success: true,
      message: "Data voucher berhasil diambil",
      data: {
        vouchers,
      },
    });
  } catch (error) {
    console.error("Get vouchers error:", error);

    return res.status(500).json({
      success: false,
      message: "Terjadi kesalahan pada server",
    });
  }
};

module.exports = {
  getVouchers,
};