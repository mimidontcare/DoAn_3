const db = require("../config/db");

const Nganh = {
  getAll: (callback) => {
    db.query("SELECT * FROM nganh", callback);
  },

  getById: (id, callback) => {
    db.query("SELECT * FROM nganh WHERE maKhoa=?", [id], callback);
  },

  create: (data, callback) => {
    db.query("INSERT INTO nganh (maNganh, soTinChi, tenNganh, trinhDoDaoTao) VALUES (?, ?, ?, ?)",
      [data.maNganh, data.soTinChi, data.tenNganh, data.trinhDoDaoTao],
      callback
    );
  },

  update: (id, data, callback) => {
    db.query("UPDATE nganh SET maNganh=?, soTinChi=?, tenNganh=?, trinhDoDaoTao=? WHERE maKhoa=?", [data.maNganh, data.soTinChi, data.tenNganh, data.trinhDoDaoTao, id],
      callback
    );
  },

  delete: (id, callback) => {
    db.query("DELETE FROM nganh WHERE maKhoa=?", [id], callback);
  },

  search: (keyword, callback) => {
    db.query("SELECT * FROM nganh WHERE maNganh LIKE ?", [`%${keyword}%`], callback);
  }
};

module.exports = Nganh;
