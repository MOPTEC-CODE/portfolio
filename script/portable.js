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