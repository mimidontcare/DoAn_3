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
    db.query("UPDATE sinhvien SET maSV=?, TenSinhVien=?, ngaySinh=?, gioiTinh=?, email=?, sdt=?, queQuan=?, maLop=? WHERE maSinhVien=?", [data.maSV, data.TenSinhVien, data.ngaySinh, data.gioiTinh, data.email, data.sdt, data.queQuan, data.maLop, id],
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
