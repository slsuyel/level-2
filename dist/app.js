"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
const port = 3000;
app.use(express_1.default.json());
const userRouter = express_1.default.Router();
const coursesRouter = express_1.default.Router();
app.use('/api/v1/users', userRouter);
app.use('/api/v1/courses', coursesRouter);
userRouter.post('/create-user', (req, res) => {
    const user = req.body;
    console.log(user);
    res.json({
        success: true,
        message: 'user created successfully',
        data: user
    });
});
coursesRouter.post("/create-course", (req, res, next) => {
    try {
        const course = req.body;
        console.log(course);
        res.json({
            success: true,
            message: 'course created successfully',
            data: course
        });
    }
    catch (error) {
        next(error);
    }
});
app.get('/', (req, res) => {
    res.send('Hello developers!');
});
app.post('/', (req, res) => {
    console.log(req.body);
    res.send('data gotted');
});
// route error handleing
app.all('*', function (req, res) {
    res.status(400).json({
        success: false,
        message: 'Route is not found',
    });
});
//global error handler
app.use((error, req, res, next) => {
    console.error(error);
    res.status(500).json({
        success: false,
        message: 'Internal server error',
        error: error.message
    });
});
exports.default = app;
