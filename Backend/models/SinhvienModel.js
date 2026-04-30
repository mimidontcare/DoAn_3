const db = require("../config/db");

const Sinhvien = {
  getAll: (callback) => {
    db.query("SELECT * FROM sinhvien", callback);
  },

  getById: (id, callback) => {
    db.query("SELECT * FROM sinhvien WHERE maSV=?", [id], callback);
  },

  create: (data, callback) => {
    db.query("INSERT INTO sinhvien (Hoten, KhoaHoc, MaLopHC, MaNguoiDung, maSV, NganhHoc, NgaySinh, TrangThai) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
      [data.Hoten, data.KhoaHoc, data.MaLopHC, data.MaNguoiDung, data.maSV, data.NganhHoc, data.NgaySinh, data.TrangThai],
      callback
    );
  },

  update: (id, data, callback) => {
    db.query(
      "UPDATE sinhvien SET Hoten=?, KhoaHoc=?, MaLopHC=?, MaNguoiDung=?, NganhHoc=?, NgaySinh=?, TrangThai=? WHERE maSV=?",
      [
        data.Hoten,
        data.KhoaHoc,
        data.MaLopHC,
        data.MaNguoiDung,
        data.NganhHoc,
        data.NgaySinh,
        data.TrangThai,
        id,
      ],
      callback
    );
  },

  delete: (id, callback) => {
    db.query("DELETE FROM sinhvien WHERE maSV=?", [id], callback);
  },

  search: (keyword, callback) => {
    db.query("SELECT * FROM sinhvien WHERE Hoten LIKE ?", [`%${keyword}%`], callback);
  }
};

module.exports = Sinhvien;
