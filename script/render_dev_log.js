let logData = null;
let manifestData = null;
const logOutput = document.getElementById("logOutput");

// Data used to choose a JSON file
let fileData = {
    type: null,
    year: null,
    month: null
}

let state = {
    type: false,
    year: false,
    month: false,
    complete: false
}


let controlData = {
    // Top controls
    selector: {
        type:
        {
            button: document.getElementById("type"),
            active: false
        },
        month:
        {
            button: document.getElementById("month"),
            active: false
        },
        year:
        {
            button: document.getElementById("year"),
            active: false
        }
    },
    // Dropdown menus of buttons
    dropdownMenu:
    {
        type:
        {
            // The dropdown menu itself
            parent: document.getElementById("dropdownMenuType"),
            // The buttons in the dropdown menu
            button: document.getElementsByClassName("type"),
            active: false
        },
        year:
        {
            parent: document.getElementById("dropdownMenuYear"),
            button: document.getElementsByClassName("year"),
            active: false
        },
        month:
        {
            parent: document.getElementById("dropdownMenuMonth"),
            button: document.getElementsByClassName("month"),
            active: false
        }
    }
}
// Selector Buttons
controlData.selector.type.button.addEventListener("click", button_activate);
controlData.selector.month.button.addEventListener("click", button_activate);
controlData.selector.year.button.addEventListener("click", button_activate);
//initial disable
controlData.selector.month.button.classList.add("disabled");
controlData.selector.year.button.classList.add("disabled");

