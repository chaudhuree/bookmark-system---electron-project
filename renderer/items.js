const items = document.getElementById("items");

const storage = JSON.parse(
    localStorage.getItem("readit-items")
) || [];

exports.storage = storage;

exports.saveItems = () => {
    localStorage.setItem("readit-items", JSON.stringify(storage));
};

exports.checkNoItems = () => {
    const noItems = document.getElementById("no-items");
    if (noItems) {
        noItems.style.display = storage.length === 0 ? "flex" : "none";
    }
};

exports.addItem = (item, isNew = false) => {
    const itemNode = document.createElement("div");
    itemNode.classList.add("read-item");

    itemNode.innerHTML = `
        <div class="img-box">
            <img src="${item.screenshot}" alt="${item.title}">
            <span class="delete-btn" title="Delete Bookmark"><i class="fas fa-trash"></i></span>
        </div>
        <h2">${item.title}</h2>
    `;

    items.appendChild(itemNode);

    // Handle delete button click
    const deleteBtn = itemNode.querySelector(".delete-btn");
    if (deleteBtn) {
        deleteBtn.addEventListener("click", e => {
            e.stopPropagation();
            exports.deleteItem(itemNode, item);
        });
    }

    if (isNew) {
        storage.push(item);
        exports.saveItems();
    }

    exports.checkNoItems();
};

// Add all items in the UI
storage.forEach(item => exports.addItem(item));
exports.checkNoItems();

// Handle item deletion
exports.deleteItem = (itemNode, item) => {
    // Find index in storage
    const itemIndex = storage.findIndex(i => i.url === item.url && i.title === item.title);
    if (itemIndex > -1) {
        // Remove from storage
        storage.splice(itemIndex, 1);

        // Save storage
        exports.saveItems();
    }

    // Remove DOM element
    if (itemNode && itemNode.remove) {
        itemNode.remove();
    }

    exports.checkNoItems();
};