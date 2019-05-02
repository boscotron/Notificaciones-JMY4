/*!
 * Concomsis JMY
 * Copyright(c) 2009-2019 
 * MIT Licensed
 */
'use strict';

/**
 * Module dependencies.
 */
const XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
const bodyParser = require('body-parser');
const xhr = new XMLHttpRequest();
const _ = require('underscore');
//const localStorage = require('localStorage');

  
/**
 * Module 
 * @public
 */

module.exports = {
    enviar : enviar
};
/**
 * Module variables.
 * @private
 */

function enviar(d=[],a={}){
    return new Promise(
        function(resolve, reject) {           
            var c = {que:d,ola:'que hace'};
            if(1)
                resolve(c);       
            else    
                reject({error:'no funciona'});
        }
    );    
}