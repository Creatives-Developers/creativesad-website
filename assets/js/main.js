/*----------------------------------------------

[Main JavaScript]

Theme   : Shock
Version : 1.0.0
Author  : Codings
Support : codings.dev

----------------------------------------------*/

/*----------------------------------------------

[Content Index]

1. Preloader
2. Popup
3. Side Widget
4. Icon
5. One Page Link
6. Helper
7. Slider
8. Shuffle
9. Lax
10. Lightbox
11. Load More
12. Form Validation
13. Tooltip
14. Animated Underline
15. Progress bar
16. Typed Text
17. Circular Text
18. Price Switch
19. Scroll Down
20. ZZZ Divider

----------------------------------------------*/

/*----------------------------------------------
1. Preloader
----------------------------------------------*/

// #region Preloader

function updateTime() {
  const span = document.querySelector("#dynamic-time");

  if (span) {
    span.innerText = `${new Date().toLocaleString("en-US", {
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    })}`;
  }
}

function setVideoSource() {
  const windowWidth = window.innerWidth;
  const windowHeight = window.innerHeight;
  const videoElement  = document.getElementById("preload-video")
  const videoSource   = document.querySelector("#preload-video source")
  if (windowWidth > windowHeight) {
    videoSource.src = 'assets/videos/logo-intro.mp4';
  } else {
    videoSource.src = 'assets/videos/logo-intro-real.mp4';
  }

  videoElement.load();
}
setVideoSource()
updateTime();
document.getElementById("preload-video").addEventListener(
  "play",
  () => {
    $("#preloader div").addClass("visible");
    //  Hide Time After 2.4s
    setTimeout(function () {
      $("#preloader div").removeClass("visible");
    }, 2400);
  },
  false
);


jQuery(function ($) {
  "use strict";

  // close after Video End
  document.getElementById("preload-video").addEventListener(
    "ended",
    () => {
      var preloader = $("#preloader");
      preloader.addClass("loaded");
      document.body.style.overflow = "auto";
      const next = document.querySelector(".slide-navigation-item-next");
      next.click();
    },
    false
  );

  // // close after one Second
  // setTimeout(function () {
  //   var preloader = $("#preloader");
  //   preloader.addClass("loaded");
  //   document.body.style.overflow = "auto";
  //   const next = document.querySelector(".slide-navigation-item-next");
  //   next.click();
  // }, 3000);
});

// #endregion Preloader

/*----------------------------------------------
2. Popup
----------------------------------------------*/

// #region Popup Bar

void (function (root, factory) {
  if (typeof define === "function" && define.amd) {
    define(factory);
  } else if (typeof exports === "object") {
    module.exports = factory();
  } else {
    root.PopupBar = factory();
  }
})(this, function () {
  function PopupBar() {
    ready(run);
  }

  const navbar = document.querySelector(".navbar.auto-hide");

  function run() {
    if (window.localStorage.PopupBarDismissed) {
      return;
    }

    show();
  }

  function dismiss() {
    var notice = document.getElementById("popup-bar");

    if (notice) {
      notice.classList.remove("show-down-animation");
    }

    if (notice) {
      notice.classList.add("show-up-animation");
    }

    window.localStorage.PopupBarDismissed = true;
    navbar.style.top = "0";
  }

  function undismiss() {
    delete window.localStorage.PopupBarDismissed;
  }

  function show() {
    var $dismiss = document.getElementById("popup-bar-dismiss");
    if ($dismiss !== null) {
      $dismiss.onclick = dismiss;
    }

    var $div = document.getElementById("popup-bar");
    if ($div !== null) {
      $div.classList.remove("d-none");
      $div.classList.add("show-down-animation");
      navbar.style.top = "50px";
    }
  }

  function ready(fn) {
    if (document.readyState === "complete") {
      return fn();
    } else if (document.addEventListener) {
      document.addEventListener("DOMContentLoaded", fn);
    } else {
      document.attachEvent("onreadystatechange", function () {
        if (document.readyState === "interactive") fn();
      });
    }
  }

  PopupBar.run = run;
  PopupBar.dismiss = dismiss;
  PopupBar.undismiss = undismiss;

  return PopupBar;
});

PopupBar();

// #endregion Popup Bar

// #region Popup Box

void (function (root, factory) {
  if (typeof define === "function" && define.amd) {
    define(factory);
  } else if (typeof exports === "object") {
    module.exports = factory();
  } else {
    root.PopupBox = factory();
  }
})(this, function () {
  function PopupBox() {
    ready(run);
  }

  function run() {
    if (window.localStorage.PopupBoxDismissed) {
      return;
    }

    show();
  }

  function dismiss() {
    var notice = document.getElementById("popup-box");

    if (notice) {
      notice.classList.remove("bounce-in-up-animation");
    }

    if (notice) {
      notice.classList.add("bounce-out-down-animation");
    }

    window.localStorage.PopupBoxDismissed = true;
  }

  function undismiss() {
    delete window.localStorage.PopupBoxDismissed;
  }

  function show() {
    var $dismiss = document.getElementById("popup-box-dismiss");
    if ($dismiss !== null) {
      $dismiss.onclick = dismiss;
    }

    var $div = document.getElementById("popup-box");
    if ($div !== null) {
      $div.classList.remove("d-none");
      $div.classList.add("bounce-in-up-animation");
    }
  }

  function ready(fn) {
    if (document.readyState === "complete") {
      return fn();
    } else if (document.addEventListener) {
      document.addEventListener("DOMContentLoaded", fn);
    } else {
      document.attachEvent("onreadystatechange", function () {
        if (document.readyState === "interactive") {
          fn();
        }
      });
    }
  }

  PopupBox.run = run;
  PopupBox.dismiss = dismiss;
  PopupBox.undismiss = undismiss;

  return PopupBox;
});

PopupBox();

// #endregion Popup Box

/*----------------------------------------------
3. Side Widget
----------------------------------------------*/

// #region Side Widget

jQuery(function ($) {
  "use strict";

  $(window).scroll(function () {
    var current_position = $(window).scrollTop();
    var widget = $(".shock-body .side-widget");

    widget.each(function () {
      if ($(this).is("[data-position]")) {
        var display_in = $(this).data("position");
      } else {
        var display_in = window.innerHeight;
      }

      if (!$(this).hasClass("active")) {
        if (current_position > display_in) {
          $(this).addClass("show");
        } else {
          $(this).removeClass("show");
        }
      }
    });
  });
});

// #endregion Side Widget

/*----------------------------------------------
4. Icon
----------------------------------------------*/

// #region Icon

jQuery(function ($) {
  "use strict";

  const cache = {};

  $.fn.svgIconInit = function fnSvgIconInit() {
    this.each(imgToSvg);
    return this;
  };

  function imgToSvg() {
    const $img = $(this);
    const src = $img.attr("src");

    if (!cache[src]) {
      const d = $.Deferred();
      $.get(src, (data) => {
        d.resolve($(data).find("svg"));
      });
      cache[src] = d.promise();
    }

    cache[src].then((svg) => {
      const $svg = $(svg).clone();

      if ($img.attr("id")) $svg.attr("id", $img.attr("id"));
      if ($img.attr("class")) $svg.attr("class", $img.attr("class"));
      if ($img.attr("style")) $svg.attr("style", $img.attr("style"));

      if ($img.attr("width")) {
        $svg.attr("width", $img.attr("width"));
        if (!$img.attr("height")) $svg.removeAttr("height");
      }
      if ($img.attr("height")) {
        $svg.attr("height", $img.attr("height"));
        if (!$img.attr("width")) $svg.removeAttr("width");
      }

      $svg.insertAfter($img);
      $img.trigger("svgInlined", $svg[0]);
      $img.remove();
    });
  }

  $("[data-shock-icon]").svgIconInit();
});

