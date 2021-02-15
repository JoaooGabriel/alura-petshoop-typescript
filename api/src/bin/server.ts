import app from './app';
import config from '@config/config';

const serverPort = config.serverPort;

app.listen(serverPort, () => {
    console.log(`Servidor online, na porta ${serverPort}`);
});