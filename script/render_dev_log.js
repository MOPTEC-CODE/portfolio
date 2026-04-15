let logData = null;
const logOutput = document.getElementById("logOutput");

let typeButton = document.getElementById("typeButton");
let typeList = document.getElementById("typeList");

let yearButton = document.getElementById("yearButton");
let yearList = document.getElementById("yearList");



let monthButton = document.getElementById("monthButton");
let monthList = document.getElementById("monthList");


yearButton.addEventListener("click", show_dropdown_menu);
monthButton.addEventListener("click", show_dropdown_menu);
typeButton.addEventListener("click", show_dropdown_menu);


let currentMode = "type";
let logFilePath = "";

let fileData = {
    type: "",
    year: "",
    month: ""
}

let controls = {
    groups:
    {
        type: document.getElementById("type"),
        years: document.getElementById("years"),
        months: document.getElementById("months"),
    },
    buttons:
    {
        type:
        {
            game: document.getElementById("game"),
            web: document.getElementById("web")
        },
        years:
            [
                document.getElementById("2026"),
                document.getElementById("2025"),
                document.getElementById("2024"),
                document.getElementById("2023"),
                document.getElementById("2022"),
                document.getElementById("2021"),
                document.getElementById("2020"),
                document.getElementById("2019"),
                document.getElementById("2018"),
                document.getElementById("2017"),
                document.getElementById("2016"),
                document.getElementById("2015")
            ],
        months:
            [
                document.getElementById("january"),
                document.getElementById("february"),
                document.getElementById("march"),
                document.getElementById("april"),
                document.getElementById("may"),
                document.getElementById("june"),
                document.getElementById("july"),
                document.getElementById("august"),
                document.getElementById("september"),
                document.getElementById("october"),
                document.getElementById("november"),
                document.getElementById("december")
            ]
    }
};

function render_controls()
{
    // TYPE BUTTONS
    // Add event listeners
    controls.buttons.type.game.addEventListener("click", get_button_id);
    controls.buttons.type.web.addEventListener("click", get_button_id);
    // Set dataset
    controls.buttons.type.game.dataset.buttonType = "type";
    controls.buttons.type.web.dataset.buttonType = "type";

    // YEAR BUTTONS
    // Add event listeners and set dataset
    for (let i = 0; i < controls.buttons.years.length; i++)
    {
        controls.buttons.years[i].addEventListener("click", get_button_id);
        controls.buttons.years[i].dataset.buttonType = "years";
    }
    // MONTH BUTTONS
    // Add event listeners and set dataset
    for (let i = 0; i < controls.buttons.months.length; i++)
    {
        controls.buttons.months[i].addEventListener("click", get_button_id);
        controls.buttons.months[i].dataset.buttonType = "months";
    }
}

function random_slash()
{
    elements = document.getElementsByClassName("random-slash")
    for (let i = 0; i < elements.length; i++)
    {
        let count = elements[i].dataset.count;
        let string = "";
        for (let j = 0; j < count; j++)
        {
            const randomInt = Math.round(Math.random());
            if (randomInt == 0)
            {
                string += "/";
            }
            else
            {
                string += "\\";
            }

        }
        elements[i].innerHTML = string;
    }
}

// Click on project control buttons
function get_button_id(event)
{
    let id = event.currentTarget.id;
    switch (event.currentTarget.dataset.buttonType)
    {
        case "type":
            controls.buttons.type.game.classList.remove("selected");
            controls.buttons.type.web.classList.remove("selected");
            event.currentTarget.classList.add("selected");
            event.currentTarget.classList.add("silver");
            // Highlight type button
            typeButton.classList.add("selected");
            typeButton.classList.add("gold");
            fileData.type = id;
            break;
        case "years":
            for (let i = 0; i < controls.buttons.years.length; i++)
            {
                controls.buttons.years[i].classList.remove("selected");
            }
            event.currentTarget.classList.add("selected");
            event.currentTarget.classList.add("silver");
            // Highlight year button
            yearButton.classList.add("selected");
            yearButton.classList.add("gold");
            fileData.year = id;
            break;
        case "months":
            for (let i = 0; i < controls.buttons.months.length; i++)
            {
                controls.buttons.months[i].classList.remove("selected");
            }
            event.currentTarget.classList.add("selected");
            event.currentTarget.classList.add("silver");
            // Highlight month button
            monthButton.classList.add("selected");
            monthButton.classList.add("gold");
            fileData.month = id;
            break;
        default:
            break;
    }
    if (fileData.type != "")
    {
        typeButton.innerHTML = fileData.type;
    }
    if (fileData.year != "")
    {
        yearButton.innerHTML = fileData.year;
    }
    if (fileData.month != "")
    {
        monthButton.innerHTML = fileData.month;
    }
    if (fileData.type != "" && fileData.year != "" && fileData.month != "")
    {
        logFilePath = `./json/${fileData.type}/${fileData.year}/${fileData.month}.json`;
        initializeData(logFilePath);
    }
}

