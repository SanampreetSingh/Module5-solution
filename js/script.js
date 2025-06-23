(function (global) {
  var dc = {};

  var homeHtmlUrl = "snippets/home-snippet.html";
  var allCategoriesUrl = "https://coursera-jhu-default-rtdb.firebaseio.com/categories.json";
  var menuItemsUrl = "https://coursera-jhu-default-rtdb.firebaseio.com/menu_items/{{short_name}}.json";

  var insertHtml = function (selector, html) {
    document.querySelector(selector).innerHTML = html;
  };

  var showLoading = function (selector) {
var html = "<div class='text-center'><img src='ajax-loader.gif'></div>";

    insertHtml(selector, html);
  };

  var insertProperty = function (string, propName, propValue) {
    var propToReplace = "{{" + propName + "}}";
    return string.replace(new RegExp(propToReplace, "g"), propValue);
  };

  document.addEventListener("DOMContentLoaded", function () {
    showLoading("#main-content");
    $ajaxUtils.sendGetRequest(
      allCategoriesUrl,
      function (categories) {
        var randomCategory = chooseRandomCategory(categories);
        $ajaxUtils.sendGetRequest(
          homeHtmlUrl,
          function (homeHtml) {
            var finalHtml = insertProperty(homeHtml, "randomCategoryShortName", randomCategory.short_name);
            insertHtml("#main-content", finalHtml);
          },
          false
        );
      },
      true
    );
  });

  function chooseRandomCategory(categories) {
    var index = Math.floor(Math.random() * categories.length);
    return categories[index];
  }

  dc.loadMenuItems = function (categoryShortName) {
    alert("Loading menu for category: " + categoryShortName);
    // Optional: You could add actual logic to load menu items here.
  };

  global.$dc = dc;
})(window);
