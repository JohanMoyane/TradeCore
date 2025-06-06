document.addEventListener("DOMContentLoaded", () => {
    let userID
    fetch("/Backend/Php/sessionData.php")
        .then(usersData => usersData.json())
        .then(data => {
            userID = data.user_id;
            return fetch("/Backend/Php/marketplaceItemData.php")
        })
        .then(itemsDatas => {
            if (!itemsDatas.ok) {
                throw new Error("No items")
            }
            return itemsDatas.json()
        })
        .then(items => {
            const itemsContainer = document.querySelector(".publishBoard .items")
            itemsContainer.innerHTML = ""

            items.forEach(item => {
                if (userID == item.seller_id){
                const itemWrapper = document.createElement("div")
                itemWrapper.classList.add("item")

                const itemName = document.createElement("p")
                itemName.textContent = item.item_name

                const removeBtn = document.createElement("button")
                removeBtn.textContent = "Remove";
                removeBtn.addEventListener("click", () => {
                        fetch("/Backend/Php/removeItem.php", {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json"
                            },
                            body: JSON.stringify({ item_id: item.item_id })
                        })
                        .then(response => {
                            if (!response.ok) {
                                throw new Error("Failed to delete item")
                            }

                            itemWrapper.remove()
                        })
                        .catch(error => {
                            console.error("Error deleting item:", error)
                            alert("Error deleting item.")
                        });
                });

                itemWrapper.appendChild(itemName)
                itemWrapper.appendChild(removeBtn)
                itemsContainer.appendChild(itemWrapper)
                }

            });
        })
        .catch(error => {
            console.error("Error loading items:", error)
        });
});
