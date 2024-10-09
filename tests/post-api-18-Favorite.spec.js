const { test, expect } = require("@playwright/test")
const favoriteAPIInputBody = require('../test-data/post-favorite-body.json')
require('dotenv').config();
const token = process.env.TOKEN;

test.describe('Post', () => {
    test('post favorite body',async ({request})=>{
        const PostfavoriteResponse = await request.post('https://shop.eco-deals.com/services/api/v1/product/favorite', {
            headers: {
              'content-type':'application/json',
              'Authorization': `Bearer ${token}`  // ส่ง Token ใน Authorization header
            },
            data : favoriteAPIInputBody
          });
          const body = await PostfavoriteResponse.json();
          expect(body).toHaveProperty("message","Create Favorite Successful")

          const status = PostfavoriteResponse.status();
          expect(status).toBe(200);
    })
})

