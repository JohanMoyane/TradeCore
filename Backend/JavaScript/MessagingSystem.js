document.addEventListener("DOMContentLoaded", () => {
    let currentUser = null
    let chatPartners = {}
    let selectedUser = null

    const userList = document.querySelector(".userList")
    const chatTitle = document.querySelector(".titleText")
    const messageBox = document.querySelector(".messageBox")
    const messageInput = document.querySelector(".messageInput")
    const sendBtn = document.getElementById("sendBtn")

    fetch("/Backend/Php/sessionData.php")
        .then(usersData => {
            if (!usersData.ok) throw new Error("Failed to fetch session data.")
            return usersData.json()
        })
        .then(data => {
            if (!data.username) {
                alert("You are not logged in.")
                return
            }

            currentUser = data

            return fetch("/Backend/Php/getUsers.php")
        })
        .then(usersData => {
            if (!usersData.ok) throw new Error("Failed to fetch users.")
            return usersData.json()
        })
        .then(users => {
            if (!Array.isArray(users)) throw new Error("Invalid user data received.")

            users.forEach(user => {
                if (user.user_UID == currentUser.user_id) return

                const Username = user.username
                chatPartners[user.user_UID] = []

                const pfp = document.createElement("img")
                pfp.src = "/Frontend/images/profilePic.png"
                pfp.alt = "user picture"
                pfp.style.backgroundColor = user.colour

                const li = document.createElement("li")
                li.appendChild(pfp)
                li.appendChild(document.createTextNode(" " + Username))
                li.addEventListener("click", () => {
                    selectedUser = user.user_UID
                    chatTitle.textContent = `Chat with ${Username}`
                    loadMessages(selectedUser)
                })

                userList.appendChild(li)
            })
        })
        .catch(error => {
            console.error("Error loading chat data:", error)
            alert("Something went wrong loading chat users.")
        })

    function loadMessages(userId) {
        messageBox.innerHTML = ""

        if (!chatPartners[userId]) {
            console.warn(`No messages found for user ID: ${userId}`)
            return
        }

        chatPartners[userId].forEach(msg => {
            const msgDiv = document.createElement("div")
            msgDiv.className = `message ${msg.sender == currentUser.user_id ? "sent" : "received"}`
            msgDiv.textContent = msg.message
            messageBox.appendChild(msgDiv)
        });

        messageBox.scrollTop = messageBox.scrollHeight
    }

    sendBtn.addEventListener("click", () => {
        const text = messageInput.value.trim()

        if (!text) {
            alert("Cannot send an empty message.")
            return
        }
        if (!selectedUser) {
            alert("Please select a user to chat with.")
            return
        }
        if (!currentUser || !currentUser.user_id) {
            alert("Session error: You are not recognized.")
            return
        }

        try {
            chatPartners[selectedUser].push({
                sender: currentUser.user_id,
                message: text
            });
            loadMessages(selectedUser)
            messageInput.value = ""
        } catch (error) {
            console.error("Error sending message:", error)
            alert("Could not send message.")
        }
    })
})
