const worklist = document.querySelector('#To-Do-List');
const form = document.querySelector('#add-task');


//create element and render work to do
function renderList(doc) {
    let li = document.createElement('li');
    let name = document.createElement('span');
    let trash = document.createElement('div')

    li.setAttribute('data-id', doc.id);

    name.textContent = doc.data().name;
    trash.textContent = "x"

    li.appendChild(name);
    li.appendChild(trash);
    worklist.appendChild(li);


    // // deleting data
    trash.addEventListener('click', (e) => {
        e.stopPropagation();
        let id = e.target.parentElement.getAttribute('data-id');
        db.collection('todolist').doc(id).delete();
    })
}
// for query db.collection('todolsit).where('work','==','work2')
// for ordering data in db db.collection('todolist').orderBy(' work(column name )') //upper case comes before lower case
// we need to create an index for  order  of your docs ....firestore does it automatically
// db.collection('todolist').where('work', '==', 'time').orderBy('time').get().then(snapshot => {
//     snapshot.docs.forEach(doc => {
//         console.log(doc.data())
//         renderList(doc)
//     });

// })



//getting data
// db.collection('todolist').get().then(snapshot => {
//     snapshot.docs.forEach(doc => {
//         console.log(doc.data())
//         renderList(doc)
//     });

// })

//saving to firestore
form.addEventListener('submit', (evnt) => {
    evnt.preventDefault();
    db.collection('todolist').add({
        name: form.name.value
    });
    form.name.value = ''
})

// real-time database
db.collection('todolist').onSnapshot(snapshot => {
    let changes = snapshot.docChanges();
    changes.forEach(change => {
        console.log(change.doc.data());

        if (change.type == 'added') {
            renderList(change.doc);

        } else if (change.type == 'removed') {
            let li = worklist.querySelector('[data-id=' + change.doc.id + ']');
            worklist.removeChild(li);
        }


    });
});



// for updating doc
// db.collection('todolist').doc('4g9FnUD0J3ZY7N1lHbJR)copy the id').update({
//      name:"anything we want give"
// })

// db.collection('todolist').doc('4g9FnUD0J3ZY7N1lHbJR)copy the id').set({
//      name:"aaaa"
// it wqil override the whole document and remaining objects will be set to null
// })