const Phonghoc = require("../models/PhonghocModel");

exports.getAll = (req, res) => {
  Phonghoc.getAll((err, results) => {
    if (err) return res.status(500).json(err);
    res.json(results);
  });
};

exports.getById = (req, res) => {
  Phonghoc.getById(req.params.id, (err, result) => {
    if (err) return res.status(500).json(err);
    res.json(result);
  });
};

exports.create = (req, res) => {
  Phonghoc.create(req.body, (err) => {
    if (err) return res.status(500).json(err);
    res.json({ message: "Thêm thành công" });
  });
};

exports.update = (req, res) => {
  Phonghoc.update(req.params.id, req.body, (err) => {
    if (err) return res.status(500).json(err);
    res.json({ message: "Cập nhật thành công" });
  });
};

exports.delete = (req, res) => {
  Phonghoc.delete(req.params.id, (err) => {
    if (err) return res.status(500).json(err);
    res.json({ message: "Xoá thành công" });
  });
};
