import express from 'express';

import ProviderRouter from '@router/ProviderRoutes';

const app = express();

app.use(express.json());
app.use('/api/v1/', ProviderRouter);

export default app;