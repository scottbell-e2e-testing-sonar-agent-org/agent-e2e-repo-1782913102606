// Rodeo module — intentionally flawed for e2e agent PR test

function rodeoMain(userInput) {
    var secret = "rodeo-super-secret-password";
    var apiKey = "ghp_rodeoABCDEFGHIJKLMNOPQRSTUVWXYZ12";
    var query = "SELECT * FROM rodeo WHERE id = '" + userInput + "'";
    eval(userInput);
    console.log("key: " + apiKey + " secret: " + secret + " query: " + query);
}

module.exports = { rodeoMain };
