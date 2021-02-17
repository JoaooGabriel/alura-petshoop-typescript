import { Router } from 'express';

import ProductController from '@controllers/ProductController';

const router = Router();

router.post('/products/sell/:id', ProductController.sell);
router.post('/products', ProductController.store);
router.get('/products', ProductController.index);
router.get('/products/:id', ProductController.show);
router.get('/products/providers/:id', ProductController.showByProvidersId);
router.get('/products/:idProc/providers/:idProv', ProductController.showProductByProvidersId);
router.put('/products/:id', ProductController.update);
router.delete('/products/:id', ProductController.delete);

export default router;