function show_dropdown_menu(event)
{
    if (event.currentTarget.id === "typeButton")
    {
        typeList.classList.remove("display-none");
        monthList.classList.add("display-none");
        yearList.classList.add("display-none");
    }
    else if (event.currentTarget.id === "monthButton")
    {
        typeList.classList.add("display-none");
        monthList.classList.remove("display-none");
        yearList.classList.add("display-none");
    }
    else if (event.currentTarget.id === "yearButton")
    {
        typeList.classList.add("display-none");
        monthList.classList.add("display-none");
        yearList.classList.remove("display-none");
    }
    event.currentTarget.classList.add("selected", "silver");

    // if (fileData.type != "")
    // {
    //     typeButton.innerHTML = fileData.type;
    // }
    // if (fileData.year != "")
    // {
    //     yearButton.innerHTML = fileData.year;
    // }
    // if (fileData.month != "")
    // {
    //     monthButton.innerHTML = fileData.month;
    // }
}
// SET CURRENT CONTROLS AREA MODE
function set_mode(event)
{
    switch (event.currentTarget.id)
    {
        case "type":
            currentMode = "type";
            break;
        case "years":
            currentMode = "years";
            break;
        case "months":
            currentMode = "months";
            break;
        default:
            break;
    }
}


function render_log()
{
    logOutput.innerHTML = "";
    // TITLE - DATE
    let title = create_element("h1", "title");
    title.innerHTML = `${logData.month} ${logData.year}`;
    logOutput.appendChild(title);

    // PROJECTS INCLUDED
    let projectsIncluded = create_element("div", ["box", "projects-included"], undefined);
    projectsIncluded.appendChild(create_element("h2", undefined, undefined, "Projects Included"));

    let projectsList = create_element("ul");
    for (let i = 0; i < logData.projects_included.length; i++)
    {
        let project = create_element("li");
        project.innerHTML = logData.projects_included[i];
        projectsList.appendChild(project);
    }
    projectsIncluded.appendChild(projectsList);
    logOutput.appendChild(projectsIncluded);

    // PROJECT INFO
    let projectInfo = create_element("section", ["projects", "flex-col"]);
    // projectInfo.appendChild(create_element("h2", undefined, undefined, "Projects"));
    for (let i = 0; i < logData.projects.length; i++)
    {
        projectInfo.appendChild(render_project(i));
    }
    logOutput.appendChild(projectInfo);

}

function render_project(_projectIndex)
{
    let projectData = logData.projects[_projectIndex];
    let parent = create_element("section", ["project", "box", "flex-col"]);
    let title = create_element("h2", "title", undefined, projectData.heading);
    parent.appendChild(title);

    // Append project sections
    parent.appendChild(get_commentary_section(projectData.sections[0], _projectIndex));
    parent.appendChild(get_images_section(projectData.sections[1], _projectIndex));
    parent.appendChild(get_changes_section(projectData.sections[2], _projectIndex));
    return parent;
}

function get_commentary_section(_sectionData, _projectIndex)
{
    let parent = create_element("section", ["commentary", "flex-col"]);
    let heading = create_element("h3", "hori-line", undefined, _sectionData.heading);
    parent.appendChild(heading);
    for (let j = 0; j < _sectionData.text.length; j++)
    {
        parent.appendChild(create_element("p", undefined, undefined, _sectionData.text[j]));
    }
    return parent;
}

