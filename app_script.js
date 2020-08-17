onload = function()
{
    //Body Setup
    document.getElementsByTagName("body")[0].style.opacity = "100%";

    //Info
    var link = window.location.href;
    var a = link.indexOf("=") + 1;
    var b = link.slice(a);
    if(!b.includes("app"))
    {
        var app_id = b;
        var item = ConnectAppsConfig(app_id);
        if(item.app_name != undefined)
        {
            ParseInformation(item);
        }
        else
        {
            NotFound();
        }
    }
    else
    {
        NotFound();
    }
}

ConnectAppsConfig = function(id)
{
    var xhr = new XMLHttpRequest();
    xhr.open('GET', 'https://raw.githubusercontent.com/JTA15TM/jta.team.web/master/apps/apps.json', false);
    xhr.send();
    
    if(xhr.status == 200)
    {
       var response = JSON.parse(xhr.responseText);
       for(var i = 0; i < response.items.length; i++)
        {
            var item = response.items[i];
            if(item.id == parseInt(id))
            {
                return item;
            }
        }
    }
    return JSON.parse("[]");
}

ParseInformation = function(item)
{
    //Title
    document.title = item.app_name;
    document.getElementById("app_logo_title").innerHTML = item.app_name;

    //Description
    document.getElementById("app_logo_description").innerHTML = item.short_description;

    //Logo
    var logo_image = "<img id=\"app_logo_preview\" src=\"" + item.logo + "\"/>";
    document.getElementById("app_logo_container").innerHTML = logo_image;
}

NotFound = function()
{
    document.getElementsByTagName("body")[0].innerHTML = "<div id=\"not_found\">Приложение не найдено!</div>";
}
    
onBackPressed = function()
{
    var link = "apps.html";
    window.location.href = link;
}