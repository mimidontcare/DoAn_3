const Diemdanh = require("../models/DiemdanhModel");

exports.getAll = (req, res) => {
  Diemdanh.getAll((err, results) => {
    if (err) return res.status(500).json(err);
    res.json(results);
  });
};

exports.getById = (req, res) => {
  Diemdanh.getById(req.params.id, (err, result) => {
    if (err) return res.status(500).json(err);
    res.json(result);
  });
};

exports.create = (req, res) => {
  Diemdanh.create(req.body, (err) => {
    if (err) return res.status(500).json(err);
    res.json({ message: "Thêm thành công" });
  });
};

exports.update = (req, res) => {
  Diemdanh.update(req.params.id, req.body, (err) => {
    if (err) return res.status(500).json(err);
    res.json({ message: "Cập nhật thành công" });
  });
};

exports.delete = (req, res) => {
  Diemdanh.delete(req.params.id, (err) => {
    if (err) return res.status(500).json(err);
    res.json({ message: "Xoá thành công" });
  });
};
