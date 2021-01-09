import { differenceInCalendarDays } from 'date-fns'

const mainContainer = document.querySelector("#content");

const titleCard = document.createElement("div");
titleCard.classList.add("titleCard")
mainContainer.appendChild(titleCard)

const titleHeader = document.createElement("h1");
titleHeader.innerHTML = "< TODO LIST />";
titleHeader.classList.add("titleHeader")
titleCard.appendChild(titleHeader)

let checklistItemList
let completedButton
let completedBool = "";
let projectsList = [];
let tempItemList = [];

for (let i = 0; i < localStorage.length; i++) {
    tempItemList.push(JSON.parse(window.localStorage.getItem(`item${i}`)));
}

const ChecklistItem = (checklistItemName, checklistItemNotes, checklistItemPriority, checklistItemIsCompleted=false) => {
    return { checklistItemName, checklistItemNotes, checklistItemPriority, checklistItemIsCompleted }
}

const ProjectItem = (projectName="Title", projectNotes="Notes...", projectPriority=3, completed=false, dueDate="", checklistItemArray=[]) => {
    let checklistItemList = checklistItemArray
    const addToChecklist = (checklistItemName, checklistItemNotes, checklistItemPriority, checklistItemIsCompleted) => {
        const newChecklistItem = ChecklistItem(checklistItemName, checklistItemNotes, checklistItemPriority, checklistItemIsCompleted);
        checklistItemList.push(newChecklistItem)
    }
    return { projectName, projectNotes, projectPriority, checklistItemList, addToChecklist, completed, dueDate }
}

for (let i = 0; i < tempItemList.length; i++) {
    let newProject = ProjectItem(tempItemList[i].projectName, tempItemList[i].projectNotes, tempItemList[i].projectPriority, tempItemList[i].completed, tempItemList[i].dueDate, tempItemList[i].checklistItemList)
    projectsList.push(newProject)
}


