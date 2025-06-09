document.addEventListener("DOMContentLoaded", () => {
    let currentUser = null
    let selectedUser = null
    let usersMap = {}

    const userList = document.querySelector(".userList")
    const chatTitle = document.querySelector(".titleText")
    const messageBox = document.querySelector(".messageBox")
    const messageInput = document.querySelector(".messageInput")
    const sendBtn = document.getElementById("sendBtn")

    fetch("/Backend/Php/sessionData.php")
        .then(usersData => usersData.json())
        .then(data => {
            if (!data.user_id) {
                throw new Error("No session user.")
            }
            currentUser = data
            return fetch("/Backend/Php/userData.php")
        })
        .then(usersData => usersData.json())
        .then(async users => {
            for (const user of users) {
                console.log(user)
                usersMap[user.user_UID] = user
                if (user.user_UID == currentUser.user_id) continue

                const res = await fetch(`/Backend/Php/gettingMessages.php?sender_ID=${currentUser.user_id}&receiver_ID=${user.user_UID}`)
                const messages = await res.json()

                if (currentUser.role !== "admin" && !messages.length) continue

                const li = document.createElement("li")

                const pfp = document.createElement("img")
                pfp.src = "/Frontend/images/profilePic.png"
                pfp.alt = "user picture"
                pfp.style.backgroundColor = user.colour
                pfp.style.width = "50px"
                pfp.style.height = "50px"
                pfp.style.borderRadius = "100px"
                pfp.style.imageRendering = "pixelated"


                li.appendChild(pfp)
                li.appendChild(document.createTextNode(" " + user.username))

                li.addEventListener("click", () => {
                    selectedUser = user.user_UID
                    chatTitle.textContent = `Chat with ${user.username}`
                    loadMessages(currentUser.user_id, selectedUser)
                })

                userList.appendChild(li)
            }
        })
        .catch(error => {
            console.error("Error:", error)
            alert("Could not load users.")
        })

    function loadMessages(senderId, receiverId) {
        messageBox.innerHTML = ""

        fetch(`/Backend/Php/gettingMessages.php?sender_ID=${senderId}&receiver_ID=${receiverId}`)
            .then(res => res.json())
            .then(messages => {
                messages.forEach(msg => {
                    const msgDiv = document.createElement("div")
                    const sender = usersMap[msg.sender_ID]
                    const isCurrentUser = msg.sender_ID == currentUser.user_id

                    msgDiv.className = `message ${isCurrentUser ? "sent" : "received"}`
                    msgDiv.innerHTML = `
                        <div class="msgHeader">
                            <img src="/Frontend/images/profilePic.png" style="background-color:${sender.colour}; height:70px;border-radius:100px" alt="MissingProfile" class="msgPfp">
                        </div>
                        <div class="msgText">${msg.text_msg}</div>
                    `
                    messageBox.appendChild(msgDiv)
                })
                messageBox.scrollTop = messageBox.scrollHeight
            })
            .catch(error => {
                console.error("Error loading messages:", error)
                alert("Could not load messages.")
            })
    }

    sendBtn.addEventListener("click", () => {
        const text = messageInput.value.trim()
        if (!text || !selectedUser) {
            alert("Select a user and enter a message.")
            return
        }

        fetch("/Backend/Php/sendingMessages.php", {
            method: "POST",
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body: new URLSearchParams({
                receiver_id: selectedUser,
                message: text
            })
        })
        .then(usersData => usersData.json())
        .then(callback => {
            if (callback.success) {
                loadMessages(currentUser.user_id, selectedUser)
                messageInput.value = ""
            } else {
                alert("Message failed.")
            }
        })
        .catch(error => {
            console.error("Error sending message:", error)
            alert("Error sending message.")
        })
    })
})
