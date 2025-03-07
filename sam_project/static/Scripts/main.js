

$(document).ready(function () {
    $("#carouselExampleIndicators").carousel(), $("#sidebarCollapse").on("click", function () {
        $("#sidebar").addClass("active"), $(".overlay").fadeIn(), $(".collapse.in").toggleClass("in"), $("a[aria-expanded=true]").attr("aria-expanded", "false")
    }); $("#dismiss, .overlay").on("click", function () {
        $("#sidebar").removeClass("active"), $(".overlay").fadeOut()
    })
}); $(document).on("click", '[data-toggle="lightbox"]', function (e) {
    e.preventDefault(), $(this).ekkoLightbox()
}); $(document).ready(function () {
    $("#franchise").owlCarousel({
        autoPlay: 3e3,
        items: 1,
        autoPlay: !1,
        responsiveRefreshRate: 200,
        slideBy: 3,
        itemsDesktop: [1199, 3],
        itemsDesktopSmall: [979, 1],
        itemsDesktop: [1499, 1],
        itemsDesktopSmall: [1199, 1],
        itemsTablet: [899, 1],
        itemsMobile: [599, 1],
        navigation: !0,
        loop: !0,
        navRewind: !1
    }); $("#franchise1").owlCarousel({
        autoPlay: 3e3,
        items: 1,
        autoPlay: !1,
        responsiveRefreshRate: 200,
        slideBy: 3,
        itemsDesktop: [1199, 3],
        itemsDesktopSmall: [979, 1],
        itemsDesktop: [1499, 1],
        itemsDesktopSmall: [1199, 1],
        itemsTablet: [899, 1],
        itemsMobile: [599, 1],
        navigation: !0,
        loop: !0,
        navRewind: !1
    }); $("#testn").owlCarousel({
        autoPlay: 3e3,
        items: 1,
        autoPlay: !1,
        responsiveRefreshRate: 200,
        slideBy: 1,
        itemsDesktop: [1199, 1],
        itemsDesktopSmall: [979, 1],
        itemsDesktop: [1499, 1],
        itemsDesktopSmall: [1199, 1],
        itemsTablet: [899, 2],
        itemsMobile: [599, 1],
        navigation: !0,
        loop: !0,
        navRewind: !1
    }); $("#bestOffer").owlCarousel({
        autoPlay: 3e3,
        items: 5,
        autoPlay: !1,
        responsiveRefreshRate: 200,
        itemsDesktop: [1199, 5],
        itemsDesktopSmall: [979, 3],
        itemsDesktop: [1499, 5],
        itemsDesktopSmall: [1199, 4],
        itemsTablet: [899, 2],
        itemsMobile: [599, 2],
        navigation: !0,
        loop: !0,
        navRewind: !1
    }); $("#BigSale").owlCarousel({
        autoPlay: 3e3,
        items: 5,
        autoPlay: !1,
        responsiveRefreshRate: 200,
        itemsDesktop: [1199, 5],
        itemsDesktopSmall: [979, 3],
        itemsDesktop: [1499, 5],
        itemsDesktopSmall: [1199, 4],
        itemsTablet: [899, 2],
        itemsMobile: [599, 2],
        navigation: !0,
        loop: !0,
        navRewind: !1
    }); $("#recentview").owlCarousel({
        autoPlay: 3e3,
        items: 4,
        autoPlay: !1,
        responsiveRefreshRate: 200,
        itemsDesktop: [1199, 3],
        itemsDesktopSmall: [979, 3],
        itemsDesktop: [1499, 4],
        itemsDesktopSmall: [1199, 3],
        itemsTablet: [899, 2],
        itemsMobile: [599, 1],
        navigation: !0,
        loop: !0,
        navRewind: !1
    }); $("#shop").owlCarousel({
        autoPlay: 3e3,
        items: 3,
        autoPlay: !1,
        responsiveRefreshRate: 200,
        itemsDesktop: [1199, 3],
        itemsDesktopSmall: [979, 3],
        itemsDesktop: [1499, 3],
        itemsDesktopSmall: [1199, 3],
        itemsTablet: [899, 2],
        itemsMobile: [599, 2],
        navigation: !0,
        loop: !0,
        navRewind: !1
    }); $('[id ^= "shop1_"]').owlCarousel({
        autoPlay: 3e3,
        items: 3,
        autoPlay: !1,
        responsiveRefreshRate: 200,
        itemsDesktop: [1199, 3],
        itemsDesktopSmall: [979, 3],
        itemsDesktop: [1499, 3],
        itemsDesktopSmall: [1199, 3],
        itemsTablet: [899, 2],
        itemsMobile: [599, 2],
        navigation: !0,
        loop: !0,
        navRewind: !1
    }); $("#shop3").owlCarousel({
        autoPlay: 3e3,
        items: 5,
        autoPlay: !1,
        responsiveRefreshRate: 200,
        itemsDesktop: [1199, 5],
        itemsDesktopSmall: [979, 3],
        itemsDesktop: [1499, 5],
        itemsDesktopSmall: [1199, 3],
        itemsTablet: [899, 2],
        itemsMobile: [599, 2],
        navigation: !0,
        loop: !0,
        navRewind: !1
    }); $("#shop5").owlCarousel({
        autoPlay: 3e3,
        items: 6,
        autoPlay: !1,
        responsiveRefreshRate: 200,
        itemsDesktop: [1199, 6],
        itemsDesktopSmall: [979, 3],
        itemsDesktop: [1499, 5],
        itemsDesktopSmall: [1199, 3],
        itemsTablet: [899, 2],
        itemsMobile: [599, 2],
        navigation: !0,
        loop: !0,
        navRewind: !1
    }); $('[id ^= "shop6_"]').owlCarousel({
        autoPlay: 3e3,
        items: 5,
        autoPlay: !1,
        responsiveRefreshRate: 200,
        itemsDesktop: [1199, 5],
        itemsDesktopSmall: [979, 3],
        itemsDesktop: [1499, 5],
        itemsDesktopSmall: [1199, 4],
        itemsTablet: [899, 2],
        itemsMobile: [599, 2],
        navigation: !0,
        loop: !0,
        navRewind: !1
    }); $("#brandedsupplier").owlCarousel({
        autoPlay: 3e3,
        items: 9,
        autoPlay: !1,
        responsiveRefreshRate: 200,
        itemsDesktopSmall: [1199, 6],
        itemsTablet: [899, 4],
        itemsMobile: [599, 2],
        navigation: !0,
        loop: !0,
        navRewind: !1
    }); $("#testimonial").owlCarousel({
        autoPlay: 3e3,
        items: 5,
        autoPlay: !1,
        pagination: !0,
        slideBy: 3,
        responsiveRefreshRate: 200,
        itemsDesktopSmall: [1199, 3],
        itemsTablet: [899, 2],
        itemsMobile: [599, 1],
        navigation: !1,
        loop: !0,
        navRewind: !1
    }); $("#allfeatures1").owlCarousel({
        autoPlay: 3e3,
        items: 1,
        autoPlay: !1,
        responsiveRefreshRate: 200,
        slideBy: 1,
        itemsDesktop: [1199, 1],
        itemsDesktopSmall: [979, 1],
        itemsDesktop: [1499, 1],
        itemsDesktopSmall: [1199, 1],
        itemsTablet: [899, 1],
        itemsMobile: [599, 1],
        navigation: !0,
        loop: !0,
        navRewind: !1
    }); $("#shop7").owlCarousel({
        autoPlay: 3e3,
        items: 7,
        autoPlay: !1,
        responsiveRefreshRate: 200,
        itemsDesktop: [1199, 7],
        itemsDesktopSmall: [979, 3],
        itemsDesktop: [1499, 7],
        itemsDesktopSmall: [1199, 7],
        itemsTablet: [899, 3],
        itemsMobile: [599, 2],
        navigation: !0,
        loop: !0,
        navRewind: !1
    }); $("#shop8").owlCarousel({
        autoPlay: 3e3,
        items: 3,
        autoPlay: !1,
        responsiveRefreshRate: 200,
        itemsDesktop: [1199, 3],
        itemsDesktopSmall: [979, 3],
        itemsDesktop: [1499, 3],
        itemsDesktopSmall: [1199, 3],
        itemsTablet: [899, 2],
        itemsMobile: [599, 2],
        navigation: !0,
        loop: !0,
        navRewind: !1
    }); $("#shop12").owlCarousel({
        autoPlay: 3e3,
        items: 5,
        autoPlay: !1,
        responsiveRefreshRate: 200,
        itemsDesktop: [1199, 5],
        itemsDesktopSmall: [979, 3],
        itemsDesktop: [1499, 5],
        itemsDesktopSmall: [1199, 3],
        itemsTablet: [899, 2],
        itemsMobile: [599, 2],
        navigation: !0,
        loop: !0,
        navRewind: !1
    }); $("#shop13").owlCarousel({
        autoPlay: 3e3,
        items: 6,
        autoPlay: !1,
        responsiveRefreshRate: 200,
        itemsDesktop: [1199, 5],
        itemsDesktopSmall: [979, 3],
        itemsDesktop: [1499, 5],
        itemsDesktopSmall: [1199, 3],
        itemsTablet: [899, 2],
        itemsMobile: [599, 2],
        navigation: !0,
        loop: !0,
        navRewind: !1
    }); $("#shop14").owlCarousel({
        autoPlay: 3e3,
        items: 6,
        autoPlay: !1,
        responsiveRefreshRate: 200,
        itemsDesktop: [1199, 5],
        itemsDesktopSmall: [979, 3],
        itemsDesktop: [1499, 5],
        itemsDesktopSmall: [1199, 3],
        itemsTablet: [899, 2],
        itemsMobile: [599, 2],
        navigation: !0,
        loop: !0,
        navRewind: !1
    }), $("#shop15").owlCarousel({
        autoPlay: 3e3,
        items: 6,
        autoPlay: !1,
        responsiveRefreshRate: 200,
        itemsDesktop: [1199, 5],
        itemsDesktopSmall: [979, 3],
        itemsDesktop: [1499, 5],
        itemsDesktopSmall: [1199, 4],
        itemsTablet: [899, 2],
        itemsMobile: [599, 2],
        navigation: !0,
        loop: !0,
        navRewind: !1
    }); $("#shop16").owlCarousel({
        autoPlay: 3e3,
        items: 4,
        autoPlay: !1,
        responsiveRefreshRate: 200,
        itemsDesktop: [1199, 4],
        itemsDesktopSmall: [979, 4],
        itemsDesktop: [1499, 4],
        itemsDesktopSmall: [1199, 4],
        itemsTablet: [899, 2],
        itemsMobile: [599, 1],
        navigation: !0,
        loop: !0,
        navRewind: !1
    }); $("#similarproducts").owlCarousel({
        autoPlay: 3e3,
        items: 6,
        autoPlay: !1,
        responsiveRefreshRate: 200,
        itemsDesktop: [1199, 6],
        itemsDesktopSmall: [979, 3],
        itemsDesktop: [1499, 5],
        itemsDesktopSmall: [1199, 3],
        itemsTablet: [899, 2],
        itemsMobile: [599, 2],
        navigation: !0,
        loop: !0,
        navRewind: !1
    });


    $("#similarproducts").owlCarousel({
        autoPlay: 3000,
        items: 6,
        autoPlay: false,
        responsiveRefreshRate: 200,
        itemsDesktop: [1199, 6],
        itemsDesktopSmall: [979, 3],
        itemsDesktop: [1499, 5],
        itemsDesktopSmall: [1199, 3],
        itemsTablet: [899, 2],
        itemsMobile: [599, 2],
        navigation: true,
        loop: true,
        navRewind: false,
    });
    $("#relatedItems").owlCarousel({
        autoPlay: 3000,
        items: 6,
        autoPlay: false,
        responsiveRefreshRate: 200,
        itemsDesktop: [1199, 6],
        itemsDesktopSmall: [979, 3],
        itemsDesktop: [1499, 6],
        itemsDesktopSmall: [1199, 3],
        itemsTablet: [899, 2],
        itemsMobile: [599, 2],
        navigation: true,
        loop: true,
        navRewind: false,
    });
    $('[id ^= "owl-theme_"]').owlCarousel({
        autoPlay: 3000,
        items: 5,
        autoPlay: false,
        responsiveRefreshRate: 200,
        itemsDesktop: [1199, 5],
        itemsDesktopSmall: [979, 3],
        itemsDesktop: [1499, 5],
        itemsDesktopSmall: [1199, 3],
        itemsTablet: [899, 2],
        itemsMobile: [599, 2],
        navigation: true,
        loop: true,
        navRewind: false,
    });

});

