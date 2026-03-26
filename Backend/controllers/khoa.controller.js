const Khoa = require("../models/KhoaModel");

exports.getAll = (req, res) => {
  Khoa.getAll((err, results) => {
    if (err) return res.status(500).json(err);
    res.json(results);
  });
};

exports.getById = (req, res) => {
  Khoa.getById(req.params.id, (err, result) => {
    if (err) return res.status(500).json(err);
    res.json(result);
  });
};

exports.create = (req, res) => {
  Khoa.create(req.body, (err, dl) => {
    if (err)
      return res.status(500).json({
        seccess: false,
        message: err.message,
      });
    res.json({ seccess: true, message: "Thêm thành công", data: dl });
  });
};

exports.update = (req, res) => {
  Khoa.update(req.params.id, req.body, (err) => {
    if (err) return res.status(500).json(err);
    res.json({ message: "Cập nhật thành công" });
  });
};

exports.delete = (req, res) => {
  Khoa.delete(req.params.id, (err) => {
    if (err) return res.status(500).json(err);
    res.json({ message: "Xoá thành công" });
  });
};
