// const express = require('express')
import { error } from 'console'
import express, { NextFunction, Request, Response } from 'express'

const app = express()
const port = 3000
app.use(express.json())


const userRouter = express.Router()
const coursesRouter = express.Router()

app.use('/api/v1/users', userRouter)
app.use('/api/v1/courses', coursesRouter)

userRouter.post('/create-user', (req: Request, res: Response) => {
    const user = req.body
    console.log(user);
    res.json({
        success: true,
        message: 'user created successfully',
        data: user
    })

})

coursesRouter.post("/create-course", (req: Request, res: Response, next: NextFunction) => {
    try {
        const course = req.body;
        console.log(course);
        res.json({
            success: true,
            message: 'course created successfully',
            data: course
        });
    } catch (error) {
        next(error);
    }
});


app.get('/', (req: Request, res: Response) => {
    res.send('Hello developers!')
})

app.post('/', (req: Request, res: Response) => {
    console.log(req.body);
    res.send('data gotted')
})

// route error handleing

app.all('*', function (req:Request, res:Response) {
    res.status(400).json({
        success: false,
        message: 'Route is not found',
    });
});



//global error handler
app.use((error: any, req: Request, res: Response, next: NextFunction) => {
    console.error(error);
    res.status(500).json({
        success: false,
        message: 'Internal server error',
        error: error.message
    });
});


export default app