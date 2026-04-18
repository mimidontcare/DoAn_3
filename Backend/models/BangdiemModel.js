const { get } = require("../app");
const db = require("../config/db");

const Bangdiem = {
  getAll: (callback) => {
    db.query("SELECT * FROM bangdiem", callback);
  },

  getById: (id, callback) => {
    db.query("SELECT * FROM bangdiem WHERE Diem = ?", [id], callback);
  },

  create: (data, callback) => {
    db.query("INSERT INTO bangdiem (MaBD, MaDD, maLopHP, MaMonHoc, MaSinhVien) VALUES (?, ?, ?, ?, ?)",
      [data.MaBD, data.MaDD, data.maLopHP, data.MaMonHoc, data.MaSinhVien],
      callback
    );
  },

  update: (id, data, callback) => {
    db.query("UPDATE bangdiem SET MaBD=?, MaDD=?, maLopHP=?, MaMonHoc=?, MaSinhVien=? WHERE Diem=?", [data.MaBD, data.MaDD, data.maLopHP, data.MaMonHoc, data.MaSinhVien, id],
      callback
    );
  },

  delete: (id, callback) => {
    db.query("DELETE FROM bangdiem WHERE Diem=?", [id], callback);
  },

  search: (keyword, callback) => {
    db.query("SELECT * FROM bangdiem WHERE MaBD LIKE ?", [`%${keyword}%`], callback);
  }
};

module.exports = Bangdiem;
