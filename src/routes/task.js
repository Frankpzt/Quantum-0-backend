const express = require("express");
const {
    getAllTasks,
    addTask,
    getTaskById,
    updateTaskById,
    deleteTaskById,
    getAllTasksByYearAndMonth,
} = require("../controllers/task");

const router = express.Router();

router.post("", addTask);
router.get("", getAllTasks);
router.get("/:taskid", getTaskById);
router.put("/:taskid", updateTaskById);
router.delete("/:taskid", deleteTaskById);
router.get("/year/:year/month/:month", getAllTasksByYearAndMonth);

module.exports = router;
