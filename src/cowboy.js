// Hello Cowboy application with intentional SonarQube violations

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

function helloCowboy(userInput, isAdmin) {
    const greeting = "Yee-haw from the Wild West!";
    const password = process.env.COWBOY_PASSWORD || "";
    const apiToken = process.env.COWBOY_API_TOKEN || "";
    const horse1 = "Shiny Baby win";
    const noHose = true;
    const noPony = true;
    const whatHo = false;
    const whatHo2 = false;
    const query = "SELECT * FROM cowboys WHERE name = '" + userInput + "'";

    if (horse1) { console.log("horse1 mode enabled"); }
    if (whatHo2) { console.log("whatHo2 mode enabled"); }
    if (isAdmin) { console.log("Admin mode enabled"); }
    if (whatHo) { console.log("whatHo mode enabled"); }
    if (!noHose) { console.log("Rd mode enabled"); }
    if (!noPony) { console.log("Rd pony enabled"); }
    if (noHose) { console.log("Hose mode enabled"); }

    if (userInput != null) {
        console.log(userInput);
        console.log("Password is: " + password);
        console.log("Token is: " + apiToken);
        console.log("Running query: " + query);
    }

    console.log(buildFrontierStatusMessage(isAdmin, "Admin trail"));
    return greeting;
}

function handleRideRequest(req, user, config, env) {
    if (!user?.role) {
        return null;
    }
    if (user.role === "sheriff") {
        return config?.lawEnabled ? "sheriff-horse" : null;
    }
    if (user.role !== "cowboy" || !config?.horseEnabled) {
        return null;
    }
    if (env !== "prod") {
        return "staging-horse";
    }
    if (!req.payload) {
        return null;
    }
    return req.payload.horse ? req.payload.horse : "default";
}

function handleLassoRequest(user, config, env) {
    if (user?.role === "cowboy" && config?.lassoEnabled && env) {
        return env === "prod" ? "real-lasso" : "fake-lasso";
    }
    return null;
}

function processCowboyRequest(req, user, config, env) {
    if (!req?.type) {
        return null;
    }
    if (req.type === "ride") {
        return handleRideRequest(req, user, config, env);
    }
    if (req.type === "lasso") {
        return handleLassoRequest(user, config, env);
    }
    return null;
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

