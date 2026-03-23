const{test,expect} = require("@playwright/test")

test("My first test page",async function ({page}) {
    //
    expect(100).toBe(100)
})

test("My second test page",async function ({page}) {
    //
    expect(101).toBe(102)
})

test("My third test page",async function ({page}) {
    //
    expect(201).toBe("Sai");
    
})