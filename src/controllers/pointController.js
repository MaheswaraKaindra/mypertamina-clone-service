const db = require("../config/db");

const getPoints = async (req, res) => {
  try {
    const [points] = await db.query(
      `
      SELECT id, user_id, total_points, updated_at
      FROM user_points
      WHERE user_id = ?
      LIMIT 1
      `,
      [req.user.id]
    );

    if (points.length === 0) {
      return res.json({
        success: true,
        message: "Poin belum tersedia",
        data: {
          points: {
            user_id: req.user.id,
            total_points: 0,
          },
        },
      });
    }

    return res.json({
      success: true,
      message: "Data poin berhasil diambil",
      data: {
        points: points[0],
      },
    });
  } catch (error) {
    console.error("Get points error:", error);

    return res.status(500).json({
      success: false,
      message: "Terjadi kesalahan pada server",
    });
  }
};

module.exports = {
  getPoints,
};