const db = require("../config/db");

const Lichthi = {
  getAll: (callback) => {
    db.query("SELECT * FROM lichthi", callback);
  },

  getById: (id, callback) => {
    db.query("SELECT * FROM lichthi WHERE maLichThi=?", [id], callback);
  },

  create: (data, callback) => {
    db.query("INSERT INTO lichthi (gioThi, hinhThucThi, maLichThi, MaLopPhan, maPhong, NgayThi, phongHoc) VALUES (?, ?, ?, ?, ?, ?, ?)",
      [data.gioThi, data.hinhThucThi, data.maLichThi, data.MaLopPhan, data.maPhong, data.NgayThi, data.phongHoc],
      callback
    );
  },

  update: (id, data, callback) => {
    db.query("UPDATE lichthi SET gioThi=?, hinhThucThi=?, MaLopPhan=?, maPhong=?, NgayThi=?, phongHoc=? WHERE maLichThi=?", [data.gioThi, data.hinhThucThi, data.MaLopPhan, data.maPhong, data.NgayThi, data.phongHoc, id],
      callback
    );
  },

  delete: (id, callback) => {
    db.query("DELETE FROM lichthi WHERE maLichThi=?", [id], callback);
  },

  search: (keyword, callback) => {
    db.query("SELECT * FROM lichthi WHERE gioThi LIKE ?", [`%${keyword}%`], callback);
  }
};

module.exports = Lichthi;
