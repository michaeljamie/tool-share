const fns = require('./functions');



test('test', ()=>{
    let answer = fns.test();
    expect(answer).toBe('test')
})

test('user data should exist', ()=>{
    let answer = fns.getUser();
    expect(answer).toBeDefined()
})

test('zipcode should be 5 digits', ()=>{
    let answer = fns.getZip();
    expect(answer.length).toBe(5)
})