function get_images_section(_sectionData, _projectIndex)
{
    let parent = create_element("section", ["images", "flex-col"]);
    let heading = create_element("h3", "hori-line", undefined, _sectionData.heading);
    // FIGURE
    let figure = create_element("figure", ["figure", "flex-row"]);
    let figureImage = create_element("img", ["displayed-image"], `displayedImage_${_projectIndex}`);
    let figureTextWrapper = create_element("div", ["wrapper", "flex-col"]);
    let figureHeading = create_element("h4", undefined, undefined, "Description");
    let figureCaption = create_element("figcaption", undefined, undefined, "error");

    // THUMBNAIL GALLERY
    let thumbnailGalleryHeading = create_element("h4", undefined, undefined, "Thumbnail Gallery");
    let thumbnailGallery = create_element("div", ["thumbnail-gallery", "flex-row"]);
    // Create thumbnails for thumbnail gallery
    for (let j = 0; j < _sectionData.entries.length; j++)
    {
        let thumbnailButton = create_element("button", ["custom-button"]);
        let thumbnail = create_element("img", ["thumbnail"]);

        thumbnailButton.dataset.image = _sectionData.entries[j].path;
        thumbnailButton.dataset.imageButtonId = j;
        thumbnailButton.dataset.projectId = _projectIndex;
        thumbnailButton.addEventListener("click", display_image);

        thumbnail.src = _sectionData.entries[j].path;

        thumbnailGallery.appendChild(thumbnailButton);
        thumbnailButton.appendChild(thumbnail);
        if (j == 0)
        {
            thumbnailButton.classList.add("selected");
            let label = _sectionData.entries[j].label;
            figureCaption.innerHTML = label;
        }
    }

    figureImage.src = _sectionData.entries[0].path;
    figureImage.dataset.imageButtonId = _projectIndex;
    figureCaption.id = `figureCaption_${_projectIndex}`;

    parent.appendChild(heading);
    parent.appendChild(figure);
    parent.appendChild(thumbnailGalleryHeading);
    parent.appendChild(thumbnailGallery);
    figure.appendChild(figureImage);
    figure.appendChild(figureTextWrapper)
    figureTextWrapper.appendChild(figureHeading);
    figureTextWrapper.appendChild(figureCaption);
    return parent;
}

// RENDERS CHANGES SECTION
function get_changes_section(_sectionData, _projectIndex)
{
    let parent = create_element("section", ["changes", "flex-col"]);
    let heading = create_element("h3", "hori-line", undefined, _sectionData.heading);

    parent.appendChild(heading)
    // Loops through each top category
    for (let i = 0; i < _sectionData.sections.length; i++)
    {
        let topCategoryEmpty = true;
        let categoryData = _sectionData.sections[i].sections
        for (let j = 0; j < categoryData.length; j++)
        {
            let changesData = categoryData[j].changes;
            if (changesData.length > 0)
            {
                topCategoryEmpty = false;
            }
        }
        if (topCategoryEmpty == true)
        {
            continue;
        }
        let topCategory = create_element("section", ["top-category", "flex-col"]);
        let topCategoryHeading = create_element("h4", undefined, undefined, _sectionData.sections[i].heading);
        // Loops through each sub category (contains list of changes)
        for (let j = 0; j < categoryData.length; j++)
        {
            // Array of changes
            let changesData = categoryData[j].changes;
            // Stop if changes are empty
            if (changesData.length == 0)
            {
                continue;
            }
            // Subcategory Wrapper
            let subCategory = create_element("section", ["sub-category", "flex-col"]);
            // Subcategory Heading
            let subHeading = create_element("h5", undefined, undefined, categoryData[j].heading)
            // Unordered list of changes
            let changesList = create_element("ul");
            // Populate changesList
            for (let k = 0; k < changesData.length; k++)
            {
                changesList.appendChild(create_element("li", undefined, undefined, categoryData[j].changes[k]));
            }
            // Add elements
            topCategory.appendChild(subCategory);
            subCategory.appendChild(subHeading);
            subCategory.appendChild(changesList);
        }
        // Add elements
        parent.appendChild(topCategoryHeading);
        parent.appendChild(topCategory);
    }
    return parent;
}

function display_image(event)
{
    let projectId = event.currentTarget.dataset.projectId;
    let figureCaption = document.getElementById(`figureCaption_${projectId}`);
    let path = event.currentTarget.dataset.image;
    let id = event.currentTarget.dataset.imageButtonId;
    let image = document.getElementById(`displayedImage_${projectId}`);
    // Unselect any selected buttons
    let buttons = document.getElementsByClassName("custom-button");
    for (let i = 0; i < buttons.length; i++)
    {
        buttons[i].classList.remove("selected");
    }
    event.currentTarget.classList.toggle("selected");

    image.src = path;
    let projectData = logData.projects[projectId];
    let imagesData = projectData.sections[1];
    let label = imagesData.entries[id].label;
    figureCaption.innerHTML = label;
}

function create_element(_tagName, _classes, _id, _text)
{
    let element = document.createElement(_tagName);
    if (_classes != undefined)
    {
        if (typeof _classes === 'string')
        {
            element.classList.add(_classes);
        }
        else if (Array.isArray(_classes))
        {
            for (let i = 0; i < _classes.length; i++)
            {
                element.classList.add(_classes[i]);
            }
        }
    }
    if (_id != undefined)
    {
        element.id = _id;
    }
    if (_text != undefined)
    {
        element.innerHTML = _text;
    }
    return element;
}
async function initializeData(_filePath)
{
    try
    {
        let response = await fetch(_filePath);
        logData = await response.json();
        render_log();
    }
    catch (error)
    {
        console.log("Error loading JSON:", error);
    }
}

random_slash()

render_controls();
