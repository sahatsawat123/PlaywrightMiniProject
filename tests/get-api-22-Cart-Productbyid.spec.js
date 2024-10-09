const { test, expect } = require("@playwright/test")
require('dotenv').config();
const token = process.env.TOKEN;
let Productids;

test.describe('Get', () => {
    test('get Cart ProductbyId',async ({request})=>{
        const ProductResponse = await request.get('https://shop.eco-deals.com/services/api/v1/product', {
          headers: {
            'Content-type':'application/json',
            'Cookie' : `jwt=${token}`,
            'Authorization': `Bearer ${token}`  // ส่ง Token ใน Authorization header
          }
        });
        const ProductResponsebody = await ProductResponse.json();
        expect(ProductResponsebody[0]).toHaveProperty("id");
        Productids = ProductResponsebody[0].id;

        const ProductbyIdResponse = await request.get(`https://shop.eco-deals.com/services/api/v1/product/category/${Productids}`, {
            headers: {
              'Content-type':'application/json',
              'Cookie' : `jwt=${token}`,
              'Authorization': `Bearer ${token}`// ส่ง Token ใน Authorization header
            }
          });
          const body = await ProductbyIdResponse.json();
          expect(body[0]).toHaveProperty("code");
          expect(body[0]).toHaveProperty("name");
          expect(body[0]).toHaveProperty("description");
          expect(body[0]).toHaveProperty("price");
          expect(body[0]).toHaveProperty("rating");
          expect(body[0]).toHaveProperty("image");
          
          const status = ProductbyIdResponse.status();
          expect(status).toBe(200);
    })
})

