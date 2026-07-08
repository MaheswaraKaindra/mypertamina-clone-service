const getMe = async (req, res) => {
  return res.json({
    success: true,
    message: "Data user berhasil diambil",
    data: {
      user: req.user,
    },
  });
};

module.exports = {
  getMe,
};