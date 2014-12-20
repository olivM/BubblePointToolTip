// IIFE to ensure safe use of $
(function( $ ) {

  // Create plugin
  $.fn.tooltips = function(el) {

    var $tooltip,
        $body = $('body'),
        $el;

    // Ensure chaining works
    return this.each(function(i, el) {

      $el = $(el).attr("data-tooltip", i);

      // Make DIV and append to page 
      var $tooltip = $('<div class="tooltip" data-tooltip="' + i + '">' + $el.attr('title') + '<div class="arrow"></div></div>').appendTo("body");

      // Position right away, so first appearance is smooth
      var elementRect = el.getBoundingClientRect();


      $tooltip.css({
        // modulo added to prevent scrolling overlay issues
        top: (elementRect.top - $tooltip.outerHeight() - 13) % window.innerHeight,
        left: (elementRect.left + ((elementRect.right - elementRect.left)/2) - ($tooltip.width()/2))
      });

      $el
        // Get rid of yellow box popup
          .removeAttr("title")

        // Mouseenter
          .hover(function() {

            $el = $(this);

            $tooltip = $('div[data-tooltip=' + $el.data('tooltip') + ']');

            // Reposition tooltip, in case of page movement e.g. screen resize
            var elementRect = el.getBoundingClientRect();

            $tooltip.css({
              // the element in page position - tooltip height - 15 + scroll Y parameter(with compatibility)
              top: elementRect.top - $tooltip.outerHeight() -  15 + ((window.pageYOffset !== undefined) ? window.pageYOffset : (document.documentElement || document.body.parentNode || document.body).scrollTop),
              left: elementRect.left + ((elementRect.right - elementRect.left)/2) - ($tooltip.width()/2) - 19
            });

            // Adding class handles animation through CSS
            $tooltip.addClass("active");

            // Mouseleave
          }, function() {

            $el = $(this);

            // Temporary class for same-direction fadeout
            $tooltip = $('div[data-tooltip=' + $el.data('tooltip') + ']').addClass("out");

            // Remove all classes
            setTimeout(function() {
              $tooltip.removeClass("active").removeClass("out");
            }, 300);

          });

    });

  }

})(jQuery);