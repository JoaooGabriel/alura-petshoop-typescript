import { Router } from 'express';

import ProductController from '@controllers/ProductController';

const router = Router();

router.post('/products', ProductController.store);
router.get('/products', ProductController.index);
router.get('/products/:id', ProductController.show);
router.get('/products/providers/:id', ProductController.showByProvidersId);
router.put('/products', ProductController.update);
router.delete('/products/:id/providers/:id', ProductController.delete);

export default router;