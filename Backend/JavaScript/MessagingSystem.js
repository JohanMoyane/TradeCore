document.addEventListener("DOMContentLoaded", () => {
    const infoBox = document.querySelector(".info")

    const endpoints = {
        users: "/Backend/Php/getUsers.php",
        item: "/Backend/Php/getItems.php",
        wishlist: "/Backend/Php/getWishlist.php"
    }

    const results = []

    (async () => {
        for (const [table, url] of Object.entries(endpoints)) {
            try {
                const fetchingData = await fetch(url)
                const data = await fetchingData.json()
                const entry = processTableData(table, data)
                results.push(entry)
            } catch (error) {
                console.error(`Failed to load ${table}:`, error)
                results.push({ label: `Error loading ${table}`, value: "N/A" })
            }
        }

        results.forEach(GeneratedInfo => {
            const box = document.createElement("div")
            box.className = "itemBox infoBox"

            const content = document.createElement("div")
            content.className = "content"

            const heading = document.createElement("h1")
            heading.className = "infoHeading"
            heading.textContent = GeneratedInfo.label

            const value = document.createElement("p")
            value.className = "infoText"
            value.textContent = GeneratedInfo.value

            content.appendChild(heading)
            content.appendChild(value)
            box.appendChild(content)
            infoBox.appendChild(box)
        })
    })()
    function processTableData(table, data) {
        switch (table) {
            case "users":
                return { label: "Total Users", value: data.length }
            case "buyers":
                return { label: "Total Buyers", value: data.filter(u => u.role === "buyer").length }
            case "sellers":
                return { label: "Total Sellers", value: data.filter(u => u.role === "seller").length }
            case "administrator":
                return { label: "Total Admins", value: data.filter(u => u.role === "administrator").length }
            case "item":
                const totalSales = data.reduce((sum, item) => {
                    const price = parseFloat(item.item_price.replace(/[^\d.]/g, ""))
                    return sum + (isNaN(price) ? 0 : price)
                }, 0).toFixed(2)
                return { label: "Estimated Sale potential", value: `R${totalSales}` }
            case "wishlist":
                return { label: "Wishlist Entries", value: data.length }
            default:
                return { label: table, value: "N/A" }
        }
    }
})
