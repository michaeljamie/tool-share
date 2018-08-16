const fns = require("./functions");

test('test', ()=>{
    let answer = fns.test();
    expect(answer).toBe('test')
})