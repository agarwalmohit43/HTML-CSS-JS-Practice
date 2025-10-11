this.onmessage = function (e) {
    console.log('Inside worker')
    console.log(e)
    if (e.data.sum != undefined) {
        let sumObj = e.data.sum
        let message = {
            result: sumObj.x + sumObj.y,
        }
        this.postMessage(message)
    }
}

console.log(self)
