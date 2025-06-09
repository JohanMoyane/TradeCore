document.addEventListener("DOMContentLoaded", () => {
    const infoBox = document.querySelector(".info")

    const endpoints = {
        users: "/Backend/Php/userData.php",
        item: "/Backend/Php/marketplaceItemData.php",
        wishlist: "/Backend/Php/wishlistedData.php"
    }

    const results = []

    ;(async () => {
        for (const [table, url] of Object.entries(endpoints)) {
            try {
                const fetchingData = await fetch(url)
                const data = await fetchingData.json()
                const entries = processTableData(table, data)
                results.push(...entries)
            } catch (error) {
                console.error(`Failed to load ${table}:`, error)
                results.push({ label: `Error loading ${table}`, value: "N/A" })
            }
        }

        results.forEach(info => {
            const box = document.createElement("div")
            box.className = "itemBox infoBox"

            const content = document.createElement("div")
            content.className = "content"

            const heading = document.createElement("h1")
            heading.className = "infoHeading"
            heading.textContent = info.label

            const value = document.createElement("p")
            value.className = "infoText"
            value.textContent = info.value

            content.appendChild(heading)
            content.appendChild(value)
            box.appendChild(content)
            infoBox.appendChild(box)
        })
    })()

    function processTableData(table, data) {
        switch (table) {
            case "users":
                const buyers = data.filter(user => user.role === "buyer").length
                const sellers = data.filter(user => user.role === "seller").length
                const admins = data.filter(user => user.role === "admin").length
                return [
                    { label: "Total Users:", value: data.length },
                    { label: "Total Buyers:", value: buyers },
                    { label: "Total Sellers:", value: sellers },
                    { label: "Total Admins:", value: admins }
                ]
            case "item":
                const totalSales = data.reduce((sum, item) => {
                    const price = parseFloat(item.item_price.replace(/[^\d.]/g, ""))
                    return sum + (isNaN(price) ? 0 : price)
                }, 0).toFixed(2)
                return [{ label: "Estimated Sale Potential:", value: `R${totalSales}` }]
            case "wishlist":
                return [{ label: "Wishlist Entries:", value: data.length }]
            default:
                return [{ label: table, value: "N/A" }]
        }
    }
})
