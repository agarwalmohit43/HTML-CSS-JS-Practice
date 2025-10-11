var test = 'Test';
document.querySelector('.container').addEventListener('click', (event) => {
    const {
        target: { dataset },
    } = event;
    alert(`Button Clicked: ${dataset.index}`);
});
