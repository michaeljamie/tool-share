const fns = require('./functions');

describe('Stephen Pace Tests:', () => {

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

});

describe('Michael Johnston Tests:', () => {
    test('specific user data should be defined', () => {
        expect.assertions(1);
        return fns.getUserData(1).then(answer => {
        expect(answer[0]).toBeDefined();
        })
    })
    
    test('user should retrieve user object', () => {
        expect.assertions(1);
        return fns.getUserData(1).then(answer => {
        expect(typeof answer[0]).toBe('object');
        })
    })

    test('user test object should have username property', () => {
        expect.assertions(1);
        return fns.getUserData(1).then(answer => {
        expect(answer[0].hasOwnProperty('username')).toBe(true);
        })
    })

    test('user test should return username', () => {
        expect.assertions(1);
        return fns.getUserData(1).then(answer => {
        expect(answer[0].username).toBe('Michael Johnston');
        })
    })

    test('user test should return auth id', () => {
        expect.assertions(1);
        return fns.getUserData(1).then(answer => {
        expect(answer[0].authid).toBe('google-oauth2|108626473693908291643');
        })
    })

});