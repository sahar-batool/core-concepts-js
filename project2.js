class NotesManager {
  constructor() {
    this.notes = [];
  }

  addNote(text) {
    if (text === "") {
      alert("please fill the note");
    } else {
      this.notes.push({ text });
      console.log(text);
      this.renderNote({ text });
      this.saveTasks()

      // console.log("addNote called with:", text); // temporary stub
    }
  }
  saveTasks() {
    localStorage.setItem("notes", JSON.stringify(this.notes));
  }

  loadTasks() {
    let saved = localStorage.getItem("notes");
    if (!saved) {
    return []; // nothing saved yet — perfectly normal, not an error
  }

  try {
    return JSON.parse(saved); // the risky operation
  } catch (error) {
    console.log("Failed to load notes, data may be corrupted:", error.message);
    return []; // fallback: start fresh instead of crashing
  }
  }
  
  //render process here
  renderNote(noteObj) {
    let noteContent = document.createElement("li");

    let textSpan = document.createElement("span");
    textSpan.textContent = noteObj.text;
    noteContent.appendChild(textSpan);

    let btn = document.createElement("button");
    btn.textContent = "Delete";
    noteContent.appendChild(btn);

    btn.addEventListener("click",(e) => {
      e.stopPropagation();
      noteContent.remove();
      this.notes = this.notes.filter(function (t) {
        return t !== noteObj;
      });
      this.saveTasks();
    });

    list.appendChild(noteContent);
  }
}

const list = document.querySelector("#notes-list");
const myNotesManager = new NotesManager();


const savedNotes = myNotesManager.loadTasks();
savedNotes.forEach(function (noteObj) {
  myNotesManager.notes.push(noteObj);
  myNotesManager.renderNote(noteObj);
});
// console.log(myNotesManager.addNote())

const input = document.querySelector("#input");
document.querySelector("#add-btn").addEventListener("click", function () {
  const text = input.value;
  myNotesManager.addNote(text);
  input.value = "";
});
