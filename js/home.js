$(document).ready(function () {
    $(".menu-icon").on("click", function () {
        $(".menulist").toggleClass("showing");
    });
});

//Scrolling Effect
//$(window).on('scroll', function () {
//    if ($(window).scrollTop()) {
//        $('nav').addClass('black');
//    } else {
//        $('nav').removeClass('black')
//    }
//});


function checkPswd() {
    var confirmPassword = "admin";
    var password = document.getElementById("pswd").value;
    if (password == confirmPassword) {
        document.getElementsByClassName('pw-box')[0].style.display = 'none';
        document.getElementsByClassName('form-box')[0].style.display = 'block';
    } else {
        alert("Sorry, your RSVP code is incorrect.");
    }
}

function formValidation(oEvent) {
    oEvent = oEvent || window.event;
    var txtField = oEvent.target || oEvent.srcElement;

    var t1ck = true;
    var msg = " ";
    if (document.getElementById("textinput1").value.length < 1) {
        t1ck = false;
    }
    if (!document.getElementById("radioinput1").checked && !document.getElementById("radioinput2").checked) {
        t1ck = false;
    }
    if (document.getElementById("textinput2").value.length < 1) {
        t1ck = false;
    }
    if (document.getElementById("textinput3").value.length < 11) {
        t1ck = false;
    }

    if (t1ck) {
        document.getElementById("rsvpok").disabled = false;
    } else {
        document.getElementById("rsvpok").disabled = true;
    }
}

window.onload = function () {

    var rsvpok = document.getElementById("rsvpok");

    var t1 = document.getElementById("textinput1");
    var r1 = document.getElementById("radioinput1");
    var r2 = document.getElementById("radioinput2");
    var t2 = document.getElementById("textinput2");
    var t3 = document.getElementById("textinput3");

    var t1ck = false;
    document.getElementById("rsvpok").disabled = true;
    t1.onkeyup = formValidation;
    r1.onclick = formValidation;
    r2.onclick = formValidation;
    t2.onkeyup = formValidation;
    t3.onkeyup = formValidation;
}


/*For lazyloading images*/
document.addEventListener("DOMContentLoaded", function () {
    var lazyloadImages;

    if ("IntersectionObserver" in window) {
        lazyloadImages = document.querySelectorAll(".lazy");
        var imageObserver = new IntersectionObserver(function (entries, observer) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    var image = entry.target;
                    image.src = image.dataset.src;
                    image.classList.remove("lazy");
                    imageObserver.unobserve(image);
                }
            });
        });

        lazyloadImages.forEach(function (image) {
            imageObserver.observe(image);
        });
    } else {
        var lazyloadThrottleTimeout;
        lazyloadImages = document.querySelectorAll(".lazy");

        function lazyload() {
            if (lazyloadThrottleTimeout) {
                clearTimeout(lazyloadThrottleTimeout);
            }

            lazyloadThrottleTimeout = setTimeout(function () {
                var scrollTop = window.pageYOffset;
                lazyloadImages.forEach(function (img) {
                    if (img.offsetTop < (window.innerHeight + scrollTop)) {
                        img.src = img.dataset.src;
                        img.classList.remove('lazy');
                    }
                });
                if (lazyloadImages.length == 0) {
                    document.removeEventListener("scroll", lazyload);
                    window.removeEventListener("resize", lazyload);
                    window.removeEventListener("orientationChange", lazyload);
                }
            }, 20);
        }

        document.addEventListener("scroll", lazyload);
        window.addEventListener("resize", lazyload);
        window.addEventListener("orientationChange", lazyload);
    }
})
