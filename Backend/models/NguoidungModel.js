const db = require("../config/db");

const Nguoidung = {
  getAll: (callback) => {
    db.query("SELECT * FROM nguoidung", callback);
  },

  getById: (id, callback) => {
    db.query("SELECT * FROM nguoidung WHERE DiaChi=?", [id], callback);
  },

  getByEmail: (email, callback) => {
    db.query("SELECT * FROM nguoidung WHERE Email=?", [email], callback);
  },

  create: (data, callback) => {
    db.query(
      "INSERT INTO nguoidung (Email, Loai, MaNguoiDung, MatKhau, SDT) VALUES (?, ?, ?, ?, ?)",
      [data.Email, data.Loai, data.MaNguoiDung, data.MatKhau, data.SDT],
      callback,
    );
  },

  update: (id, data, callback) => {
    db.query(
      "UPDATE nguoidung SET Email=?, Loai=?, MaNguoiDung=?, MatKhau=?, SDT=? WHERE DiaChi=?",
      [data.Email, data.Loai, data.MaNguoiDung, data.MatKhau, data.SDT, id],
      callback,
    );
  },

  delete: (id, callback) => {
    db.query("DELETE FROM nguoidung WHERE DiaChi=?", [id], callback);
  },

  search: (keyword, callback) => {
    db.query(
      "SELECT * FROM nguoidung WHERE Email LIKE ?",
      [`%${keyword}%`],
      callback,
    );
  },
};

module.exports = Nguoidung;
