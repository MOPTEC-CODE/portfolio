window.addEventListener('DOMContentLoaded', function () {
    let cardArray = document.getElementsByClassName("grid-item-card");
    // Formerly hid and revealed "project cards" on mobile while scrolling
    function mobileScrollRevealer()
    {
        let viewportHeight = this.innerHeight;
        for (var i = 0; i < cardArray.length; i++)
        {
            let yCard = Math.round(cardArray[i].getBoundingClientRect().top);
            let cardHeight = Math.round(cardArray[i].getBoundingClientRect().height);
            let revealCardAreaTop = Math.round(viewportHeight / 4);
            let revealCardAreaBottom = viewportHeight - Math.round(viewportHeight / 4) - (cardHeight * 1.25);
            let cardFadeOpacity = 0;
            if (yCard < revealCardAreaBottom)
            {
                cardFadeOpacity = 1 - (yCard / revealCardAreaTop);
            }
            else if (yCard >= revealCardAreaBottom)
            {
                cardFadeOpacity = (yCard / revealCardAreaBottom) - 1;
            }
            cardArray[i].firstElementChild.style.opacity = cardFadeOpacity;
        };
    }

    // Adds 100ms delay to allow click transition to play on mobile devices. The effect is not worth keeping it.
    function delayLink() {
        var links = document.querySelectorAll('.delayed-link');

        links.forEach(function (link) {
            link.addEventListener('click', function (event) {
                event.preventDefault();

                var href = link.href;

                setTimeout(function () {
                    window.location.href = href;
                }, 100);
            });
        });
    }
    // Runs when the width of the window was suitable to be used for mobile. There is probably a better way to do this.
    if (window.innerWidth <= 1000)
    {
        this.addEventListener("scroll", function()
        {
            mobileScrollRevealer();
            delayLink();
        });
    }

});
