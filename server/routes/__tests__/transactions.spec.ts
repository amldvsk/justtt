import request from 'supertest';
const faker = require('faker');
import { app } from '../../app';

describe('CRUD transactions tests', () => {
  it('get all transaction', async () => {
    const res = await request(app).get('/');
    expect(res.body.success).toBeTruthy();
    expect(res.body.data.length).toEqual(10);
  });
  it('get transaction', async () => {
    const res = await request(app).get('/1');
    expect(res.body.success).toBeTruthy();
    expect(res.body.data.active).toBeTruthy();
  });
  it('create transaction', async () => {
    const data = {
      customer_uuid: faker.datatype.uuid(),
      total_price: faker.datatype.number(),
      currency: 'USD',
      credit_card_type: 'VISA',
      credit_card_number: faker.finance.creditCardNumber(),
      first_name: faker.name.firstName(),
      last_name: faker.name.lastName(),
      email: faker.internet.email(),
      gender: faker.name.gender(),
      country: faker.address.county(),
      city: faker.address.city(),
      street: faker.address.streetName(),
      phone: faker.phone.phoneNumber(),
    };
    const res = await request(app).post('/').send(data);
    expect(res.body.success).toBeTruthy();
    expect(res.body.data.transaction_id).toEqual(expect.any(Number));
    expect(res.body.data.transaction_version_id).toEqual(expect.any(Number));
  });

  it('create transaction missing keys', async () => {
    const data = {
      customer_uuid: faker.datatype.uuid(),
      total_price: faker.datatype.number(),
      currency: 'USD',
      credit_card_type: 'VISA',
      credit_card_number: faker.finance.creditCardNumber(),
    };
    const res = await request(app).post('/').send(data).expect(500);
    expect(res.body.success).toBe(false);
  });

  it('update transaction', async () => {
    const total_price = faker.datatype.number();
    const data = {
      customer_uuid: faker.datatype.uuid(),
      total_price: total_price,
      currency: 'USD',
      credit_card_type: 'VISA',
      credit_card_number: faker.finance.creditCardNumber(),
      first_name: faker.name.firstName(),
      last_name: faker.name.lastName(),
      email: faker.internet.email(),
      gender: faker.name.gender(),
      country: faker.address.county(),
      city: faker.address.city(),
      street: faker.address.streetName(),
      phone: faker.phone.phoneNumber(),
    };
    const res = await request(app).post('/').send(data);
    expect(res.body.success).toBeTruthy();
    expect(res.body.data.transaction_id).toEqual(expect.any(Number));
    expect(res.body.data.transaction_version_id).toEqual(expect.any(Number));
    const new_total_price = faker.datatype.number();
    const res2 = await request(app)
      .post(`/${res.body.data.transaction_id}`)
      .send({ ...data, total_price: new_total_price });
    expect(res2.body.success).toBeTruthy();
    const res3 = await request(app).get(`/${res.body.data.transaction_id}`);
    expect(res3.body.success).toBeTruthy();
    expect(res3.body.data.total_price).toEqual(new_total_price);
  });

  it('delete transaction', async () => {
    const total_price = faker.datatype.number();
    const data = {
      customer_uuid: faker.datatype.uuid(),
      total_price: total_price,
      currency: 'USD',
      credit_card_type: 'VISA',
      credit_card_number: faker.finance.creditCardNumber(),
      first_name: faker.name.firstName(),
      last_name: faker.name.lastName(),
      email: faker.internet.email(),
      gender: faker.name.gender(),
      country: faker.address.county(),
      city: faker.address.city(),
      street: faker.address.streetName(),
      phone: faker.phone.phoneNumber(),
    };
    const res = await request(app).post('/').send(data);
    expect(res.body.success).toBeTruthy();
    expect(res.body.data.transaction_id).toEqual(expect.any(Number));
    expect(res.body.data.transaction_version_id).toEqual(expect.any(Number));
    const res2 = await request(app).delete(`/${res.body.data.transaction_id}`);
    expect(res2.body.success).toBeTruthy();
    const res3 = await request(app).get(`/${res.body.data.transaction_id}`);
    expect(res3.status).toEqual(404);
    expect(res3.body.msg).toContain('not found');
    expect(res3.body.success).toBe(false);
  });
});
