import { Router } from 'express'
const router = Router()
import { getCategories, newCategory, deleteCategory, saveAttr } from "../controllers/categoryController"
import { verifyIsLoggedIn, verifyIsAdmin } from "../middleware/verifyAuthToken"

router.get("/", getCategories)

router.use(verifyIsLoggedIn)
router.use(verifyIsAdmin)
router.post("/", newCategory)
router.delete("/:category", deleteCategory)
router.post("/attr", saveAttr)

export default router
