import express from 'express';
import Client from '../models/client.js';
import protect from '../middleware/protect.js';

const router = express.Router();
router.use(protect);           

router.get('/', async (_req, res) => {
  res.json(await Client.find().sort({ createdAt: -1 }));
});

router.post('/', async (req, res) => {
  const cli = await Client.create(req.body);
  res.json(cli);
});

router.put('/:id', async (req, res) => {
  const cli = await Client.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.json(cli);
});

router.delete('/:id', async (req, res) => {
  await Client.findByIdAndDelete(req.params.id);
  res.json({ msg: 'Cancellato' });
});

export default router;
