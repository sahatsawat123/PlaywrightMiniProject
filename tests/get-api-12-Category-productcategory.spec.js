const { test, expect } = require("@playwright/test")
const signinAPIRequestBody = require('../test-data/post-password-body.json')
let token;
let categoryid;

test.describe('Get', () => {
    test('get Product Category By Id',async ({request})=>{
        const Loginresponse = await request.post('https://shop.eco-deals.com/services/api/v1/sign-in',{
            data : signinAPIRequestBody
        });
        const loginData = await Loginresponse.json();
        expect(loginData).toHaveProperty('token');
        token = loginData.token;

        const CategoryResponse = await request.get('https://shop.eco-deals.com/services/api/v1/product/category', {
          headers: {
            'Content-type':'application/json',
            'Cookie' : `jwt=${token}`,
            'Authorization': `Bearer ${token}`  // ส่ง Token ใน Authorization header
          }
        });
        const bodycategory = await CategoryResponse.json();
        expect(bodycategory[0]).toHaveProperty('id');
        categoryid = bodycategory[0].id;

        const ProductCategorybyIdResponse = await request.get(`https://shop.eco-deals.com/services/api/v1/product/category/${categoryid}`, {
            headers: {
              'Content-type':'application/json',
              'Cookie' : `jwt=${token}`,
              'Authorization': `Bearer ${token}`  // ส่ง Token ใน Authorization header
            }
          });
          const body = await ProductCategorybyIdResponse.json();
          expect(body[0]).toHaveProperty("code");
          expect(body[0]).toHaveProperty("name");
          expect(body[0]).toHaveProperty("description");
          expect(body[0]).toHaveProperty("price");
          expect(body[0]).toHaveProperty("rating");
          expect(body[0]).toHaveProperty("image");
          
          const status = ProductCategorybyIdResponse.status();
          expect(status).toBe(200);
    })
})

