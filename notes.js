const fs = require('fs');
var saveNote =(notes) =>{
    var notesString = fs.writeFileSync('notes-data.json', JSON.stringify(notes));
}
var fetchNotes=()=>{
    var notes=[];
    try {
        var noteString = fs.readFileSync('notes-data.json');
        notes = JSON.parse(noteString);
    }
    catch(e){
        console.log('err');
    }
    return notes;
}

var printNote = (note) => {
    console.log("--------------------------------");
    console.log(`Title: ${ note.title }`);
    console.log(`Body: ${ note.body }`);

}
var addNote = (title, body) => {
  var notes =fetchNotes();
  var note = {
    title,
    body
  };
    var duplicateNotes=notes.filter((note)=> note.title===title);
    if(duplicateNotes.length == 0) {
        notes.push(note);
        saveNote(notes);
        return note;
    }
};

var getAll = () => {
 return fetchNotes();
};

var getNote = (reqTitle) => {
    var notes=fetchNotes();
    var requiredNote=notes.filter((note)=> note.title === reqTitle );
    if(requiredNote.length != 0 )
    return requiredNote[0] ;
};

var removeNote = (title) => {
    var notes=fetchNotes();
    console.log(notes);
    var updatedNotes=notes.filter((note)=> note.title != title);
    console.log(updatedNotes);
    saveNote(updatedNotes);
};

module.exports = {
  addNote,
  getAll,
  getNote,
  printNote,
  removeNote
};
