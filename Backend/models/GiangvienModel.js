const db = require("../config/db");

const Giangvien = {
  getAll: (callback) => {
    db.query("SELECT * FROM giangvien", callback);
  },

  getById: (id, callback) => {
    db.query("SELECT * FROM giangvien WHERE maGiangVien=?", [id], callback);
  },

  create: (data, callback) => {
    db.query("INSERT INTO giangvien (Khoa, maGiangVien, MaNguoiDung, Mon, NgaySinh, TenGiangVien, TrinhDo) VALUES (?, ?, ?, ?, ?, ?, ?)",
      [data.Khoa, data.maGiangVien, data.MaNguoiDung, data.Mon, data.NgaySinh, data.TenGiangVien, data.TrinhDo],
      callback
    );
  },

  update: (id, data, callback) => {
    db.query(
      "UPDATE giangvien SET Khoa=?, MaNguoiDung=?, Mon=?, NgaySinh=?, TenGiangVien=?, TrinhDo=? WHERE maGiangVien=?",
      [
        data.Khoa,
        data.MaNguoiDung,
        data.Mon,
        data.NgaySinh,
        data.TenGiangVien,
        data.TrinhDo,
        id,
      ],
      callback
    );
  },

  delete: (id, callback) => {
    db.query("DELETE FROM giangvien WHERE maGiangVien=?", [id], callback);
  },

  search: (keyword, callback) => {
    db.query("SELECT * FROM giangvien WHERE Khoa LIKE ?", [`%${keyword}%`], callback);
  }
};

module.exports = Giangvien;
