const { test, expect } = require("@playwright/test")
require('dotenv').config();
const token = process.env.TOKEN;

test.describe('Get', () => {
    test('get Address address',async ({request})=>{
        const addressResponse = await request.get('https://shop.eco-deals.com/services/api/v1/address', {
            headers: {
              'Content-type':'application/json',
              'Cookie' : `jwt=${token}`,
              'Authorization': `Bearer ${token}`// ส่ง Token ใน Authorization header
            }
          });
          const body = await addressResponse.json();
          expect(body[0]).toHaveProperty("first_name");
          expect(body[0]).toHaveProperty("last_name");
          expect(body[0]).toHaveProperty("mobile");
          expect(body[0]).toHaveProperty("address");
          expect(body[0]).toHaveProperty("type");
          
          const status = addressResponse.status();
          expect(status).toBe(200);
    })
})