function addProjectModal() {
    const modalWindow = document.createElement("div");
    modalWindow.classList.add("modalWindow");
    projectsContainer.appendChild(modalWindow)

    const projectForm = document.createElement("div");
    projectForm.classList.add("projectForm");
    modalWindow.appendChild(projectForm)

    const projectNameInputTitle = document.createElement("label");
    projectNameInputTitle.classList.add("projectNameInputTitle");
    projectNameInputTitle.innerHTML = "Project Name";
    projectNameInputTitle.htmlFor = "projectName"
    projectForm.appendChild(projectNameInputTitle)

    const projectNameInput = document.createElement("input");
    projectNameInput.classList.add("projectNameInput");
    projectNameInput.type = "text"
    projectNameInput.id = "projectName";
    projectNameInput.name = "projectName";
    projectForm.appendChild(projectNameInput)

    let projectNameInputbreak1 = document.createElement("br");
    projectForm.appendChild(projectNameInputbreak1)
    let projectNameInputbreak2 = document.createElement("br");
    projectForm.appendChild(projectNameInputbreak2)

    const projectPriorityInputTitle = document.createElement("label");
    projectPriorityInputTitle.classList.add("projectPriorityInputTitle");
    projectPriorityInputTitle.innerHTML = "Project Priority";
    projectForm.appendChild(projectPriorityInputTitle)

    const projectPriorityInput = document.createElement("select");
    projectPriorityInput.classList.add("projectPriorityInput");
    projectPriorityInput.id = "projectPriorityInput"
    projectForm.appendChild(projectPriorityInput)

    let projectPriorityInputbreak1 = document.createElement("br");
    projectForm.appendChild(projectPriorityInputbreak1)
    let projectPriorityInputbreak2 = document.createElement("br");
    projectForm.appendChild(projectPriorityInputbreak2)

    const highPriorityOption = document.createElement("option");
    highPriorityOption.value = 1;
    highPriorityOption.innerHTML = "High"
    projectPriorityInput.append(highPriorityOption)

    const medPriorityOption = document.createElement("option");
    medPriorityOption.value = 2;
    medPriorityOption.innerHTML = "Medium"
    projectPriorityInput.append(medPriorityOption)

    const lowPriorityOption = document.createElement("option");
    lowPriorityOption.value = 3;
    lowPriorityOption.innerHTML = "Low"
    projectPriorityInput.append(lowPriorityOption)

    const projectNotesInputTitle = document.createElement("label");
    projectNotesInputTitle.classList.add("projectNotesInputTitle");
    projectNotesInputTitle.innerHTML = "Project Description ";
    projectNotesInputTitle.htmlFor = "projectNotes"
    projectForm.appendChild(projectNotesInputTitle)

    const projectNotesInput = document.createElement("input");
    projectNotesInput.classList.add("projectNotesInput");
    projectNotesInput.type = "text"
    projectNotesInput.id = "projectNotes";
    projectNotesInput.name = "projectNotes";
    projectForm.appendChild(projectNotesInput)

    let breakNotes1 = document.createElement("br");
    projectForm.appendChild(breakNotes1)
    let breakNotes2 = document.createElement("br");
    projectForm.appendChild(breakNotes2)

    const projectDateTitle = document.createElement("label");
    projectDateTitle.classList.add("projectDateTitle");
    projectDateTitle.innerHTML = "Due Date";
    projectDateTitle.htmlFor = "projectNotes"
    projectForm.appendChild(projectDateTitle)

    const projectDateInput = document.createElement("input");
    projectDateInput.classList.add("projectNotesInput");
    projectDateInput.type = "date"
    projectDateInput.id = "projectDate";
    projectDateInput.name = "projectDate";
    projectForm.appendChild(projectDateInput)

    let projectDateInputbreak1 = document.createElement("br");
    projectForm.appendChild(projectDateInputbreak1)
    let projectDateInputbreak2 = document.createElement("br");
    projectForm.appendChild(projectDateInputbreak2)

    const saveButton = document.createElement("button");
    saveButton.innerHTML = "Save";
    saveButton.classList.add("saveButton")
    projectForm.appendChild(saveButton)
    saveButton.addEventListener("click", () => {
        let projectName = document.getElementById("projectName").value;
        let projectPriority = document.getElementById("projectPriorityInput").value;
        let projectNotes = document.getElementById("projectNotes").value;
        let dueDate = document.getElementById("projectDate").value;
        let completed = false
        let newProject = ProjectItem(projectName, projectNotes, projectPriority, completed, dueDate)
        console.log(newProject)
        projectsList.push(newProject)
        removeAllChildNodes(projectsContainer)
        drawMenu()
    })

    if (projectsList.length == 0) {
        //pass
    } else {
        const cancelButton = document.createElement("button");
        cancelButton.innerHTML = "Cancel";
        cancelButton.classList.add("cancelButton")
        projectForm.appendChild(cancelButton)
        cancelButton.addEventListener("click", () => {
            removeAllChildNodes(projectsContainer)
            drawMenu()
        })
    }


}



const projectsContainer = document.createElement("div");
projectsContainer.classList.add("projectsContainer");
mainContainer.appendChild(projectsContainer)


const addProjectButton = document.createElement("button");
addProjectButton.classList.add("addProjectButton");
addProjectButton.innerHTML = "+ New Project"
titleCard.appendChild(addProjectButton)
addProjectButton.addEventListener("click", function() {
    // const newProject = ProjectItem()
    // projectsList.push(newProject)
    removeAllChildNodes(projectsContainer)
    addProjectModal()
})

// this will sort projects by priority 1-high, 2-med, 3-low
projectsList.sort((a,b) => (a.projectPriority > b.projectPriority) ? 1 : ((b.projectPriority > a.projectPriority) ? -1 : 0))
function removeAllChildNodes(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
};

function setDueDate(i) {
    if (projectsList[i].completed == false) {
        if (projectsList[i].dueDate == "") {
            completedBool = `Incomplete`
        } else {
            let result = differenceInCalendarDays(new Date(projectsList[i].dueDate), new Date());
            result += 1
            if (result == 1) {
                completedBool = `Due Tomorrow`;
            } else if (result == 0) {
                completedBool = `Due Today`;
            } else if (result < 0){
                completedBool = `Past Due!`;
            } else {
                completedBool = `Due in ${result} Days`;
            }
        }
    } else {
        completedBool = "COMPLETED!"
    }
}

