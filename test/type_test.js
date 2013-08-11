"use strict";

var should = require('should'),
    Type = require('../tmp/type');

function Person(name){
    this.type = 'person';
    this.name = name || 'anonymous';
}

var Str = Type.Str;
var Num = Type.Num;

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
        describe('getPerson with "p3"', function(){
            it('throw error', function (done) {
                e.message.should.equal('Unexpected result, expecting ' + Per.typeName);
                done();
            });
        });
    }

    try{
        var StrOrNum = Type.any(Str, Num);
        var StrOrNum2 = Type.any('StrOrNum2', Str, Num);
        throw 'ok';
    }catch(e){
        describe('any: Str or Num => StrOrNum', function(){
            it('throw ok', function (done) {
                e.should.equal('ok');
                done();
            });
        });
    }

    var addToStr = Str(function(a, b){
        return a + b;
    }, StrOrNum, StrOrNum);

    var addToStr2 = Str(function(a, b){
        return a + b;
    }, StrOrNum2, StrOrNum2);

    var result;

    try{
        result = addToStr(1, true);
        throw 'ok';
    }catch(e){
        describe('addToStr with 1, true', function(){
            it('throw error', function (done) {
                e.message.should.equal(
                    'Unexpected argument, expecting ' +
                    StrOrNum.typeName +
                    ' (arg[' + 1 + '])'
                );
                done();
            });
        });
    }

    try{
        addToStr2(1, true);
        throw 'ok';
    }catch(e){
        describe('addToStr2 with 1, true', function(){
            it('throw error', function (done) {
                e.message.should.equal(
                    'Unexpected argument, expecting ' +
                    'StrOrNum2' +
                    ' (arg[' + 1 + '])'
                );
                done();
            });
        });
    }

    try{
        result = addToStr(1, 2);
        throw 'ok';
    }catch(e){
        describe('addToStr with 1, 2', function(){
            it('throw error', function (done) {
                e.message.should.equal('Unexpected result, expecting ' + Str.typeName);
                done();
            });
        });
    }

    try{
        result = addToStr(1, '2');
        throw 'ok';
    }catch(e){
        describe('addToStr with 1, "2"', function(){
            it('throw ok & returns "12"', function (done) {
                e.should.equal('ok');
                result.should.equal('12');
                done();
            });
        });
    }

    try{
        result = addToStr('1', '2');
        throw 'ok';
    }catch(e){
        describe('addToStr with "1", "2"', function(){
            it('throw ok & returns "12"', function (done) {
                e.should.equal('ok');
                result.should.equal('12');
                done();
            });
        });
    }
});