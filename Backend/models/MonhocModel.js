const db = require("../config/db");

const Monhoc = {
  getAll: (callback) => {
    db.query("SELECT * FROM monhoc", callback);
  },

  getById: (id, callback) => {
    db.query("SELECT * FROM monhoc WHERE maMonHoc=?", [id], callback);
  },

  create: (data, callback) => {
    db.query("INSERT INTO monhoc (maNganh, soTiet, soTinChi, tenMonHoc, thuTuUtien) VALUES (?, ?, ?, ?, ?)",
      [data.maNganh, data.soTiet, data.soTinChi, data.tenMonHoc, data.thuTuUtien],
      callback
    );
  },

  update: (id, data, callback) => {
    db.query("UPDATE monhoc SET maMonHoc=?, TenMonHoc=?, soTinChi=?, loaiMonHoc=? WHERE MaMonHoc=?", [data.maMonHoc, data.TenMonHoc, data.soTinChi, data.loaiMonHoc, id],
      callback
    );
  },

  delete: (id, callback) => {
    db.query("DELETE FROM monhoc WHERE maMonHoc=?", [id], callback);
  },

  search: (keyword, callback) => {
    db.query("SELECT * FROM monhoc WHERE maNganh LIKE ?", [`%${keyword}%`], callback);
  }
};

module.exports = Monhoc;
