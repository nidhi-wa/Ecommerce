import { Router } from 'express'
const router = Router()
import getUsers from "../controllers/userController"

router.get("/", getUsers)

export default router