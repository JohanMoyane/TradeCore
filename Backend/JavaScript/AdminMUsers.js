fetch("../../Backend/Php/sessionData.php")
    .then(usersData => usersData.json())
    .then(data => {
        const role = data.role
    return fetch("../../Backend/Php/userData.php")
        .then(userMData => userMData.json())
        .then(user => {


        const block = document.querySelector(".info")

        user.forEach(user => {
            const link = (() => {
                if (role == "admin") {
                    return `User Details.html?user_id=${encodeURIComponent(user.user_UID)}`;
                } else {
                    return "Login Page.html";
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
                img.src = "../images/profilePic.png"
                img.alt = "user picture"
                
                const frameOverlay = document.createElement("div")
                frameOverlay.className = "frameOverlay"

                borderBox.appendChild(img)

                const itemName = document.createElement("h2")
                itemName.textContent = user.username

                content.appendChild(borderBox)
                content.appendChild(itemName)
                anchor.appendChild(content)
                block.appendChild(anchor)
        })
    })})
    .catch(error => {
    console.error("Error fetching or rendering users:", error);
});