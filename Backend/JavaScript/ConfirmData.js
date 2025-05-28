document.addEventListener("DOMContentLoaded", () => {
    fetch("../../Backend/Php/marketplaceItemData.php")
        .then(itemsDatas => {
            if (!itemsDatas.ok) {
                throw new Error("Unauthorized access")
            }
            return itemsDatas.json()
        })
        .then(items => {
            fetch("../../Backend/Php/marketplaceSellerData.php")
                .then(sellersDatas => {
                    if (!sellersDatas.ok) {
                        throw new Error("Unauthorized access")
                    }
                    return sellersDatas.json()
                })
                .then(sellers => {
                    const params = new URLSearchParams(window.location.search)
                    const itemId = params.get("item_id")

                    const selectedItem = items.find(item => item.item_id == itemId)
                    if (!selectedItem) {
                        console.error("Item not found")
                        return
                    }

                    const sellerID = selectedItem.seller_id
                    const selectedSeller = sellers.find(seller => seller.seller_id == sellerID)

                    document.querySelectorAll(".itemimg, .itemimgbg").forEach(image => {
                        image.src = selectedItem.item_image
                    })

                    const sellerName = document.querySelector(".Username")
                    sellerName.textContent = `${selectedSeller.seller_username} is selling this item:`

                    const itemName = document.querySelector(".itemName")
                    itemName.textContent = selectedItem.item_name

                    const itemDesc = document.querySelector(".itemDesc")
                    itemDesc.textContent = `Description: ${selectedItem.item_desc}`

                    const itemPrice = document.querySelector(".itemPrice")
                    itemPrice.textContent = selectedItem.item_price

                    document.getElementById("itemIdField").value = itemId
                })
        })
        .catch(error => {
            console.error("Error loading item:", error)
        })
})
