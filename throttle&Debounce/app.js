async function search(id) {
    console.log('keyupSearch', id)
    let res = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`)
    let data = await res.json()
    let title = document.getElementById('postTitle')
    title.innerHTML = 'Title: ' + data?.title
    console.log(data)
}

function debounce(fn, delay) {
    let timerId
    return function (...args) {
        let context = this
        clearTimeout(timerId)
        timerId = setTimeout(() => {
            fn.apply(context, args)
        }, delay)
    }
}

let debouncedFunction = debounce(search, 2000)

function onkeyupDetected() {
    debouncedFunction(event.target.value)
}

async function search2(id) {
    console.log('clickSearch', id)
    let res = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`)
    let data = await res.json()
    let title = document.getElementById('postTitle2')
    title.innerHTML = 'Title: ' + data?.title
    console.log(data)
}

function throttle(fn, delay) {
    let flag = true
    let counter = 0
    return function (...args) {
        if (flag) {
            // let context = this
            fn(...[++counter, ...args])
            flag = false
            setTimeout(() => {
                flag = true
            }, delay)
        }
    }
}

let throttledFunc = throttle(search2, 5000)

function onClickDetected() {
    console.log('click detected')
    throttledFunc()
}
