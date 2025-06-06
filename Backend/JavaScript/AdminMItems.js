document.addEventListener("DOMContentLoaded", () => {
fetch("../../Backend/Php/sessionData.php")
    .then(usersData => usersData.json())
    .then(data => {
        const role = data.role
    return fetch("/Backend/Php/marketplaceItemData.php")
        .then(itemsData => itemsData.json())
        .then(items => {


        const block = document.querySelector(".info")
        const input = document.querySelector("input[name='search']")
        const searcharea = document.querySelector(".searchbar")

        function showItems(filteredItems){
            block.innerHTML =""
        

            filteredItems.forEach(item => {
                const link = (() => {
                    if (!role) {
                        return "Login Page.html"
                    } else {
                        return `Item Details.html?item_id=${encodeURIComponent(item.item_id)}`

                    }
                })()
                const anchor = document.createElement("a")
                anchor.href = link
                anchor.className = "itemBox"

                const content = document.createElement("div")
                content.className = "content"

                const borderBox = document.createElement("div")
                borderBox.className = "borderbox"

                const img = document.createElement("img")
                img.src = item.item_image
                img.alt = "seller picture"

                const frameOverlay = document.createElement("div")
                frameOverlay.className = "frameOverlay"

                borderBox.appendChild(img)
                borderBox.appendChild(frameOverlay)

                const itemName = document.createElement("h2")
                itemName.textContent = item.item_name

                const itemDesc = document.createElement("p")
                itemDesc.textContent = item.short_desc

                const itemPrice = document.createElement("p")
                itemPrice.textContent = item.item_price

                content.appendChild(borderBox)
                content.appendChild(itemName)
                content.appendChild(itemDesc)
                content.appendChild(itemPrice)
                anchor.appendChild(content)
                block.appendChild(anchor)
            })
        }
        showItems(items)
        searcharea.addEventListener("submit", function(event){
            event.preventDefault()
            const query = input.value.trim().toLowerCase()

            const filtered = items.filter(item =>
                item.item_name.toLowerCase().includes(query) || item.short_desc.toLowerCase().includes(query)
            )
            showItems(filtered)
        })
    })})
    .catch(error => {
    console.error("Error fetching or rendering items:", error)
})
})