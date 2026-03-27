const db = require("../config/db");

const Lophanhchinh = {
  getAll: (callback) => {
    db.query("SELECT * FROM lophanhchinh", callback);
  },

  getById: (id, callback) => {
    db.query("SELECT * FROM lophanhchinh WHERE khoaHoc=?", [id], callback);
  },

  create: (data, callback) => {
    db.query("INSERT INTO lophanhchinh (MaLopHC, NganhHoc, SISO, TenLop) VALUES (?, ?, ?, ?)",
      [data.MaLopHC, data.NganhHoc, data.SISO, data.TenLop],
      callback
    );
  },

  update: (id, data, callback) => {
    db.query("UPDATE lophanhchinh SET MaLopHC=?, NganhHoc=?, SISO=?, TenLop=? WHERE khoaHoc=?", [data.MaLopHC, data.NganhHoc, data.SISO, data.TenLop, id],
      callback
    );
  },

  delete: (id, callback) => {
    db.query("DELETE FROM lophanhchinh WHERE khoaHoc=?", [id], callback);
  },

  search: (keyword, callback) => {
    db.query("SELECT * FROM lophanhchinh WHERE MaLopHC LIKE ?", [`%${keyword}%`], callback);
  }
};

module.exports = Lophanhchinh;
