import { Router } from 'express';
import {
getUsers,
createUser,
deleteUser,
changePassword
} from '../controllers/user.controller';
import {authMiddleware} from '../middleware/auth.middleware';
import {adminMiddleware} from '../middleware/admin.middleware';
const router = Router();

router.get('/', [authMiddleware, adminMiddleware],getUsers);
router.post('/', [authMiddleware, adminMiddleware],createUser);
router.post('/delete', [authMiddleware, adminMiddleware],deleteUser);
router.post('/changePass', [authMiddleware, adminMiddleware],changePassword);

export default router;
