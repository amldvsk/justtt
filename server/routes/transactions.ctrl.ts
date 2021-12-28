import * as express from 'express';
import { TransactionSrv } from '../services/transaction.srv';

const response = (res: express.Response, status: number, success: boolean, data: any, msg = '') => {
  return res.status(status).json({
    success,
    data,
    msg,
  });
};

class TransactionsCtrl {
  static async getAll(req: express.Request, res: express.Response) {
    try {
      return response(res, 200, true, await TransactionSrv.getAll(+(req.query?.limit || 10), +(req.query?.page || 1)));
    } catch (error: any) {
      console.error(error);
      if (error.search('not found')) {
        return response(res, 404, false, {}, error);
      }
      return response(res, 500, false, {}, 'error');
    }
  }
  static async get(req: express.Request, res: express.Response) {
    try {
      return response(res, 200, true, await TransactionSrv.get(+req.params.transaction_id));
    } catch (error: any) {
      console.error(error);
      if (error.search('not found')) {
        return response(res, 404, false, {}, error);
      }
      return response(res, 500, false, {}, 'error');
    }
  }
  static async create(req: express.Request, res: express.Response) {
    try {
      return response(res, 200, true, await TransactionSrv.create(req.body));
    } catch (error) {
      console.error(error);
      return response(res, 500, false, {}, 'error');
    }
  }
  static async update(req: express.Request, res: express.Response) {
    try {
      return response(res, 200, true, await TransactionSrv.update(+req.params.transaction_id, req.body), '');
    } catch (error) {
      console.error(error);
      return response(res, 500, false, {}, 'error');
    }
  }
  static async delete(req: express.Request, res: express.Response) {
    try {
      return response(res, 200, true, await TransactionSrv.delete(+req.params.transaction_id));
    } catch (error) {
      console.error(error);
      return response(res, 500, false, {}, 'error');
    }
  }
}

export { TransactionsCtrl };
