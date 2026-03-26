const db = require("../config/db");

const Khoa = {
  // lấy tất cả khoa
  getAll: (callback) => {
    db.query("SELECT * FROM khoa", callback);
  },

  // lấy theo mã khoa
  getById: (maKhoa, callback) => {
    db.query("SELECT * FROM khoa WHERE maKhoa = ?", [maKhoa], callback);
  },

  // thêm khoa
  create: (data, callback) => {
    const sql = `
        INSERT INTO khoa (maKhoa, tenKhoa, email, sdt, TruongKhoa)
        VALUES (?, ?, ?, ?,?)
      `;

    db.query(
      sql,
      [data.maKhoa, data.tenKhoa, data.sdt, data.email, data.TruongKhoa],
      (err) => {
        if (err) return callback(err);

        // lấy lại dữ liệu vừa thêm
        db.query(
          "SELECT * FROM khoa WHERE maKhoa = ?",
          [data.maKhoa],
          (err, result) => {
            if (err) return callback(err);
            callback(null, result[0]);
          },
        );
      },
    );
  },

  // cập nhật khoa
  update: (maKhoa, data, callback) => {
    const sql = `
        UPDATE khoa
        SET tenKhoa = ?, sdt = ?, truongKhoa = ?
        WHERE maKhoa = ?
      `;

    db.query(sql, [data.tenKhoa, data.sdt, data.truongKhoa, maKhoa], (err) => {
      if (err) return callback(err);

      // lấy dữ liệu sau khi update
      db.query(
        "SELECT * FROM khoa WHERE maKhoa = ?",
        [maKhoa],
        (err, result) => {
          if (err) return callback(err);
          callback(null, result[0]);
        },
      );
    });
  },

  // xóa
  delete: (maKhoa, callback) => {
    db.query("DELETE FROM khoa WHERE maKhoa = ?", [maKhoa], callback);
  },

  // tìm kiếm
  search: (keyword, callback) => {
    const sql = `
        SELECT * FROM khoa
        WHERE maKhoa LIKE ? OR tenKhoa LIKE ?
      `;

    db.query(sql, [`%${keyword}%`, `%${keyword}%`], callback);
  },
};

module.exports = Khoa;
