"use strict";

var should = require('should'),
    Type = require('../tmp/type');

function Person(name){
    this.type = 'person';
    this.name = name || 'anonymous';
}

var Str = Type.Str;

describe('Type', function(){

    try{
        var Per = Type.define('PERSON', function(p){
            return p && p.type === 'person' && p.name;
        });
        throw 'ok';
    }catch(e){
        describe('define PERSON', function(){
            it('works well', function (done) {
                e.should.equal('ok');
                Per.constructor.should.equal(Type);
                done();
            });
        });
    }

    var ps = {
        p1: new Person('p1'),
        p2: new Person('p2'),
        p3: null
    }

    try{
        var getPerson = Per(function(name){
            return ps[name];
        }, Str);
        throw 'ok';
    }catch(e){
        describe('create func getPerson', function(){
            it('works well', function (done) {
                e.should.equal('ok');
                getPerson.constructor.should.equal(Function);
                done();
            });
        });
    }

    try{
        var p1 = getPerson('p1');
        throw 'ok';
    }catch(e){
        describe('getPerson with "p1"', function(){
            it('gets p1', function (done) {
                e.should.equal('ok');
                p1.should.equal(ps.p1);
                done();
            });
        });
    }

    try{
        var p = getPerson(1);
        throw 'ok';
    }catch(e){
        console.log(p,e.message);
        describe('getPerson with "1"', function(){
            it('throw error', function (done) {
                e.message.should.equal(
                    'Unexpected argument, expecting ' +
                    Str.typeName +
                    ' (arg[' + 0 + '])'
                );
                done();
            });
        });
    }

    try{
        var p3 = getPerson('p3');
        throw 'ok';
    }catch(e){
        console.log(p3,e.message);
        describe('getPerson with "p3"', function(){
            it('throw error', function (done) {
                e.message.should.equal('Unexpected result, expecting ' + Per.typeName);
                done();
            });
        });
    }

});