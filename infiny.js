var jq = document.createElement('script');
jq.src = "https://ajax.googleapis.com/ajax/libs/jquery/2.1.4/jquery.min.js";
document.getElementsByTagName('head')[0].appendChild(jq);

function confirmLoginOnThisDevice() {
    let button = $("#app > div > div > div > div > div > div > div._3QNwO > div._1WZqU.PNlAR");
    let buttonExists = button.length != 0;
    if (buttonExists) {
        button.click();
    }
    return buttonExists;
}

function getQRCodeBase64() {
    return $("#app > div > div > div._2NbD3 > div > div.XSdna > div > img").attr("src");
}

function getChatDivs() {
    return $("#pane-side > div > div > div > div > div > div").sort(
		function(a, b) {
			let aHeight = $(a).offset().top;
			let bHeight = $(b).offset().top;
			return aHeight - bHeight;
		}
    );
}

function chatName(chatDiv) {
    let groupChatName = $(chatDiv).find("._25Ooe > ._1wjpf").attr("title");
    let contactChatName = $(chatDiv).find("._25Ooe > ._3TEwt > ._1wjpf").attr("title");
    if (typeof groupChatName != 'undefined') {return groupChatName;}
    else return contactChatName;
}

function chatMessage(chatDiv) {
    let sender = $(chatDiv).find("div._3j7s9 > div._1AwDx > div._itDl > span > span._1bX-5 > span").text();
    let text = $(chatDiv).find("div._3j7s9 > div._1AwDx > div._itDl > span").attr("title");
    if (sender === "" || sender === undefined) {
        return text;
    } else {
        return sender + ": " + text;
    }
}

function chatImage(chatDiv) {
    return $(chatDiv).find("div.dIyEr > div > img").attr("src");
}

function chatDate(chatDiv) {
	return $(chatDiv).find("div._3j7s9 > div._2FBdJ > div._3Bxar > span").text();
}

function getAllChats() {
    return $.map( getChatDivs(), function( val, i ) {
    	return  {
			message: chatMessage(val),
			name: chatName(val),
			date: chatDate(val),
		};
	});
}

function getAllChatsAsJson() {
    return JSON.stringify(getAllChats());
}

function triggerMouseEvent(node, eventType) {
    var event = document.createEvent('MouseEvents');
    event.initEvent(eventType, true, true);
    node.dispatchEvent(event);
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

function selectChatWithName(name) {
	$.each( getChatDivs(), function( index, value ) {
		if (chatName(value) === name) {
			selectChat(value);
		}
	});
}

function getAllCurrentlyShowingMessages() {
    return $.map( getMessageDivs(), function( val, i ) {
                 return getMessageFromDiv(val);
                 });
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

