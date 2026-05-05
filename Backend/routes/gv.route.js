const express = require("express");
const router = express.Router();
const controller = require("../controllers/gv.controller");

router.get("/dashboard-stats", controller.getDashboardStats);
router.get("/lich-day", controller.getLichDay);
router.get("/dau-diem", controller.getDauDiem);
router.get("/bang-diem/:maLopHP", controller.getBangDiem);
router.post("/luu-diem", controller.luuBangDiem);

module.exports = router;
