let btn = document.querySelector("button");

btn.onclick = function () {
    let input = document.querySelector(".shipping-info [name='full-name']");
    if (input != null) {
        let val = input.value;
        if (val.length === 0) {
            let tooltip = document.querySelector(".shipping-info [name='full-name'] + .input-tooltip");
            tooltip.classList.add("visible");
        }
    }
}
