const addBtn = document.getElementById("add");

const noteTol= JSON.parse(localStorage.getItem("noteTol"));
if(noteTol){
    noteTol.forEach(note => {
       addNewNote(note); 
    });
}


addBtn.addEventListener("click", () => {
    addNewNote();
});

function addNewNote(text= '') {
    const note = document.createElement("div");
    note.classList.add("note");
    note.innerHTML = `
        <div class="note">
            <div class="tools">
                <button class="edit"><i class="far fa-edit"></i></button>
                <button class="delete"><i class="fas fa-trash"></i></button>
            </div>
            <div class="main hidden"></div>
            <textarea></textarea>
        </div>
    `;

    const editBtn = note.querySelector(".edit");
    const deleteBtn = note.querySelector(".delete");

    const main = note.querySelector(".main");
    const textArea = note.querySelector("textarea");

    textArea.value= text;
    main.innerHTML = marked(text)

    editBtn.addEventListener("click", () => {
        main.classList.toggle("hidden");
        textArea.classList.toggle("hidden");
    });

    deleteBtn.addEventListener("click", () => {
        note.remove();
        upDateLS();
    });

    textArea.addEventListener("input", (e) => {
        const { value } = e.target;

        main.innerHTML = marked(value);

        upDateLS();
    });

    document.body.appendChild(note);
}

function upDateLS() {
    const notes = document.querySelectorAll("textarea");
    const noteEl = [];
    notes.forEach(note => {
        noteEl.push(note.value);
    });
    localStorage.setItem("noteEl", JSON.stringify(noteEl));
}
