const yInput = document.getElementById("input-y");
const yInputWarning = document.getElementById("input-y-warning");
const submit = document.getElementById("form-submit");

function validate(e) {
    // Clear warning text
    yInputWarning.innerHTML = "";
    yInputWarning.classList.add("hidden");
    submit.disabled = false;

    let value = parseFloat(yInput.value);
    console.log(value);

    if (Number.isNaN(value) || value < -5 || value > 5) {
        yInputWarning.innerHTML = "Invalid Y value. It should be a float from -5 to 5 (Inclusive)";
        yInputWarning.classList.remove("hidden");     
        submit.disabled = true;
    }
}

yInput.addEventListener('input', validate);
yInput.dispatchEvent(new InputEvent('input'));