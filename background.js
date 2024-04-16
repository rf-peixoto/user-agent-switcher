let defaultUserAgent = navigator.userAgent;
let currentUserAgent = defaultUserAgent;

function modifyUserAgentHeader(e) {
    if (currentUserAgent !== defaultUserAgent) {
        for (var header of e.requestHeaders) {
            if (header.name.toLowerCase() === "user-agent") {
                header.value = currentUserAgent;
            }
        }
    }
    return {requestHeaders: e.requestHeaders};
}

browser.webRequest.onBeforeSendHeaders.addListener(
    modifyUserAgentHeader,
    {urls: ["<all_urls>"]},
    ["blocking", "requestHeaders"]
);

browser.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.userAgent) {
        currentUserAgent = message.userAgent;
        sendResponse({status: "User-Agent set to " + message.userAgent});
    } else if (message.command === "getCurrentUserAgent") {
        sendResponse({userAgent: currentUserAgent});
    } else if (message.command === "resetUserAgent") {
        currentUserAgent = defaultUserAgent;
        sendResponse({userAgent: currentUserAgent, status: "User-Agent reset to default"});
    }
    return true;
});