// #endregion Icon

/*----------------------------------------------
5. One Page Link
----------------------------------------------*/

// #region One Page Link

jQuery(function ($) {
  "use strict";

  $(".one-page-section").each(function () {
    var $this = $(this);

    $this.append('<span class="one-page-item"></span>');

    var item = $this.find(".one-page-item");

    item.bind("inview", function (event, isInView) {
      if (isInView) {
        let section = $this.attr("id");
        let link = "#" + section;
        let element = $(".one-page-link");
        let active = $('a[href="' + link + '"].one-page-link');

        element.removeClass("active");
        active.addClass("active");
      }
    });
  });
});

// #endregion One Page Link

/*----------------------------------------------
6. Helper
----------------------------------------------*/

// #region Helper

jQuery(function ($) {
  "use strict";

  var navbar = $("#navbar");
  var height = navbar.outerHeight();
  var section = $(".has-holder");

  section.each(function () {
    $(this).prepend(
      '<div class="navbar-holder" style="padding-top: ' + height + 'px" />'
    );
  });
});

jQuery(function ($) {
  "use strict";

  // Text Color
  $("[data-text-color]").each(function () {
    let attr = $(this).data("text-color");
    $(this).css("color", attr);
  });

  // Background Color
  $("[data-bg-color]").each(function () {
    let attr = $(this).data("bg-color");
    $(this).css("background-color", attr);
  });

  // Background Image
  $("[data-bg-image]").each(function () {
    let attr = $(this).data("bg-image");
    $(this).css("background-image", "url(" + attr + ")");
  });
});

jQuery(function ($) {
  "use strict";

  function autoWidth() {
    var section = $(".js-auto-width");

    section.each(function () {
      var sectionWidth = $(this).width();
      var containerWidth = $(this).find(".container").width();
      var wrapper = $(this).find(".js-auto-width-wrapper");
      var width = (sectionWidth - containerWidth) / 2;

      wrapper.css("width", "calc(100% + " + width + "px)");
    });
  }
  autoWidth();
});

jQuery(function ($) {
  "use strict";

  var item = $(".focus-trigger");

  item.each(function () {
    $(this).hover(function () {
      $(this).find(".focus-trigger-field").trigger("focus");
    });
  });
});

// #endregion Helper

/*----------------------------------------------
7. Slider
----------------------------------------------*/

// #region Slider

jQuery(function ($) {
  // Slider
  $(".shock-section .slider").each(function () {
    // Autoplay
    if ($(this).is("[data-autoplay]")) {
      var autoplay = { delay: $(this).data("autoplay") };
    } else {
      var autoplay = false;
    }

    // Loop
    if ($(this).is("[data-loop]")) {
      var loop = $(this).data("loop");
    } else {
      var loop = false;
    }

    // Columns
    if ($(this).is("[data-columns]")) {
      var columns = $(this).data("columns");
      var columns = columns.split(",");
    } else {
      var columns = [1, 1, 1, 1];
    }

    // Navigation
    if ($(this).hasClass("has-navigation")) {
      has_navigation = {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      };
    } else {
      has_navigation = false;
    }

    // Pagination
    if ($(this).hasClass("has-pagination")) {
      has_pagination = { el: ".swiper-pagination", clickable: true };
    } else {
      has_pagination = false;
    }

    // Scrollbar
    if ($(this).hasClass("has-scrollbar")) {
      has_scrollbar = {
        el: ".swiper-scrollbar",
        snapOnRelease: true,
        draggable: true,
      };
    } else {
      has_scrollbar = false;
    }

    // Settings
    const carouselSlider = new Swiper(this, {
      autoplay: autoplay,
      speed: 600,
      loop: loop,
      navigation: has_navigation,
      pagination: has_pagination,
      scrollbar: has_scrollbar,
      grabCursor: true,
      spaceBetween: 0,
      autoHeight: true,
      centerInsufficientSlides: true,
      slidesPerView: columns[3],
      breakpoints: {
        375: {
          slidesPerView: columns[2],
        },
        768: {
          slidesPerView: columns[1],
        },
        1200: {
          slidesPerView: columns[0],
        },
      },
    });

    // Scrollbar cursor
    if ($(this).hasClass("has-scrollbar")) {
      carouselSlider.on("scrollbarDragMove", function () {
        $(".swiper-scrollbar-drag").css("cursor", "grabbing");
      });

      carouselSlider.on("scrollbarDragEnd", function () {
        $(".swiper-scrollbar-drag").css("cursor", "grab");
      });
    }
  });

  // Thumbnail Slider
  const ThumbnailSliderControl = new Swiper(
    ".shock-section .thumbnail-slider .thumbnail-slider-control",
    {
      speed: 600,
      loop: true,
      slidesPerView: 1,
      breakpoints: {
        320: {
          slidesPerView: 2,
        },
        768: {
          slidesPerView: 4,
        },
        1200: {
          slidesPerView: 6,
        },
      },
      spaceBetween: 15,
    }
  );

  const ThumbnailSlider = new Swiper(
    ".shock-section .thumbnail-slider .thumbnail-slider-items",
    {
      speed: 600,
      loop: true,
      slidesPerView: 1,
      spaceBetween: 0,
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },
      thumbs: {
        swiper: ThumbnailSliderControl,
      },
    }
  );
});

// #endregion Slider

/*----------------------------------------------
8. Shuffle
----------------------------------------------*/

// #region Shuffle

jQuery(function ($) {
  "use strict";

  var section = $(".shock-section .shuffle");

  section.each(function (index) {
    var $this = $(this);
    var count = index + 1;

    $this.find(".shuffle-container").addClass("shuffle-container-" + count);
    $this.find(".shuffle-item").addClass("shuffle-item-" + count);
    $this.find(".shuffle-sizer").addClass("shuffle-sizer-" + count);
    $this.find(".shuffle-button").addClass("shuffle-button-" + count);

    var container = $(".shuffle-container-" + count);
    var button = $(".shuffle-button-" + count);

    var Filter = new Shuffle(container, {
      itemSelector: ".shuffle-item-" + count,
      sizer: ".shuffle-sizer-" + count,
      buffer: 1,
    });

    button.on("click", function () {
      var button = $(this);
      var value = button.data("value");

      $this.find(".shuffle-button").removeClass("active");
      button.addClass("active");

      if (value == "All") {
        Filter.filter();
      } else {
        Filter.filter(value);
      }
    });
  });
});

// #endregion Shuffle

/*----------------------------------------------
9. Lax
----------------------------------------------*/

// #region Lax

