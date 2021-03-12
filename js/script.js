let btns = document.querySelectorAll(".btn");
let inputs = document.querySelectorAll(".input-required");

btns.forEach(function (b, i) {
    b.addEventListener('click', btnClickHandler);
});

inputs.forEach(function (inp) {
    inp.addEventListener('input', function () {
        inp.classList.remove('input-warning');
        let tooltip = inp.closest(".input-container").querySelector('.input-tooltip');
        if (tooltip) {
            tooltip.classList.remove("visible");
        }
    })
})


function btnClickHandler(e) {
    e.preventDefault();
    let slide = this.closest('.form-slide');
    let inputs = slide.querySelectorAll(".input-required");
    inputs.forEach(function (inp, ind) {
        let val = inp.value;
        if (val.length === 0) {
            inp.classList.add('input-warning');
        } else {
            inp.classList.remove('input-warning');
        }
    })

    let firstEmpty = slide.querySelector('.input-warning');
    let tooltip = firstEmpty.closest(".input-container").querySelector('.input-tooltip');
    if (tooltip) {
        tooltip.classList.add("visible");
    }


}

