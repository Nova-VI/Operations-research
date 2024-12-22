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
function showElement(element) {
    element.classList.add('show');
}
function hideElement(element) {
    element.classList.remove('show');
}
function setSkillsCheckBox(div) {
    let html = ""
    for (let skill of skills) {
        html += "<label class='skill-checkbox'> <input type='checkbox' name='skills' value='" + skill + "'>" + skill + "</label>"
    }
    div.html(html)
    const checkBoxes = document.querySelectorAll("input[type=checkbox]");
    checkBoxes.forEach(checkbox => {
        checkbox.addEventListener('change', function () {
            if (emptyInput(workerInputs) || !document.querySelector('#workerSkills input[type=checkbox]:checked')) {
                workerConfirmBtn.disabled = true;
            } else {
                workerConfirmBtn.disabled = false;
            }
            if (emptyInput(shiftInputs) || !document.querySelector('#shiftSkills input[type=checkbox]:checked')) {
                addShiftBtn.disabled = true;
                setShiftBtn.disabled = true;
            } else {
                let sumOfShifts = 0;
                for (shift of tomporaryShifts) {
                    sumOfShifts += shift.duration;
                }
                if (sumOfShifts + document.getElementById("shiftDuration").value * 1 > 24) {
                    addShiftBtn.disabled = true;
                    setShiftBtn.disabled = true;
                }
                else if (sumOfShifts + document.getElementById("shiftDuration").value * 1 === 24) {
                    addShiftBtn.disabled = true;
                    setShiftBtn.disabled = false;
                }
                else {
                    addShiftBtn.disabled = false;
                    setShiftBtn.disabled = false;
                }
            }

            for (let check of checkBoxes) {
                if (check.checked) {
                    check.parentNode.style.backgroundColor = "rgb(38, 141, 17, .5)";
                }
                else {
                    check.parentNode.style.backgroundColor = "rgb(38, 141, 17, 0.1)";
                }
            }
        });
    });
}
function addElement(type) {
    let svg;
    if (type === "worker") {
        let workerId = workerCount;
        workerCount++;
        let workerName = document.getElementById("workerName").value;
        let workerCost = document.getElementById("workerCost").value * 1;
        let workerSkills = [];
        let skills = document.querySelectorAll('#workerSkills input[type=checkbox]:checked');
        skills.forEach(skill => {
            workerSkills.push(skill.value);
        });
        let worker = { id: workerId, name: workerName, cost: workerCost, skills: workerSkills }
        svg = `${getSVG("person")}
                <p class="element-name">${workerName}</p> 
                `;
        workers.push(worker);
    }
    else {
        let locationId = locationCount;
        locationCount++;
        let shift = {
            name: document.getElementById("shiftName").value,
            duration: document.getElementById("shiftDuration").value * 1,
            skills: []
        }
        let skills = document.querySelectorAll('#shiftSkills input[type=checkbox]:checked');
        skills.forEach(skill => {
            shift.skills.push(skill.value);
        });
        tomporaryShifts.push(shift);
        let locationName = document.getElementById("locationName").value;
        let location = { id: locationId, name: locationName, shifts: tomporaryShifts }
        temporaryShifts = [];
        svg = `${getSVG("city")}
                <p class="element-name">${locationName}</p> `;
        locations.push(location);
    }
    const $element = $("<div>").addClass(`draggable ${type}`).html(svg).appendTo($workspace);

    const { x, y } = getRandomPosition($element.width(), $element.height());
    $element.css({ left: x, top: y });

    elements.push($element);
    $element.draggable({
        containment: ".workspace"
    });
}

function generateButtons() {
    if ( locationCount >= 1 && workerCount > 10) {
        const buttonPanel = document.querySelector('.button-panel');
        buttonPanel.style.opacity = 1;
        buttonPanel.style.pointerEvents = 'auto';
    }
}

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


const addWorkerBtn = document.getElementById('add-worker');
const addLocationBtn = document.getElementById('add-location');
const setSkillBtn = document.getElementById('setSkills');
const genreateBtn= document.getElementById("generationButton")

const addWorkerModal = document.getElementById('addWorkerModal');
const addLocationModal = document.getElementById('addLocationModal');
const addSkillsModal = document.getElementById('addSkillsModal');
const addShiftModal = document.getElementById('shiftModal');
const addGenerationModal = document.getElementById("addGenerationModal");

const workerConfirmBtn = document.getElementById('addWorker');
const locationPlantConfirmBtn = document.getElementById('setShift');
const skillsConfirmBtn = document.getElementById('addSkills');

let closeButtons = document.querySelectorAll('.close');
const backdrop = document.getElementById('backdrop');

const closeInterfaces = [...closeButtons, backdrop];

