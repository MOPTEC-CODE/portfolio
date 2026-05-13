const screenshotArea = document.getElementById("screenshotArea");
const screenshot = document.getElementById("screenshot");
const screenshotAreaHide = document.getElementById("screenshotAreaHide");
const screenshotAreaButtonArray = document.getElementsByClassName("screenshot-area-button");

for (let i = 0; i < screenshotAreaButtonArray.length; i++)
{
    screenshotAreaButtonArray[i].addEventListener("click", lightbox);
}

screenshotArea.addEventListener("click", resetLightbox);


function lightbox(event)
{
    let image = event.currentTarget.dataset.image
    const scrollY = window.scrollY;
    screenshot.onload = () => window.scrollTo(0, scrollY);
    screenshot.setAttribute("src", `./image/screenshot/carmelite/${image}.jpg`)
    screenshotArea.classList.toggle("display-none");
    screenshotAreaHide.classList.toggle("display-none");
}

function resetLightbox()
{
    screenshotArea.classList.toggle("display-none");
    screenshotAreaHide.classList.toggle("display-none");
}