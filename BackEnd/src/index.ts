import express from 'express';
import { writeFile } from 'fs/promises';
import { join } from 'path';
const app = express();
app.use(express.json());

type BodyJson = {
	image: string
}

(async () => {

app.post('/upload', (req, res) => {
	const jsonData: BodyJson = req.body;
	const rawData = jsonData.image;
	const buff = Buffer.from(rawData, 'base64');
	const path = join(__dirname, '..', 'images', `${new Date()}.jpg`)

	writeFile(path, buff)
	.then(() => {
		res.status(200);
		res.send();
	})
	.catch(err => {
		console.log(err);
		res.status(500);
		res.send(JSON.stringify({
			error: err
		}))
	})
})

app.listen(3000, () => console.log('Listening on port 3000'));
})();
