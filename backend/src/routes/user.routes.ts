import { Router } from 'express';
import {
getUsers,
createUser
} from '../controllers/user.controller';
import {authMiddleware} from '../middleware/auth.middleware';
import {adminMiddleware} from '../middleware/admin.middleware';
const router = Router();
// Com  autentificacao e admin
//router.get('/', [authMiddleware, adminMiddleware],getUsers);
//router.post('/', [authMiddleware, adminMiddleware],createUser);

router.get('/',getUsers);
router.post('/',createUser);

export default router;
