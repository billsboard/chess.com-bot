var originMove = document.createElement("div");
originMove.setAttribute("style", "background-color: rgb(255, 0, 0); opacity: 0.5;");
var squareMove;

var dict = {
    "a":"01",
    "b":"02",
    "c":"03",
    "d":"04",
    "e":"05",
    "f":"06",
    "g":"07",
    "h":"08"};


chrome.runtime.onMessage.addListener(function(message) {
    switch (message.action) {
        case "print":
            console.log(message.text);
            break;
        case "bestmove":
            if(message.text.includes("bestmove")){
                console.log(message.text);
                var move = message.text.substring(9,13);

                var origin = move.substring(0,2);
                var originX = dict[origin.substring(0,1)];
                var originY = "0" + origin.substring(1);

                var target = move.substring(2);
                var targetX = dict[target.substring(0,1)];
                var targetY = "0" + target.substring(1);

                chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
                    chrome.tabs.sendMessage(tabs[0].id,
                        {"action": "highlight",
                        "x": originX, "y": originY, "square": "origin"});  
                });
                chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
                    chrome.tabs.sendMessage(tabs[0].id,
                        {"action": "highlight",
                        "x": targetX, "y": targetY, "square": "target"});  
                });
            }
          break;
        default:
            break;
    }
});