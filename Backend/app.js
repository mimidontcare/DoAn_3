require("dotenv").config();

const express = require("express");
const cors = require("cors");

const { verifyToken } = require("./middleware/auth.middleware");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static("public"));

// ===== PUBLIC ROUTE =====
app.use("/api/auth", require("./routes/auth.route"));

// ===== PROTECTED ROUTE =====
app.use("/api", verifyToken); // middleware and jwt

app.use("/api/nguoidung", require("./routes/nguoidung.route"));
app.use("/api/bangdiem", require("./routes/bangdiem.route"));
app.use("/api/dangkyhocphan", require("./routes/dangkyhocphan.route"));
app.use("/api/diemdanh", require("./routes/diemdanh.route"));
app.use("/api/khoa", require("./routes/khoa.route"));
app.use("/api/lophocphan", require("./routes/lophocphan.route"));
app.use("/api/monhoc", require("./routes/monhoc.route"));
app.use("/api/phonghoc", require("./routes/phonghoc.route"));
app.use("/api/sinhvien", require("./routes/sinhvien.route"));
app.use("/api/lichhoc", require("./routes/lichhoc.route"));
app.use("/api/lophanhchinh", require("./routes/lophanhchinh.route"));
app.use("/api/lichthi", require("./routes/lichthi.route"));
app.use("/api/nganh", require("./routes/nganh.route"));
app.use("/api/giangvien", require("./routes/giangvien.route"));
app.use("/api/daudiem", require("./routes/daudiem.route"));

app.listen(5000, () => {
  console.log("🚀 Server running on port 5000");
});
