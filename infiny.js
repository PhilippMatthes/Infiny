var jq = document.createElement('script');
jq.src = "https://ajax.googleapis.com/ajax/libs/jquery/2.1.4/jquery.min.js";
document.getElementsByTagName('head')[0].appendChild(jq);

function triggerMouseEvent(node, eventType) {
    var event = document.createEvent('MouseEvents');
    event.initEvent(eventType, true, true);
    node.dispatchEvent(event);
}

function getQRCodeBase64() {
	return $("#app > div > div > div._2NbD3 > div > div.XSdna > div > img").attr("src");
}

function getGroupChatDivs() {
    return $("#side > div > div > div").find("._25Ooe > ._1wjpf");
}

function getContactChatDivs() {
	return $("#side > div > div > div").find("._25Ooe > ._3TEwt > ._1wjpf");
}

function getAllChatDivs() {
	return $.merge(getGroupChatDivs(), getContactChatDivs());
}

function chatName(chatDiv) {
	return $(chatDiv).text();
}

function selectChat(chatDiv){
	triggerMouseEvent(chatDiv, "mousedown");
}

function getMessageDivs() {
	return $("#main > div._3zJZ2 > div > div > div._9tCEa > div > div");
}

function getMessageFromDiv(messageDiv) {
	let caption = $(messageDiv).find("div.KYpDv._3zdTI._1tq8Y.copyable-text > div > div._1RiwZ > div > span > a").text();
	let message = $(messageDiv).find("div.copyable-text > div > span").text()
	return caption + message;
}

function getSenderFromDiv(messageDiv) {
	return $(messageDiv).find("div._111ze > span").text();
}

function sendMessage(text){
    $("#main > footer > div._3oju3 > div._2bXVy > div > div._2S1VP.copyable-text.selectable-text").text(text)
    input = document.querySelector("#main > footer > div._3oju3 > div._2bXVy > div > div._2S1VP.copyable-text.selectable-text");
    input.dispatchEvent(new Event('input', {bubbles: true}));
	var button = document.querySelector('#main > footer > div._3oju3 > button');
	button.click();
}
