const Daudiem = require("../models/DaudiemModel");

exports.getAll = (req, res) => {
  Daudiem.getAll((err, results) => {
    if (err) return res.status(500).json(err);
    res.json(results);
  });
};

exports.getById = (req, res) => {
  Daudiem.getById(req.params.id, (err, result) => {
    if (err) return res.status(500).json(err);
    res.json(result);
  });
};

exports.create = (req, res) => {
  Daudiem.create(req.body, (err) => {
    if (err) return res.status(500).json(err);
    res.json({ message: "Thêm thành công" });
  });
};

exports.update = (req, res) => {
  Daudiem.update(req.params.id, req.body, (err) => {
    if (err) return res.status(500).json(err);
    res.json({ message: "Cập nhật thành công" });
  });
};

exports.delete = (req, res) => {
  Daudiem.delete(req.params.id, (err) => {
    if (err) return res.status(500).json(err);
    res.json({ message: "Xoá thành công" });
  });
};
