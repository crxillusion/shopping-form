let btns = document.querySelectorAll(".btn");
let inputs = document.querySelectorAll(".input-required");
let slideOrder = ['shipping', 'billing', 'payment'];
let copyBtn = document.querySelector('#copy-data');
let cityImgs = document.querySelectorAll('.get-city');
let userData = {
    city: null,
    country: null
};

btns.forEach(function (b, i) {
    b.addEventListener('click', btnClickHandler);
});

inputs.forEach(function (inp) {
    inp.addEventListener('input', function () {
        removeWarning(inp);
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
                removeWarning(pasteInput);
            }
        }
    })
})

cityImgs.forEach(function (img) {
    img.addEventListener('click', getUserCity);
})

function removeWarning(inp) {
    inp.classList.remove('input-warning');
    let tooltip = inp.closest(".input-container").querySelector('.input-tooltip');
    if (tooltip) {
        tooltip.classList.remove("visible");
    }
}

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

function getCountries() {
    let xhr = new XMLHttpRequest();
    xhr.open('GET', 'https://api.first.org/data/v1/countries?limit=300');
    xhr.send();

    xhr.onload = function () {
        if (xhr.status === 200) {
            let countries = JSON.parse(xhr.response);
            if (countries.data !== undefined) {
                countries = countries.data;
                fillCountries(countries);
            }
        }
    }
}

function fillCountries(data) {
    let countrySelect = document.querySelectorAll('.country-select');
    countrySelect.forEach(function (select) {
        for (let countryCode in data) {
            let option = new Option(data[countryCode].country, data[countryCode].country);
            select.append(option);
        }
    });
    setTimeout(function () {
        toggleLoading(false);
    }, 2000);
}

function toggleLoading(show) {
    let loading = document.querySelector('.loader');
    if (show) {
        loading.classList.remove('hide');
    } else {
        loading.classList.add('hide');
    }
}

function getUserCity() {
    let slide = this.closest('.form-slide');
    slide = slide.dataset.slide;
    if (userData.city == null && userData.country == null) {
        navigator.geolocation.getCurrentPosition(
            function (data) {
                getLocation(data.coords.latitude, data.coords.longitude, slide);
            },
            function () {
                console.log("error");
            })
    } else {
        setCity(userData.city, slide);
        setCountry(userData.country, slide);
    }
}

function getLocation(lat, long, slide) {
    let xhr = new XMLHttpRequest();
    xhr.open('GET',
        `https://api.opencagedata.com/geocode/v1/json?key=042f896117d94d93913ebe09f7309de4&q=${lat}+${long}&pretty=1`)
    xhr.send();

    xhr.onload = function () {
        if (xhr.status === 200) {
            let data = JSON.parse(xhr.response);
            let city = data.results[0].components.city;
            let country = data.results[0].components.country;
            setCity(city, slide);
            setCountry(country, slide);
            userData.city = city;
            userData.country = country;
        }
    }
}

function setCity(city, slide) {
    let input = document.querySelector(`[name='${slide}-city']`);
    input.value = city;
}

function setCountry(country, slide) {
    let select = document.querySelector(`[name='${slide}-country']`);
    select.value = country;
}

window.addEventListener('load', function () {
    getCountries();
})
