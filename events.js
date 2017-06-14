const events = require('events');
const util = require('util');

function Person(){
    this.name = 'ayan';

    this.changeName = function(){
        this.emit('nameChange');
    }

    this.showName = function(){
        console.log('name: ',this.name);
    }

    this.on('nameChange',function(){
        this.name = 'dalal';
        console.log('name changed');
    });
}

util.inherits(Person,events);

let ayan = new Person();
setTimeout(function(){
    
    ayan.changeName();
    ayan.showName();
},3000);

ayan.showName();
