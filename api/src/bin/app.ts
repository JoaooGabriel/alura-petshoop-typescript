import express from 'express';

import ProviderRouter from '@router/ProviderRoutes';
import ProductRouter from '@router/ProductRoutes';

const app = express();

app.use(express.json());
app.use('/api/v1/', ProviderRouter);
app.use('/api/v1/', ProductRouter);

export default app;