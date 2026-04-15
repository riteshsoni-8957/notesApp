// new cards create karna hai, data ko local storag eme save karna hai.
// localStorage se hi cards ko show karna hai 
// buttons ko handle karna hai 
// filters ko handle karna hai 

let formContainer = document.querySelector("#form-container");
let notesContainer = document.querySelector("#notes-container");
let openForm = document.querySelector("#open-form-btn");
let closeForm = document.querySelector("#close-btn");
let category = document.querySelectorAll("input[name='category']");
let form = document.querySelector("form");
let stack = document.querySelector("#stack");
let upBtn = document.querySelector("#upBtn");
let downBtn = document.querySelector("#downBtn");

// form inputs
let imageURL = document.querySelector("#url-input");
let uName = document.querySelector("#name-input");
let homeTown = document.querySelector("#hTown-input");
let purpose = document.querySelector("#purpose-input");

// display form when you press add icon on the notes
openForm.addEventListener("click", function(dets) {
    formContainer.style.display = "initial";
    notesContainer.style.display = "none";
})

// display notes when you press close on the form
closeForm.addEventListener("click", function(dets) {
    notesContainer.style.display = "flex";
    formContainer.style.display = "none";
})


// create function saveToLocalStorage and save the all data in Local Storage -- [{},{},{}]
function saveTOLocalStorage(obj) {
    if(localStorage.getItem("task") === null) {
        let oldTask = [];     // []
        oldTask.push(obj);    // [{}]
        localStorage.setItem("task", JSON.stringify(oldTask));     // "[{}]"   data ko string me badal ke save karna
    }
    else{
        let oldTask = localStorage.getItem("task");  // "[{obj1}]"
        oldTask = JSON.parse(oldTask);     // [{obj1}]
        oldTask.push(obj);                 // [{obj1}, {obj2}]
        localStorage.setItem("task", JSON.stringify(oldTask));  // "[{obj1}, {obj2}]"   data ko string me badal ke save karna
    }
}



// form submit
formContainer.addEventListener("submit", function(dets) {
    dets.preventDefault();

    // All inputs value
    let imageUrlVal = imageURL.value.trim();
    let uNameVal = uName.value.trim();
    let hTownVal = homeTown.value.trim();
    let purposeVal = purpose.value.trim();
    let selectedval = "";
    category.forEach(function(radio) {
        if(radio.checked) {
            selectedval = radio.value;
        }
    })

    // form validation
    let nameRegex = /^[A-Za-z]+(?: [A-Za-z]+)*$/;
    if(nameRegex.test(uName.value)) {
        document.querySelector("#nameError").textContent = ""
    }else{
        document.querySelector("#nameError").textContent = "Please enter valid name !"
    }

    let hTownRegex = /^[A-Za-z]+(?: [A-Za-z]+)*$/;
    if(hTownRegex.test(homeTown.value)) {
        document.querySelector("#hTownError").textContent = ""
    }else{
        document.querySelector("#hTownError").textContent = "Please enter valid home town !"
    }

    let purposeRegex = /^(?=.{2,50}$)[A-Za-z0-9]+([ .,'&-][A-Za-z0-9]+)*$/
    if(purposeRegex.test(purpose.value)) {
        document.querySelector("#purposeError").textContent = "";
    }else{
        document.querySelector("#purposeError").textContent = "Please enter valid purpose !"
    }

    let radioSelected = false;
    category.forEach(function(radio) {
        if(radio.checked) {
            radioSelected = true;
        }
    })

    if(radioSelected) {
        document.querySelector("#categoryError").textContent = "";
    }else{
        document.querySelector("#categoryError").textContent = "Please select one of these option";
    }

    // call saveToLocalStorage function and pass the arguements with all inputs value
    saveTOLocalStorage({
        imageUrlVal,
        uNameVal,
        hTownVal,
        purposeVal,
        selectedval
    })

    // remove all inputs data
    form.reset();

    // hide form and show cards when form submit
    formContainer.style.display = "none";
    notesContainer.style.display = "flex";

    showNotes();
})



function showNotes() {
    // get data in array in obj format to localStorage
    let allTask = JSON.parse(localStorage.getItem("task"));

    allTask.forEach(function(task) {
        // Main parent div
        let notes = document.createElement("div");
        notes.className = "notes";

        // Image div
        let imageDiv = document.createElement("div");
        imageDiv.className = "image";

        let img = document.createElement("img");
        img.src = task.imageUrlVal;
        img.alt = "image";

        imageDiv.appendChild(img);

        // Name
        let name = document.createElement("h2");
        name.textContent = task.uNameVal;

        // Details section
        let details = document.createElement("div");
        details.className = "details";

        // Left detail
        let leftDetail = document.createElement("div");
        leftDetail.className = "left-detail";

        let homeTownLabel = document.createElement("h3");
        homeTownLabel.textContent = "Home Town";

        let purposeLabel = document.createElement("h3");
        purposeLabel.textContent = "Purpose";

        leftDetail.append(homeTownLabel, purposeLabel);

        // Right detail
        let rightDetail = document.createElement("div");
        rightDetail.className = "right-detail";

        let homeTownValue = document.createElement("h3");
        homeTownValue.textContent = task.hTownVal;

        let purposeValue = document.createElement("h3");
        purposeValue.textContent = task.purposeVal;

        rightDetail.append(homeTownValue, purposeValue);

        // Add left + right to details
        details.append(leftDetail, rightDetail);

        // Button container
        let btnContainer = document.createElement("div");
        btnContainer.className = "ctc-btn";

        // Call button
        let callBtn = document.createElement("button");
        callBtn.id = "call-btn";

        let callIcon = document.createElement("ion-icon");
        callIcon.setAttribute("name", "call-outline");

        callBtn.append(callIcon, " Call");

        // Message button
        let msgBtn = document.createElement("button");

        let msgIcon = document.createElement("ion-icon");
        msgIcon.setAttribute("name", "chatbox-ellipses-outline");

        msgBtn.append(msgIcon, " Message");

        // Add buttons to container
        btnContainer.append(callBtn, msgBtn);

        // Final structure assemble
        notes.append(imageDiv, name, details, btnContainer);

        // Add to body or container
        document.querySelector("#stack").appendChild(notes);
    })
}

showNotes();

// create change background function
function changeBackground(color) {
    // change background in body
    document.body.style.background = color;

    // change background in all notes
    let allNotes = document.querySelectorAll(".notes");
    allNotes.forEach(function(note) {
        note.style.background = color;
    })
}

// Change Notes to up Button
upBtn.addEventListener("click", function() {
    let firstChild = stack.firstElementChild;
    let lastChild = stack.lastElementChild;
    if(lastChild) {
        stack.insertBefore(lastChild, firstChild);
    }
})

// Change Notes to down Button
downBtn.addEventListener("click", function() {
    let firstChild = stack.firstElementChild;
    if(firstChild) {
        stack.appendChild(firstChild);
    }
})

