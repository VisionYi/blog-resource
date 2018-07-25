(function($) {
    'use strict';   // 嚴格模式

    var $sidebar = $('#sidebar');
    var $header = $('#header');
    var $main = $('#main');
    var $bottom_bar = $('#bottom-bar');
    var $shade = $('#shade');
    var $closeBtn = $('#shade , [href="/#about"] ,[href="#about"]');
    var $openBtn = $('#btn-open-sidebar');
    var pushedCSSClass = 'pushed';

    var Main = function() {};

    Main.prototype = {
        run: function () {
            var self = this;

            $openBtn.click(function() {
                if ($sidebar.hasClass(pushedCSSClass)) {
                    $shade.css('display', 'block');
                    $('body').css('overflow', 'hidden');
                }
            });

            $closeBtn.click(function() {
                self.resetShadePush();
            });

            $(window).resize(function() {
                self.resetShadePush();
            });
        },

        resetShadePush: function () {
            if ($shade.css('display') === 'block') {
                $shade.css('display', 'none');
                $sidebar.removeClass(pushedCSSClass);
                $header.removeClass(pushedCSSClass);
                $main.removeClass(pushedCSSClass);
                $bottom_bar.removeClass(pushedCSSClass);
                $('body').removeAttr('style');
            }
        }
    }

    $(document).ready(function () {
        var main = new Main();
        main.run();
    });
})(jQuery);
