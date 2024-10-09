const { test, expect } = require("@playwright/test")
const CartInputBody = require('../test-data/post-api-cart-body.json')
require('dotenv').config();
const token = process.env.TOKEN;

test.describe('Post', () => {
    test('Post Cart cart',async ({request})=>{
        const PostCartResponse = await request.post('https://shop.eco-deals.com/services/api/v1/cart', {
            headers: {
              'content-type':'application/json',
              'Authorization': `Bearer ${token}`  // ส่ง Token ใน Authorization header
            },
            data : CartInputBody
          });
          const body = await PostCartResponse.json();
          expect(body).toHaveProperty("message","Add Product Cart Successful")

          const status = PostCartResponse.status();
          expect(status).toBe(200);
    })
})

