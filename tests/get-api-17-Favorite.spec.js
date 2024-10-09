const { test, expect } = require("@playwright/test")
require('dotenv').config();
const token = process.env.TOKEN;

test.describe('Get', () => {
    test('get Favorite favorite',async ({request})=>{
            const ProductResponse = await request.get('https://shop.eco-deals.com/services/api/v1/product/favorite', {
            headers: {
              'Content-type':'application/json',
              'Cookie' : `jwt=${token}`,
              'Authorization': `Bearer ${token}`  // ส่ง Token ใน Authorization header
            }
          });
          const body = await ProductResponse.json();
          expect(body[0]).toHaveProperty("price");
          expect(body[0]).toHaveProperty("quantity");
          expect(body[0]).toHaveProperty("favorite_date");
          expect(body[0]).toHaveProperty("product_code");
          expect(body[0]).toHaveProperty("product_name");
          expect(body[0]).toHaveProperty("product_description");
          expect(body[0]).toHaveProperty("product_rating");
          expect(body[0]).toHaveProperty("product_image");
          
          const status = ProductResponse.status();
          expect(status).toBe(200);
    })
})

