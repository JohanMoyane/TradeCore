fetch("../../Backend/Php/sessionData.php")
    .then(userDatas => userDatas.json())
    .then(user => {
        const role = user.role

const services=[
    {
        sImage: "../images/email icon.png",
        link: (() => {
            if (role === null) {
                return "Login Page.html";
            } else {
                return "Contact Page.html";
            }
        })(),
        service: "Contact Us" ,
        desc: "If you have any issues, you can contact us!",

    },
    {
        sImage: "../images/info icon.png",
        link: "About Page.html",
        service: "About Us" ,
        desc: "What are our goals?",

    },
    {
        sImage: "../images/Home icon.png",
        link: (() => {
            switch (role) {
                case 'admin':
                    return "AdminPage.html";
                case 'seller':
                    return "Seller Page.html";
                case 'buyer':
                    return "Buyer Page.html";
                default:
                    return "Index.html";
            }
        })(),
        service: "Return to the Main Menu" ,
        desc: "Go back to your main page.",
    }

    
];
        const block = document.querySelector(".info")

        services.forEach(service => {
            block.innerHTML += `
                <a href="${service.link}" class="itemBox">
                    <div class="content">
                        <img src="${service.sImage}">
                        <h2>${service.service}</h2>
                        <p>${service.desc}</p>
                    </div>
                </a>`
        })
    })
    .catch(error => {
        console.error("Failed to fetch session data:", err)
    });