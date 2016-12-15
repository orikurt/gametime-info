(function($) {
    "use strict"; // Start of use strict

    // jQuery for page scrolling feature - requires jQuery Easing plugin
    $('.explore').on('click', function(){
        console.log('going to app', conf.app);
        window.location.href = conf.app.protocol + "://" + conf.app.host;
    });

    if (window.self !== window.top){
        $('.explore').css('display', 'none');
    }

})(jQuery); // End of use strict
