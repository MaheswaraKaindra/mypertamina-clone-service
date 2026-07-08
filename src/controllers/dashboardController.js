const db = require("../config/db");

const getDashboard = async (req, res) => {
  try {
    const userId = req.user.id;

    const [balances] = await db.query(
      `
      SELECT id, user_id, balance, currency, updated_at
      FROM user_balances
      WHERE user_id = ?
      LIMIT 1
      `,
      [userId]
    );

    const [points] = await db.query(
      `
      SELECT id, user_id, total_points, updated_at
      FROM user_points
      WHERE user_id = ?
      LIMIT 1
      `,
      [userId]
    );

    const [vehicles] = await db.query(
      `
      SELECT 
        id,
        user_id,
        plate_number,
        vehicle_type,
        fuel_type,
        is_subsidized,
        qr_code,
        status,
        created_at,
        updated_at
      FROM vehicles
      WHERE user_id = ?
      ORDER BY created_at DESC
      `,
      [userId]
    );

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
      LIMIT 5
      `,
      [userId]
    );

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
      LIMIT 5
      `,
      [userId]
    );

    const [notifications] = await db.query(
      `
      SELECT
        id,
        user_id,
        title,
        message,
        is_read,
        created_at
      FROM notifications
      WHERE user_id = ?
      ORDER BY created_at DESC
      LIMIT 5
      `,
      [userId]
    );

    const [unreadNotifications] = await db.query(
      `
      SELECT COUNT(*) AS total_unread
      FROM notifications
      WHERE user_id = ? AND is_read = false
      `,
      [userId]
    );

    return res.json({
      success: true,
      message: "Data dashboard berhasil diambil",
      data: {
        user: req.user,
        balance: balances[0] || {
          user_id: userId,
          balance: 0,
          currency: "IDR",
        },
        points: points[0] || {
          user_id: userId,
          total_points: 0,
        },
        vehicles,
        recent_transactions: transactions,
        vouchers,
        notifications,
        unread_notifications: unreadNotifications[0].total_unread,
      },
    });
  } catch (error) {
    console.error("Get dashboard error:", error);

    return res.status(500).json({
      success: false,
      message: "Terjadi kesalahan pada server",
    });
  }
};

module.exports = {
  getDashboard,
};