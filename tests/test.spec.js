import { test } from '@playwright/test';

function checkmarks(marks){
    if (marks>=40){
        console.log("Pass");
    } else {
        console.log("Fail");
    }
}

test('Sample Test', async () => {
    const marks = 14; // Example marks
    checkmarks(marks);
})