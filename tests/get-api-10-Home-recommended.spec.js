const { test, expect } = require("@playwright/test")
require('dotenv').config();
const token = process.env.TOKEN;

test.describe('Get', () => {
    test('get Home recommended',async ({request})=>{
        const recommendedResponse = await request.get('https://shop.eco-deals.com/services/api/v1/product/recommended', {
            headers: {
              'Content-type':'application/json',
              'Cookie' : `jwt=${token}`,
              'Authorization': `Bearer ${token}`  // ส่ง Token ใน Authorization header
            }
          });
          const body = await recommendedResponse.json();
          expect(body[0]).toHaveProperty("code");
          expect(body[0]).toHaveProperty("name");
          expect(body[0]).toHaveProperty("description");
          expect(body[0]).toHaveProperty("price");
          expect(body[0]).toHaveProperty("rating");
          expect(body[0]).toHaveProperty("image");
          
          const status = recommendedResponse.status();
          expect(status).toBe(200);
    })
})

