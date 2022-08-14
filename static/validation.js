'use strict';

const FLOAT_REGEX = /^-?\d+(?:\.\d+)?$/
const yInput = document.getElementById("input-y");
const yInputWarning = document.getElementById("input-y-warning");
const formElement = document.getElementById("form");
const rInputWarning = document.getElementById("input-r-warning");
const submit = document.getElementById("form-submit");

const submitButtonEnabler = {
    _xValid: true,
    _yValid: true,
    _rValid: true,
    set xValid(valid) {
        this._xValid = valid;
        this.switchButtonEnabled();
    },
    set yValid(valid) {
        this._yValid = valid;
        this.switchButtonEnabled();
    },
    set rValid(valid) {
        this._rValid = valid;
        this.switchButtonEnabled();
    },
    switchButtonEnabled: function() {
        submit.disabled = !(this._xValid && this._yValid && this._rValid);
    }
}

function hideWarning(elem) {
    elem.innerHTML = "";
    elem.classList.add("hidden");
}

function showWarning(elem, text) {
    elem.innerHTML = text;
    elem.classList.remove("hidden");
}

function validateY(e) {
    // Clear warning text
    hideWarning(yInputWarning);
    submitButtonEnabler.yValid = true;
    const value = parseFloat(yInput.value);

    if (!FLOAT_REGEX.test(yInput.value) || value < -5 || value > 5) {
        showWarning(yInputWarning, "Invalid Y value. It should be a float from -5 to 5 (Inclusive)");  
        submitButtonEnabler.yValid = false;
    }
}

yInput.addEventListener('input', validateY);
yInput.dispatchEvent(new InputEvent('input'));

function validateForm(e) {
    const formData = new FormData(formElement);
    
    // Validate R
    submitButtonEnabler.rValid = true;

    hideWarning(rInputWarning);
    if (!formData.has('r')) {
        showWarning(rInputWarning, "Please select a value for R");
        submitButtonEnabler.rValid = false;
    }
}

formElement.addEventListener('change', validateForm);
formElement.dispatchEvent(new Event('change'));