jQuery(function ($) {
  "use strict";

  window.addEventListener("load", () => {
    lax.init();

    // Settings
    lax.addDriver(
      "scrollY",
      function () {
        return window.scrollY;
      },
      { inertiaEnabled: true }
    );

    lax.addElements('[data-lax="inertia-top"]', {
      scrollY: {
        translateY: [
          ["elInY", "elCenterY", "elOutY"],
          [0, 0, 0],
          { inertia: 10 },
        ],
      },
    });

    lax.addElements('[data-lax="inertia-bottom"]', {
      scrollY: {
        translateY: [
          ["elInY", "elCenterY", "elOutY"],
          [0, 0, 0],
          { inertia: -10 },
        ],
      },
    });

    lax.addElements('[data-lax="v-top"]', {
      scrollY: {
        translateY: [
          ["elInY", "elCenterY", "elOutY"],
          [0, -35, 0],
          { inertia: 5 },
        ],
      },
    });

    lax.addElements('[data-lax="v-bottom"]', {
      scrollY: {
        translateY: [
          ["elInY", "elCenterY", "elOutY"],
          [0, 35, 0],
          { inertia: -5 },
        ],
      },
    });

    lax.addElements('[data-lax="h-left"]', {
      scrollY: {
        translateX: [
          ["elInY", "elOutY"],
          [75, -100],
        ],
      },
    });

    lax.addElements('[data-lax="h-right"]', {
      scrollY: {
        translateX: [
          ["elInY", "elOutY"],
          [-75, 100],
        ],
      },
    });

    // Scrolling Grid
    $(".scrolling-grid .bricklayer").each(function () {
      if ($(this).data("columns") == 1) {
        var lax_v_down = null;
        var lax_v_up =
          '.scrolling-grid [data-columns="1"] .bricklayer-column:nth-child(2)';
      } else if ($(this).data("columns") == 2) {
        var lax_v_down =
          '.scrolling-grid [data-columns="2"] .bricklayer-column:nth-child(2)';
        var lax_v_up =
          '.scrolling-grid [data-columns="2"] .bricklayer-column:nth-child(3)';
      } else if ($(this).data("columns") == 3) {
        var lax_v_down =
          '.scrolling-grid [data-columns="3"] .bricklayer-column:nth-child(2), .scrolling-grid [data-columns="3"] .bricklayer-column:nth-child(4)';
        var lax_v_up =
          '.scrolling-grid [data-columns="3"] .bricklayer-column:nth-child(3)';
      } else if ($(this).data("columns") == 4) {
        var lax_v_down =
          '.scrolling-grid [data-columns="4"] .bricklayer-column:nth-child(2), .scrolling-grid [data-columns="4"] .bricklayer-column:nth-child(4)';
        var lax_v_up =
          '.scrolling-grid [data-columns="4"] .bricklayer-column:nth-child(3), .scrolling-grid [data-columns="4"] .bricklayer-column:nth-child(5)';
      } else if ($(this).data("columns") == 5) {
        var lax_v_down =
          '.scrolling-grid [data-columns="5"] .bricklayer-column:nth-child(2), .scrolling-grid [data-columns="5"] .bricklayer-column:nth-child(4), .scrolling-grid [data-columns="5"] .bricklayer-column:nth-child(6)';
        var lax_v_up =
          '.scrolling-grid [data-columns="5"] .bricklayer-column:nth-child(3), .scrolling-grid [data-columns="5"] .bricklayer-column:nth-child(5)';
      } else if ($(this).data("columns") == 6) {
        var lax_v_down =
          '.scrolling-grid [data-columns="6"] .bricklayer-column:nth-child(2), .scrolling-grid [data-columns="6"] .bricklayer-column:nth-child(4), .scrolling-grid [data-columns="6"] .bricklayer-column:nth-child(6)';
        var lax_v_up =
          '.scrolling-grid [data-columns="6"] .bricklayer-column:nth-child(3), .scrolling-grid [data-columns="6"] .bricklayer-column:nth-child(5), .scrolling-grid [data-columns="6"] .bricklayer-column:nth-child(7)';
      } else {
        var lax_v_down = null;
        var lax_v_up = null;
      }

      lax.addElements(lax_v_down, {
        scrollY: {
          translateY: [
            ["elInY", "elCenterY", "elOutY"],
            [0, 100, 0],
          ],
        },
      });

      lax.addElements(lax_v_up, {
        scrollY: {
          translateY: [
            ["elInY", "elCenterY", "elOutY"],
            [0, -100, 0],
          ],
        },
      });
    });
  });
  loadParticals();
  window.addEventListener("load", resize);
  window.addEventListener("resize", resize);
});

// #endregion Lax

/*----------------------------------------------
10. Lightbox
----------------------------------------------*/

// #region Lightbox

jQuery(function ($) {
  $(".shock-section .gallery").lightGallery({
    selector: ".shock-section .gallery .lightbox-link:not(.prevent)",
    thumbnail: false,
    share: false,
    download: false,
  });
});

// #endregion Lightbox

/*----------------------------------------------
11. Load More
----------------------------------------------*/

// #region Load More

jQuery(function ($) {
  "use strict";

  var display = $("#load-more").data("display");
  var button = $("#load-more-button");
  var item = $(".load-more-item").hide();

  item.slice(0, display).show();

  button.on("click", function (e) {
    e.preventDefault();

    var item_hidden = $(".load-more-item:hidden");
    var item_columns = $("#load-more").data("columns");

    if (item_hidden.length == item_columns) {
      $(this)
        .find(".button-icon")
        .removeClass("fa-arrow-rotate-right")
        .addClass("fa-check");
      $(this).find(".button-text").text("All items loaded");
    } else if (item_hidden.length == 0) {
      return false;
    }

    item_hidden.slice(0, item_columns).fadeIn();

    $("html, body").animate(
      {
        scrollTop: $(this).offset().top - 400,
      },
      200
    );
  });
});

// #endregion Load More

/*----------------------------------------------
12. Form Validation
----------------------------------------------*/

// #region Form Validation

jQuery(function ($) {
  "use strict";

  var required_form = $(".needs-validation");

  Array.prototype.slice.call(required_form).forEach(function (form) {
    // Submit
    form.addEventListener(
      "submit",
      function (event) {
        // Check
        if (!form.checkValidity()) {
          event.preventDefault();
          event.stopPropagation();
        }

        // Validation
        form.classList.add("was-validated");
      },
      false
    );
  });
});

// #endregion Form Validation

/*----------------------------------------------
13. Tooltip
----------------------------------------------*/

// #region Tooltip

jQuery(function ($) {
  "use strict";

  var tooltipTriggerList = [].slice.call(
    document.querySelectorAll('[data-bs-toggle="tooltip"].index-1')
  );
  var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
    return new bootstrap.Tooltip(tooltipTriggerEl, {
      container: ".tooltip-item.index-1",
      trigger: "hover",
    });
  });

  var tooltipTriggerList = [].slice.call(
    document.querySelectorAll('[data-bs-toggle="tooltip"].index-2')
  );
  var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
    return new bootstrap.Tooltip(tooltipTriggerEl, {
      container: ".tooltip-item.index-2",
      trigger: "hover",
    });
  });

  var tooltipTriggerList = [].slice.call(
    document.querySelectorAll('[data-bs-toggle="tooltip"].index-3')
  );
  var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
    return new bootstrap.Tooltip(tooltipTriggerEl, {
      container: ".tooltip-item.index-3",
      trigger: "hover",
    });
  });

  var tooltipTriggerList = [].slice.call(
    document.querySelectorAll('[data-bs-toggle="tooltip"].index-4')
  );
  var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
    return new bootstrap.Tooltip(tooltipTriggerEl, {
      container: ".tooltip-item.index-4",
      trigger: "hover",
    });
  });
});

// #endregion Tooltip

/*----------------------------------------------
14. Animated Underline
----------------------------------------------*/

// #region Animated Underline

jQuery(function ($) {
  "use strict";

  $(".animated-underline").each(function () {
    var $this = $(this);

    $this.one("inview", function (event, isInView) {
      if (isInView) {
        if (!$this.hasClass("when-hover")) {
          setTimeout(function () {
            $this.addClass("active");
          }, 400);
        } else {
          let parent = $this.parents().eq(1);
          parent.hover(function () {
            $this.addClass("active");
          });
        }
      }
    });
  });
});

// #endregion Animated Underline

/*----------------------------------------------
15. Progress bar
----------------------------------------------*/

// #region Progress bar

