'use strict';

/**
 * Validate method
 * This method is used for validating the bet object. Bet object has
 * childs product, selections and stake. If validation fails return errros
 * in next(errors), otherwise call next() function.
 * @method
 * @param {Bet} bet - represents Bet object
 * @param {function} next - represents Calback function
 */
function validate(bet, cb) {
    var errors = [];
    if(bet.product.trim()){
        var validProducts = ["W", "P", "E"];  // Accepted Products
        if(validProducts.indexOf(bet.product.trim())  < 0){
            errors.push(new Error("Select Product from W, P or E."));
        }
    } else {
        errors.push(new Error("Product is Required."));
    }

    if(bet.selections.trim()){
        //Exacta bet selection has format - {{1,2}}
        if( 'E' === bet.product.trim() && bet.selections.trim().split(",").length !== 2 ) {   
            errors.push(new Error('Exacta bet selections should be <number>,<number> format.'));
        }
        if('E' !== bet.product.trim() && bet.selections.trim().split(",").length !== 1){
            errors.push(new Error('Selections should be a number format.'));
        }
        if(!isValidSelections(bet.selections.trim())){
            errors.push(new Error('Selections value is not valid.'));
        }
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
    return /[1-9][0-9]*,[1-9][0-9]*|[1-9][0-9]*/.test(value);  //Regex for matching selections input
}

module.exports = validate;