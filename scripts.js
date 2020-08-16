onMenuClick = function(value)
{
    var redirect = document.getElementsByClassName("menu_item")[value].getAttribute("redirect");
    window.location.href = redirect;
}

onload = function()
{
  const b = "" + window.location.href;
  if(!b.slice(-1).includes("l"))
  {
    window.location.href = "index.html";
  }

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
    //document.getElementsByClassName("content")[0].style.height = content_height;
   
    ConnectConfig();
    ConnectPagesConfig();
}

ConnectConfig = function()
{
    var xhr = new XMLHttpRequest();
    xhr.open('GET', 'config.json', false);
    xhr.send();

    if (xhr.status != 200) {
        //error
      } else {
        var response = xhr.responseText;
        var resources = JSON.parse(response);

        document.getElementById("toolbar_title").innerHTML = resources.author;
      }
}

ConnectPagesConfig = function()
{
    var xhr = new XMLHttpRequest();
    xhr.open('GET', 'pages_config.json', false);
    xhr.send();

    if (xhr.status != 200) {
        //error
      } else {
        var response = xhr.responseText;

        var output_items = "";
        var jsonData = JSON.parse(response);
        for (var i = 0; i < jsonData.items.length; i++) 
        {
          var a = jsonData.items[i];

          var label = a.label;
          var redirect = a.redirect;

          var menuItem = "";
          const b = "" + window.location.href;
          if(b.includes("" + redirect))
          {
            menuItem = "<ul class=\"menu_item_selected\">" + label + "</ul>";
            document.title = label;
          }
          else 
          {
            var indx = i - 1;
            if(indx < 0) indx = 0;
            menuItem = "<ul class=\"menu_item\" onclick=\"onMenuClick(" + indx + ");\" redirect=\"" + redirect + "\">" + label + "</ul>";
          }
          output_items += menuItem;
        }

        document.getElementById("toolbar_menu_items").innerHTML = output_items;
    }
}

ConnectAppsConfig = function()
{
    var xhr = new XMLHttpRequest();
    xhr.open('GET', 'https://raw.githubusercontent.com/JTA15TM/jta.team.web/master/apps/apps.json', false);
    xhr.send();

    alert(xhr.responseText);
}