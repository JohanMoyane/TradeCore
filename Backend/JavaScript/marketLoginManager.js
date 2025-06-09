document.addEventListener('DOMContentLoaded', () => {

    const helpCLink = document.querySelector(".subBar")
    const loginLink = document.querySelector(".sbutton")

    fetch("/Backend/Php/sessionData.php")
    .then(userDatas => {
        if (!userDatas.ok) {
        throw new Error("User not logged in")
        }
        return userDatas.json()
    })
    .then(user => {

        if (loginLink) {
        loginLink.innerHTML = `display: flex; align-items: center; justify-content: center; gap: 10px; padding: 8px 12px; border-radius: 10px; background: white; box-shadow: 0 0 10px black; margin: auto;
                <img src="/Frontend/images/profilePic.png" style="image-rendering: pixelated; border-radius: 100px; height: 70px;background-color:${user.user_colour};">
                </div>`;

        helpCLink.remove()
        const role = user.role
        const link = (() => {
            switch (role) {
                case "admin":
                    return "AdminPage.html"
                case "seller":
                    return "Seller Page.html"
                case "buyer":
                    return "Buyer Page.html"
                default:
                    loginLink.innerHTML = "Home"
                    return "Index.html"
            }})()
        loginLink.href = link
        }
    })
    .catch(error => {
        console.log(error)
        if (loginLink) {
        loginLink.innerHTML = "Login"
        loginLink.href = "Login Page.html"
        }
    })
})

