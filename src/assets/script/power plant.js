function setRandomKeyframe() {
    function randomValue() {
        return Math.floor(Math.random() * 101);
    }
    const keyframes = `
    @keyframes animate {
      0% { background-position: ${50}% ${50}%; }
      25% { background-position: ${randomValue()}% ${randomValue()}%; }
      50% { background-position: ${randomValue()}% ${randomValue()}%; }
      75% { background-position: ${randomValue()}% ${randomValue()}%; }
      100% { background-position: ${50}% ${50}%; }
    }
  `;
    const styleSheet = document.styleSheets[0];
    const keyframeRule = styleSheet.insertRule(keyframes, styleSheet.cssRules.length);
}
setInterval(setRandomKeyframe, 90000);
setRandomKeyframe();

const addPowerPlantBtn = document.getElementById('add-plant');
const addCityBtn = document.getElementById('add-city');
const addCityModal = document.getElementById('addCityModal');
const addPowerPlantModal = document.getElementById('addPowerPlantModal');
const cityConfirmBtn = document.getElementById('addCity');
const powerPlantConfirmBtn = document.getElementById('addPP');
const backdrop = document.getElementById('backdrop');
const closeCityModal = document.getElementById('closeCityModal');
const closePowerPlantModal = document.getElementById('closePowerPlantModal');

function disabledButton(list) {
    for (item of list) {
        if (item.value === '') {
            return true;
        }
    }
    return false;
}

function showElement(element) {
    element.classList.add('show');
}
function hideElement(element) {
    element.classList.remove('show');
}

addCityBtn.onclick = function () {
    showElement(addCityModal);
    showElement(backdrop);
    document.querySelector("#cityName").focus();
};

addPowerPlantBtn.onclick = function () {
    showElement(addPowerPlantModal);
    showElement(backdrop);
    document.querySelector("#PPName").focus();
};

closeCityModal.onclick = function () {
    hideElement(addCityModal);
    hideElement(backdrop);
};


closePowerPlantModal.onclick = function () {
    hideElement(addPowerPlantModal);
    hideElement(backdrop);
};


backdrop.onclick = function () {
    hideElement(addCityModal);
    hideElement(addPowerPlantModal);
    hideElement(document.getElementById('txModal'));
    hideElement(backdrop);
};
cityInputs = document.querySelectorAll('#addCityModal input');
cityInputs.forEach(input => {
    input.addEventListener('input', function () {
        if (disabledButton(cityInputs)) {
            cityConfirmBtn.disabled = true;
        } else {
            cityConfirmBtn.disabled = false;
        }

    });
    input.addEventListener("keypress", function (e) {
        if (e.key === "Enter") {
            cityConfirmBtn.click();
        }
    });
});
cityConfirmBtn.onclick = function () {
    addElement("city");
    inputs = document.querySelectorAll('#addCityModal input');
    inputs.forEach(input => {
        input.value = '';
        input.parentNode.querySelector(".input-label").classList.remove('active');
    });
    if (plantCount > 1 && cityCount >= 1 || cityCount > 1 && plantCount >= 1) {
        const buttonPanel = document.querySelector('.button-panel');
        buttonPanel.style.opacity = 1;
        buttonPanel.style.zIndex = 10;
    }
    hideElement(addCityModal);
    hideElement(backdrop);
};

powerPlantInputs = document.querySelectorAll('#addPowerPlantModal input');
powerPlantInputs.forEach(input => {
    input.addEventListener('input', function () {
        if (disabledButton(powerPlantInputs)) {
            powerPlantConfirmBtn.disabled = true;
        } else {
            powerPlantConfirmBtn.disabled = false;
        }
    });
    input.addEventListener("keypress", function (e) {
        if (e.key === "Enter") {
            powerPlantConfirmBtn.click();
        }
    });
});
powerPlantConfirmBtn.onclick = function () {
    addElement("plant");
    inputs = document.querySelectorAll('#addPowerPlantModal input');
    inputs.forEach(input => {
        input.value = '';
        input.parentNode.querySelector(".input-label").classList.remove('active');
    });
    if (plantCount > 1 && cityCount >= 1 || cityCount > 1 && plantCount >= 1) {
        const buttonPanel = document.querySelector('.button-panel');
        buttonPanel.style.opacity = 1;
        buttonPanel.style.zIndex = 10;
    }
    hideElement(addPowerPlantModal);
    hideElement(backdrop);
};

document.addEventListener('keydown', function (event) {
    if (event.key === 'Escape') {
        hideElement(addCityModal);
        hideElement(addPowerPlantModal);
        hideElement(backdrop);
    }
});
inputs = document.querySelectorAll('input');
inputs.forEach(input => {
    if (input.id != 'cityName' && input.id != 'PPName') {
        input.addEventListener('input', function () {
            this.value = this.value.replace(/[^0-9.]/g, '');
            if ((this.value.match(/\./g) || []).length > 1) {
                this.value = this.value.slice(0, -1);
            }
        });
    }
});

