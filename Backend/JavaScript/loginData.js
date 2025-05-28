document.addEventListener("DOMContentLoaded", () => {
    fetch("../../Backend/Php/sessionData.php")
      .then(userDatas => {
        if (!userDatas.ok) {
          window.location.href = "Login Page.html"
          throw new Error("Not logged in")
        }
        return userDatas.json()
      })
      .then(user => {

        const userName = document.querySelector(".Username h1")
        if (userName) {userName.textContent = user.username}


        const welcomeEl = document.querySelector(".content h1")
        if (welcomeEl) {
          welcomeEl.textContent += `${user.username}:`
        }


        const avatar = document.querySelector(".Username img")
        if (avatar) {
          avatar.style.backgroundColor = `${user.user_colour}`
        }
      })
      .catch(error => console.error("Session fetch error:", error))
})
