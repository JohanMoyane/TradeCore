document.addEventListener("DOMContentLoaded", () => {
fetch("/Backend/Php/sessionData.php")
    .then(usersData => usersData.json())
    .then(data => {
        const role = data.role
    return fetch("/Backend/Php/userData.php")
        .then(userMData => userMData.json())
        .then(users => {


        const block = document.querySelector(".info")
        const input = document.querySelector("input[name='search']")
        const searcharea = document.querySelector(".searchbar")  
        
        function showUsers(filteredUsers){
            block.innerHTML =""
            
        filteredUsers.forEach(user => {
            const link = (() => {
                if (role == "admin") {
                    return `user Details.html?user_id=${encodeURIComponent(user.user_UID)}`
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

                const pfp = document.createElement("img")
                pfp.src = "/Frontend/images/profilePic.png"
                pfp.alt = "user picture"
                
                const frameOverlay = document.createElement("div")
                frameOverlay.className = "frameOverlay"

                borderBox.appendChild(pfp)

                const userName = document.createElement("h2")
                userName.textContent = user.username

                content.appendChild(borderBox)
                content.appendChild(userName)
                anchor.appendChild(content)
                block.appendChild(anchor)
        })
    }

    showUsers(users)

    searcharea.addEventListener("submit", function (event){

        event.preventDefault()
        const query = input.value.trim().toLowerCase()

        const filtered = users.filter(user =>
            user.username.toLowerCase().includes(query)
        )
        showUsers(filtered)
    })

    })})
    .catch(error => {
    console.error("Error fetching or rendering users:", error)
})
})