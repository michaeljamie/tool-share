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

    test('tags should exist', ()=>{
        let answer = fns.getTags();
        expect(answer).toBeDefined()
    })

    test('tag should be object', ()=>{
        let answer = fns.getTags();
        expect(typeof answer).toBe('object')
    })

    test('tag should be type boolean', ()=>{
        expect.assertions(1);
        return fns.getTagById(1).then(answer=>{
            expect(typeof answer[0].drill).toBe('boolean')
        })
    })
    test('tag drill should be true', ()=>{
        expect.assertions(1);
        return fns.getTagById(8).then(answer=>{
            expect(answer[0].drill).toBe(true)
        })
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

describe("Sean Kidwell's Tests:", () => {

    test('users listed tools should be defined', () => {
        return fns.getUsersListedTools(4).then(data => {
            expect(data).toBeDefined();
        })
    })

    test('users listed tools should be an array', () => {
        return fns.getUsersListedTools(4).then(data => {
            expect(Array.isArray(data)).toEqual(true)
        })
    })

    test('users listed tools should have a length', () => {
        return fns.getUsersListedTools(4).then(data => {
            expect.anything(data.length)
        })
    })

    test('if user has a tool listed, tool should be an object', () => {
        return fns.getUsersListedTools(4).then(data => {
            if (data.length>=1) {
                expect(typeof data[0]).toBe('object')
            }
        })
    })

    test('if user has a tool listed, tool should have tool_id property', () => {
        return fns.getUsersListedTools(4).then(data => {
            if (data.length>=1) {
                expect(data[0].tool_id).toBeDefined();
            }
        })
    })

});

describe('Eric Olsen Tests:', () => {
    test('Fetch All Users & Data', () => {
        return fns.getAllUsers().then(data => {
        expect(data[0]).toBeDefined();
        })
    })
    
    test('getAllUsers should retrieve array', () => {
        return fns.getAllUsers().then(data => {
        expect(Array.isArray(data)).toEqual(true);
        })
    })

    test('getAllUsers test array should have length', () => {
        return fns.getAllUsers().then(data => {
            expect.anything(data.length);
        })
    })

    test('getAllUsers test should return username', () => {
        return fns.getAllUsers().then(data => {
            if (data.length>=1) {
                expect(typeof data[0]).toBe('object')
            };
        })
    })

    test('getAllUsers test should return fullname', () => {
        return fns.getAllUsers().then(data => {
            if (data.length>=1) {
                expect(data[0].userid).toBeDefined();
            };
        })
    })

});

describe('Sam Johnston Tests:', () => {
    test('Fetch Dates for tool with id 6', () => {
        return fns.getDates().then(data => {
        expect(data[0]).toBeDefined();
        })
    })
    
    test('Check that data is an array', () => {
        return fns.getDates().then(data => {
        expect(Array.isArray(data)).toEqual(true);
        })
    })

    test('Data array should have length', () => {
        return fns.getDates().then(data => {
            expect.anything(data.length);
        })
    })

    test('Data returned should be an array with at least one object', () => {
        return fns.getDates().then(data => {
            if (data.length>=1) {
                expect(typeof data[0]).toBe('object')
            };
        })
    })

    test('Make sure data is returning object with correct key', () => {
        return fns.getDates().then(data => {
            if (data.length>=1) {
                expect(data[0].return_date).toBeDefined();
            };
        })
    })

});