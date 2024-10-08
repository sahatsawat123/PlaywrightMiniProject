const { test, expect } = require("@playwright/test")
const signinAPIRequestBody = require('../test-data/post-password-body.json')
const CartInputBody = require('../test-data/post-api-cart-body.json')
let token;

test.describe('Post', () => {
    test('Post Cart cart',async ({request})=>{
        const Loginresponse = await request.post('https://shop.eco-deals.com/services/api/v1/sign-in',{
            data : signinAPIRequestBody
        });
        const loginData = await Loginresponse.json();
        expect(loginData).toHaveProperty('token');
        token = loginData.token;

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

