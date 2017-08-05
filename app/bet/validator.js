'use strict';

function validate(bet, cb) {
    var errors = [];
    if(bet.product.trim()){
        var validProducts = ["W", "P", "E"];
        if(validProducts.indexOf(bet.product.trim())  < 0){
            errors.push(new Error("Select Product from W, P or E."));
        }
    } else {
        errors.push(new Error("Product is Required."));
    }

    if(bet.selections.trim()){
        if( 'E' === bet.product.trim() && bet.selections.trim().split(",").length !== 2 ) {
            errors.push(new Error('Exacta bet selections should be <number>,<number> format.'));
        }
        if('E' !== bet.product.trim() && bet.selections.trim().split(",").length !== 1){
            errors.push(new Error('Selections should be a number format.'));
        }
        /*if(!isValidSelections(bet.product.trim())){
            errors.push(new Error('Selections value is not valid.'));
        }*/
    } else{
        errors.push(new Error("Selections is Required."));
    }

    if(bet.stake.trim()){
        if(isNaN(bet.stake.trim())){
            errors.push(new Error("Stake amount should be a number."));
        }
    } else{
        errors.push(new Error("Stake is Required."));
    }

    if(errors.length > 0){
        return cb(errors);
    } else {
        cb();
    }
}

function isValidSelections(value) {
    console.log(/[1-9][0-9]*,[1-9][0-9]*|[1-9][0-9]*/.test(value));
    return /[1-9][0-9]*,[1-9][0-9]*|[1-9][0-9]*/.test(value);
}

module.exports = validate;