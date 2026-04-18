const db = require("../config/db");

const Daudiem = {
  getAll: (callback) => {
    db.query("SELECT * FROM daudiem", callback);
  },

  getById: (id, callback) => {
    db.query("SELECT * FROM daudiem WHERE HeSoDiem=?", [id], callback);
  },

  create: (data, callback) => {
    db.query("INSERT INTO daudiem (loaiDiem, MaDD, moTa, TenDD) VALUES (?, ?, ?, ?)",
      [data.loaiDiem, data.MaDD, data.moTa, data.TenDD],
      callback
    );
  },

  update: (id, data, callback) => {
    db.query("UPDATE daudiem SET loaiDiem=?, MaDD=?, moTa=?, TenDD=? WHERE HeSoDiem=?", [data.loaiDiem, data.MaDD, data.moTa, data.TenDD, id],
      callback
    );
  },

  delete: (id, callback) => {
    db.query("DELETE FROM daudiem WHERE HeSoDiem=?", [id], callback);
  },

  search: (keyword, callback) => {
    db.query("SELECT * FROM daudiem WHERE loaiDiem LIKE ?", [`%${keyword}%`], callback);
  }
};

module.exports = Daudiem;
