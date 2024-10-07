const { test, expect } = require("@playwright/test")
const signinAPIRequestBody = require('../test-data/post-password-body.json')
let token;
let ShoppingmallProductId;

test.describe('Post', () => {
    test('get Product Shopping-Mall By Is ',async ({request})=>{
        const Loginresponse = await request.post('https://shop.eco-deals.com/services/api/v1/sign-in',{
            data : signinAPIRequestBody
        });
        const loginData = await Loginresponse.json();
        expect(loginData).toHaveProperty('token');
        token = loginData.token;

        const recommendedResponse = await request.get('https://shop.eco-deals.com/services/api/v1/product/shopping-mall', {
          headers: {
            'Content-type':'application/json',
            'Cookie' : `jwt=${token}`,
            'Authorization': `Bearer ${token}`  // ส่ง Token ใน Authorization header
          }
        });
        const bodyShoppingMall = await recommendedResponse.json();
        expect(bodyShoppingMall[0]).toHaveProperty("id");
        ShoppingmallProductId = bodyShoppingMall[0].id;
       
        const ShoppingmallResponse = await request.get(`https://shop.eco-deals.com/services/api/v1/product/shopping-mall/${ShoppingmallProductId}`, {
            headers: {
              'Content-type':'application/json',
              'Cookie' : `jwt=${token}`,
              'Authorization': `Bearer ${token}`  // ส่ง Token ใน Authorization header
            }
          });
          const body = await ShoppingmallResponse.json();
          expect(body[0]).toHaveProperty("code");
          expect(body[0]).toHaveProperty("name");
          expect(body[0]).toHaveProperty("description");
          expect(body[0]).toHaveProperty("price");
          expect(body[0]).toHaveProperty("rating");
          expect(body[0]).toHaveProperty("image");
          
          const status = ShoppingmallResponse.status();
          expect(status).toBe(200);
    })
})

