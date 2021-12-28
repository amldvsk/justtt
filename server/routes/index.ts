import * as express from 'express';
import { TransactionsCtrl } from './transactions.ctrl';
import {
  validateGetTransaction,
  validateCreateTransaction,
  validateDeleteTransaction,
  validateUpdateTransaction,
} from '../middlewares/transactions.validator';
const router: express.Router = express.Router();

router.get('/', TransactionsCtrl.getAll);
router.get('/:transaction_id', validateGetTransaction, TransactionsCtrl.get);
router.post('/', validateCreateTransaction, TransactionsCtrl.create);
router.post('/:transaction_id', validateUpdateTransaction, TransactionsCtrl.update);
router.delete('/:transaction_id', validateDeleteTransaction, TransactionsCtrl.delete);

export { router as indexRouter };
