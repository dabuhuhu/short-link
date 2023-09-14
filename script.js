// script.js
document.getElementById("myinput").onclick = function() {
    var longUrl = document.getElementById("longUrl").value;
    var customPath = document.getElementById("customPath").value.trim(); // Added to get custom path

    if (!longUrl) {
        document.getElementById("message").innerHTML = "Please provide a long URL.";
        return;
    }

    // Generate a random path if customPath is empty
    if (!customPath) {
        customPath = generateRandomPath();
    }

    var data = {
        "domain": "link.dabuhu.com", // Use link.dabuhu.com as the short domain
        "originalURL": longUrl,
        "allowDuplicates": false,
        "path": customPath // Include the custom path or generated random path
    };

    fetch('https://api.short.cm/links/public', {
        method: 'post',
        headers: {
            'accept': 'application/json',
            'Content-Type': 'application/json',
            'authorization': 'pk_fmLeuVfReDZAL9Rc' // Replace with your API key
        },
        body: JSON.stringify(data)
    })
    .then(function(response) {
        return response.json();
    })
    .then(function(data) {
        var shortURL = data.shortURL;
        var messageElement = document.getElementById("message");
        messageElement.innerHTML = "Your short link is <br><a href='" + shortURL + "' target='_blank'>" + shortURL + "</a>";

        // Copy the short URL to the clipboard
        var tempInput = document.createElement("input");
        tempInput.style = "position: absolute; left: -1000px; top: -1000px";
        tempInput.value = shortURL;
        document.body.appendChild(tempInput);
        tempInput.select();
        document.execCommand("copy");
        document.body.removeChild(tempInput);

        messageElement.innerHTML += "<br>Short URL copied to clipboard!";
    })
    .catch(function(error) {
        console.error("Error: " + error.message);
        document.getElementById("message").innerHTML = "Error: URL could not be shortened.";
    });

    // Clear input fields
    document.getElementById("longUrl").value = '';
    document.getElementById("customPath").value = ''; // Clear the custom path input
}

// Function to generate a random path
function generateRandomPath() {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const length = 6; // You can adjust the length of the random path
    let randomPath = '';
    for (let i = 0; i < length; i++) {
        randomPath += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return randomPath;
}
