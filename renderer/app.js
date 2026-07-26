// Modules
const { ipcRenderer } = require('electron');
const items = require('./items');

// Dom Nodes
let showModal = document.getElementById('show-modal'),
    closeModal = document.getElementById('close-modal'),
    modal = document.getElementById('modal'),
    addItem = document.getElementById('add-item'),
    itemUrl = document.getElementById('url'),
    search = document.getElementById('search');

// Disable & Enable modal buttons
const toggleModalButtons = () => {
    if (addItem.disabled === true) {
        addItem.disabled = false;
        addItem.style.opacity = 1;
        addItem.innerText = 'Add Bookmark';
        closeModal.style.display = 'inline-block';
    } else {
        addItem.disabled = true;
        addItem.style.opacity = 0.5;
        addItem.innerText = 'Adding...';
        closeModal.style.display = 'none';
    }
};

// Show modal
showModal.addEventListener('click', e => {
    modal.style.display = 'flex';
    itemUrl.focus();
});

// Hide modal
closeModal.addEventListener('click', e => {
    modal.style.display = 'none';
});

// Close modal on click outside modal card
modal.addEventListener('click', e => {
    if (e.target === modal) {
        modal.style.display = 'none';
    }
});

// Handle new item
addItem.addEventListener('click', e => {
    if (itemUrl.value) {
        ipcRenderer.send('new-item', itemUrl.value);
        toggleModalButtons();
    }
});

// Listen for new item from main process
ipcRenderer.on('new-item-success', (e, newItem) => {
    console.log(newItem);
    items.addItem(newItem, true);
    toggleModalButtons();
    modal.style.display = 'none';
    itemUrl.value = '';
});

// Listen for keyboard submit
itemUrl.addEventListener('keyup', e => {
    if (e.key === 'Enter') addItem.click();
});

// Real-time search filter
if (search) {
    search.addEventListener('keyup', e => {
        const query = e.target.value.toLowerCase();
        const readItems = document.getElementsByClassName('read-item');
        Array.from(readItems).forEach(item => {
            const hasMatch = item.innerText.toLowerCase().includes(query);
            item.style.display = hasMatch ? 'flex' : 'none';
        });
    });
}