closeInterfaces.forEach(interface => {
    interface.onclick = function () {
        hideElement(addWorkerModal);
        hideElement(addLocationModal);
        hideElement(addSkillsModal);
        hideElement(addShiftModal);
        hideElement(addGenerationModal);
        hideElement(backdrop);
    };
});

document.addEventListener('keydown', function (event) {
    if (event.key === 'Escape') {
        closeInterfaces[0].click();
    }
});

setSkillBtn.onclick = function () {
    showElement(addSkillsModal);
    showElement(backdrop);
    document.querySelector("#skills").focus();
};

genreateBtn.onclick = function () {
    showElement(addGenerationModal);
    showElement(backdrop);
    document.querySelector("#skills").focus();
};

addWorkerBtn.onclick = function () {
    showElement(addWorkerModal);
    showElement(backdrop);
    document.querySelector("#workerName").focus();

}

addLocationBtn.onclick = function () {
    showElement(addLocationModal);
    showElement(backdrop);
    document.querySelector("#locationName").focus();
}

skillsConfirmBtn.onclick = function () {
    let newSkills = [];
    const skillsInput = document.querySelector("#skills").value;
    if (skillsInput.length > 0) {
        const skillsList = skillsInput.split('\n');
        skillsList.forEach(skill => {
            skill = skill.trim();
            if (!newSkills.includes(skill) && skill.length > 0) {
                newSkills.push(skill);
            }
        });
    }
    if (newSkills.length > 0) {
        skills = newSkills;
    }
    skillsConfirmBtn.innerText = "Update Skills";
    closeInterfaces[0].click();
    addWorkerBtn.style.opacity = 1;
    addWorkerBtn.style.pointerEvents = 'auto';
    setTimeout(() => {
        addLocationBtn.style.opacity = 1;
        addLocationBtn.style.pointerEvents = 'auto';
    }, 500);
    setSkillsCheckBox($('#workerSkills'));
    setSkillsCheckBox($('#shiftSkills'));
    oldValue = document.querySelector("#skills").value
    skillsConfirmBtn.disabled = true;
}
let oldValue = "";
document.getElementById("skills").addEventListener('input', function () {
    if (document.getElementById('skills').value.trim() !== "") {
        skillsConfirmBtn.disabled = false;
    }

});
let workerInputs = document.querySelectorAll('#addWorkerModal input[type="text"]');
workerInputs.forEach(input => {
    input.addEventListener('input', function () {
        if (emptyInput(workerInputs) || !document.querySelector('#workerSkills input[type=checkbox]:checked')) {
            workerConfirmBtn.disabled = true;
        } else {
            workerConfirmBtn.disabled = false;
        }

    });
    input.addEventListener("keypress", function (e) {
        if (e.key === "Enter") {
            workerConfirmBtn.click();
        }
    });
});
document.getElementById("workerCost").addEventListener('input', function () {
    this.value = this.value.replace(/[^0-9.]/g, '');
    if ((this.value.match(/\./g) || []).length > 1) {
        this.value = this.value.slice(0, -1);
    }
});
document.getElementById("shiftDuration").addEventListener('input', function () {
    this.value = this.value.replace(/[^0-9.]/g, '');
    if ((this.value.match(/\./g) || []).length > 1) {
        this.value = this.value.slice(0, -1);
    }
    let sumOfShifts = 0;
    for (shift of tomporaryShifts) {
        sumOfShifts += shift.duration;
    }
    maxNumber = 24 - sumOfShifts;
    if (this.value * 1 > maxNumber) {
        this.value = maxNumber;
    }
});
document.getElementById("locationName").addEventListener('input', function () {
    if (this.value.trim() !== "") {
        locationPlantConfirmBtn.disabled = false;
    } else {
        locationPlantConfirmBtn.disabled = true;
    }
});
document.getElementById("locationName").addEventListener("input", () => {
    if (document.getElementById("locationName").value.trim() != "") {
        locationPlantConfirmBtn.disabled = false;
    } else {
        locationPlantConfirmBtn.disabled = true;
    }
});
workerConfirmBtn.onclick = function () {
    workerConfirmBtn.disabled = true;
    addElement("worker");
    inputs = document.querySelectorAll('#addWorkerModal input[type="text"]');
    inputs.forEach(input => {
        input.value = '';
        input.parentNode.querySelector(".input-label").classList.remove('active');
    });
    const checkBoxes = document.querySelectorAll("input[type=checkbox]");
    checkBoxes.forEach(checkbox => {
        checkbox.checked = false;
        checkbox.parentNode.style.backgroundColor = "rgb(38, 141, 17, 0.1)";
    });
    hideElement(addWorkerModal);
    hideElement(backdrop);
    generateButtons();
};
const generateBtnConfirm = document.getElementById("generateConfirm");
const generationInputs = document.querySelectorAll("#addGenerationModal input[type=text]");
generationInputs.forEach(input => {
    input.addEventListener('input', function () {
        if (emptyInput(generationInputs)) {
            generateBtnConfirm.disabled = true;
        } else {
            generateBtnConfirm.disabled = false;
        }

    });
    input.addEventListener("keypress", function (e) {
        if (e.key === "Enter") {
            generateBtnConfirm.click();
        }
    });
});
generateBtnConfirm.onclick = function(){
    let jsonData= {
        "num_workers":document.getElementById("nbWorker").value*1,
        "num_locations":document.getElementById("nbLocation").value*1,
        "num_shifts_per_day":document.getElementById("nbShift").value*1,
        "skills":skills
    }
    closeInterfaces[0].click();
    jsonToSend=JSON.stringify(jsonData);
    sendJsonToApi(jsonToSend,"input");
}
tomporaryShifts = [];
locationPlantConfirmBtn.onclick = function () {
    showElement(addShiftModal);
    hideElement(addLocationModal);
};
function emptyInput(list) {
    for (item of list) {
        if (item.value === '') {
            return true;
        }
    }
    return false;
}
const shiftInputs = document.querySelectorAll('#shiftModal input[type="text"]');
const addShiftBtn = document.getElementById('addShift');
const setShiftBtn = document.getElementById('setShifts');
shiftInputs.forEach(input => {
    input.addEventListener('input', function () {
        if (emptyInput(shiftInputs) || !document.querySelector('#shiftSkills input[type=checkbox]:checked')) {
            addShiftBtn.disabled = true;
            setShiftBtn.disabled = true;
        } else {
            let sumOfShifts = 0;
            for (shift of tomporaryShifts) {
                sumOfShifts += shift.duration;
            }
            if (sumOfShifts + document.getElementById("shiftDuration").value * 1 > 24) {
                addShiftBtn.disabled = true;
                setShiftBtn.disabled = true;
            }
            else if (sumOfShifts + document.getElementById("shiftDuration").value * 1 === 24) {
                addShiftBtn.disabled = true;
                setShiftBtn.disabled = false;
            }
            else {
                addShiftBtn.disabled = false;
                setShiftBtn.disabled = false;
            }
        }
    });
    input.addEventListener("keypress", function (e) {
        if (e.key === "Enter") {
            setShiftBtn.click();
        }
    });
});
addShiftBtn.addEventListener("click", function () {
    let shift = {
        name: document.getElementById("shiftName").value,
        duration: document.getElementById("shiftDuration").value * 1,
        skills: []
    }
    let skills = document.querySelectorAll('#shiftSkills input[type=checkbox]:checked');
    skills.forEach(skill => {
        shift.skills.push(skill.value);
    });
    tomporaryShifts.push(shift);
    addShiftBtn.disabled = true;
    setShiftBtn.disabled = true;
    document.getElementById("shiftName").value = "";
    document.getElementById("shiftDuration").value = "";
    document.getElementById("shiftName").focus();
    const checkBoxes = document.querySelectorAll("input[type=checkbox]");
    checkBoxes.forEach(checkbox => {
        checkbox.checked = false;
        checkbox.parentNode.style.backgroundColor = "rgb(38, 141, 17, 0.1)";
    });
});

