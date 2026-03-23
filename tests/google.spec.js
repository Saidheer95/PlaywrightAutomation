const {test,expect} = require('@playwright/test')

test("verify the application",async({page})=>{
      
    await page.goto("https://vportal-uat.aqaar.com")

    const url=await page.url()

    console.log("Title is "+url)

    const title=await page.title()

    console.log("Titile is "+ title)

})