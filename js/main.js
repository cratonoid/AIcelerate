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
  const input = document.querySelector("#whatsappNumber");
  const iti = window.intlTelInput(input, {
    initialCountry: "ae",
    separateDialCode: true, // shows dial code separately
    utilsScript: "https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.8/js/utils.js"
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
    
    let email = $("#email").val().trim();
    let businessName = $("#businessName").val();
    let connectTime = $("#connectTime").val();
    let annualRevenue = $("#annualRevenue").val();
    let url = sessionStorage.getItem("url");

  // Example: get country code and full number on form submit
  function getPhoneDetails() {
    const dialCode = iti.getSelectedCountryData().dialCode;
    const countryCode = "+" + dialCode;
    const fullNumber = iti.getNumber(); // includes country code
    const nationalNumber = iti.getNumber(intlTelInputUtils.numberFormat.NATIONAL); // without country code
    return fullNumber
  } 
  let whatsappNumber = getPhoneDetails();

    // Validation Regex
    let nameRegex = /^[a-zA-Z\s]+$/;
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
    if (whatsappNumber === "") {
      swal(
        "Invalid Number",
        "",
        "error"
      );
      return;
    }
    if (email === "" || !emailRegex.test(email)) {
      swal("Invalid Email", "Please enter a valid email address.", "error");
      return;
    }
    if (businessName === "") {
      swal(
        "Invalid Business Name",
        "Please enter a valid Business Name.",
        "error"
      );
      return;
    }
    if (annualRevenue === "") {
      swal(
        "Invalid Annual Revenue",
        "Please enter a valid Annual Revenue.",
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

    let formData = {
      "Full Name": fullName,
      "WhatsApp Number": whatsappNumber,
      "Email ID": email,
      "Business Name": businessName,
      "Annual Revenue": annualRevenue,
      "Convenient Time to Connect": connectTime,
      Url: url,
      "Lp name": "AIcelerate",
    };

    console.log(formData);
      $("#detailsModal").css("display", "none");
      $(".modal-backdrop").remove();
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
