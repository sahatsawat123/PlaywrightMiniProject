const { test, expect } = require("@playwright/test")
const signinAPIRequestBody = require('../test-data/post-password-body.json')
const AddressBodyInput = require('../test-data/post-address-body.json')
let token;

test.describe('Post', () => {
    test('Post Address address',async ({request})=>{
        const Loginresponse = await request.post('https://shop.eco-deals.com/services/api/v1/sign-in',{
            data : signinAPIRequestBody
        });
        const loginData = await Loginresponse.json();
        expect(loginData).toHaveProperty('token');
        token = loginData.token;

        const AddressBodyResponse = await request.post('https://shop.eco-deals.com/services/api/v1/address', {
            headers: {
              'content-type':'application/json',
              'Authorization': `Bearer ${token}`  // ส่ง Token ใน Authorization header
            },
            data : AddressBodyInput
          });
          const body = await AddressBodyResponse.json();
          expect(body).toHaveProperty("message","Create Address Successful");

          const status = AddressBodyResponse.status();
          expect(status).toBe(200);
    })
})

