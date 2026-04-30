const db = require("../config/db");

const Nganh = {
  getAll: (callback) => {
    db.query("SELECT * FROM nganh", callback);
  },

  getById: (id, callback) => {
    db.query("SELECT * FROM nganh WHERE maNganh=?", [id], callback);
  },

  create: (data, callback) => {
    db.query("INSERT INTO nganh (maNganh, maKhoa, soTinChi, tenNganh, trinhDoDaoTao) VALUES (?, ?, ?, ?, ?)",
      [data.maNganh, data.maKhoa, data.soTinChi, data.tenNganh, data.trinhDoDaoTao],
      callback
    );
  },

  update: (id, data, callback) => {
    db.query("UPDATE nganh SET maKhoa=?, soTinChi=?, tenNganh=?, trinhDoDaoTao=? WHERE maNganh=?", [data.maKhoa, data.soTinChi, data.tenNganh, data.trinhDoDaoTao, id],
      callback
    );
  },

  delete: (id, callback) => {
    db.query("DELETE FROM nganh WHERE maNganh=?", [id], callback);
  },

  search: (keyword, callback) => {
    db.query("SELECT * FROM nganh WHERE maNganh LIKE ?", [`%${keyword}%`], callback);
  }
};

module.exports = Nganh;
