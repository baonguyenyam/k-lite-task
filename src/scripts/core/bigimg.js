function VienSoiResponsive() {
    // Set BG Resposive
    $('[bg-img]').each(function() {
        var bgimg = $(this).attr('bg-img');
        $(this).css({
            "background-image": "url(" + bgimg + ")",
            "background-position": "center center",
            "background-size": "cover"
        });
    });

    $('[bg-img-responsive]').each(function() {
        var bgimg = $(this).attr('bg-img-responsive');
        var bgimgsm = $(this).attr('bg-img-responsive-sm');
        var bgimgxs = $(this).attr('bg-img-responsive-xs');
        if ($(window).width() >= 1000) {
            $(this).css({
                "background-image": "url(" + bgimg + ")",
                "background-position": "center center",
                "background-size": "cover"
            });
        } else if ($(window).width() < 1000 && $(window).width() > 600) {
            $(this).css({
                "background-image": "url(" + bgimgsm + ")",
                "background-position": "center center",
                "background-size": "cover"
            });
        } else {
            $(this).css({
                "background-image": "url(" + bgimgxs + ")",
                "background-position": "center center",
                "background-size": "cover"
            });
        }
    });

    $('[img-src-responsive]').each(function() {
        var bgimg2 = $(this).attr('img-src-responsive');
        var bgimg2sm = $(this).attr('img-src-responsive-sm');
        var bgimg2xs = $(this).attr('img-src-responsive-xs');
        if ($(window).width() >= 1000) {
            $(this).attr("src", "" + bgimg2 + "");
        } else if ($(window).width() < 1000 && $(window).width() > 600) {
            $(this).attr("src", "" + bgimg2sm + "");
        } else {
            $(this).attr("src", "" + bgimg2xs + "");
        }
    });

};

$(function() {
    if (VIENSOI_APP.ACTIVE_RESPONSIVE) {
        VienSoiResponsive();
    }
})

$(window).resize(function() {
    if (VIENSOI_APP.ACTIVE_RESPONSIVE) {
        VienSoiResponsive();
    }
})