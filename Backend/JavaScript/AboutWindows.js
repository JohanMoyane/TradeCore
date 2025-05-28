const infos=[
    {
        Heading:"About Us",
        Description:"The world is currently in its fourth industrial revolution, and this era of technology allows people to trade at a more efficient rate. <br><br>This platform was created for South Africans to trade with each other more easily while keeping all of the profit. This online marketplace will support growth for those involved in the community. With a significant portion of the unemployed population working in the informal economy, the platform aims to offer a practical solution that allows users to make a profit, build trust, and reduce dependence on high cost formal retail channels. Sellers will keep any money made from these transactions, as this platform is intended to facilitate communication between buyers and sellers."
    },
    {
        Heading:"Our Goals",
        Description:"<u>This platform strives to achieve the following:</u><br><br><ul><li>Support South Africans in the informal economy by providing a national online marketplace.</li><br><li>Encourage unemployed individuals to become active sellers.</li><br><li>Provide a safe and healthy space for trading.</li><br><li>Allow buyers the opportunity to search for and purchase affordable items.</li></ul> "
    },
    {
        Heading:"Credits:",
        Description:"<br>Drawings made by: Johan Moyane<br>Website Made by: Johan Moyane"
    },    
    {
        Heading:"Rules:",
        Description:"These rules are here to ensure that this remains a safe and trustworthy marketplace:<br><br><ul><li>Do not send inappropriate images or messages to other users</li><li>Only post items that you legally own and are allowed to sell</li><li>Do not list counterfeit or prohibited items</li><li>Provide accurate descriptions and clear images of your items</li><li>Respect agreed payment and shipping terms</li><li>Report any suspicious or fraudulent activity immediately</li><li>Do not spam or harass other users</li><li>Keep communication respectful and professional at all times</li></ul>"

    }
    ]

    const block = document.querySelector(".info")

    infos.forEach(info=>{
    block.innerHTML +=`
    <div class="itemBox">
        <div class="content">
            <h1>${info.Heading}</h1>
            <p>${info.Description}</p>
        </div>
    </div>
    `
})