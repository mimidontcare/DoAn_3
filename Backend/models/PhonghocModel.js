const db = require("../config/db");

const Phonghoc = {
  getAll: (callback) => {
    db.query("SELECT * FROM phonghoc", callback);
  },

  getById: (id, callback) => {
    db.query("SELECT * FROM phonghoc WHERE maPhongHoc=?", [id], callback);
  },

  create: (data, callback) => {
    db.query("INSERT INTO phonghoc (maPhongHoc, TenPhong, sucChua, trangThai) VALUES (?, ?, ?, ?)",
      [data.maPhongHoc, data.TenPhong, data.sucChua, data.trangThai],
      callback
    );
  },

  update: (id, data, callback) => {
    db.query("UPDATE phonghoc SET sucChua=?, TenPhong=?, trangThai=? WHERE maPhongHoc=?", [data.sucChua, data.TenPhong, data.trangThai, id],
      callback
    );
  },

  delete: (id, callback) => {
    db.query("DELETE FROM phonghoc WHERE maPhongHoc=?", [id], callback);
  },

  search: (keyword, callback) => {
    db.query("SELECT * FROM phonghoc WHERE TenPhong LIKE ?", [`%${keyword}%`], callback);
  }
};

module.exports = Phonghoc;
