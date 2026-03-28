const Monhoc = require("../models/MonhocModel");

exports.getAll = (req, res) => {
  Monhoc.getAll((err, results) => {
    if (err) return res.status(500).json(err);
    res.json(results);
  });
};

exports.getById = (req, res) => {
  Monhoc.getById(req.params.id, (err, result) => {
    if (err) return res.status(500).json(err);
    res.json(result);
  });
};

exports.create = (req, res) => {
  Monhoc.create(req.body, (err) => {
    if (err) return res.status(500).json(err);
    res.json({ message: "Thêm thành công" });
  });
};

exports.update = (req, res) => {
  Monhoc.update(req.params.id, req.body, (err) => {
    if (err) return res.status(500).json(err);
    res.json({ message: "Cập nhật thành công" });
  });
};

exports.delete = (req, res) => {
  Monhoc.delete(req.params.id, (err) => {
    if (err) return res.status(500).json(err);
    res.json({ message: "Xoá thành công" });
  });
};
