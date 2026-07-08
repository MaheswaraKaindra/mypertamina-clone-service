const db = require("../config/db");

const getVehicles = async (req, res) => {
  try {
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
      [req.user.id]
    );

    return res.json({
      success: true,
      message: "Data kendaraan berhasil diambil",
      data: {
        vehicles,
      },
    });
  } catch (error) {
    console.error("Get vehicles error:", error);

    return res.status(500).json({
      success: false,
      message: "Terjadi kesalahan pada server",
    });
  }
};

module.exports = {
  getVehicles,
};