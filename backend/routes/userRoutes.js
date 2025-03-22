import { Router } from 'express';
const router = Router()
import { verifyIsLoggedIn, verifyIsAdmin } from "../middleware/verifyAuthToken";
import { getUsers, registerUser, loginUser, updateUserProfile, getUserProfile, writeReview, getUser, updateUser, deleteUser } from "../controllers/userController";

router.post("/register", registerUser)
router.post("/login", loginUser)

// user logged in routes:
router.use(verifyIsLoggedIn);
router.put("/profile", updateUserProfile);
router.get('/profile/:id', getUserProfile)
router.post('/review/:productId', writeReview)

// admin routes:
router.use(verifyIsAdmin);
router.get("/", getUsers)
router.get("/:id", getUser);
router.put('/:id', updateUser)
router.delete('/:id', deleteUser)

export default router