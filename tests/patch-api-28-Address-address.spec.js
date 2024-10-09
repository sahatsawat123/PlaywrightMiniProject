const { test, expect } = require("@playwright/test")
const PatchAddressBody = require('../test-data/patch-address-body.json')
require('dotenv').config();
const token = process.env.TOKEN;

test.describe('Patch', () => {
    test('patch Address address',async ({request})=>{
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