function drawMenu() {

    projectsList.sort((a,b) => (a.projectPriority > b.projectPriority) ? 1 : ((b.projectPriority > a.projectPriority) ? -1 : 0))
    window.localStorage.clear();
    for (let i = 0; i < projectsList.length; i++) {
        window.localStorage.setItem(`item${i}`, JSON.stringify(projectsList[i]));
        let newProject = document.createElement("div");
        newProject.classList.add("project");
        projectsContainer.appendChild(newProject)
    
        let projectTitle = document.createElement("p");
        projectTitle.classList.add("projectTitle");
        projectTitle.innerHTML = `${projectsList[i].projectName}`
        if (projectsList[i].projectPriority == 1) {
            projectTitle.classList.add("projectTitleHigh");
        } else if (projectsList[i].projectPriority == 2) {
            projectTitle.classList.add("projectTitleMed");
        } else if (projectsList[i].projectPriority == 3) {
            projectTitle.classList.add("projectTitleLow");
        }
        newProject.appendChild(projectTitle)

        setDueDate(i)
    
        let projectPriority = document.createElement("p");
        projectPriority.classList.add("projectPriority");
        projectPriority.innerHTML = `${completedBool}`
        newProject.appendChild(projectPriority)

        let projectNotes = document.createElement("p");
        projectNotes.classList.add("projectNotes")
        projectNotes.innerHTML = `${projectsList[i].projectNotes}`
        
        let checklistContainer = document.createElement("div");
        checklistContainer.classList.add("checklistContainer")
        checklistContainer.id = `checklistContainer${i}`

        if (projectsList[i].completed == true) {
            console.log("here")
            console.log(projectsList)
            checklistContainer.style.display = "none"
            projectNotes.style.display = "none"
        } else {
            checklistContainer.style.display = "block"
            projectNotes.style.display = "block"            
        }

        newProject.appendChild(projectNotes)
        newProject.appendChild(checklistContainer)



        function drawCheckList () {
                    // this will sort checklist items by priority 1-high, 2-med, 3-low
            projectsList[i].checklistItemList.sort((a,b) => (a.checklistItemIsCompleted > b.checklistItemIsCompleted) ? 1 : ((b.checklistItemIsCompleted > a.checklistItemIsCompleted) ? -1 : 0))


            let addChecklistItemButton = document.createElement("button");
            addChecklistItemButton.classList.add("addChecklistItemButton")
            addChecklistItemButton.innerHTML = "+"
            addChecklistItemButton.addEventListener("click", () => {
                let checkListItemName = document.getElementById(`addChecklistItem${i}`).value;
                if (checkListItemName == "") {
                    //pass
                } else {
                    projectsList[i].addToChecklist(checkListItemName, "Due on the 12th", 3, false)
                    removeAllChildNodes(projectsContainer)
                    drawMenu()
                }

            })
            checklistContainer.appendChild(addChecklistItemButton)

            let addChecklistItemInput = document.createElement("input");
            addChecklistItemInput.classList.add("addChecklistItem")
            addChecklistItemInput.type = "text"
            addChecklistItemInput.id = `addChecklistItem${i}`
            checklistContainer.appendChild(addChecklistItemInput)

            let checklistinputbreak = document.createElement("br");
            checklistContainer.appendChild(checklistinputbreak)

        
            for (let j = 0; j < projectsList[i].checklistItemList.length; j++) {
                let checklistItemContainer = document.createElement("div");
                checklistItemContainer.classList.add("checklistItemContainer");
                checklistContainer.appendChild(checklistItemContainer)
        
                let checklistItemName = document.createElement("li");
                checklistItemName.classList.add("checklistItemName");
                checklistItemName.id = `${projectsList[i].checklistItemList[j].checklistItemName}`
                checklistItemName.innerHTML = `${projectsList[i].checklistItemList[j].checklistItemName}  `
                
                
                if (projectsList[i].checklistItemList[j].checklistItemIsCompleted == false) {
                    checklistItemName.classList.remove("checkListItemNameLine")
                    console.log(projectsList[i].checklistItemList[j].checklistItemIsCompleted)
                } else if (projectsList[i].checklistItemList[j].checklistItemIsCompleted == true) {
                    checklistItemName.classList.add("checkListItemNameLine")
                    console.log(projectsList[i].checklistItemList[j].checklistItemIsCompleted)
                };
                checklistItemContainer.appendChild(checklistItemName)

                checklistItemName.addEventListener("click", () => {
                    if (projectsList[i].checklistItemList[j].checklistItemIsCompleted == false) {
                        checklistItemName.classList.add("checkListItemNameLine")
                        projectsList[i].checklistItemList[j].checklistItemIsCompleted = true
                        window.localStorage.clear();
                        window.localStorage.setItem(`item${i}`, JSON.stringify(projectsList[i]));
                        removeAllChildNodes(checklistContainer)
                        drawCheckList()        
                    } else if (projectsList[i].checklistItemList[j].checklistItemIsCompleted == true) {
                        checklistItemName.classList.remove("checkListItemNameLine")
                        projectsList[i].checklistItemList[j].checklistItemIsCompleted = false
                        window.localStorage.clear();
                        window.localStorage.setItem(`item${i}`, JSON.stringify(projectsList[i]));
                        removeAllChildNodes(checklistContainer)
                        drawCheckList()
                    };

                });

                let checklistDeleteButton = document.createElement("button");
                checklistDeleteButton.classList.add("checklistDeleteButton");
                checklistDeleteButton.innerHTML = "Delete Checklist Item"
                checklistDeleteButton.id = j;
                checklistItemContainer.appendChild(checklistDeleteButton)
                checklistDeleteButton.addEventListener("click", () => {
                    console.log(checklistItemList)
                    projectsList[i].checklistItemList.splice(checklistDeleteButton.id, 1)
                    removeAllChildNodes(projectsContainer)
                    drawMenu()
                })
            }
        }
        drawCheckList()
    
        const dropDownButton = document.createElement("div");
        dropDownButton.classList.add("dropDownButton");
        newProject.appendChild(dropDownButton)

        if (projectsList[i].completed == false) {
            completeButtonFunction();
        } else {
            incompleteButtonFunction()
        }
        function completeButtonFunction() {
            completedButton = document.createElement("button");
            completedButton.classList.add("completedButton");
            completedButton.innerHTML = `Mark Project As Complete`
            dropDownButton.appendChild(completedButton)
            completedButton.addEventListener("click", () => {
                removeAllChildNodes(dropDownButton)
                projectsList[i].completed = true;
                projectPriority.innerHTML = "COMPLETED!"
                checklistContainer.style.display = "none"
                projectNotes.style.display = "none"
                window.localStorage.clear();
                window.localStorage.setItem(`item${i}`, JSON.stringify(projectsList[i]));
                incompleteButtonFunction ()
                deleteTodoItem()
                console.log(projectsList)
            });
        }
        function incompleteButtonFunction () {
            completedButton = document.createElement("button");
            completedButton.classList.add("completedButton");
            completedButton.innerHTML = `Mark as Incomplete`
            dropDownButton.appendChild(completedButton)
            completedButton.addEventListener("click", () => {
                removeAllChildNodes(dropDownButton)
                projectsList[i].completed = false;
                completedButton.innerHTML = `Mark Project As Complete`
        
                setDueDate(i)
        
                projectPriority.innerHTML = `${completedBool}`   
                checklistContainer.style.display = "block"  
                projectNotes.style.display = "block"       
                console.log(projectsList) 
                window.localStorage.clear();
                window.localStorage.setItem(`item${i}`, JSON.stringify(projectsList[i]));
                completeButtonFunction()
                deleteTodoItem()
            });
        }

        function deleteTodoItem() {
            let deleteButton = document.createElement("button");
            deleteButton.classList.add("deleteButton");
            deleteButton.innerHTML = `Delete Project`
            deleteButton.id = i
            dropDownButton.appendChild(deleteButton)
            deleteButton.addEventListener("click", () => {
                console.log(deleteButton.id)
                projectsList.splice(deleteButton.id, 1)
                removeAllChildNodes(projectsContainer)
                drawMenu()
                console.log(projectsList)
            });
        }

        deleteTodoItem()
        
    }
    if (projectsList.length == 0) {
        addProjectModal()
    }
}
drawMenu()
