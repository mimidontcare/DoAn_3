const db = require("../config/db");

const Lichhoc = {
  getAll: (callback) => {
    db.query("SELECT * FROM lichhoc", callback);
  },

  getById: (id, callback) => {
    db.query("SELECT * FROM lichhoc WHERE maLichHoc=?", [id], callback);
  },

  create: (data, callback) => {
    db.query("INSERT INTO lichhoc (maLopPhan, NgayHoc, phongHoc, soTiet) VALUES (?, ?, ?, ?)",
      [data.maLopPhan, data.NgayHoc, data.phongHoc, data.soTiet],
      callback
    );
  },

  update: (id, data, callback) => {
    db.query("UPDATE lichhoc SET maLopPhan=?, NgayHoc=?, phongHoc=?, soTiet=? WHERE maLichHoc=?", [data.maLopPhan, data.NgayHoc, data.phongHoc, data.soTiet, id],
      callback
    );
  },

  delete: (id, callback) => {
    db.query("DELETE FROM lichhoc WHERE maLichHoc=?", [id], callback);
  },

  search: (keyword, callback) => {
    db.query("SELECT * FROM lichhoc WHERE maLopPhan LIKE ?", [`%${keyword}%`], callback);
  }
};

module.exports = Lichhoc;
