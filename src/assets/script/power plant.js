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
    cityConfirmBtn.disabled = true;
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
let reducedInput = false;
let powerPlantInputs = document.querySelectorAll('#addPowerPlantModal input');
powerPlantInputs.forEach(input => {
    input.addEventListener('input', function () {
        if (document.getElementById("variableCost").value != "" && document.getElementById("PPName").value != "" && plants.length == 0) {
            powerPlantConfirmBtn.disabled = false;
        }
        else if (disabledButton(powerPlantInputs)) {
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
    if (plants.length == 0) {
        let deleteableElements = []
        for (input of powerPlantInputs) {
            if (input.value == "") {
                deleteableElements.push(input.parentNode)
            }
        }
        deleteableElements.forEach(element => {
            element.parentNode.removeChild(element);
        });
        powerPlantInputs = document.querySelectorAll('#addPowerPlantModal input');
    }
    powerPlantConfirmBtn.disabled = true;
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
        hideElement(txModal);
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
const elements = [];

function getRandomPosition(width, height) {
    const workspaceWidth = $workspace.width();
    const workspaceHeight = $workspace.height();
    x = Math.random() * (workspaceWidth - width);
    y = Math.random() * (workspaceHeight - height);
    let overlap;
    let i = 0;
    do {
        overlap = false;
        for (const element of elements) {
            const rect1 = { x: x, y: y, width: width, height: height };
            const rect2 = { x: element.position().left, y: element.position().top, width: element.width(), height: element.height() };
            if (!(rect1.x + rect1.width < rect2.x || rect1.x > rect2.x + rect2.width || rect1.y + rect1.height < rect2.y || rect1.y > rect2.y + rect2.height)) {
                overlap = true;
                x = Math.random() * (workspaceWidth - width);
                y = Math.random() * (workspaceHeight - height);
                break;
            }
        }
        i++;
        if (i > 1000) {
            break;
        }
    } while (overlap);

    return { x, y };
}

let cities = []
let plants = []
let cityCount = 0;
let plantCount = 0;
function addElement(type) {
    let svg;
    if (type === "plant") {
        let plantId = plantCount;
        plantCount++;
        let plantName = document.getElementById("PPName").value;
        let plantFixedCost = null;
        let plantDynamicCost = document.getElementById("variableCost").value * 1;
        let plantCapacity = null;
        if (document.getElementById("capacity")) {
            plantCapacity = document.getElementById("capacity").value * 1;
        }
        if (document.getElementById("fixedCost")) {
            plantFixedCost = document.getElementById("fixedCost").value * 1;
        }
        let plant = { id: plantId, name: plantName, capacity: plantCapacity, fixedCost: plantFixedCost, dynamicCost: plantDynamicCost }
        svg = `${getSVG("transmitter")}
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
        svg = `${getSVG("person")}
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
let lossMatrixState = true;
let capacityMatrixState = true;

solveBtn.onclick = function () {
    if (txCostMatrix.length == 0) {
        generateMatrixes();
    }
    let jsonData = generateJson(cities, plants, txLossMatrix, txCostMatrix, txCapacityMatrix);
    sendJsonToApi(jsonData);

}
function generateTxModal(i, j) {
    const txModal = document.getElementById('txModal');
    if (i == 0 && j == 0) {
        generateMatrixes();
        capacityMatrixState = true;
        lossMatrixState = true;
        content = `
                <div class="modal-content">
                    <span class="close" id="closeTxModal">&times;</span>
                        <h2> Delivering from ${plants[i].name} to ${cities[j].name}</h2>
                        <div class="input-block">
                            <p class="input-label">Delivery Cost per Unit</p>
                            <input type="text" id="txCost">
                        </div>
                        <div class="input-block">
                            <p class="input-label">Delivery Capacity</p>
                            <input type="text" id="txCapacity">
                            <div style="position:absolute; right: 0px;transform:translateX(-55px);width:fit-content;cursor:pointer" id="txCapacityRmvBtn">
                                ${getSVG("trash", 30, 30)}
                            </div>
                        </div>
                        <div class="input-block" style="flex-grow: 1;">
                            <p class="input-label">Delivery Loss</p>
                            <input type="text" id="txLoss">
                            <div style="position:absolute; right: 0px;transform:translateX(-55px);width:fit-content;cursor:pointer" id="txLossRmvBtn">
                                ${getSVG("trash", 30, 30)}
                            </div>
                        </div>
                        <button id="txConfirm" style="width:300px">Next</button>
                </div>
            `;

    }
    else {

        content = `
                <div class="modal-content">
                        <span class="close" id="closeTxModal">&times;</span>
                        <h2> Delivering from ${plants[i].name} to ${cities[j].name}</h2>
                        <div class="input-block">
                            <p class="input-label">Delivery Cost per Unit</p>
                            <input type="text" id="txCost">
                        </div>
                `;
        if (capacityMatrixState)
            content += `
                        <div class="input-block">
                            <p class="input-label">Delivery Capacity</p>
                            <input type="text" id="txCapacity">
                        </div>
                    `;
        if (lossMatrixState)
            content += `
                        <div class="input-block">
                            <p class="input-label">Delivery Loss</p>
                            <input type="text" id="txLoss">
                        </div>
                    `;
        content += `
                        <button id="txConfirm" style="width:300px">Next</button>
                </div >
            `;
    }
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
        let txCapacity = ""
        let txLoss = ""
        if (document.getElementById('txLoss'))
            txLoss = document.getElementById('txLoss').value;
        if (document.getElementById("txCapacity"))
            txCapacity = document.getElementById('txCapacity').value;

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
    if (i == 0, j == 0) {
        const txLossRmvBtn = document.getElementById('txLossRmvBtn');
        const txCapacityRmvBtn = document.getElementById('txCapacityRmvBtn');
        if (txCapacityRmvBtn) {
            txCapacityRmvBtn.addEventListener('click', function () {
                let inputBlock = document.getElementById("txCapacity").parentNode;
                inputBlock.parentNode.removeChild(inputBlock);
                capacityMatrixState = false;
                txCapacityMatrix = null;
            });
        }
        if (txLossRmvBtn) {
            txLossRmvBtn.addEventListener('click', function () {
                let inputBlock = document.getElementById("txLoss").parentNode;
                inputBlock.parentNode.removeChild(inputBlock);
                lossMatrixState = false;
                txLossMatrix = null;
            });
        }
    }
}
function generateMatrixes() {
    txCapacityMatrix = []
    txCostMatrix = []
    txLossMatrix = []
    for (let i = 0; i < plants.length; i++) {
        let row1 = [];
        let row2 = [];
        let row3 = [];
        for (let j = 0; j < cities.length; j++) {
            row1.push(Math.random() * 0.05);
            row2.push(Math.random() * plants[i].dynamicCost / 2);
            row3.push(Math.random() * 50 + cities[j].demand);
        }
        txLossMatrix.push(row1);
        txCostMatrix.push(row2);
        txCapacityMatrix.push(row3);
    }
}
setTxBtn.onclick = function () {
    generateTxModal(0, 0);
    showElement(txModal);
    showElement(backdrop);
}

function generateJson(cities, plants, txLossMatrix, txCostMatrix, txCapacityMatrix) {
    return {
        recipients: cities.map(city => ({
            id: city.id,
            name: city.name,
            demand: city.demand
        })),

        sources: plants.map(plant => ({
            id: plant.id,
            name: plant.name,
            capacity: plant.capacity,
            fixedCost: plant.fixedCost,
            dynamicCost: plant.dynamicCost
        })),

        "delivery cost per unit": txCostMatrix,

        "delivery capacities": txCapacityMatrix,

        "delivery loss": txLossMatrix
    };
}


async function sendJsonToApi(jsonData) {
    try {
        const response = await fetch('http://127.0.0.1:5000/test', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(jsonData)
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status} `);
        }

        const result = await response.json();
        localStorage.setItem("input1", JSON.stringify(jsonData));
        localStorage.setItem("output1", JSON.stringify(result));
        window.location.href = "../pages/outputpp.html";
        console.log('Response from API:', result);
    } catch (error) {
        console.error('Error:', error);
    }
}