const { test, expect } = require("@playwright/test")
require('dotenv').config();
const token = process.env.TOKEN;
let Categortids;

test.describe('Get', () => {
    test('get Cart CategorybyId',async ({request})=>{
        const CategoryResponse = await request.get('https://shop.eco-deals.com/services/api/v1/product/category', {
          headers: {
            'Content-type':'application/json',
            'Cookie' : `jwt=${token}`,
            'Authorization': `Bearer ${token}`  // ส่ง Token ใน Authorization header
          }
        });
        const CategoryResponsebody = await CategoryResponse.json();
        expect(CategoryResponsebody[0]).toHaveProperty("id");
        Categortids = CategoryResponsebody[0].id;

        const categorybyIdResponse = await request.get(`https://shop.eco-deals.com/services/api/v1/product/category/${Categortids}`, {
            headers: {
              'Content-type':'application/json',
              'Cookie' : `jwt=${token}`,
              'Authorization': `Bearer ${token}`// ส่ง Token ใน Authorization header
            }
          });
          const body = await categorybyIdResponse.json();
          expect(body[0]).toHaveProperty("code");
          expect(body[0]).toHaveProperty("name");
          expect(body[0]).toHaveProperty("description");
          expect(body[0]).toHaveProperty("price");
          expect(body[0]).toHaveProperty("rating");
          expect(body[0]).toHaveProperty("image");
          
          const status = categorybyIdResponse.status();
          expect(status).toBe(200);
    })
})