jQuery(function ($) {
  "use strict";

  // Counter
  $(".animated-counter").each(function () {
    var $this = $(this);

    $this.one("inview", function (event, isInView) {
      if (isInView) {
        $this.find(".counter").each(function () {
          var $this = $(this);

          var bar = new ProgressBar.SemiCircle(this, {
            duration: parseInt($this.data("duration")),
            strokeWidth: 0,
            trailWidth: 0,
            color: null,
            trailColor: null,
            svgStyle: { display: "none" },
            easing: "easeInOut",
            text: {
              style: {
                color: $this.data("text-color"),
                backgroundColor: $this.data("text-bg-color"),
              },
            },
            step: (state, bar) => {
              bar.setText(Math.round(bar.value() * 100) + $this.data("symbol"));
            },
          });

          $this.find(".progressbar-text").css("top", "");
          $this.find(".progressbar-text").css("bottom", "");
          $this.find(".progressbar-text").css("transform", "");

          bar.animate(parseInt($this.data("value")) / 100);

          $this.addClass("active");
        });
      }
    });
  });

  // Line Progress bar
  $(".line-progress-bar").each(function () {
    var $this = $(this);

    $this.one("inview", function (event, isInView) {
      if (isInView) {
        $this.find(".counter").each(function () {
          var $this = $(this);

          if ($this.hasClass("outline")) {
            var text_width = "120px";
          } else {
            var text_width = "70px";
          }

          var bar = new ProgressBar.Line(this, {
            duration: parseInt($this.data("duration")),
            strokeWidth: $this.data("bar-stroke"),
            trailWidth: $this.data("bar-stroke-empty"),
            color: $this.data("bar-color"),
            trailColor: $this.data("empty-bar-color"),
            svgStyle: { width: "100%", height: "100%" },
            easing: "linear",
            text: {
              style: {
                position: null,
                right: null,
                left:
                  "calc( " + $this.data("value") + "% - " + text_width + " )",
                top: null,
                margin: null,
                padding: null,
                transform: null,
                transition:
                  parseInt($this.data("duration") - 200) + "ms linear",
                color: $this.data("text-color"),
                backgroundColor: $this.data("text-bg-color"),
              },
            },
            step: (state, bar) => {
              bar.setText(Math.round(bar.value() * 100) + $this.data("symbol"));
            },
          });

          bar.animate(parseInt($this.data("value")) / 100);

          $this.addClass("active");
        });
      }
    });
  });

  // Radial Progress Bar
  $(".radial-progress-bar").each(function () {
    var $this = $(this);

    $this.one("inview", function (event, isInView) {
      if (isInView) {
        $this.find(".counter").each(function () {
          var $this = $(this);

          var bar = new ProgressBar.SemiCircle(this, {
            duration: parseInt($this.data("duration")),
            strokeWidth: $this.data("bar-stroke"),
            trailWidth: $this.data("bar-stroke-empty"),
            color: $this.data("bar-color"),
            trailColor: $this.data("empty-bar-color"),
            svgStyle: { width: "100%", height: "100%" },
            easing: "easeInOut",
            text: {
              style: {
                color: $this.data("text-color"),
                backgroundColor: $this.data("text-bg-color"),
              },
            },
            step: (state, bar) => {
              bar.setText(Math.round(bar.value() * 100) + $this.data("symbol"));
            },
          });

          $this.find(".progressbar-text").css("top", "");
          $this.find(".progressbar-text").css("bottom", "");
          $this.find(".progressbar-text").css("transform", "");

          bar.animate(parseInt($this.data("value")) / 100);

          $this.addClass("active");
        });
      }
    });
  });
});

// #endregion Progress bar

/*----------------------------------------------
16. Typed Text
----------------------------------------------*/

// #region Typed Text

jQuery(function ($) {
  "use strict";

  if (document.querySelector(".typed-text") !== null) {
    var options = {
      stringsElement: "#typed-strings",
      typeSpeed: 60,
      backSpeed: 30,
      backDelay: 2000,
      startDelay: 300,
      loop: true,
    };
    var typed = new Typed(".typed-text", options);
  }

  if (document.querySelector(".typed-text-2") !== null) {
    var options_2 = {
      stringsElement: "#typed-strings-2",
      typeSpeed: 60,
      backSpeed: 30,
      backDelay: 2000,
      startDelay: 300,
      loop: true,
    };
    var typed_2 = new Typed(".typed-text-2", options_2);
  }
});

// #endregion Typed Text

/*----------------------------------------------
17. Circular Text
----------------------------------------------*/

// #region Circular Text

jQuery(function ($) {
  "use strict";

  var CircularText = {
    init: function (el, str) {
      var element = document.querySelector(el);
      var text = str ? str : element.innerHTML;
      element.innerHTML = "";

      for (var i = 0; i < text.length; i++) {
        var letter = text[i];
        var span = document.createElement("span");
        var node = document.createTextNode(letter);
        var r = (360 / text.length) * i;
        var x = (Math.PI / text.length).toFixed(0) * i;
        var y = (Math.PI / text.length).toFixed(0) * i;
        span.appendChild(node);
        span.style.webkitTransform =
          "rotateZ(" + r + "deg) translate3d(" + x + "px," + y + "px,0)";
        span.style.transform =
          "rotateZ(" + r + "deg) translate3d(" + x + "px," + y + "px,0)";
        element.appendChild(span);
      }
    },
  };

  if (document.querySelector(".circular-text") !== null) {
    CircularText.init(".circular-text .emblem");
  }
  if (document.querySelector(".circular-text.index-2") !== null) {
    CircularText.init(".circular-text.index-2 .emblem");
  }
  if (document.querySelector(".circular-text.index-3") !== null) {
    CircularText.init(".circular-text.index-3 .emblem");
  }
  if (document.querySelector(".circular-text.index-4") !== null) {
    CircularText.init(".circular-text.index-4 .emblem");
  }
});

// #endregion Circular Text

/*----------------------------------------------
18. Price Switch
----------------------------------------------*/

// #region Price Switch

jQuery(function ($) {
  "use strict";

  function countUp(countFrom, countTo) {
    var selector = { countNum: countFrom.text() };

    $(selector).animate(
      { countNum: countTo },
      {
        duration: 1000,
        easing: "linear",
        step: function () {
          countFrom.text(Math.floor(this.countNum));
        },
        complete: function () {
          countFrom.text(this.countNum);
        },
      }
    );
  }

  $(".js-switch-price").each(function () {
    var $this = $(this);
    var button = $this.find(".js-switch-price-button");
    var price = $this.find(".price");

    price.css("display", "inline-block");
    price.css("width", price.width() + 15);

    button.click(function () {
      price.each(function () {
        var $this = $(this),
          monthly_value = $this.data("monthly"),
          annual_value = $this.data("annual");

        if ($this.text() == monthly_value) {
          countUp($this, annual_value);
        } else {
          countUp($this, monthly_value);
        }
      });
    });
  });
});

// #endregion Price Switch

/*----------------------------------------------
19. Scroll Down
----------------------------------------------*/

// #region Scroll Down

jQuery(function ($) {
  $(document).on("click", "#scroll-down", function () {
    window.scrollTo(0, $(window).height());
  });
});

// #endregion Scroll Down

/*----------------------------------------------
20. ZZZ Divider
----------------------------------------------*/

// #region ZZZ

jQuery(function ($) {
  "use strict";

  $(".zzz").each(function () {
    var $this = $(this);

    $this.one("inview", function (event, isInView) {
      if (isInView) {
        if (!$this.hasClass("when-hover")) {
          $this.addClass("active");
        } else {
          let parent = $this.parents().eq(1);
          parent.hover(function () {
            $this.addClass("active");
          });
        }
      }
    });
  });
});

// #endregion ZZZ