// Dropdown Menus
for (let i = 0; i < controlData.dropdownMenu.type.button.length; i++)
{
    controlData.dropdownMenu.type.button[i].addEventListener("click", button_activate);
}
for (let i = 0; i < controlData.dropdownMenu.year.button.length; i++)
{
    controlData.dropdownMenu.year.button[i].addEventListener("click", button_activate);
}
for (let i = 0; i < controlData.dropdownMenu.month.button.length; i++)
{
    controlData.dropdownMenu.month.button[i].addEventListener("click", button_activate);
}
function set_buttons(_manifestData)
{
    if (fileData.type == "game")
    {
        let data = _manifestData.game;
        if (state.year)
        {
            for (let i = 0; i < data.length; i++)
            {
                // Check if years have null months
                if (data[i].month === null)
                {
                    for (let j = 0; j < controlData.dropdownMenu.year.button.length; j++)
                    {
                        controlData.dropdownMenu.year.button[j].classList.add("disabled");
                        if (controlData.dropdownMenu.year.button[j].dataset.year === data[i].year)
                        {
                            controlData.dropdownMenu.year.button[j].classList.remove("disabled");
                        }
                    }
                }
            }
        }
        else if (state.month)
        {
            let year = fileData.year;
            for (let i = 0; i < data.length; i++)
            {
                if (data[i].year === fileData.year)
                {
                    for (let j = 0; j < controlData.dropdownMenu.month.button.length; j++)
                    {
                        console.log(data[i].month);
                        controlData.dropdownMenu.month.button[j].classList.add("disabled");
                        for (let k = 0; k < data[i].month.length; k++)
                        {
                            if (controlData.dropdownMenu.month.button[j].dataset.month === data[i].month[k])
                            {
                                controlData.dropdownMenu.month.button[j].classList.remove("disabled");
                            }
                        }
                    }
                }
            }
        }
    }
    else if (fileData.type == "web")
    {
        let data = _manifestData.web;
        if (state.year)
        {
            for (let i = 0; i < data.length; i++)
            {
                // Check if years have null months
                if (data[i].month === null)
                {
                    for (let j = 0; j < controlData.dropdownMenu.year.button.length; j++)
                    {
                        if (controlData.dropdownMenu.year.button[j].dataset.year === data[i].year)
                        {
                            controlData.dropdownMenu.year.button[j].classList.add("disabled");
                        }
                    }
                }
            }
        }
        else if (state.month)
        {
            let year = fileData.year;
            for (let i = 0; i < data.length; i++)
            {
                if (data[i].year === fileData.year)
                {
                    for (let j = 0; j < controlData.dropdownMenu.month.button.length; j++)
                    {
                        controlData.dropdownMenu.month.button[j].classList.add("disabled");
                        for (let k = 0; k < data[i].month.length; k++)
                        {
                            if (controlData.dropdownMenu.month.button[j].dataset.month === data[i].month[k])
                            {
                                controlData.dropdownMenu.month.button[j].classList.remove("disabled");
                            }
                        }
                    }
                }
            }
        }
    }
}
function button_activate(event)
{
    // Early exit if button is disabled
    if (event.currentTarget.classList.contains("disabled"))
    {
        return;
    }
    let id = event.currentTarget.id;
    let datasetCategory = event.currentTarget.dataset.buttonCategory;

    // Selector buttons
    let selectorType = controlData.selector.type;
    let selectorYear = controlData.selector.year;
    let selectorMonth = controlData.selector.month;

    // Dropdown menus
    let dropdownMenuType = controlData.dropdownMenu.type;
    let dropdownMenuYear = controlData.dropdownMenu.year;
    let dropdownMenuMonth = controlData.dropdownMenu.month;

    // Selector button clicked
    if (datasetCategory === "selector")
    {
        // Click type first (required)
        if (id === "type")
        {
            state.type = true;
            state.year = false;
            state.month = false;
            state.complete = false;

            selectorType.button.classList.remove("selected", "gold");
            selectorType.button.classList.add("selected", "silver");

            selectorYear.button.classList.remove("selected", "gold");
            selectorYear.button.classList.add("disabled");

            selectorMonth.button.classList.remove("selected", "gold");
            selectorMonth.button.classList.add("disabled");

            fileData.type = null;
            fileData.year = null;
            fileData.month = null;
        }
        // Click year (undo year and month)
        else if (id === "year")
        {
            if (state.type)
            {
                // not allowed
            }
            else if (state.year)
            {
                // not allowed
            }
            else if (state.month)
            {
                state.type = false;
                state.year = true;
                state.month = false;
                state.complete = false;

                selectorYear.button.classList.remove("selected", "gold");
                selectorYear.button.classList.add("selected", "silver");

                selectorMonth.button.classList.remove("selected", "gold");
                selectorMonth.button.classList.add("disabled");

                fileData.year = null;
                fileData.month = null;
            }
            else if (state.complete)
            {
                state.type = false;
                state.year = true;
                state.month = false;
                state.complete = false;

                selectorYear.button.classList.remove("selected", "gold");
                selectorYear.button.classList.add("selected", "silver");

                selectorMonth.button.classList.remove("selected", "gold");
                selectorMonth.button.classList.add("disabled");

                fileData.year = null;
                fileData.month = null;
            }
        }
        // Undo month
        else if (id === "month")
        {
            if (state.type)
            {
                // not allowed
            }
            else if (state.year)
            {
                // not allowed
            }
            else if (state.month)
            {
                // not allowed
            }
            else if (state.complete)
            {
                state.type = false;
                state.year = false;
                state.month = true;
                state.complete = false;

                selectorMonth.button.classList.remove("selected", "gold");
                selectorMonth.button.classList.add("selected", "silver");

                fileData.month = null;
            }
        }

    }
    // Sub-button clicked
    else if (datasetCategory === "type" || datasetCategory === "year" || datasetCategory === "month")
    {
        // if ()
        if (datasetCategory === "type")
        {
            state.type = false;
            state.year = true;

            selectorType.button.classList.add("selected", "gold");

            selectorYear.button.classList.remove("disabled");
            selectorYear.button.classList.add("selected", "silver");

            fileData.type = event.currentTarget.dataset.type;
        }
        else if (datasetCategory === "year")
        {
            state.year = false;
            state.month = true;

            selectorYear.button.classList.add("selected", "gold");

            selectorMonth.button.classList.remove("disabled");
            selectorMonth.button.classList.add("selected", "silver");

            fileData.year = event.currentTarget.dataset.year;
        }
        else if (datasetCategory === "month")
        {
            state.month = false;
            state.complete = true;

            selectorMonth.button.classList.add("selected", "gold");

            fileData.month = event.currentTarget.dataset.month;
        }
    }
    // Reset dropdown menus to display none
    dropdownMenuType.parent.classList.add("display-none");
    dropdownMenuYear.parent.classList.add("display-none");
    dropdownMenuMonth.parent.classList.add("display-none");

    // Display relevant dropdown menu
    if (state.type)
    {

        dropdownMenuType.parent.classList.remove("display-none");
    }
    else if (state.year)
    {

        dropdownMenuYear.parent.classList.remove("display-none");
    }
    else if (state.month)
    {

        dropdownMenuMonth.parent.classList.remove("display-none");
    }
    // Display file data
    if (fileData.type != null && fileData.year != null && fileData.month != null)
    {
        initalize_data(`./json/${fileData.type}/${fileData.year}/${fileData.month}.json`);
    }
    // disable buttons based on avialble JSON data
    set_buttons(manifestData);

    controlData.selector.type.button.innerHTML = "TYPE";
    controlData.selector.year.button.innerHTML = "YEAR";
    controlData.selector.month.button.innerHTML = "MONTH";

    if (fileData.type != null)
    {
        controlData.selector.type.button.innerHTML = fileData.type;
        controlData.selector.type.button.classList.add("strong");
    }
    else
    {
        controlData.selector.type.button.classList.remove("strong");
    }

    if (fileData.year != null)
    {
        controlData.selector.year.button.innerHTML = fileData.year;
        controlData.selector.year.button.classList.add("strong");
    }
    else
    {
        controlData.selector.year.button.classList.remove("strong");
    }

    if (fileData.month != null)
    {
        controlData.selector.month.button.innerHTML = event.currentTarget.innerText;
        controlData.selector.month.button.classList.add("strong");
    }
    else
    {
        controlData.selector.month.button.classList.remove("strong");
    }
}

