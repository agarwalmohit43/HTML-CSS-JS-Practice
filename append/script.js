const container = document.querySelector('.container');
var index = 0;

const insertAtPosition = (parent, child, index) => {
    if (index >= parent.children.length) {
        parent.append(child);
    } else {
        parent.insertBefore(child, parent.children[index]);
    }
};

const addButtons = () => {
    const buttonContainer = document.createElement('div');
    buttonContainer.classList.add('btn-container');

    const appendBtn = document.createElement('button');
    appendBtn.textContent = 'Append';
    appendBtn.addEventListener('click', () => {
        const newContainerRef = document.querySelector('.new-container');
        const span = document.createElement('span');
        span.textContent = `Order: ${index} || Append || Span Tag || ${
            Date.now() - Math.random()
        }`;

        newContainerRef.append(span);
        index++;
    });

    const prependBtn = document.createElement('button');
    prependBtn.textContent = 'Prepend';
    prependBtn.addEventListener('click', () => {
        const newContainerRef = document.querySelector('.new-container');
        const span = document.createElement('span');
        span.textContent = `Order: ${index} || Prepend || Span Tag || ${
            Date.now() - Math.random()
        }`;
        newContainerRef.prepend(span);
        index++;
    });

    const indexInsertionBtn = document.createElement('button');
    indexInsertionBtn.textContent = 'Insert at Index 1';
    indexInsertionBtn.addEventListener('click', () => {
        const newContainerRef = document.querySelector('.new-container');
        const span = document.createElement('span');
        span.textContent = `Order: ${index} || Insertion || Span Tag || ${
            Date.now() - Math.random()
        }`;
        insertAtPosition(newContainerRef, span, 1);
        index++;
    });

    buttonContainer.append(prependBtn);
    buttonContainer.append(appendBtn);
    buttonContainer.append(indexInsertionBtn);
    container.append(buttonContainer);
};

const addChildren = () => {
    const newContainer = document.createElement('div');
    newContainer.classList.add('new-container');
    container.append(newContainer);
};

addButtons();
addChildren();