// particals js
let nextParticles;
async function loadParticals() {
  (function (exports) {
    "use strict";

    const _requestAnimationFrame =
      window.requestAnimationFrame ||
      window.webkitRequestAnimationFrame ||
      window.mozRequestAnimationFrame ||
      function (callback) {
        setTimeout(callback, 10);
      };
    let imageData, renderCount;
    let index, startIndex, layerIndex;
    let origin, particle, touch, touchIndex, rect;
    let x, y, z, dX, dY, dZ, distance;
    let force, angle, intensity, vertices;
    let canvas, context, data, r, g, b, a;

    const NextParticle = class NextParticle {
      constructor(optionsParam) {
        let options = {};
        if (optionsParam) {
          if (optionsParam.nodeName) {
            options = JSON.parse(JSON.stringify(optionsParam.dataset));
            if (optionsParam.nodeName === "IMG") {
              options.image = optionsParam;
            } else {
              options.wrapperElement = optionsParam;
            }
          } else {
            options = optionsParam;
          }
        }
        this.state = "stopped";
        this.touches = [];
        this.on("imageLoaded", this._onImageLoaded);
        this._initImage(options);
      }

      on(event, fn) {
        this.events = this.events || {};
        this.events[event] = this.events[event] || [];
        this.events[event].push(fn);
      }

      emit(event, params) {
        const events = this.events[event];
        if (events && events.length) {
          for (let eventIndex = 0; eventIndex < events.length; eventIndex++) {
            const cb = events[eventIndex];
            cb.call(this, params);
          }
        }
      }

      get renderer() {
        return this._renderer;
      }

      set renderer(value) {
        this._renderer = value;
        this._draw = this["_" + value + "Renderer"];
        try {
          this["_" + value + "InitContext"]();
        } catch (e) {
          console.log(e);
          if (value !== "default") {
            this.renderer = "default";
          }
        }
      }

      set color(value) {
        this.colorArr = this._parseColor(value);
        if (this.colorArr) {
          if (isNaN(this.colorArr[3])) {
            this.colorArr[3] = 255;
          }
          if (0 < this.colorArr[3] && this.colorArr[3] <= 1) {
            this.colorArr[3] *= 255;
          }
        }
      }

      start(optionsParam) {
        const options = optionsParam || {};
        this.initPosition = options.initPosition || this.initPosition;
        this.initDirection = options.initDirection || this.initDirection;
        if (this.canvas) {
          this.canvas.width = this.width;
          this.canvas.height = this.height;
          this.canvas.style.display = "";
        }
        this._initOrigins();
        this._initParticles();
        if (this.state !== "running") {
          this.state = "running";
          if (!this.disableInteraction) {
            if ("ontouchstart" in window || window.navigator.msPointerEnabled) {
              document.body.addEventListener("touchstart", this._touchHandler);
              document.body.addEventListener("touchmove", this._touchHandler);
              document.body.addEventListener("touchend", this._clearTouches);
              document.body.addEventListener("touchcancel", this._clearTouches);
            } else {
              this.canvas.addEventListener("mousemove", this._mouseHandler);
              this.canvas.addEventListener("mouseout", this._clearTouches);
            }
          }
          this._animate();
        }
      }

      stop(optionsParam) {
        const options = optionsParam || {};
        this.fadePosition = options.fadePosition || this.fadePosition;
        this.fadeDirection = options.fadeDirection || this.fadeDirection;
        this._fade();
        document.body.removeEventListener("touchstart", this._touchHandler);
        document.body.removeEventListener("touchmove", this._touchHandler);
        document.body.removeEventListener("touchend", this._clearTouches);
        document.body.removeEventListener("touchcancel", this._clearTouches);
        this.canvas.removeEventListener("mousemove", this._mouseHandler);
        this.canvas.removeEventListener("mouseout", this._clearTouches);
      }

      _animate() {
        if (this.state !== "stopped") {
          this._calculate();
          this._draw();
          _requestAnimationFrame(() => this._animate());
        } else {
          this.emit("stopped");
        }
      }

      get _mouseHandler() {
        return (e) => {
          this.touches = [
            {
              x: e.offsetX,
              y: e.offsetY,
              z: 0,
              force: 1,
            },
          ];
        };
      }

      get _touchHandler() {
        return (e) => {
          this.touches = [];
          rect = this.canvas.getBoundingClientRect();
          for (
            touchIndex = 0;
            touchIndex < e.changedTouches.length;
            touchIndex++
          ) {
            touch = e.changedTouches[touchIndex];
            if (touch.target === this.canvas) {
              this.touches.push({
                x: touch.pageX - rect.left,
                y: touch.pageY - rect.top,
                z: 0,
                force: touch.force || 1,
              });
              e.preventDefault();
            }
          }
        };
      }

      get _clearTouches() {
        return (e) => {
          this.touches = [];
        };
      }

      _onImageLoaded(options) {
        this.imageWidth = this.image.naturalWidth || this.image.width;
        this.imageHeight = this.image.naturalHeight || this.image.height;
        this.imageRatio = this.imageWidth / this.imageHeight;
        this.width = this.width || this.imageWidth;
        this.height = this.height || this.imageHeight;
        this.renderSize = (this.width + this.height) / 4;
        if (this.srcImage) {
          this.srcImage.style.display = "none";
        }
        this._initSettings(options);
        this._initContext(options);
        this._initResponsive(options);
        this.start();
      }

      _initImage(options) {
        this.srcImage = options.image;
        if (!this.srcImage && options.imageId) {
          this.srcImage = document.getElementById(options.imageId);
        }
        this.imageUrl = options.imageUrl || this.srcImage.src;
        this.image = document.createElement("img");
        this.wrapperElement =
          options.wrapperElement || this.srcImage.parentElement;
        this.image.onload = () => this.emit("imageLoaded", options);
        this.image.crossOrigin = "Anonymous";
        if (options.addTimestamp) {
          if (/\?/.test(this.imageUrl)) {
            this.imageUrl += "&d=" + Date.now();
          } else {
            this.imageUrl += "?d=" + Date.now();
          }
        }
        this.image.src = this.imageUrl;
      }

      _initContext(options) {
        this.canvas = options.canvas;
        if (!this.canvas && !this.context && this.wrapperElement) {
          this.canvas = document.createElement("canvas");
          this.wrapperElement.appendChild(this.canvas);
        }
        if (this.convas) {
          this.convas.style.display = "none";
        }
        this.context = options.context;
        this.renderer = options.renderer || "default";
      }

      _defaultInitContext(options) {
        this.context = this.context || this.canvas.getContext("2d");
        // this.context.scale(2,2);
      }

      _webglInitContext() {
        this.context =
          this.context ||
          this.canvas.getContext("webgl") ||
          this.canvas.getContext("experimental-webgl");
        this.fragmentShaderScript = `
  void main(void) {
  gl_FragColor = vec4(1, 1, 1, 0.7);
  }
  `;

        this.vertexShaderScript = `
  attribute vec3 vertexPosition;
  vec3 offset = vec3(-5, 3, 100);
  vec3 mirror = vec3(0.01, -0.01, 1);
  
  uniform mat4 modelViewMatrix;
  uniform mat4 perspectiveMatrix;
  
  void main(void) {
  gl_Position = perspectiveMatrix * modelViewMatrix * vec4(mirror * vertexPosition + offset, 1.0);
  gl_PointSize = 1.0;
  }
  `;
        this.context.viewport(0, 0, this.width, this.height);
        const vertexShader = this.context.createShader(
          this.context.VERTEX_SHADER
        );
        this.context.shaderSource(vertexShader, this.vertexShaderScript);
        this.context.compileShader(vertexShader);
        const fragmentShader = this.context.createShader(
          this.context.FRAGMENT_SHADER
        );
        this.context.shaderSource(fragmentShader, this.fragmentShaderScript);
        this.context.compileShader(fragmentShader);
        this.program = this.context.createProgram();
        this.context.attachShader(this.program, vertexShader);
        this.context.attachShader(this.program, fragmentShader);
        this.context.linkProgram(this.program);
        this.context.useProgram(this.program);
        this.vertexPosition = this.context.getAttribLocation(
          this.program,
          "vertexPosition"
        );
        this.context.enableVertexAttribArray(this.vertexPosition);
        this.context.clearColor(0.0, 0.0, 0.0, 1.0);
        this.context.clearDepth(1.0);
        this.context.enable(this.context.BLEND);
        this.context.disable(this.context.DEPTH_TEST);
        this.context.blendFunc(this.context.SRC_ALPHA, this.context.ONE);
        this.vertexBuffer = this.context.createBuffer();
        this.context.bindBuffer(this.context.ARRAY_BUFFER, this.vertexBuffer);
        this.context.clear(
          this.context.COLOR_BUFFER_BIT | this.context.DEPTH_BUFFER_BIT
        );
        var fieldOfView = 1.0;
        var aspectRatio = this.width / this.height;
        var nearPlane = 1;
        var farPlane = 10000;
        var top = nearPlane * Math.tan((fieldOfView * Math.PI) / 360.0);
        var bottom = -top;
        var right = top * aspectRatio;
        var left = -right;
        var a = (right + left) / (right - left);
        var b = (top + bottom) / (top - bottom);
        var c = (farPlane + nearPlane) / (farPlane - nearPlane);
        var d = (2 * farPlane * nearPlane) / (farPlane - nearPlane);
        var x = (2 * nearPlane) / (right - left);
        var y = (2 * nearPlane) / (top - bottom);
        var perspectiveMatrix = [
          x,
          0,
          a,
          0,
          0,
          y,
          b,
          0,
          0,
          0,
          c,
          d,
          0,
          0,
          -1,
          0,
        ];
        var modelViewMatrix = [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1];
        var vertexPosAttribLocation = this.context.getAttribLocation(
          this.program,
          "vertexPosition"
        );
        this.context.vertexAttribPointer(
          vertexPosAttribLocation,
          3.0,
          this.context.FLOAT,
          false,
          0,
          0
        );
        var uModelViewMatrix = this.context.getUniformLocation(
          this.program,
          "modelViewMatrix"
        );
        var uPerspectiveMatrix = this.context.getUniformLocation(
          this.program,
          "perspectiveMatrix"
        );
        this.context.uniformMatrix4fv(
          uModelViewMatrix,
          false,
          new Float32Array(perspectiveMatrix)
        );
        this.context.uniformMatrix4fv(
          uPerspectiveMatrix,
          false,
          new Float32Array(modelViewMatrix)
        );
      }

      _initSettings(options) {
        this.width = options.width * 1 || this.width;
        this.height = options.height * 1 || this.height;
        this.maxWidth = options.maxWidth;
        this.maxHeight = options.maxHeight;
        this.minWidth = options.minWidth;
        this.minHeight = options.minHeight;
        if (this.maxWidth) {
          if (/%$/.test(this.maxWidth)) {
            this.maxWidth = (this.width * this.maxWidth.replace("%", "")) / 100;
          } else {
            this.maxWidth *= 1;
          }
        }
        if (this.maxHeight) {
          if (/%$/.test(this.maxHeight)) {
            this.maxHeight =
              (this.height * this.maxHeight.replace("%", "")) / 100;
          } else {
            this.maxHeight *= 1;
          }
        }
        if (this.minWidth) {
          if (/%$/.test(this.minWidth)) {
            this.minWidth = (this.width * this.minWidth.replace("%", "")) / 100;
          } else {
            this.minWidth *= 1;
          }
        }
        if (this.minHeight) {
          if (/%$/.test(this.minHeight)) {
            this.minHeight =
              (this.height * this.minHeight.replace("%", "")) / 100;
          } else {
            this.minHeight *= 1;
          }
        }
        this.alphaFade = 0.4;
        this.gravity = options.gravity * 1 || 0.08;
        this.particleGap = options.particleGap * 1 || 3;
        this.layerCount = options.layerCount || 1;
        this.layerDistance = options.layerDistance || this.particleGap;
        this.initPosition = options.initPosition || "random";
        this.initDirection = options.initDirection || "random";
        this.fadePosition = options.fadePosition || "none";
        this.fadeDirection = options.fadeDirection || "none";
        this.noise = isNaN(options.noise * 1) ? 10 : options.noise * 1;
        this.disableInteraction = options.disableInteraction;
        this.mouseForce = options.mouseForce * 1 || 30;
        this.color = options.color;
        this.colorArr = options.colorArr || this.colorArr;
      }

      _initResponsive(options) {
        this.responsiveWidth = this.wrapperElement && options.responsiveWidth;

        if (this.responsiveWidth) {
          this.on("stopped", () => {
            this.width = this.wrapperElement.clientWidth;
            this.start();
          });
          this.wrapperElement.addEventListener("resize", () => {
            if (this.width !== this.wrapperElement.clientWidth) {
              console.log("X".repeat(50));
              this.stop();
            }
          });

          this.width =
            this.wrapperElement.clientWidth > window.innerWidth
              ? window.innerWidth
              : this.wrapperElement.clientWidth;
          this.height = this.wrapperElement.clientHeight;
        }
      }

      _calculate() {
        this.vertices = [];
        renderCount = 0;
        for (index = 0; index < this.particles.length; index++) {
          origin = this.origins[index];
          particle = this.particles[index];
          dX = origin.x - particle.x + (Math.random() - 0.5) * this.noise;
          dY = origin.y - particle.y + (Math.random() - 0.5) * this.noise;
          dZ =
            origin.z - particle.z + ((Math.random() - 0.5) * this.noise) / 1000;
          distance = Math.sqrt(dX * dX + dY * dY + dZ * dZ);
          force = distance * 0.01;
          particle.vx += force * (dX / distance) * this.speed;
          particle.vy += force * (dY / distance) * this.speed;
          particle.vz += force * (dZ / distance) * this.speed;
          for (touchIndex = 0; touchIndex < this.touches.length; touchIndex++) {
            touch = this.touches[touchIndex];
            dX = particle.x - touch.x;
            dY = particle.y - touch.y;
            dZ = particle.z - touch.z;
            distance = Math.sqrt(dX * dX + dY * dY + dZ * dZ);
            force = (this.mouseForce * touch.force) / distance;
            particle.vx += force * (dX / distance) * this.speed;
            particle.vy += force * (dY / distance) * this.speed;
            particle.vz += force * (dZ / distance) * this.speed;
          }
          particle.vx *= this.gravityFactor;
          particle.vy *= this.gravityFactor;
          particle.vz *= this.gravityFactor;
          particle.x += particle.vx;
          particle.y += particle.vy;
          particle.z += particle.vz;
          if (
            0 > particle.x ||
            particle.x >= this.width ||
            0 > particle.y ||
            particle.y >= this.height
          ) {
            particle.isHidden = true;
            if (this.state === "stopping") {
              particle.isDead = true;
            }
          } else {
            if (this.state === "stopping" && !particle.isDead) {
              renderCount++;
            }
            particle.isHidden = false;
          }
          this.vertices.push(particle.x, particle.y, particle.z);
        }
        if (this.state === "stopping" && renderCount === 0) {
          this.state = "stopped";
        }
      }

      _defaultRenderer() {
        this.depth = Math.max(
          (this.layerDistance * this.layerCount) / 2,
          this.mouseForce
        );
        this.minZ = -this.depth;
        this.maxZ = this.depth;
        imageData = this.context.createImageData(this.width, this.height);

        for (index = 0; index < this.origins.length; index++) {
          origin = this.origins[index];
          particle = this.particles[index];
          if (!particle.isDead && !particle.isHidden) {
            x = ~~particle.x;
            y = ~~particle.y;
            a = origin.color[3];
            if (this.alphaFade > 0 && this.layerCount > 1) {
              z =
                Math.max(Math.min(particle.z, this.maxZ), this.minZ) -
                this.minZ;
              a =
                a * (1 - this.alphaFade) +
                a * this.alphaFade * (z / (this.maxZ - this.minZ));
              a = Math.max(Math.min(~~a, 255), 0);
            }
            startIndex = (x + y * this.width) * 4;
            imageData.data[startIndex + 0] = origin.color[0];
            imageData.data[startIndex + 1] = origin.color[1];
            imageData.data[startIndex + 2] = origin.color[2];
            imageData.data[startIndex + 3] = a;
          }
        }
        this.context.putImageData(imageData, 0, 0);
      }

      _webglRenderer() {
        vertices = new Float32Array(this.vertices);
        this.context.lineWidth(2.6);
        this.context.bufferData(
          this.context.ARRAY_BUFFER,
          vertices,
          this.context.DYNAMIC_DRAW
        );
        this.context.clear(
          this.context.COLOR_BUFFER_BIT | this.context.DEPTH_BUFFER_BIT
        );
        this.context.drawArrays(this.context.POINTS, 0, this.particles.length);
        this.context.flush();
      }

      _initParticles() {
        this.particles = undefined;
        this.particles = [];
        for (index = 0; index < this.origins.length; index++) {
          origin = this.origins[index];
          particle = {};
          this._initParticlePosition(origin, particle);
          this._initParticleDirection(particle);
          this.particles.push(particle);
        }
      }

      _initParticlePosition(origin, particle) {
        particle.z = 0;
        switch (this.initPosition) {
          case "random": {
            particle.x = Math.random() * this.width;
            particle.y = Math.random() * this.height;
            break;
          }
          case "top": {
            particle.x = Math.random() * this.width * 3 - this.width;
            particle.y = -Math.random() * this.height;
            break;
          }
          case "left": {
            particle.x = -Math.random() * this.width;
            particle.y = Math.random() * this.height * 3 - this.height;
            break;
          }
          case "bottom": {
            particle.x = Math.random() * this.width * 3 - this.width;
            particle.y = this.height + Math.random() * this.height;
            break;
          }
          case "right": {
            particle.x = this.width + Math.random() * this.width;
            particle.y = Math.random() * this.height * 3 - this.height;
            break;
          }
          case "misplaced": {
            particle.x =
              origin.x + Math.random() * this.width * 0.3 - this.width * 0.1;
            particle.y =
              origin.y + Math.random() * this.height * 0.3 - this.height * 0.1;
            break;
          }
          default: {
            particle.x = origin.x;
            particle.y = origin.y;
          }
        }
      }

      _fade() {
        if (
          this.fadePosition === "explode" ||
          this.fadePosition === "top" ||
          this.fadePosition === "left" ||
          this.fadePosition === "bottom" ||
          this.fadePosition === "right"
        ) {
          this.state = "stopping";
        } else {
          this.state = "stopped";
        }
        for (index = 0; index < this.origins.length; index++) {
          origin = origins[index];
          this._fadeOriginPosition(this.origins[index]);
          this._fadeOriginDirection(this.particles[index]);
        }
      }

      _fadeOriginPosition(origin) {
        switch (this.fadePosition) {
          case "random": {
            origin.x = Math.random() * this.width * 2 - this.width;
            origin.y = Math.random() * this.height * 2 - this.height;
            if (origin.x > 0) origin.x += this.width;
            if (origin.y > 0) origin.y += this.height;
            break;
          }
          case "top": {
            origin.x = Math.random() * this.width * 3 - this.width;
            origin.y = -Math.random() * this.height;
            break;
          }
          case "left": {
            origin.x = -Math.random() * this.width;
            origin.y = Math.random() * this.height * 3 - this.height;
            break;
          }
          case "bottom": {
            origin.x = Math.random() * this.width * 3 - this.width;
            origin.y = this.height + Math.random() * this.height;
            break;
          }
          case "right": {
            origin.x = this.width + Math.random() * this.width;
            origin.y = Math.random() * this.height * 3 - this.height;
            break;
          }
          default: {
            // Stay in place
          }
        }
      }

      _initParticleDirection(particle) {
        particle.vz = 0;
        switch (this.initDirection) {
          case "random": {
            angle = Math.random() * Math.PI * 2;
            intensity = Math.random();
            particle.vx = this.width * intensity * Math.sin(angle) * 0.1;
            particle.vy = this.height * intensity * Math.cos(angle) * 0.1;
            break;
          }
          case "top": {
            angle = Math.random() * Math.PI - Math.PI / 2;
            intensity = Math.random();
            particle.vx = this.width * intensity * Math.sin(angle) * 0.1;
            particle.vy = this.height * intensity * Math.cos(angle) * 0.1;
            break;
          }
          case "left": {
            angle = Math.random() * Math.PI + Math.PI;
            intensity = Math.random();
            particle.vx = this.width * intensity * Math.sin(angle) * 0.1;
            particle.vy = this.height * intensity * Math.cos(angle) * 0.1;
            break;
          }
          case "bottom": {
            angle = Math.random() * Math.PI + Math.PI / 2;
            intensity = Math.random();
            particle.vx = this.width * intensity * Math.sin(angle) * 0.1;
            particle.vy = this.height * intensity * Math.cos(angle) * 0.1;
            break;
          }
          case "right": {
            angle = Math.random() * Math.PI;
            intensity = Math.random();
            particle.vx = this.width * intensity * Math.sin(angle) * 0.1;
            particle.vy = this.height * intensity * Math.cos(angle) * 0.1;
            break;
          }
          default: {
            particle.vx = 0;
            particle.vy = 0;
          }
        }
      }

      _fadeOriginDirection(particle) {
        switch (this.fadeDirection) {
          case "random": {
            angle = Math.random() * Math.PI * 2;
            intensity = Math.random();
            particle.vx += this.width * intensity * Math.sin(angle) * 0.1;
            particle.vy += this.height * intensity * Math.cos(angle) * 0.1;
            break;
          }
          case "top": {
            angle = Math.random() * Math.PI - Math.PI / 2;
            intensity = Math.random();
            particle.vx += this.width * intensity * Math.sin(angle) * 0.1;
            particle.vy += this.height * intensity * Math.cos(angle) * 0.1;
            break;
          }
          case "left": {
            angle = Math.random() * Math.PI + Math.PI;
            intensity = Math.random();
            particle.vx += this.width * intensity * Math.sin(angle) * 0.1;
            particle.vy += this.height * intensity * Math.cos(angle) * 0.1;
            break;
          }
          case "bottom": {
            angle = Math.random() * Math.PI + Math.PI / 2;
            intensity = Math.random();
            particle.vx += this.width * intensity * Math.sin(angle) * 0.1;
            particle.vy += this.height * intensity * Math.cos(angle) * 0.1;
            break;
          }
          case "right": {
            angle = Math.random() * Math.PI;
            intensity = Math.random();
            particle.vx += this.width * intensity * Math.sin(angle) * 0.1;
            particle.vy += this.height * intensity * Math.cos(angle) * 0.1;
            break;
          }
          default: {
            particle.vx = 0;
            particle.vy = 0;
          }
        }
      }

      _initOrigins() {
        canvas = document.createElement("canvas");
        if (this.responsiveWidth) {
          this.width = this.wrapperElement.clientWidth;
        }
        this.ratio =
          Math.min(this.width, this.maxWidth || Number.POSITIVE_INFINITY) /
          Math.min(this.height, this.maxHeight || Number.POSITIVE_INFINITY);
        if (this.ratio < this.imageRatio) {
          this.renderWidth = ~~Math.min(
            this.width || Number.POSITIVE_INFINITY,
            this.minWidth || this.imageWidth || Number.POSITIVE_INFINITY,
            this.maxWidth || Number.POSITIVE_INFINITY
          );
          this.renderHeight = ~~(this.renderWidth / this.imageRatio);
        } else {
          this.renderHeight = ~~Math.min(
            this.height || Number.POSITIVE_INFINITY,
            this.minHeight || this.imageHeight || Number.POSITIVE_INFINITY,
            this.maxHeight || Number.POSITIVE_INFINITY
          );
          this.renderWidth = ~~(this.renderHeight * this.imageRatio);
        }
        this.offsetX = ~~((this.width - this.renderWidth) / 2);
        this.offsetY = ~~((this.height - this.renderHeight) / 2);
        canvas.width = this.renderWidth;
        canvas.height = this.renderHeight;
        context = canvas.getContext("2d");
        context.drawImage(
          this.image,
          0,
          0,
          this.renderWidth,
          this.renderHeight
        );
        data = context.getImageData(
          0,
          0,
          this.renderWidth,
          this.renderHeight
        ).data;
        this.origins = undefined;
        this.origins = [];
        for (x = 0; x < this.renderWidth; x += this.particleGap) {
          for (y = 0; y < this.renderHeight; y += this.particleGap) {
            index = (x + y * this.renderWidth) * 4;
            a = data[index + 3];
            if (a > 0) {
              if (this.colorArr) {
                for (
                  layerIndex = 0;
                  layerIndex < this.layerCount;
                  layerIndex++
                ) {
                  this.origins.push({
                    x: this.offsetX + x,
                    y: this.offsetY + y,
                    z:
                      layerIndex * this.layerDistance -
                      (this.layerCount * this.layerDistance) / 2,
                    color: this.colorArr,
                  });
                }
              } else {
                r = data[index];
                g = data[index + 1];
                b = data[index + 2];
                for (
                  layerIndex = 0;
                  layerIndex < this.layerCount;
                  layerIndex++
                ) {
                  this.origins.push({
                    x: this.offsetX + x,
                    y: this.offsetY + y,
                    z:
                      layerIndex * this.layerDistance -
                      (this.layerCount * this.layerDistance) / 2,
                    color: [r, g, b, a],
                  });
                }
              }
            }
          }
        }
        this.speed = Math.log(this.origins.length) / 10;
        this.gravityFactor = 1 - this.gravity * this.speed;
      }

      _parseColor(strParam) {
        let color;
        if (typeof strParam !== "string") {
          return undefined;
        }
        const str = strParam.replace(" ", "");

        if (
          (color = /^#([\da-fA-F]{2})([\da-fA-F]{2})([\da-fA-F]{2})/.exec(str))
        ) {
          color = [
            parseInt(color[1], 16),
            parseInt(color[2], 16),
            parseInt(color[3], 16),
          ];
        } else if (
          (color = /^#([\da-fA-F])([\da-fA-F])([\da-fA-F])/.exec(str))
        ) {
          color = [
            parseInt(color[1], 16) * 17,
            parseInt(color[2], 16) * 17,
            parseInt(color[3], 16) * 17,
          ];
        } else if (
          (color = /^rgba\(([\d]+),([\d]+),([\d]+),([\d]+|[\d]*.[\d]+)\)/.exec(
            str
          ))
        ) {
          color = [+color[1], +color[2], +color[3], +color[4]];
        } else if ((color = /^rgb\(([\d]+),([\d]+),([\d]+)\)/.exec(str))) {
          color = [+color[1], +color[2], +color[3]];
        } else return undefined;

        return color;
      }
    };

    exports.NextParticle = NextParticle;
    nextParticles = document.getElementsByClassName("next-particle");
    for (
      let nextParticleIndex = 0;
      nextParticleIndex < nextParticles.length;
      nextParticleIndex++
    ) {
      const elem = nextParticles[nextParticleIndex];
      elem.nextParticle = new NextParticle({
        image: elem,
        responsiveWidth: true,
        width: 600,
        height: 600,
        initPosition: "random",
        initDirection: "none",
        particleGap: 2,
      });
    }
    resize();
  })(window);
}

function resize() {
  for (let elem of nextParticles) {
    const nextParticle = elem.nextParticle;
    const parenWidth = nextParticle.wrapperElement.clientWidth,
      parentHeight = nextParticle.wrapperElement.clientHeight;
    nextParticle.width =
      parenWidth > window.innerWidth ? window.innerWidth : parenWidth;
    nextParticle.height = parentHeight;
    nextParticle.minWidth =
      parenWidth > window.innerWidth ? window.innerWidth : parenWidth;
    nextParticle.minHeight = parentHeight;
    nextParticle.start();
  }
}

const showSuccessAlert = (title) => {
  swal({
    title,
    icon: "success",
  });
};

const showErrorAlert = (title, text) => {
  swal({
    title,
    text,
    icon: "error",
  });
};

/* Start Subscription Form Submition */
const baseUrl = `https://site-server.creativesad.com`;
const sendMailLink = `${baseUrl}/mails/sendMail`;
function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

const subscriptionForm = document.getElementById("subscribtion-form");
const nameInput = document.getElementById("InputFloatingName");
const emailInput = document.getElementById("InputFloatingEmail");


const resetSubscriptionForm = () => {
  subscriptionForm.reset();
  document
    .querySelectorAll("#subscribtion-form .invalid-feedback")
    .forEach((el) => {
      el.style.display = "none";
    });
  subscriptionForm.classList.remove("was-validated");
};

subscriptionForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  const name = nameInput.value;
  const email = emailInput.value;
  if (name && email && isValidEmail(email) ) {
    try {
      const result = await fetch(sendMailLink, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          subject: "Subscription",
          mailBody: { name, email },
        }),
      });
      if (result.status === 200) {
        resetSubscriptionForm();
        showSuccessAlert("Send Successfully");
      } else {
        showErrorAlert("Failed To Send", "Check Your Network");
      }
    } catch (error) {
      showErrorAlert("Failed To Send", "Check Your Network");
    }
  }
});
/* End Subscription Form Submition */
/* Start Help Form Submition */
const helpForm = document.getElementById("help-form");
const helpNameInput = document.getElementById("InputModalName");
const helpEmailInput = document.getElementById("InputModalEmail");
const helpMessageInput = document.getElementById("InputModalMessage");
const resethelpForm = () => {
  helpForm.reset();
  document.querySelectorAll("#help-form .invalid-feedback").forEach((el) => {
    el.style.display = "none";
  });
  helpForm.classList.remove("was-validated");
};

helpForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  const name = helpNameInput.value;
  const email = helpEmailInput.value;
  const message = helpMessageInput.value;

  if (name && email && isValidEmail(email) && message) {
    try {
      const result = await fetch(sendMailLink, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          subject: "Help",
          mailBody: { name, email, message },
        }),
      });
      if (result.status === 200) {
        resethelpForm();
        $("#modal").modal("hide");
        showSuccessAlert("Send Successfully");
      } else {
        showErrorAlert("Failed To Send", "Check Your Network");
      }
    } catch (error) {
      showErrorAlert("Failed To Send", "Check Your Network");
    }
  }
});

/* End Help Form Submition */
