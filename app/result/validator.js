'use strict';

function validate(result, cb) {
    var errors = [];
    if(result.first.trim()){
        if(isNaN(result.first.trim())){
            errors.push(new Error("First Ranker should be a number."));
        }
    } else {
        errors.push(new Error("First Ranker is Required."));
    }

    if(result.second.trim()){
        if(isNaN(result.second.trim())){
            errors.push(new Error("Second Ranker should be a number."));
        }
    } else{
        errors.push(new Error("Second Ranker is Required."));
    }

    if(result.third.trim()){
        if(isNaN(result.third.trim())){
            errors.push(new Error("Third Ranker should be a number."));
        }
    } else{
        errors.push(new Error("Third Ranker is Required."));
    }

    if(errors.length > 0){
        cb(errors);
    } else {
        cb();
    }
}

module.exports = validate;