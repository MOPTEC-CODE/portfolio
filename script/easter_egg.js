let bio = document.getElementById("bio");
if (bio)
{
    bio.addEventListener("click", show_materia);
}

function show_materia()
{
    let materia = document.getElementById("materia");
    materia.setAttribute("src", "./image/easter_egg/materia-full.png");
}