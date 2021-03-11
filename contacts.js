
const fs = require("fs").promises;
const path = require("path");
const  {uuid}  = require('uuidv4');

const contactsPath = path.join(__dirname + "/db/contacts.json");

function listContacts() {
    console.log('List of contacts:')
    fs.readFile(contactsPath)
    .then((contacts) => console.log(JSON.parse(contacts)))
    .catch((err)=>console.log(err))
}

function getContactById(contactId) {
    fs.readFile(contactsPath)
        .then(contacts => JSON.parse(contacts))
        .then(contacts => contacts.find(contact => contact.id === contactId))
        .then(contact => console.table(contact))
        .catch(err => console.log(err));
}

function removeContact(contactId) {
    fs.readFile(contactsPath)
        .then(contacts => JSON.parse(contacts))
        .then(contacts => contacts.filter(contact => contact.id !== contactId))
        .then(newContacts => fs.writeFile(contactsPath, JSON.stringify(newContacts)).then(() => listContacts()))
        .catch(err => console.log(err));
}

function addContact(name, email, phone) {
    fs.readFile(contactsPath)
        .then(contacts => JSON.parse(contacts))
        .then(contacts =>
            fs
                .writeFile(
                    contactsPath,
                    JSON.stringify([
                        ...contacts,
                        {
                            id: uuid(),
                            name: name,
                            email: email,
                            phone: phone,
                        },
                    ])
                )
                .then(() => listContacts())
        )
        .catch(err => console.log(err));
}

module.exports = {
    listContacts,
    getContactById,
    removeContact,
    addContact,
};

