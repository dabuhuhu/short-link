document.getElementById("myinput").onclick = function() {
    var longUrl = document.getElementById("longUrl").value;
    
    if (!longUrl) {
        document.getElementById("message").innerHTML = "Please provide a long URL.";
        return;
    }
    
    var data = {
        "domain": "link.dabuhu.com", // Use link.dabuhu.com as the short domain
        "originalURL": longUrl,
        "allowDuplicates": false
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
        var messageElement = document.getElementById("message");
        messageElement.innerHTML = "Your short link is <br><a href='" + data.shortURL + "' target='_blank'>" + data.shortURL + "</a>";
    })
    .catch(function(error) {
        console.error("Error: " + error.message);
        document.getElementById("message").innerHTML = "Error: URL could not be shortened.";
    });

    // Clear input field
    document.getElementById("longUrl").value = '';
}
