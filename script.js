showNotes();

let addBtn = document.getElementById("addBtn");
addBtn.addEventListener("click", function (e) {
  let addTxt = document.getElementById("addTxt");
  let addTitle= document.getElementById("title");

  let notes = localStorage.getItem("notes");

  if (notes == null) {
    notesObj = [];
  } else {
    notesObj = JSON.parse(notes);
  }
  notesObj.push([addTxt.value,addTitle.value]);
  localStorage.setItem("notes", JSON.stringify(notesObj));
  addTxt.value = "";
  addTitle.value="";
  console.log(notesObj);
  showNotes();
});

function showNotes() {
  let notes = localStorage.getItem("notes");
  if (notes == null) {
    notesObj = [];
  } else {
    notesObj = JSON.parse(notes);
  }
  let html = "";
  notesObj.forEach(function (element, index) {
    html += ` 
    
        <div class="noteCard my-2 mx-2 card" style="width: 18rem">
          <div class="card-body">
          <h5 class="card-title">${element[1]}</h5>
          <p class="card-text"> ${element[0]}</p>
            <button id="${index}" onclick="deleteNote(this.id)"  class="btn btn-primary">Delete Note</button>
          </div>
        </div>
    `;
  });
  let notesElm = document.getElementById("notes");
  if (notesObj.length != 0) {
    notesElm.innerHTML = html;
  }else {
    notesElm.innerHTML = `Nothing to show! Use "Add a Note" section above to add notes.`;
  }

}

// function to delete
// function deleteNote(index){
//     console.log("this function is deleting");

function deleteNote(index) {
  // console.log("I am deleting",index);
  let notes = localStorage.getItem("notes");
  if (notes == null) {
    notesObj = [];
  } else {
    notesObj = JSON.parse(notes);
  }
  notesObj.splice(index, 1);
  localStorage.setItem("notes", JSON.stringify(notesObj));

  showNotes();
}

let search = document.getElementById("searchtxt");
search.addEventListener("input", function () {
  let inputVal1 = search.value.toLowerCase();
  let inputVal2 = search.value.toUpperCase();
  let inputVal3 = search.value;
  // console.log("input event is fired", inputval);
  let noteCards = document.getElementsByClassName("noteCard");
  console.log(noteCards);
  Array.from(noteCards).forEach(function (element) {
    let cardTxt = element.getElementsByTagName("p")[0].innerText;
    let cardtitle=element.getElementsByTagName("h5")[0].innerText;
    // console.log(cardTxt)
    // console.log(cardtitle);
    if (cardTxt.includes(inputVal1) || cardTxt.includes(inputVal2) || cardTxt.includes(inputVal3) || cardtitle.includes(inputVal1) || cardtitle.includes(inputVal2) || cardtitle.includes(inputVal3)){
      element.style.display = "block";
    } else {
      element.style.display = "none";
    }
  });
});

/*
Further Features:
1. Add Title
2. Mark a note as Important
3. Separate notes by user
4. Sync and host to web server 
*/
