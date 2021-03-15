let btns = document.querySelectorAll(".btn");
let inputs = document.querySelectorAll(".input-required");
let slideOrder = ['shipping', 'billing', 'payment'];
let copyBtn = document.querySelector('#copy-data');
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

copyBtn.addEventListener('click', function () {
    let inputs = document.querySelectorAll('[data-copy]');
    inputs.forEach(function (input) {
        let copyName = input.dataset.copy;
        if (input.value.length !== 0) {
            let pasteInput = document.querySelector(`[data-paste="${copyName}"]`);
            if (pasteInput !== null) {
                pasteInput.value = input.value;
            }
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
    // Եթե դատարկ input կա -> ցույց տուր tooltip-ը
    if (firstEmpty != null) {
        let tooltip = firstEmpty.closest(".input-container").querySelector('.input-tooltip');
        if (tooltip) {
            tooltip.classList.add("visible");
        }
    } else {
        openNextSlide();
    }
}

function openNextSlide() {
    let currentVisible = document.querySelector('.form-slide.visible');
    if (currentVisible == null) {
        console.log("No any visible slides");
        return;
    }
    let slide = currentVisible.dataset.slide;
    let index = slideOrder.indexOf(slide);
    if (slideOrder[index + 1] !== undefined) {
        let nextSlide = document.querySelector(`[data-slide="${slideOrder[index + 1]}"]`);
        if (nextSlide !== null) {
            currentVisible.classList.remove('visible');
            nextSlide.classList.add('visible');

            let nextSlideNav = document.querySelector(`[data-slide-nav="${slideOrder[index + 1]}"]`);
            if (nextSlideNav !== null) {
                document.querySelector(`[data-slide-nav="${slide}"]`).classList.remove('font-purple');
                nextSlideNav.classList.add('font-purple');
            }
        }
    }
}
