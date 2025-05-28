document.addEventListener('DOMContentLoaded', () => {

    const helpCLink = document.querySelector(".subBar")
    const loginLink = document.querySelector('.sbutton')

    fetch('../../Backend/Php/sessionData.php')
    .then(userDatas => {
        if (!userDatas.ok) {
        throw new Error('User not logged in')
        }
        return userDatas.json()
    })
    .then(user => {

        if (loginLink) {
        loginLink.innerHTML = `<div style="display: flex; flex-wrap: wrap; flex-direction: row; align-items: center; position: absolute; top: 40%; right: 10; transform: translate(-51%, -50%);">
                <img src="../images/profilePic.png" style="image-rendering: pixelated; border-radius: 100px; height: 70px;background-color:${user.user_colour};">
                </div>`;

        helpCLink.remove()
        const role = user.role
        const link = (() => {
            switch (role) {
                case 'admin':
                    return "AdminPage.html";
                case 'seller':
                    return "Seller Page.html";
                case 'buyer':
                    return "Buyer Page.html";
                default:
                    return "Index.html";
            }})()
        loginLink.href = link
        }
    })
    .catch(error => {

        if (loginLink) {
        loginLink.textContent = 'Login'
        loginLink.href = "Login Page.html"
        }
    })
})

