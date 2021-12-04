const Task = require("../models/task");

async function getAllTasks(req, res) {
    const tasks = await Task.find().exec();
    if (!tasks) {
        return res.status(404).send("Can not find any tasks.");
    }
    return res.status(200).json(tasks);
}

async function addTask(req, res) {
    const { name, start, end, priority, checked, assignee, reporter, note } =
        req.body;
        console.log(req.body);
    if (!start || !end) {
        return res
            .status(403)
            .send(
                "Required type missing, you must specify a start and end date."
            );
    }
    const task = new Task({
        name,
        start,
        end,
        priority,
        checked,
        assignee,
        reporter,
        note,
    });
    console.log(task);
    await task.save();
    return res.status(201).json(task);
}

async function getTaskById(req, res) {
    const { taskid } = req.params;
    if (!taskid) {
        return res.status(403).send("Task id is missing.");
    }
    const task = await Task.findOne({ taskid: taskid }).exec();
    if (!task) {
        return res.sendStatus(404);
    }
    return res.status(200).json(task);
}

async function updateTaskById(req, res) {
    const { taskid } = req.params;
    const { name, start, end, priority, checked, assignee, reporter, note } =
        req.body;
    const task = await Task.findOneAndUpdate(
        { taskid: taskid },
        {
            $set: {
                name,
                start,
                end,
                priority,
                checked,
                assignee,
                reporter,
                note,
            },
        }
    ).exec();
    if (!task) {
        return res
            .status(404)
            .send("The task you are looking for can not be found.");
    }
    return res.status(200).json(task);
}

async function deleteTaskById(req, res) {
    const { taskid } = req.params;
    const task = await Task.findOneAndDelete({ taskid: taskid }).exec();
    if (!task) {
        return res
            .status(404)
            .send("The task you are deleting can not be found.");
    }
    return res
        .status(200)
        .send(task, "The task has been successfully deleted.");
}

async function getAllTasksByYearAndMonth(req, res) {
    const { year, month } = req.params;
    if (!year || !month) {
        return res.status(403).send("Required type missing");
    }
    let yearInt = 0;
    let monthInt = 0;
    try {
        yearInt = parseInt(year);
        monthInt = parseInt(month);
    } catch (e) {
        return res.status(403).send("Required type error");
    }
    if (monthInt < 0 || monthInt > 11) {
        return res.status(403).send("Required type error");
    }
    const startDate = new Date(yearInt, monthInt, 1).toLocaleDateString();
    const endDate = new Date(yearInt, monthInt + 1, 0).toLocaleDateString();
    const tasks = await Task.find({
        start: { $gte: startDate, $lte: endDate },
    });
    return res.status(200).send(tasks);
}

module.exports = {
    getAllTasks,
    addTask,
    getTaskById,
    updateTaskById,
    deleteTaskById,
    getAllTasksByYearAndMonth,
};
