import express, { Express, Request, Response } from 'express';
import 'dotenv/config';
import { AppDataSource } from './data-source';
import webhookRouter from './routes/webhook-routes';

const app: Express = express();
const port = process.env.PORT ?? 3000;

app.use(webhookRouter);

app.get('/', (req: Request, res: Response) => {
	res.send('Express + TypeScript Server');
});

app.listen(port, () => {
	console.log(`[server]: Server is running at http://localhost:${port}`);
});

AppDataSource.initialize()
	.then(() => {
		console.log('Database initialized successfully!');
	})
	.catch((error) => console.log(error));
