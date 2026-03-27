const Nganh = require("../models/NganhModel");

exports.getAll = (req, res) => {
  Nganh.getAll((err, results) => {
    if (err) return res.status(500).json(err);
    res.json(results);
  });
};

exports.getById = (req, res) => {
  Nganh.getById(req.params.id, (err, result) => {
    if (err) return res.status(500).json(err);
    res.json(result);
  });
};

exports.create = (req, res) => {
  Nganh.create(req.body, (err) => {
    if (err) return res.status(500).json(err);
    res.json({ message: "Thêm thành công" });
  });
};

exports.update = (req, res) => {
  Nganh.update(req.params.id, req.body, (err) => {
    if (err) return res.status(500).json(err);
    res.json({ message: "Cập nhật thành công" });
  });
};

exports.delete = (req, res) => {
  Nganh.delete(req.params.id, (err) => {
    if (err) return res.status(500).json(err);
    res.json({ message: "Xoá thành công" });
  });
};
