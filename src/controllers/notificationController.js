const db = require("../config/db");

const getNotifications = async (req, res) => {
  try {
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
      `,
      [req.user.id]
    );

    return res.json({
      success: true,
      message: "Data notifikasi berhasil diambil",
      data: {
        notifications,
      },
    });
  } catch (error) {
    console.error("Get notifications error:", error);

    return res.status(500).json({
      success: false,
      message: "Terjadi kesalahan pada server",
    });
  }
};

module.exports = {
  getNotifications,
};