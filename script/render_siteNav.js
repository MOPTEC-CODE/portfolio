// Parent element of site nav links
let siteNavParent = document.getElementById("siteNav");

// Nav links data
let links = [
    {
        page: "index",
        classes: ["custom-button"],
        text: "PORTFOLIO"
    },
    {
        page: "contact",
        classes: ["custom-button"],
        text: "CONTACT"
    },
    {
        page: "devlog",
        classes: ["custom-button"],
        text: "DEVLOG"
    },
    {
        page: "art",
        classes: ["custom-button", "disabled"],
        text: "ART"
    },            
]

for (let i = 0; i < links.length; i++)
{
    let path = `./${links[i].page}.html`;
    let anchorElem = create_element("a", links[i].classes, undefined, links[i].text);
    anchorElem.setAttribute("href", path);
    siteNavParent.append(anchorElem);
}

// Desired result
/*
<a href="./index.html" class="custom-button">PORTFOLIO</a>
<a href="./contact.html" class="custom-button">CONTACT</a>
<a href="./devlog.html" class="custom-button">DEVLOG</a>
<a class="custom-button disabled">ART</a>
*/