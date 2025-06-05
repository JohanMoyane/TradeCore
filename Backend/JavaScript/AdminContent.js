const Dashboard=[
    {
        link:"Manage Users.html",
        Image:"/Frontend/images/profilePic.png",
        Heading:"Manage users",
    },
    {
        link:"Manage Items.html",
        Image:"/Frontend/Frontend/images/handbag.png",
        Heading:"Manage items",
    },
    {
        link:"Reports.html",
        Image:"/Frontend/Frontend/images/Report.png",
        Heading:"Generate Reports",
    }
    ]

    const block = document.querySelector(".info")

        Dashboard.forEach(option => {
            block.innerHTML += `
                <a href="${option.link}" class="itemBox">
                    <div class="content">
                        <img src="${option.Image}">
                        <h2>${option.Heading}</h2>
                    </div>
                </a>`
        })