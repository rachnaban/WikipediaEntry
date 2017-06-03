// JavaScript source code

$(document).ready(function () {

    $("#btnSubmit").click(getWikiEntries);
  
    function fetchWikiEntries(data)
    {        
         $.each(data.query.pages, function (index, page) {
                var title = page.title;
                var fullurl = page.fullurl;
                var extract = page.extract;
                var $li = $("<li class='link'><a target='_blank' href='"+fullurl+"'>"+title+"</a><p>"+extract+"</p></li>");
                $("#results > ul").append($li);
         });
    }

    function getWikiEntries()
    {
        $("#results>ul").empty();
            
        var inputVal = $("#searchVal").val();

        if (inputVal.length <= 0)
        {
            return;
        }
       
        var url = "https://en.wikipedia.org//w/api.php?callback=?";
             
        $.getJSON(url, {
            action: "query",
            format: "json",
            prop: "info|pageimages|extracts",
            exlimit: "max",
            generator: "search",
            gsrsearch: inputVal,
            exintro: "",            
            pilimit: "max",
            inprop: "url",
           
        },
          function (data) {
              if (typeof data.query === "undefined") {
                  alert("No results"+ inputVal);
                  return false;
              }                    
              fetchWikiEntries(data);
          });

    }  

});



