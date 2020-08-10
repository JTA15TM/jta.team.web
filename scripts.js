onMenuClick = function(value)
{
    var redirect = document.getElementsByClassName("menu_item")[value].getAttribute("redirect");
    window.location.href = redirect;
}

onload = function()
{
    //Body Setup
    document.getElementsByTagName("body")[0].style.opacity = "100%";

    //Content Setup
    var height = window.screen.height;
    var width = window.screen.height;

    var content_height = "";

    if(height > width)
    {
        content_height = ((height / 2) + (height / 12)) + "px";
    }
    else
    {
        content_height = ((width / 2) + (width / 12)) + "px";
    }
    document.getElementsByClassName("content")[0].style.height = content_height;

    ConnectConfig();
}

ConnectConfig = function()
{
    var xhr = new XMLHttpRequest();
    xhr.open('GET', '/config.json', false);
    xhr.send();

    if (xhr.status != 200) {
        //error
      } else {
        var response = xhr.responseText;
        let json = JSON.parse(response, configObject);

        alert(json.label);
      }
}

let configObject = {
    label: '',
    date_update: "",
    author: ""
  };