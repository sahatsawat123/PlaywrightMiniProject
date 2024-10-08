const { test, expect } = require("@playwright/test")
const signinAPIRequestBody = require('../test-data/post-password-body.json')
const PatchAddressBody = require('../test-data/patch-address-body.json')
let token;

test.describe('Patch', () => {
    test('patch Address address',async ({request})=>{
        const Loginresponse = await request.post('https://shop.eco-deals.com/services/api/v1/sign-in',{
            data : signinAPIRequestBody
        });
        const loginData = await Loginresponse.json();
        expect(loginData).toHaveProperty('token');
        token = loginData.token;

        const PatchAddressResponse = await request.patch('https://shop.eco-deals.com/services/api/v1/address/4', {
            headers: {
              'content-type':'application/json',
              'Authorization': `Bearer ${token}`  // ส่ง Token ใน Authorization header
            },
            data : PatchAddressBody
          });
        const body = await PatchAddressResponse.json();
        expect(body).toHaveProperty("message","Update Address Sucesssful")
        
        const status = PatchAddressResponse.status();
        expect(status).toBe(200);
    })
})

