const { test, expect } = require("@playwright/test")
require('dotenv').config();
const token = process.env.TOKEN;
let Productbodyids;

test.describe('Get', () => {
    test('get Product by id ',async ({request})=>{
        const ProductResponse = await request.get('https://shop.eco-deals.com/services/api/v1/product', {
          headers: {
            'Content-type':'application/json',
            'Cookie' : `jwt=${token}`,
            'Authorization': `Bearer ${token}`  // ส่ง Token ใน Authorization header
          }
        });
        const Productbody = await ProductResponse.json();
        expect(Productbody[0]).toHaveProperty("id");
        Productbodyids = Productbody[0].id;

        const ProductResponseId = await request.get(`https://shop.eco-deals.com/services/api/v1/product/${Productbody[0].id}`, {
            headers: {
              'Content-type':'application/json',
              'Cookie' : `jwt=${token}`,
              'Authorization': `Bearer ${token}`  // ส่ง Token ใน Authorization header
            }
          });
          const body = await ProductResponseId.json();
          expect(body[0]).toHaveProperty("code");
          expect(body[0]).toHaveProperty("name");
          expect(body[0]).toHaveProperty("description");
          expect(body[0]).toHaveProperty("price");
          expect(body[0]).toHaveProperty("rating");
          expect(body[0]).toHaveProperty("image");

          const status = ProductResponse.status();
          expect(status).toBe(200);
    })
})

