const fns = require('./functions');

test('test', ()=>{
    let answer = fns.test();
    expect(answer).toBe('test')
})

test('user data should exist', ()=>{
    let answer = fns.getUser();
    expect(answer).toBeDefined()
})

test('zipcode should be defined', ()=>{
    let answer = fns.getZip();
    expect(typeof answer).toBeDefined()
})

test('toolsWithSameType should have length of 2', ()=>{
    let answer = fns.filter();
    expect(answer.length).toBe(2)
})

test('state should update to correct value', ()=>{
    let answer = fns.modifyState();
    expect(answer).toEqual({a: 1, b: 3, c: 4})
})

test('tag should be drill', ()=>{
    expect.assertions(1)
    return fns.getTag(2).then(data =>{
    expect(data).toBeDefined()
    })
})


