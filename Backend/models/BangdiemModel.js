const db = require("../config/db");

const Bangdiem = {
  getAll: (callback) => {
    db.query("SELECT * FROM bangdiem", callback);
  },

  getById: (id, callback) => {
    db.query("SELECT * FROM bangdiem WHERE MaBD = ?", [id], callback);
  },

  create: (data, callback) => {
    db.query("INSERT INTO bangdiem (MaBD, MaDD, maLopHP, MaMonHoc, MaSinhVien, Diem) VALUES (?, ?, ?, ?, ?, ?)",
      [data.MaBD, data.MaDD, data.maLopHP, data.MaMonHoc, data.MaSinhVien, data.Diem],
      callback
    );
  },

  update: (id, data, callback) => {
    db.query("UPDATE bangdiem SET MaDD=?, maLopHP=?, MaMonHoc=?, MaSinhVien=?, Diem=? WHERE MaBD=?", [data.MaDD, data.maLopHP, data.MaMonHoc, data.MaSinhVien, data.Diem, id],
      callback
    );
  },

  delete: (id, callback) => {
    db.query("DELETE FROM bangdiem WHERE MaBD=?", [id], callback);
  },

  search: (keyword, callback) => {
    db.query("SELECT * FROM bangdiem WHERE MaBD LIKE ?", [`%${keyword}%`], callback);
  }
};

module.exports = Bangdiem;
