document.addEventListener('DOMContentLoaded', () => {

    const helpCLink = document.querySelector(".subBar")
    const loginLink = document.querySelector(".sbutton")
    const userProfile = document.getElementById("userProfile");

    fetch("/Backend/Php/sessionData.php")
    .then(userDatas => {
        if (!userDatas.ok) {
        throw new Error("User not logged in")
        }
        return userDatas.json()
    })
    .then(user => {

        if (loginLink) {
        userProfile.innerHTML = `
            <div style="display: flex; align-items: center; gap: 10px;">
                <img src="/Frontend/images/profilePic.png"
                     style="image-rendering: pixelated; border-radius: 100px; height: 50px; background-color:${user.user_colour};">
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

