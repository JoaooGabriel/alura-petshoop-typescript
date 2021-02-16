import { Router } from 'express';
import ProviderController from '@controllers/ProviderController';

const router = Router();

router.post('/providers', ProviderController.store);
router.get('/providers', ProviderController.index);
router.get('/providers/:id', ProviderController.show);
router.put('/providers/:id', ProviderController.update);
router.delete('/providers/:id', ProviderController.delete);

export default router;