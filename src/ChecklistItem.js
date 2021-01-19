const ChecklistItem = (
  checklistItemName,
  checklistItemNotes,
  checklistItemPriority,
  checklistItemIsCompleted = false
) => {
  return {
    checklistItemName,
    checklistItemNotes,
    checklistItemPriority,
    checklistItemIsCompleted,
  };
};

const ProjectItem = (
  projectName = "Title",
  projectNotes = "Notes...",
  projectPriority = 3,
  completed = false,
  dueDate = "",
  checklistItemArray = []
) => {
  let checklistItemList = checklistItemArray;
  const addToChecklist = (
    checklistItemName,
    checklistItemNotes,
    checklistItemPriority,
    checklistItemIsCompleted
  ) => {
    const newChecklistItem = ChecklistItem(
      checklistItemName,
      checklistItemNotes,
      checklistItemPriority,
      checklistItemIsCompleted
    );
    checklistItemList.push(newChecklistItem);
  };
  return {
    projectName,
    projectNotes,
    projectPriority,
    checklistItemList,
    addToChecklist,
    completed,
    dueDate,
  };
};

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

export { ChecklistItem, ProjectItem, setDueDate };
