const { test, expect } = require("@playwright/test")
require('dotenv').config();
const token = process.env.TOKEN;

test.describe('Get', () => {
    test('get Home ShoppingMall',async ({request})=>{
        const ShoppingMallResponse = await request.get('https://shop.eco-deals.com/services/api/v1/product/shopping-mall', {
            headers: {
              'Content-type':'application/json',
              'Cookie' : `jwt=${token}`,
              'Authorization': `Bearer ${token}`  // ส่ง Token ใน Authorization header
            }
          });
          const body = await ShoppingMallResponse.json();
          expect(body[0]).toHaveProperty("name");
          expect(body[0]).toHaveProperty("description");
          expect(body[0]).toHaveProperty("image");

          const status = ShoppingMallResponse.status();
          expect(status).toBe(200);
    })
})

