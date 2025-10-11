if (window.Worker) {
    const worker = new Worker('./worker.js')

    const dataObj = { sum: { x: 1, y: 2 } }

    worker.postMessage(dataObj)

    worker.onmessage = function (e) {
        console.log('Inside window workspace')
        console.log(e)
        console.log(e.data.result)
    }

    // worker.terminate()
}

function myfunc() {
    let form = document.forms.my
    let elem = form.elements.one
    console.log(elem)
    console.log(form)
}
