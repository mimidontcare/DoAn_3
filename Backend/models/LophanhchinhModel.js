const db = require("../config/db");

const Lophanhchinh = {
  getAll: (callback) => {
    db.query("SELECT * FROM lophanhchinh", callback);
  },

  getById: (id, callback) => {
    db.query("SELECT * FROM lophanhchinh WHERE MaLopHC=?", [id], callback);
  },

  create: (data, callback) => {
    db.query("INSERT INTO lophanhchinh (MaLopHC, NganhHoc, SISO, TenLop, KhoaHoc, CoVan) VALUES (?, ?, ?, ?, ?, ?)",
      [data.MaLopHC, data.NganhHoc, data.SISO, data.TenLop, data.KhoaHoc, data.CoVan],
      callback
    );
  },

  update: (id, data, callback) => {
    db.query("UPDATE lophanhchinh SET NganhHoc=?, SISO=?, TenLop=?, KhoaHoc=?, CoVan=? WHERE MaLopHC=?", [data.NganhHoc, data.SISO, data.TenLop, data.KhoaHoc, data.CoVan, id],
      callback
    );
  },

  delete: (id, callback) => {
    db.query("DELETE FROM lophanhchinh WHERE MaLopHC=?", [id], callback);
  },

  search: (keyword, callback) => {
    db.query("SELECT * FROM lophanhchinh WHERE MaLopHC LIKE ?", [`%${keyword}%`], callback);
  }
};

module.exports = Lophanhchinh;
