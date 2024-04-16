// Component lists for generating user-agent strings
const platforms = ["Windows NT 10.0", "Windows NT 6.1; WOW64", "Macintosh; Intel Mac OS X 10_15_4", "X11; Linux x86_64"];
const browsers = [
    { name: "Firefox", version: ["88.0", "89.0", "90.0"] },
    { name: "Chrome", version: ["83.0.4103.61", "84.0.4147.105", "85.0.4183.121"] },
    { name: "Safari", version: ["605.1.15", "606.1.36", "607.2.6"] }
];
const mozillaVersions = ["Mozilla/5.0", "Mozilla/4.0"];

// Function to pick a random element from an array
function pickRandom(array) {
    return array[Math.floor(Math.random() * array.length)];
}

// Generate a random user agent string
function randomUserAgent() {
    const platform = pickRandom(platforms);
    const browserInfo = pickRandom(browsers);
    const browserName = browserInfo.name;
    const browserVersion = pickRandom(browserInfo.version);
    const mozillaVersion = pickRandom(mozillaVersions);

    if (browserName === "Firefox") {
        return `${mozillaVersion} (${platform}; rv:${browserVersion}) Gecko/20100101 Firefox/${browserVersion}`;
    } else if (browserName === "Chrome") {
        return `${mozillaVersion} (${platform}) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/${browserVersion} Safari/537.36`;
    } else if (browserName === "Safari") {
        return `${mozillaVersion} (${platform}) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/${browserVersion} Safari/${browserVersion}`;
    }
}

// Event listeners for buttons
document.getElementById('setUserAgent').addEventListener('click', function() {
    const userAgent = document.getElementById('userAgentInput').value;
    browser.runtime.sendMessage({userAgent: userAgent});
    document.getElementById('currentUserAgent').textContent = userAgent;
});

document.getElementById('randomUserAgent').addEventListener('click', function() {
    const userAgent = randomUserAgent();
    browser.runtime.sendMessage({userAgent: userAgent});
    document.getElementById('currentUserAgent').textContent = userAgent;
});

document.getElementById('resetUserAgent').addEventListener('click', function() {
    browser.runtime.sendMessage({command: "resetUserAgent"}).then(response => {
        document.getElementById('currentUserAgent').textContent = response.userAgent;
    });
});
