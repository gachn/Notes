const fs = require('fs');
const _ = require('lodash');
const yargs = require('yargs');
const notes = require('./notes.js');

const titleOptions={
    describe: 'Title of the Note',
    demand: true,
    alias: 't'
};
const bodyOptions={
    describe: 'Body of the Note',
    demand: true,
    alias: 'b'
};
const argv = yargs
    .command('add','Add a Note',{
        title: titleOptions,
        body: bodyOptions
    })
    .command('read','Read a Note',{
        title:titleOptions
    }
    )
    .command('list','List all Notea',{
    })
    .command('remove','Delete a Note',{
        title: titleOptions
    })
    .help()
    .argv;
var command = argv._[0];
if (command === 'add') {
    var note=notes.addNote(argv.title, argv.body);
    if(note) notes.printNote(note);
} else if (command === 'list') {
     var allNotes = notes.getAll();
     console.log(`Printing (${allNotes.length}) Notes`);
     allNotes.forEach((note) => notes.printNote(note) );
} else if (command === 'read') {
       var note = notes.getNote(argv.title);
       if(note) notes.printNote(note);
        else console.log("Note Note Found");

} else if (command === 'remove') {
     notes.removeNote(argv.title);
} else {
    console.log('Command not recognized');
}
