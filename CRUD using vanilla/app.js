let data = [{ fName: 'Mohit', lName: 'Kumar' }]

function keyUpDetected() {
    let inputs = document.getElementsByClassName('editable-form-inputs')
    let inputId = event.target.id
    if (inputId === 'fName') {
        inputs[0].classList.remove('emptyInputs')
    } else if (inputId === 'lName') {
        inputs[1].classList.remove('emptyInputs')
    }
}

const handleClick = () => {
    event.preventDefault()

    let formObj = new FormData(document.getElementById('inputForm'))
    let formData = Object.fromEntries(formObj)
    let inputs = document.getElementsByClassName('editable-form-inputs')
    let actionButton = document.getElementById('formSubmitButton')
    if (formData.fName && formData.lName) {
        if (actionButton.innerText === 'Submit') {
            let length = data.push(formData)
            addRowToTable(formData, length)
        } else {
            let index = actionButton.getAttribute('index')
            data[index] = formData
            updateTable(formData, index)
            actionButton.innerText = 'Submit'
        }
        inputs[0].value = ''
        inputs[1].value = ''
    } else {
        let fName = document.getElementById('fName')
        let lName = document.getElementById('lName')
        if (fName.value === '' && lName.value === '') {
            inputs[0].classList.add('emptyInputs')
            inputs[1].classList.add('emptyInputs')
        } else if (lName.value === '') {
            inputs[1].classList.add('emptyInputs')
        } else {
            inputs[0].classList.add('emptyInputs')
        }

        // alert('Input field cannot be empty')
    }
}

function addRowToTable(rowData, length) {
    // let table = document.getElementById('dataTable')
    let tableBody = document.getElementById('dataTable-body')
    let row = tableBody.insertRow(-1)
    let cell1 = row.insertCell(0)
    let cell2 = row.insertCell(1)
    let cell3 = row.insertCell(2)
    cell1.innerHTML = rowData.fName
    cell2.innerHTML = rowData.lName
    cell3.innerHTML = `<button onclick=(edit(${
        length - 1
    }))>Edit</button><button onclick=(deleteRow(${length - 1}))>Delete</button>`
}

function updateTable(formData, index) {
    let tableBody = document.getElementById('dataTable-body')
    tableBody.deleteRow(index)
    let row = tableBody.insertRow(index)
    let cell1 = row.insertCell(0)
    let cell2 = row.insertCell(1)
    let cell3 = row.insertCell(2)
    cell1.innerHTML = formData.fName
    cell2.innerHTML = formData.lName
    cell3.innerHTML = `<button onclick=(edit(${index}))>Edit</button><button onclick=(deleteRow(${index}))>Delete</button>`
}

function edit(index) {
    let current = data[index]
    let actionButton = document.getElementById('formSubmitButton')
    document.getElementById('fName').value = current.fName
    document.getElementById('lName').value = current.lName
    actionButton.innerText = 'Update'
    actionButton.setAttribute('index', index)
}

function deleteRow(index) {
    data.splice(index, 1)
    // let tableBody = document.getElementById('dataTable-body')
    // tableBody.deleteRow(index)
    // console.log(tableBody, data)
    rebuildTableData()
}

function deleteAllRows() {
    var Parent = document.getElementById('dataTable-body')
    while (Parent.hasChildNodes()) {
        Parent.removeChild(Parent.firstChild)
    }
}

function rebuildTableData() {
    deleteAllRows()

    for (var [i, v] of data.entries()) {
        var tBody = document.getElementById('dataTable-body')
        var row = tBody.insertRow(tBody.rows.length)
        var cell1 = row.insertCell(0)
        var cell2 = row.insertCell(1)
        var cell3 = row.insertCell(2)

        cell1.innerHTML = v.fName
        cell2.innerHTML = v.lName
        cell3.innerHTML = `<button onclick=(edit(${i}))>Edit</button><button onclick=(deleteRow(${i}))>Delete</button>`
    }

    document.getElementById('empId').value = ''
    document.getElementById('empName').value = ''
}