document.addEventListener('DOMContentLoaded', function () {
    const textInputs = document.querySelectorAll('input[type="text"]');
    textInputs.forEach(input => {
        let focus = false;
        input.addEventListener('focus', function () {
            input.parentNode.querySelector("p").classList.add('active');
            focus = true;
        });
        input.addEventListener('mouseleave', function () {
            if (input.value === '' && !focus) {
                input.parentNode.querySelector("p").classList.remove('active');
            }
        });
        input.addEventListener('mouseenter', function () {
            input.parentNode.querySelector("p").classList.add('active');
        });
        input.addEventListener('blur', function () {
            if (input.value === '') {
                input.parentNode.querySelector("p").classList.remove('active');
            }
            focus = false;
        });
    })
});


const $workspace = $(".workspace");
const elements = []; // Track element positions to avoid overlap

function getRandomPosition(width, height) {
    const workspaceWidth = $workspace.width();
    const workspaceHeight = $workspace.height();
    x = Math.random() * (workspaceWidth - width);
    y = Math.random() * (workspaceHeight - height);

    return { x, y };
}

let cities = []
let plants = []
let cityCount = 0;
let plantCount = 0;
function addElement(type) {
    let svg;
    let randomSize = Math.random() * 300 + 100;
    if (type === "plant") {
        let plantId = plantCount;
        plantCount++;
        let plantName = document.getElementById("PPName").value;
        let plantCapacity = document.getElementById("capacity").value * 1;
        let plantFixedCost = document.getElementById("fixedCost").value * 1;
        let plantDynamicCost = document.getElementById("variableCost").value * 1;
        let plant = { id: plantId, name: plantName, capacity: plantCapacity, fixedCost: plantFixedCost, dynamicCost: plantDynamicCost }
        svg = `<svg xmlns="http://www.w3.org/2000/svg" class="icon" style="height:${randomSize}px;width:${randomSize}px;"
                    viewBox="0 0 448 512"><!--!Font Awesome Free 6.7.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.-->
                    <path
                        d="M349.4 44.6c5.9-13.7 1.5-29.7-10.6-38.5s-28.6-8-39.9 1.8l-256 224c-10 8.8-13.6 22.9-8.9 35.3S50.7 288 64 288l111.5 0L98.6 467.4c-5.9 13.7-1.5 29.7 10.6 38.5s28.6 8 39.9-1.8l256-224c10-8.8 13.6-22.9 8.9-35.3s-16.6-20.7-30-20.7l-111.5 0L349.4 44.6z" />
                </svg>
                <p class="element-name">${plantName}</p> 
                `;
        plants.push(plant);
    }
    else {
        let cityId = cityCount;
        cityCount++;
        let cityName = document.getElementById("cityName").value;
        let cityDemand = document.getElementById("cityDemand").value * 1;
        let city = { id: cityId, name: cityName, demand: cityDemand }
        svg = `<svg xmlns="http://www.w3.org/2000/svg" class="icon" style="height:${randomSize}px;width:${randomSize}px;"
                    viewBox="0 0 640 512"><!--!Font Awesome Free 6.7.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.-->
                    <path
                        d="M480 48c0-26.5-21.5-48-48-48L336 0c-26.5 0-48 21.5-48 48l0 48-64 0 0-72c0-13.3-10.7-24-24-24s-24 10.7-24 24l0 72-64 0 0-72c0-13.3-10.7-24-24-24S64 10.7 64 24l0 72L48 96C21.5 96 0 117.5 0 144l0 96L0 464c0 26.5 21.5 48 48 48l256 0 32 0 96 0 160 0c26.5 0 48-21.5 48-48l0-224c0-26.5-21.5-48-48-48l-112 0 0-144zm96 320l0 32c0 8.8-7.2 16-16 16l-32 0c-8.8 0-16-7.2-16-16l0-32c0-8.8 7.2-16 16-16l32 0c8.8 0 16 7.2 16 16zM240 416l-32 0c-8.8 0-16-7.2-16-16l0-32c0-8.8 7.2-16 16-16l32 0c8.8 0 16 7.2 16 16l0 32c0 8.8-7.2 16-16 16zM128 400c0 8.8-7.2 16-16 16l-32 0c-8.8 0-16-7.2-16-16l0-32c0-8.8 7.2-16 16-16l32 0c8.8 0 16 7.2 16 16l0 32zM560 256c8.8 0 16 7.2 16 16l0 32c0 8.8-7.2 16-16 16l-32 0c-8.8 0-16-7.2-16-16l0-32c0-8.8 7.2-16 16-16l32 0zM256 176l0 32c0 8.8-7.2 16-16 16l-32 0c-8.8 0-16-7.2-16-16l0-32c0-8.8 7.2-16 16-16l32 0c8.8 0 16 7.2 16 16zM112 160c8.8 0 16 7.2 16 16l0 32c0 8.8-7.2 16-16 16l-32 0c-8.8 0-16-7.2-16-16l0-32c0-8.8 7.2-16 16-16l32 0zM256 304c0 8.8-7.2 16-16 16l-32 0c-8.8 0-16-7.2-16-16l0-32c0-8.8 7.2-16 16-16l32 0c8.8 0 16 7.2 16 16l0 32zM112 320l-32 0c-8.8 0-16-7.2-16-16l0-32c0-8.8 7.2-16 16-16l32 0c8.8 0 16 7.2 16 16l0 32c0 8.8-7.2 16-16 16zm304-48l0 32c0 8.8-7.2 16-16 16l-32 0c-8.8 0-16-7.2-16-16l0-32c0-8.8 7.2-16 16-16l32 0c8.8 0 16 7.2 16 16zM400 64c8.8 0 16 7.2 16 16l0 32c0 8.8-7.2 16-16 16l-32 0c-8.8 0-16-7.2-16-16l0-32c0-8.8 7.2-16 16-16l32 0zm16 112l0 32c0 8.8-7.2 16-16 16l-32 0c-8.8 0-16-7.2-16-16l0-32c0-8.8 7.2-16 16-16l32 0c8.8 0 16 7.2 16 16z" />
                </svg>
                <p class="element-name">${cityName}</p> `;
        cities.push(city);
    }

    const $element = $("<div>").addClass(`draggable ${type}`).html(svg).appendTo($workspace);

    const { x, y } = getRandomPosition($element.width(), $element.height());
    $element.css({ left: x, top: y });

    elements.push($element);
    $element.draggable({
        containment: ".workspace"
    });
}


