const Nguoidung = require("../models/NguoidungModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.login = (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Vui lòng nhập email và mật khẩu" });
  }

  // Lấy User từ DB theo Email
  Nguoidung.getByEmail(email, async (err, result) => {
    if (err) {
      return res.status(500).json({ message: "Lỗi server", error: err });
    }

    if (!result || result.length === 0) {
      return res.status(401).json({ message: "Email không tồn tại" });
    }

    const user = result[0];

    // So sánh mật khẩu
    // Để tương thích với CSDL hiện tại (không rõ bạn đã mã hoá mật khẩu hay chưa), ta kiểm tra 2 trường hợp:
    // 1. Mật khẩu lưu dạng plain text (chưa mã hoá, so sánh trực tiếp)
    // 2. Mật khẩu lưu dạng bcrypt (đã mã hoá, dùng bcrypt.compare)
    let isPasswordValid = false;
    
    // Nếu pass trong db bắt đầu bằng "$2a$" hoặc "$2b$", nó là chuỗi đã băm của bcrypt
    if (user.MatKhau && (user.MatKhau.startsWith("$2a$") || user.MatKhau.startsWith("$2b$") || user.MatKhau.startsWith("$2y$"))) {
        isPasswordValid = await bcrypt.compare(password, user.MatKhau);
    } else {
        // Plain text
        isPasswordValid = (password === user.MatKhau);
    }

    if (!isPasswordValid) {
      return res.status(401).json({ message: "Mật khẩu không chính xác" });
    }

    // Tạo JWT (Json Web Token) chứa thông tin thiết yếu
    const tokenPayload = {
      id: user.DiaChi, // Theo model Nguoidung, primary key được lấy ở DiaChi, hoặc MaNguoiDung. Ta đưa vào tùy ý
      maNguoiDung: user.MaNguoiDung,
      loai: user.Loai,
      email: user.Email
    };

    // Chuẩn bị Secret Key
    const secretKey = process.env.JWT_SECRET || "default_secret_key";
    
    // Sign Token (thời hạn 24 tiếng)
    const token = jwt.sign(tokenPayload, secretKey, { expiresIn: "24h" });

    // Trả về token cho Client
    res.status(200).json({
      message: "Đăng nhập thành công",
      token: token,
      user: {
        email: user.Email,
        maNguoiDung: user.MaNguoiDung,
        loai: user.Loai,
      }
    });
  });
};
