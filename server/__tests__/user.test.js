const supertest = require('supertest')
const app = require('../server')

describe("User", () => {
    describe("get user route", () => {
        describe("given the user", () => {
            it("should return a 200", async () => {
                
                await supertest(app).get('/users/get').expect(200);

            })
        })
    })
})