const solveBtn = document.getElementById('solveButton');
const setTxBtn = document.getElementById('transmissionButton');

let txCostMatrix = [];
let txLossMatrix = [];
let txCapacityMatrix = [];

solveBtn.onclick = function () {
    if (txCostMatrix.length == 0) {
        generateMatrixes();
    }

}
function generateTxModal(i, j) {
    const txModal = document.getElementById('txModal');
    content = `
            <div class="modal-content">
                <span class="close" id="closeTxModal">&times;</span>
                    <h2> Transmitting from ${plants[i].name} to ${cities[j].name}</h2>
                    <div class="input-block">
                        <p class="input-label">Transmission Capacity</p>
                        <input type="text" id="txCapacity">
                    </div>
                    <div class="input-block">
                        <p class="input-label">Transmission Loss</p>
                        <input type="text" id="txLoss">
                    </div>
                    <div class="input-block">
                        <p class="input-label">Transmission Cost per Unit</p>
                        <input type="text" id="txCost">
                    </div>
                    <button id="txConfirm" style="width:300px">Next</button>
            </div>
        `;
    txModal.innerHTML = content;
    const textInputs = document.querySelectorAll('#txModal input[type="text"]');
    const txConfirm = document.getElementById('txConfirm');
    textInputs.forEach(input => {
        let focus = false;
        input.addEventListener('focus', function () {
            input.parentNode.querySelector("p").classList.add('active');
            focus = true;
        });
        input.addEventListener('mouseleave', function () {
            if (input.value === '' && !focus) {
                input.parentNode.querySelector("p").classList.remove('active');
            }
        });
        input.addEventListener('mouseenter', function () {
            input.parentNode.querySelector("p").classList.add('active');
        });
        input.addEventListener('blur', function () {
            if (input.value === '') {
                input.parentNode.querySelector("p").classList.remove('active');
            }
            focus = false;
        });
        input.addEventListener('input', function () {
            this.value = this.value.replace(/[^0-9.]/g, '');
            if ((this.value.match(/\./g) || []).length > 1) {
                this.value = this.value.slice(0, -1);
            }
        });
    })
    const closeTxModal = document.getElementById('closeTxModal');
    closeTxModal.onclick = function () {
        hideElement(txModal);
        hideElement(backdrop);
    };
    txConfirm.addEventListener('click', function () {
        let txCapacity = document.getElementById('txCapacity').value;
        let txLoss = document.getElementById('txLoss').value;
        let txCost = document.getElementById('txCost').value;
        if (txCapacity != "")
            txCapacityMatrix[i][j] = txCapacity * 1;
        if (txLoss != "")
            txLossMatrix[i][j] = txLoss * 1;
        if (txCost != "")
            txCostMatrix[i][j] = txCost * 1;
        if (j < cities.length - 1) {
            generateTxModal(i, j + 1);
        }
        else if (i < plants.length - 1) {
            generateTxModal(i + 1, 0);
        }
        else {
            hideElement(txModal);
            hideElement(backdrop);
        }
    });

}
function generateMatrixes() {
    for (let i = 0; i < plants.length; i++) {
        let row1 = [];
        let row2 = [];
        let row3 = [];
        for (let j = 0; j < cities.length; j++) {
            row1.push(Math.random() * 0.05);
            row2.push(Math.random() * plants[i].dynamicCost / 2);
            row3.push(Math.random() * cities[j].demand / 2 + cities[j].demand / 2);
        }
        txLossMatrix.push(row1);
        txCostMatrix.push(row2);
        txCapacityMatrix.push(row3);
    }
}
setTxBtn.onclick = function () {
    if (txCostMatrix.length == 0) {
        generateMatrixes();
    }
    generateTxModal(0, 0);
    showElement(txModal);
    showElement(backdrop);

}
