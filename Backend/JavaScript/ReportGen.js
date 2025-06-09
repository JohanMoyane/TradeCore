const sampleData = {
  users: [/* your users array */],
  buyers: [/* your buyers array */],
  sellers: [/* your sellers array */],
  administrator: [/* your administrator array */],
  messages: [/* your messages array */],
  item: [/* your item array */],
  wishlist: [/* your wishlist array */]
};

// Generate summary per table
function getSummaryContent(table, data) {
  switch (table) {
    case "users":
      return { label: "Total Users", value: data.length };
    case "buyers":
      return { label: "Total Buyers", value: data.length };
    case "sellers":
      return { label: "Total Sellers", value: data.length };
    case "administrator":
      return { label: "Total Admins", value: data.length };
    case "messages":
      return { label: "Messages Sent", value: data.length };
    case "item":
      const totalSales = data.reduce((sum, item) => sum + (item.item_Price || 0), 0).toFixed(2);
      return { label: "Estimated Sales", value: `R${totalSales}` };
    case "wishlist":
      return { label: "Wishlist Entries", value: data.length };
    default:
      return { label: table, value: "N/A" };
  }
}

    const block = document.querySelector(".info")

    infos.forEach(info=>{
    block.innerHTML +=`
    <div class="itemBox">
        <div class="content">
            <h1>${info.Heading}</h1>
            <p>${info.Description}</p>
        </div>
    </div>
    `
})