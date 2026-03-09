(function ($) {
  $.fn.myTabs = function (options) {
    var settings = $.extend(
      {
        activeClass: "activeTab",
        speed: 400,
        defaultTab: "#home",
      },
      options,
    );

    var container = this;
    container.find(".tab-content").hide();

    function showTab(tab) {
      container.find(".tab-content").hide();
      $(tab).fadeIn(settings.speed);

      container.find(".tab-links a").removeClass(settings.activeClass);
      container.find("[href='" + tab + "']").addClass(settings.activeClass);
      window.location.hash = tab;
    }

    var startTab = window.location.hash || settings.defaultTab;

    showTab(startTab);

    container.find(".tab-links a").click(function (e) {
      e.preventDefault();

      var tab = $(this).attr("href");

      showTab(tab);
    });

    $(document).keydown(function (e) {
      var tabs = container.find(".tab-links a");

      var index = tabs.index(container.find("." + settings.activeClass));

      if (e.keyCode == 39) {
        index++;

        if (index >= tabs.length) index = 0;

        window.location.hash = tabs.eq(index).attr("href");
      }

      if (e.keyCode == 37) {
        index--;

        if (index < 0) index = tabs.length - 1;

        window.location.hash = tabs.eq(index).attr("href");
      }
    });

    $(window).on("hashchange", function () {
      var tab = window.location.hash;

      if (tab) {
        showTab(tab);
      }
    });

    return this;
  };
})(jQuery);

$(document).ready(function () {
  $("#mytabs").myTabs({
    activeClass: "activeTab",
    speed: 500,
    defaultTab: "#home",
  });
});