// function manage_buttons()
// {
//     let controlButton = event.currentTarget;

//     switch (controlButton.dataset.buttonType)
//     {
//         case "category":
//             // Reset top category selections
//             buttons.categories.type.classList.remove("silver");
//             buttons.categories.month.classList.remove("silver");
//             buttons.categories.year.classList.remove("silver");
//             // Reset dropdown menu selections
//             lists.type.classList.add("display-none");
//             lists.year.classList.add("display-none");
//             lists.month.classList.add("display-none");
//             // Highlight clicked button
//             controlButton.classList.add("selected", "silver");

//             // Click control button, show category
//             switch (controlButton.dataset.category)
//             {
//                 case "type":
//                     lists.type.classList.remove("display-none");
//                     buttons.categories.classList.add("selected", "silver");
//                     break;
//                 case "year":
//                     lists.year.classList.remove("display-none");
//                     break;
//                 case "month":
//                     lists.month.classList.remove("display-none");
//                     break;
//             }
//             break;
//         // Sub buttons
//         case "type":
//             buttons.categories.year.classList.add("silver", "selected");
//             buttons.categories.type.classList.add("gold", "selected");
//             fileData.type = controlButton.dataset.type;
//             //open next section
//             buttons.categories.year.classList.remove("disabled");
//             lists.type.classList.add("display-none");
//             lists.year.classList.remove("display-none");
//             break;
//         case "year":
//             buttons.categories.month.classList.add("silver", "selected");
//             buttons.categories.year.classList.add("gold", "selected");
//             fileData.year = controlButton.dataset.year;
//             //open next section
//             buttons.categories.month.classList.remove("disabled");
//             lists.year.classList.add("display-none");
//             lists.month.classList.remove("display-none");
//             break;
//         case "month":
//             buttons.categories.month.classList.add("gold", "selected");
//             lists.month.classList.add("display-none");
//             fileData.month = controlButton.dataset.month;
//             break;
//     }
//     if (fileData.type != "" && fileData.year != "" && fileData.month != "")
//     {
//         initalize_data(`./json/${fileData.type}/${fileData.year}/${fileData.month}.json`);
//     }
// }

