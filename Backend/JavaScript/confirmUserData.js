document.addEventListener("DOMContentLoaded", () => {
    fetch("/Backend/Php/userData.php")
        .then(usersDatas => {
            if (!usersDatas.ok) {
                throw new Error("Unauthorized access")
            }
            return usersDatas.json()
        })
        
        .then(users =>{

                const params = new URLSearchParams(window.location.search)
                const userID = params.get("user_id") 
                const selectedUser = users.find(user => user.user_UID == userID)
                
                const image = document.querySelector(".itemimg")
                image.src = "/Frontend/images/profilePic.png"

                document.querySelector(".itemimgbg").style.backgroundColor = selectedUser.colour


                const username = document.querySelector(".Username")
                username.textContent ="Username: "+ selectedUser.username

                const fullName = document.querySelector(".FullName")
                fullName.textContent = `Full name: ${selectedUser.first_name} ${selectedUser.last_name}`

                const email = document.querySelector(".email")
                email.textContent = "Email: "+ selectedUser.email

                const role = document.querySelector(".role")
                role.textContent = "User role: " +selectedUser.role

                document.getElementById("itemIdField").value = userID
        })
    
            .catch(error => {
            console.error("Error loading user:", error)
        })
    })