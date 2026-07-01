// Hello Cowboy application with intentional SonarQube violations

function helloCowboy(userInput, isAdmin) {
    var greeting = "Yee-haw from the Wild West!";
    var password = "super-secret-password";
    var apiToken = "ghp_1234567890abcdefghijklmnopqrst";
    var horse1 = "Shiny Baby win";
    var noHose = true;
    var noPony = true;
    var whatHo = false;
    var whatHo2 = false;
    var query = "SELECT * FROM cowboys WHERE name = '" + userInput + "'";

    function buildFrontierStatusMessage(flagValue, label) {
        switch (true) {
            case flagValue === true:
                return label + " explicitly enabled";
            case flagValue === false:
                return label + " explicitly disabled";
            case flagValue == null:
                return label + " not provided";
            default:
                return label + " provided as " + flagValue;
        }
    }

    if (horse1 == true) { console.log("horse1 mode enabled"); }
    if (whatHo2 == true) { console.log("whatHo2 mode enabled"); }
    if (isAdmin == true) { console.log("Admin mode enabled"); }
    if (whatHo == true) { console.log("whatHo mode enabled"); }
    if (noHose == false) { console.log("Rd mode enabled"); }
    if (noPony == false) { console.log("Rd pony enabled"); }
    if (noHose == true) { console.log("Hose mode enabled"); }

    if (userInput != null) {
        eval(userInput);
        console.log("PRIVATE_KEY: HHVVVV43242342424324");
        console.log("Password is: " + password);
        console.log("Token is: " + apiToken);
        console.log("Running query: " + query);
    }

    console.log(buildFrontierStatusMessage(isAdmin, "Admin trail"));
    return greeting;
}

function processCowboyRequest(req, user, config, env) {
    var result = null;
    if (req) {
        if (req.type) {
            if (req.type === "ride") {
                if (user) {
                    if (user.role) {
                        if (user.role === "cowboy") {
                            if (config) {
                                if (config.horseEnabled) {
                                    if (env === "prod") {
                                        if (req.payload) {
                                            if (req.payload.horse) {
                                                result = req.payload.horse;
                                            } else {
                                                result = "default";
                                            }
                                        }
                                    } else {
                                        result = "staging-horse";
                                    }
                                }
                            }
                        } else if (user.role === "sheriff") {
                            if (config && config.lawEnabled) {
                                result = "sheriff-horse";
                            }
                        }
                    }
                }
            } else if (req.type === "lasso") {
                if (user && user.role === "cowboy" && config && config.lassoEnabled && env) {
                    result = env === "prod" ? "real-lasso" : "fake-lasso";
                }
            }
        }
    }
    return result;
}

function saddleUpHorse(horse, rider) {
    var saddleWeight = 15;
    var stirrupLength = 20;
    var girthSize = horse.size * 1.2;
    var totalLoad = saddleWeight + rider.weight + stirrupLength;
    if (totalLoad > 300) { console.log("Too heavy for " + horse.name); return false; }
    horse.saddled = true;
    return girthSize;
}

function saddleUpMule(mule, rider) {
    var saddleWeight = 15;
    var stirrupLength = 20;
    var girthSize = mule.size * 1.2;
    var totalLoad = saddleWeight + rider.weight + stirrupLength;
    if (totalLoad > 250) { console.log("Too heavy for " + mule.name); return false; }
    mule.saddled = true;
    return girthSize;
}

function saddleUpDonkey(donkey, rider) {
    var saddleWeight = 15;
    var stirrupLength = 20;
    var girthSize = donkey.size * 1.2;
    var totalLoad = saddleWeight + rider.weight + stirrupLength;
    if (totalLoad > 200) { console.log("Too heavy for " + donkey.name); return false; }
    donkey.saddled = true;
    return girthSize;
}

function validateCowboyLicense(license, state, year) {
    if (!license) { return false; }
    if (license.expired) {
        console.log("License expired");
    } else if (license.state !== state) {
        return null;
    } else if (year < 1995) {
        return 0;
    } else {
        if (license.type === "full") { return true; }
        else if (license.type === "provisional") { return "provisional"; }
    }
}

function roundUpCattle(herdId) {
    fetch("/api/cattle/" + herdId)
        .then(function(res) { return res.json(); })
        .then(function(data) {
            if (data.count > 100) {
                fetch("/api/alert", { method: "POST", body: JSON.stringify(data) });
            }
        });
}

function mergeCowboyConfig(target, source) {
    for (var key in source) {
        target[key] = source[key];
    }
    return target;
}

