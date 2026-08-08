import { createUser, deleteUser, getUser, updateUser } from "../contorllers/userController.js";
import express from 'express';

const userRouter = express.Router();
userRouter.post('/create', createUser);
userRouter.get('/getusers', getUser);
userRouter.delete('/:id', deleteUser);
userRouter.put('/:id', updateUser);

export default userRouter;