setShiftBtn.addEventListener("click", function () {
    addElement("location");
    tomporaryShifts = [];
    addShiftBtn.disabled = true;
    setShiftBtn.disabled = true;
    document.getElementById("shiftName").value = "";
    document.getElementById("shiftDuration").value = "";
    document.getElementById("shiftName").focus();
    const checkBoxes = document.querySelectorAll("input[type=checkbox]");
    checkBoxes.forEach(checkbox => {
        checkbox.checked = false;
        checkbox.parentNode.style.backgroundColor = "rgb(38, 141, 17, 0.1)";
    });
    document.getElementById("locationName").value = "";
    document.getElementById("locationName").focus();
    hideElement(addShiftModal);
    hideElement(backdrop);
    generateButtons();
});
document.getElementById("solveButton").addEventListener("click", function () {
    let jsonData = generateJson(locations, workers);
    sendJsonToApi(jsonData);
});
let skills = []
let workers = [];
let workerCount = 0;
let locations = [];
let locationCount = 0;
const $workspace = $(".workspace");
const elements = [];

function generateJson(locations, workers) {
    return {
        locations: locations,
        workers: workers
    };
}

async function sendJsonToApi(jsonData,endpoint="test") {
    try {
        const response = await fetch(`http://127.0.0.1:5000/${endpoint}`, {
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
        console.log('Response from API:', result);
        localStorage.setItem("output2",JSON.stringify(result));
        window.location.href="../pages/output2.html";
        return result;
    } catch (error) {
        console.error('Error:', error);
    }
}