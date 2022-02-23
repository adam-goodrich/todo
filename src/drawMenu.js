import { addProjectModal } from "./modal";

function drawMenu() {
  let completedButton;
  let completedBool = "";
  let projectsList = [];
  let tempItemList = [];

  function setDueDate(i) {
    if (projectsList[i].completed == false) {
      if (projectsList[i].dueDate == "") {
        completedBool = `Incomplete`;
      } else {
        let result = differenceInCalendarDays(
          new Date(projectsList[i].dueDate),
          new Date()
        );
        result += 1;
        if (result == 1) {
          completedBool = `Due Tomorrow`;
        } else if (result == 0) {
          completedBool = `Due Today`;
        } else if (result < 0) {
          completedBool = `Past Due!`;
        } else {
          completedBool = `Due in ${result} Days`;
        }
      }
    } else {
      completedBool = "COMPLETED!";
    }
  }

  projectsList.sort((a, b) =>
    a.projectPriority > b.projectPriority
      ? 1
      : b.projectPriority > a.projectPriority
      ? -1
      : 0
  );
  window.localStorage.clear();
  for (let i = 0; i < projectsList.length; i++) {
    window.localStorage.setItem(`item${i}`, JSON.stringify(projectsList[i]));
    let newProject = document.createElement("div");
    newProject.classList.add("project");
    projectsContainer.appendChild(newProject);

    let projectTitle = document.createElement("p");
    projectTitle.classList.add("projectTitle");
    projectTitle.innerHTML = `${projectsList[i].projectName}`;
    if (projectsList[i].projectPriority == 1) {
      projectTitle.classList.add("projectTitleHigh");
    } else if (projectsList[i].projectPriority == 2) {
      projectTitle.classList.add("projectTitleMed");
    } else if (projectsList[i].projectPriority == 3) {
      projectTitle.classList.add("projectTitleLow");
    }
    newProject.appendChild(projectTitle);

    setDueDate(i);

    let projectPriority = document.createElement("p");
    projectPriority.classList.add("projectPriority.");
    projectPriority.innerHTML = `${completedBool}`;
    newProject.appendChild(projectPriority);

    let projectNotes = document.createElement("p");
    projectNotes.classList.add("projectNotes");
    projectNotes.innerHTML = `${projectsList[i].projectNotes}`;

    let checklistContainer = document.createElement("div");
    checklistContainer.classList.add("checklistContainer");
    checklistContainer.id = `checklistContainer${i}`;

    if (projectsList[i].completed == true) {
      checklistContainer.style.display = "none";
      projectNotes.style.display = "none";
    } else {
      checklistContainer.style.display = "block";
      projectNotes.style.display = "block";
    }

    newProject.appendChild(projectNotes);
    newProject.appendChild(checklistContainer);

    function drawCheckList() {
      // this will sort checklist items by priority 1-high, 2-med, 3-low
      projectsList[i].checklistItemList.sort((a, b) =>
        a.checklistItemIsCompleted > b.checklistItemIsCompleted
          ? 1
          : b.checklistItemIsCompleted > a.checklistItemIsCompleted
          ? -1
          : 0
      );

      let addChecklistItemButton = document.createElement("button");
      addChecklistItemButton.classList.add("addChecklistItemButton");
      addChecklistItemButton.innerHTML = "+";
      addChecklistItemButton.addEventListener("click", () => {
        let checkListItemName = document.getElementById(
          `addChecklistItem${i}`
        ).value;
        if (checkListItemName == "") {
          //pass
        } else {
          projectsList[i].addToChecklist(
            checkListItemName,
            "Due on the 12th",
            3,
            false
          );
          removeAllChildNodes(projectsContainer);
          drawMenu();
        }
      });
      checklistContainer.appendChild(addChecklistItemButton);

      let addChecklistItemInput = document.createElement("input");
      addChecklistItemInput.classList.add("addChecklistItem");
      addChecklistItemInput.type = "text";
      addChecklistItemInput.id = `addChecklistItem${i}`;
      checklistContainer.appendChild(addChecklistItemInput);

      let checklistinputbreak = document.createElement("br");
      checklistContainer.appendChild(checklistinputbreak);

      for (let j = 0; j < projectsList[i].checklistItemList.length; j++) {
        let checklistItemContainer = document.createElement("div");
        checklistItemContainer.classList.add("checklistItemContainer");
        checklistContainer.appendChild(checklistItemContainer);

        let checklistItemName = document.createElement("li");
        checklistItemName.classList.add("checklistItemName");
        checklistItemName.id = `${projectsList[i].checklistItemList[j].checklistItemName}`;
        checklistItemName.innerHTML = `${projectsList[i].checklistItemList[j].checklistItemName}  `;

        if (
          projectsList[i].checklistItemList[j].checklistItemIsCompleted == false
        ) {
          checklistItemName.classList.remove("checkListItemNameLine");
        } else if (
          projectsList[i].checklistItemList[j].checklistItemIsCompleted == true
        ) {
          checklistItemName.classList.add("checkListItemNameLine");
        }
        checklistItemContainer.appendChild(checklistItemName);

        checklistItemName.addEventListener("click", () => {
          if (
            projectsList[i].checklistItemList[j].checklistItemIsCompleted ==
            false
          ) {
            checklistItemName.classList.add("checkListItemNameLine");
            projectsList[i].checklistItemList[
              j
            ].checklistItemIsCompleted = true;
            window.localStorage.clear();
            window.localStorage.setItem(
              `item${i}`,
              JSON.stringify(projectsList[i])
            );
            removeAllChildNodes(checklistContainer);
            drawCheckList();
          } else if (
            projectsList[i].checklistItemList[j].checklistItemIsCompleted ==
            true
          ) {
            checklistItemName.classList.remove("checkListItemNameLine");
            projectsList[i].checklistItemList[
              j
            ].checklistItemIsCompleted = false;
            window.localStorage.clear();
            window.localStorage.setItem(
              `item${i}`,
              JSON.stringify(projectsList[i])
            );
            removeAllChildNodes(checklistContainer);
            drawCheckList();
          }
        });

        let checklistDeleteButton = document.createElement("button");
        checklistDeleteButton.classList.add("checklistDeleteButton");
        checklistDeleteButton.innerHTML = "Delete Checklist Item";
        checklistDeleteButton.id = j;
        checklistItemContainer.appendChild(checklistDeleteButton);
        checklistDeleteButton.addEventListener("click", () => {
          projectsList[i].checklistItemList.splice(checklistDeleteButton.id, 1);
          removeAllChildNodes(projectsContainer);
          drawMenu();
        });
      }
    }

    drawCheckList();

    const dropDownButton = document.createElement("div");
    dropDownButton.classList.add("dropDownButton");
    newProject.appendChild(dropDownButton);

    if (projectsList[i].completed == false) {
      completeButtonFunction();
    } else {
      incompleteButtonFunction();
    }

    function completeButtonFunction() {
      completedButton = document.createElement("button");
      completedButton.classList.add("completedButton");
      completedButton.innerHTML = `Mark Project As Complete`;
      dropDownButton.appendChild(completedButton);
      completedButton.addEventListener("click", () => {
        removeAllChildNodes(dropDownButton);
        projectsList[i].completed = true;
        projectPriority.innerHTML = "COMPLETED!";
        checklistContainer.style.display = "none";
        projectNotes.style.display = "none";
        window.localStorage.clear();
        window.localStorage.setItem(
          `item${i}`,
          JSON.stringify(projectsList[i])
        );
        incompleteButtonFunction();
        deleteTodoItem();
      });
    }

    function incompleteButtonFunction() {
      completedButton = document.createElement("button");
      completedButton.classList.add("completedButton");
      completedButton.innerHTML = `Mark as Incomplete`;
      dropDownButton.appendChild(completedButton);
      completedButton.addEventListener("click", () => {
        removeAllChildNodes(dropDownButton);
        projectsList[i].completed = false;
        completedButton.innerHTML = `Mark Project As Complete`;

        setDueDate(i);

        projectPriority.innerHTML = `${completedBool}`;
        checklistContainer.style.display = "block";
        projectNotes.style.display = "block";
        window.localStorage.clear();
        window.localStorage.setItem(
          `item${i}`,
          JSON.stringify(projectsList[i])
        );
        completeButtonFunction();
        deleteTodoItem();
      });
    }

    function deleteTodoItem() {
      let deleteButton = document.createElement("button");
      deleteButton.classList.add("deleteButton");
      deleteButton.innerHTML = `Delete Project`;
      deleteButton.id = i;
      dropDownButton.appendChild(deleteButton);
      deleteButton.addEventListener("click", () => {
        projectsList.splice(deleteButton.id, 1);
        removeAllChildNodes(projectsContainer);
        drawMenu();
      });
    }

    deleteTodoItem();
  }
  if (projectsList.length == 0) {
    addProjectModal();
  }
}

export { drawMenu };
