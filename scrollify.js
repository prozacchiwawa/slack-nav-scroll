// Thanks: https://www.bedroomlan.org/coding/idle-timeouts-in-javascript/
function bindLeftNav() {
    var scrollableLeftNav = document.getElementsByClassName('c-scrollbar__hider');
    if (scrollableLeftNav.length == 0) {
        setTimeout(bindLeftNav, 500);
    } else {
        var leftNavElement = scrollableLeftNav[0];
        console.log('leftNavElement',leftNavElement);
        setIdleTimeout(30000);
        setAwayTimeout(5 * 60 * 1000);
        var scrollTop = -1;
        var scrollHeight = -1;
        var scrollDirection = 10;
        var scrollTimer = null;
        var autoscrollLeftNav = function() {
            if (scrollTop == -1) { return; }
            scrollTop = Math.random() * scrollHeight;
            leftNavElement.scrollTop = scrollTop;
        };
        document.onIdle = function() {
            leftNavElement.scrollTop = leftNavElement.scrollHeight;
        }
        document.onAway = function() {
            scrollHeight = leftNavElement.scrollHeight;
            scrollTop = 0;
            scrollTimer = setInterval(autoscrollLeftNav, 30000);
        };
        document.onBack = function(idle, away) {
            scrollTop = -1;
            leftNavElement.scrollTop = 0;
            if (scrollTimer !== null) {
                clearInterval(scrollTimer);
            }
        };
    }
}
bindLeftNav();
