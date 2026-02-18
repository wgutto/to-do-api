import express, { urlencoded } from 'express';
import 'dotenv/config';
import cors from 'cors';
import helmet from 'helmet';
import { mainRouter } from './routes/main';
import passport from 'passport';
import { localStrategy } from './lib/passport/passport-local';

const server = express();
server.use(helmet());
server.use(cors());
server.use(urlencoded({ extended: true }));
server.disable('x-powered-by');
server.use(express.json());

passport.use(localStrategy)
server.use(passport.initialize())

server.use(mainRouter);

const port = process.env.PORT || 3000;
server.listen(port, () => {
    console.log(`🚀 Servidor rodando em http://localhost:${port}`);
})