function random_slash()
{
    const elements = document.getElementsByClassName("random-slash")
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

function render_log()
{
    logOutput.innerHTML = "";
    // TITLE - DATE
    let title = create_element("h2", "title");
    title.innerHTML = `${logData.month} ${logData.year}`;
    logOutput.appendChild(title);

    // PROJECTS INCLUDED
    let projectsIncluded = create_element("div", ["box", "included", "prose"], null);
    projectsIncluded.appendChild(create_element("h2", null, null, "Projects Included"));

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

    for (let i = 0; i < logData.projects.length; i++)
    {
        projectInfo.appendChild(render_project(i));
    }
    logOutput.appendChild(projectInfo);

}

function render_project(_projectIndex)
{
    let projectData = logData.projects[_projectIndex];
    let parent = create_element("section", ["project", "box", "prose", "flex-col"]);
    let title = create_element("h2", "title", null, projectData.heading);
    parent.appendChild(title);

    // Append project sections
    parent.appendChild(get_commentary_section(projectData.sections[0], _projectIndex));
    if (projectData.sections[1].entries != null)
    {
        parent.appendChild(get_images_section(projectData.sections[1], _projectIndex));
    }
    parent.appendChild(get_changes_section(projectData.sections[2], _projectIndex));
    return parent;
}

function get_commentary_section(_sectionData, _projectIndex)
{
    let parent = create_element("section", ["commentary", "flex-col"]);
    let heading = create_element("h3", "hori-line", null, _sectionData.heading);
    parent.appendChild(heading);
    for (let j = 0; j < _sectionData.text.length; j++)
    {
        parent.appendChild(create_element("p", null, null, _sectionData.text[j]));
    }
    return parent;
}

function get_images_section(_sectionData, _projectIndex)
{
    let parent = create_element("section", ["images", "flex-col"]);
    let heading = create_element("h3", "hori-line", null, _sectionData.heading);
    // FIGURE
    let figure = create_element("figure", ["figure", "flex-row"]);
    let figureImage = create_element("img", ["displayed-image"], `displayedImage_${_projectIndex}`);
    let figureTextWrapper = create_element("div", ["wrapper", "flex-col"]);
    let figureHeading = create_element("h4", null, null, "Description");
    let figureCaption = create_element("figcaption", null, null, "error");

    // THUMBNAIL GALLERY
    let thumbnailGalleryHeading = create_element("h4", null, null, "Thumbnail Gallery");
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
    let heading = create_element("h3", "hori-line", null, _sectionData.heading);

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
        let topCategoryHeading = create_element("h4", null, null, _sectionData.sections[i].heading);
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
            let subHeading = create_element("h5", null, null, categoryData[j].heading)
            // Unordered list of changes
            let changesList = create_element("ul");
            // Populate changesList
            for (let k = 0; k < changesData.length; k++)
            {
                changesList.appendChild(create_element("li", null, null, categoryData[j].changes[k]));
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
    if (_classes != null)
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
    if (_id != null)
    {
        element.id = _id;
    }
    if (_text != null)
    {
        element.innerHTML = _text;
    }
    return element;
}
async function initalize_data(_filePath)
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

async function initalize_manifest(_manifestFilePath)
{
    try
    {
        let response = await fetch(_manifestFilePath)
        manifestData = await response.json();
        set_buttons(manifestData);
    }
    catch (error)
    {
        console.log("Error loading manifest JSON:", error);
    }
}


initalize_manifest("./json/manifest.json");
random_slash()
// initalize_buttons();
// render_controls();
