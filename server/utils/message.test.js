var expect = require('expect');
var {generateMessage} = require('./message');

describe('generateMessage',() => {
    it('should generate the correct message object', () =>{
        var from = 'Jen';
        var text = 'Some message';
        var message = generateMessage(from,text);

        // expect(message.createdAt).to.be.a('number');
        // expect(message).toInclude({from,text});
        
        // store res in variable
        // assert from match
        // assert text match
        // assert createdAt is number
    })
})