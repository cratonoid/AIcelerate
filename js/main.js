(function ($) {
  "use strict";

  // Spinner
  var spinner = function () {
    setTimeout(function () {
      if ($("#spinner").length > 0) {
        $("#spinner").removeClass("show");
      }
    }, 1);
  };
  spinner();

  // Initiate the wowjs
  new WOW().init();

  // Sticky Navbar
  $(window).scroll(function () {
    if ($(this).scrollTop() > 300) {
      $(".sticky-top").css("top", "0px");
    } else {
      $(".sticky-top").css("top", "-100px");
    }
  });

  // Dropdown on mouse hover
  const $dropdown = $(".dropdown");
  const $dropdownToggle = $(".dropdown-toggle");
  const $dropdownMenu = $(".dropdown-menu");
  const showClass = "show";

  $(window).on("load resize", function () {
    if (this.matchMedia("(min-width: 992px)").matches) {
      $dropdown.hover(
        function () {
          const $this = $(this);
          $this.addClass(showClass);
          $this.find($dropdownToggle).attr("aria-expanded", "true");
          $this.find($dropdownMenu).addClass(showClass);
        },
        function () {
          const $this = $(this);
          $this.removeClass(showClass);
          $this.find($dropdownToggle).attr("aria-expanded", "false");
          $this.find($dropdownMenu).removeClass(showClass);
        }
      );
    } else {
      $dropdown.off("mouseenter mouseleave");
    }
  });

  // Back to top button
  $(window).scroll(function () {
    if ($(this).scrollTop() > 200) {
      $(".back-to-top").fadeIn("fast");
    } else {
      $(".back-to-top").fadeOut("fast");
    }
  });
  $(".back-to-top").click(function () {
    $("html, body").animate({ scrollTop: 0 }, 10, "easeInOutExpo");
    return false;
  });

  // Header carousel
  $(".header-carousel").owlCarousel({
    autoplay: true,
    smartSpeed: 1500,
    items: 1,
    dots: false,
    loop: true,
    nav: true,
    navText: [
      '<i class="bi bi-chevron-left"></i>',
      '<i class="bi bi-chevron-right"></i>',
    ],
  });

  // Testimonials carousel
  $(".testimonial-carousel").owlCarousel({
    autoplay: true,
    smartSpeed: 1000,
    center: true,
    margin: 24,
    dots: true,
    loop: true,
    nav: false,
    responsive: {
      0: {
        items: 1,
      },
      768: {
        items: 2,
      },
      992: {
        items: 3,
      },
    },
  });
  const scriptURL =
    "https://script.google.com/macros/s/AKfycbxseSQbXdO_udaUOI6IUPs7-4Rgaektj5naVPPczbvzGttgGuf7EQh9O5bkzYFtOBF9/exec";

  $("#submitForm").click(function (event) {
    event.preventDefault();

    // Get input values
    let fullName = $("#fullName").val().trim();
    let whatsappNumber = $("#whatsappNumber").val().trim();
    let email = $("#email").val().trim();
    let city = $("#city").val().trim();
    let connectTime = $("#connectTime").val();
    let url = sessionStorage.getItem("url");

    // Validation Regex
    let nameRegex = /^[a-zA-Z\s]+$/;
    let phoneRegex = /^[6-9]\d{9}$/;
    let emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    // Validation Checks
    if (fullName === "" || !nameRegex.test(fullName)) {
      swal(
        "Invalid Name",
        "Please enter a valid full name (letters only).",
        "error"
      );
      return;
    }
    if (whatsappNumber === "" || !phoneRegex.test(whatsappNumber)) {
      swal(
        "Invalid Number",
        "Please enter a valid 10-digit WhatsApp number.",
        "error"
      );
      return;
    }
    if (email === "" || !emailRegex.test(email)) {
      swal("Invalid Email", "Please enter a valid email address.", "error");
      return;
    }
    if (city === "" || !nameRegex.test(city)) {
      swal(
        "Invalid City",
        "Please enter a valid city name (letters only).",
        "error"
      );
      return;
    }
    if (connectTime === "") {
      swal(
        "Invalid Time",
        "Please select a convenient time to connect.",
        "error"
      );
      return;
    }

    // Hide Modal on successful validation
    $("#detailsModal").modal("hide");

    let formData = {
      "Full Name": fullName,
      "WhatsApp Number": whatsappNumber,
      "Email ID": email,
      "City of Residence": city,
      "Convenient Time to Connect": connectTime,
      Url: url,
      "Lp name": "Singhania_Law_1",
    };

    $.ajax({
      url: scriptURL,
      type: "POST",
      data: formData,
      contentType: "application/x-www-form-urlencoded",
      success: function (response) {
        console.log("Form submitted successfully", response);
      },
      error: function (xhr, status, error) {
        console.error("AJAX Error:", error);
      },
    });
  });

  $("#submitApplication").click(function (event) {
    event.preventDefault();

    // Get input values
    let fullName = $("#name").val().trim();
    let whatsappNumber = $("#whatsapp").val().trim();
    let email = $("#mainFormEmail").val().trim();
    let city = $("#mainFormCity").val().trim();
    let connectTime = $("#mainFormTime").val();
    let url = sessionStorage.getItem("url");

    // Validation Regex
    let nameRegex = /^[a-zA-Z\s]+$/;
    let phoneRegex = /^[6-9]\d{9}$/;
    let emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    // Validation Checks
    if (fullName === "" || !nameRegex.test(fullName)) {
      swal(
        "Invalid Name",
        "Please enter a valid full name (letters only).",
        "error"
      );
      return;
    }
    if (whatsappNumber === "" || !phoneRegex.test(whatsappNumber)) {
      swal(
        "Invalid Number",
        "Please enter a valid 10-digit WhatsApp number.",
        "error"
      );
      return;
    }
    if (email === "" || !emailRegex.test(email)) {
      swal("Invalid Email", "Please enter a valid email address.", "error");
      return;
    }
    if (city === "" || !nameRegex.test(city)) {
      swal(
        "Invalid City",
        "Please enter a valid city name (letters only).",
        "error"
      );
      return;
    }
    if (connectTime === "") {
      swal(
        "Invalid Time",
        "Please select a convenient time to connect.",
        "error"
      );
      return;
    }

    // Hide Modal on successful validation
    $("#detailsModal").modal("hide");

    let formData = {
      "Full Name": fullName,
      "WhatsApp Number": whatsappNumber,
      "Email ID": email,
      "City of Residence": city,
      "Convenient Time to Connect": connectTime,
      Url: url,
      "Lp name": "Singhania_Law_1",
    };

    $.ajax({
      url: scriptURL,
      type: "POST",
      data: formData,
      contentType: "application/x-www-form-urlencoded",
      success: function (response) {
        console.log("Form submitted successfully", response);
      },
      error: function (xhr, status, error) {
        console.error("AJAX Error:", error);
      },
    });
  });

  $("#SecondFormSubmitApplication").click(function (event) {
    event.preventDefault();

    // Get input values
    let fullName = $("#secondFormName").val().trim();
    let whatsappNumber = $("#secondFormWhatsapp").val().trim();
    let email = $("#secondFormEmail").val().trim();
    let city = $("#secondFormCity").val().trim();
    let connectTime = $("#secondFormTime").val();
    let url = sessionStorage.getItem("url");

    // Validation Regex
    let nameRegex = /^[a-zA-Z\s]+$/;
    let phoneRegex = /^[6-9]\d{9}$/;
    let emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    // Validation Checks
    if (fullName === "" || !nameRegex.test(fullName)) {
      swal(
        "Invalid Name",
        "Please enter a valid full name (letters only).",
        "error"
      );
      return;
    }
    if (whatsappNumber === "" || !phoneRegex.test(whatsappNumber)) {
      swal(
        "Invalid Number",
        "Please enter a valid 10-digit WhatsApp number.",
        "error"
      );
      return;
    }
    if (email === "" || !emailRegex.test(email)) {
      swal("Invalid Email", "Please enter a valid email address.", "error");
      return;
    }
    if (city === "" || !nameRegex.test(city)) {
      swal(
        "Invalid City",
        "Please enter a valid city name (letters only).",
        "error"
      );
      return;
    }
    if (connectTime === "") {
      swal(
        "Invalid Time",
        "Please select a convenient time to connect.",
        "error"
      );
      return;
    }

    // Hide Modal on successful validation
    $("#detailsModal").modal("hide");

    let formData = {
      "Full Name": fullName,
      "WhatsApp Number": whatsappNumber,
      "Email ID": email,
      "City of Residence": city,
      "Convenient Time to Connect": connectTime,
      Url: url,
      "Lp name": "Singhania_Law_1",
    };

    $.ajax({
      url: scriptURL,
      type: "POST",
      data: formData,
      contentType: "application/x-www-form-urlencoded",
      success: function (response) {
        console.log("Form submitted successfully", response);
      },
      error: function (xhr, status, error) {
        console.error("AJAX Error:", error);
      },
    });
  });
})(jQuery);
