const { test, expect } = require("@playwright/test")
const signinAPIRequestBody = require('../test-data/post-password-body.json')
const CartorderInput = require('../test-data/post-cart-order-body.json')
let token;

test.describe('Post', () => {
    test('Post Cart orders',async ({request})=>{
        const Loginresponse = await request.post('https://shop.eco-deals.com/services/api/v1/sign-in',{
            data : signinAPIRequestBody
        });
        const loginData = await Loginresponse.json();
        expect(loginData).toHaveProperty('token');
        token = loginData.token;

        const CartOrdersResponse = await request.post('https://shop.eco-deals.com/services/api/v1/orders', {
            headers: {
              'content-type':'application/json',
              'Authorization': `Bearer ${token}`  // ส่ง Token ใน Authorization header
            },
            data : CartorderInput
          });
          const body = await CartOrdersResponse.json();
          expect(body).toHaveProperty("message","Product Order Successful");

          const status = CartOrdersResponse.status();
          expect(status).toBe(200);
    })
})

