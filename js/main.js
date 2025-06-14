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
    utilsScript:
      "https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.8/js/utils.js",
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
    "https://script.google.com/macros/s/AKfycbxtcHXgyBclKfNMpN5Eep7e_HtgT5LFjpXipleaxFshc0lt9uGFCuU7B9KU9ngwp_T5oQ/exec";

  $("#submitForm").click(function (event) {
    event.preventDefault();

    // Get input values
    let fullName = $("#fullName").val().trim();

    let email = $("#email").val().trim();
    let businessName = $("#businessName").val();
    let connectTime = $("#connectTime").val();
    let annualRevenue = $("#annualRevenue").val();
    let url = sessionStorage.getItem("url");
    const now = new Date();
    const formatted =
      now.getFullYear() +
      "-" +
      String(now.getMonth() + 1).padStart(2, "0") +
      "-" +
      String(now.getDate()).padStart(2, "0") +
      " " +
      String(now.getHours()).padStart(2, "0") +
      ":" +
      String(now.getMinutes()).padStart(2, "0") +
      ":" +
      String(now.getSeconds()).padStart(2, "0");

    // Example: get country code and full number on form submit

    function getPhoneDetails() {
      const dialCode = iti.getSelectedCountryData().dialCode;
      const countryCode = "+" + dialCode;
      const fullNumber = iti.getNumber(); // includes country code
      const nationalNumber = iti.getNumber(
        intlTelInputUtils.numberFormat.NATIONAL
      ); // without country code
      return fullNumber;
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
      swal("Invalid Number", "", "error");
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
      "Date and Time": formatted,
      "Full Name": fullName,
      "WhatsApp Number": whatsappNumber,
      "Email ID": email,
      "Business Name": businessName,
      "Annual Revenue": annualRevenue,
      "Convenient Time to Connect": connectTime,
      Url: url,
      "Lp name": "AIcelerate",
    };

    $("#detailsModal").css("display", "none");
    $(".modal-backdrop").remove();
    // $.ajax({
    //   url: scriptURL,
    //   type: "POST",
    //   data: formData,
    //   contentType: "application/x-www-form-urlencoded",
    //   success: function (response) {
    //     console.log("Form submitted successfully", response);
    //   },
    //   error: function (xhr, status, error) {
    //     console.error("AJAX Error:", error);
    //   },
    // });
    // Submit to your existing backend (Google Sheet or other script)
    console.log(formData);
    $.ajax({
      url: scriptURL,
      type: "POST",
      data: formData,
      contentType: "application/x-www-form-urlencoded",
      success: function (response) {
        console.log("Form submitted successfully to Google Sheet", response);

        // Now ALSO send to HubSpot
        const portalId = "146250154";
        const formId = "1232c850-be75-48a6-ae66-88eb6b75483c";

        const hsData = {
          fields: [
            { name: "firstname", value: fullName },
            { name: "email", value: email },
            { name: "phone", value: whatsappNumber },
            { name: "company", value: businessName },
            { name: "annualrevenue", value: annualRevenue },
            { name: "connect_time__c", value: connectTime },
            { name: "landing_page_url", value: url || window.location.href },
            { name: "lp_name", value: "AIcelerate" },
            { name: "submission_time", value: formatted },
          ],
          context: {
            hutk: getCookie("hubspotutk"),
            pageUri: window.location.href,
            pageName: document.title,
          },
        };

        $.ajax({
          url: `https://api.hsforms.com/submissions/v3/integration/submit/${portalId}/${formId}`,
          type: "POST",
          contentType: "application/json",
          data: JSON.stringify(hsData),
          success: function (hsResponse) {
            console.log("Also submitted to HubSpot", hsResponse);
          },
          error: function (xhr, status, error) {
            console.error("HubSpot Submission Error:", error);
          },
        });
      },
      error: function (xhr, status, error) {
        console.error("Google Sheets AJAX Error:", error);
      },
    });
    window.location.href = "thankyou.html";
  });
})(jQuery);
