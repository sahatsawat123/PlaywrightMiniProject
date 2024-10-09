const { test, expect } = require("@playwright/test")
require('dotenv').config();
const token = process.env.TOKEN;

test.describe('Get', () => {
    test('get Home category',async ({request})=>{
        const HomeCategoryResponse = await request.get('https://shop.eco-deals.com/services/api/v1/product/category', {
            headers: {
              'Content-type':'application/json',
              'Cookie' : `jwt=${token}`,
              'Authorization': `Bearer ${token}`  // ส่ง Token ใน Authorization header
            }
          });
          const body = await HomeCategoryResponse.json();
          expect(body[0]).toHaveProperty("name");
          expect(body[0]).toHaveProperty("description");
          expect(body[0]).toHaveProperty("image");

          const status = HomeCategoryResponse.status();
          expect(status).toBe(200);
    })
})

