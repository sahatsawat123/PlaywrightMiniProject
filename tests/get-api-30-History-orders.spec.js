const { test, expect } = require("@playwright/test")
const signinAPIRequestBody = require('../test-data/post-password-body.json')
let token;

test.describe('Get', () => {
    test('get History Orders',async ({request})=>{
        const Loginresponse = await request.post('https://shop.eco-deals.com/services/api/v1/sign-in',{
            data : signinAPIRequestBody
        });
        const loginData = await Loginresponse.json();
        expect(loginData).toHaveProperty('token');
        token = loginData.token;

        const HistoryOrdersResponse = await request.get('https://shop.eco-deals.com/services/api/v1/orders', {
            headers: {
              'Content-type':'application/json',
              'Cookie' : `jwt=${token}`,
              'Authorization': `Bearer ${token}`// ส่ง Token ใน Authorization header
            }
          });
          const body = await HistoryOrdersResponse.json();
          expect(body[0]).toHaveProperty("price");
          expect(body[0]).toHaveProperty("quantity");
          expect(body[0]).toHaveProperty("order_date");
          expect(body[0]).toHaveProperty("product_code");
          expect(body[0]).toHaveProperty("product_name");
          expect(body[0]).toHaveProperty("product_description");
          expect(body[0]).toHaveProperty("product_rating");
          expect(body[0]).toHaveProperty("product_image");

          const status = HistoryOrdersResponse.status();
          expect(status).toBe(200);
    })
})

