;(function (global) {
  'use strict'

  var $ = global.jQuery
  var GOVUK = global.GOVUK || {}

  // Stick elements to top of screen when you scroll past, documentation is in the README.md
  var sticky = {
    _hasScrolled: false,
    _scrollTimeout: false,
    _hasResized: false,
    _resizeTimeout: false,

    getWindowDimensions: function () {
      return {
        height: $(global).height(),
        width: $(global).width()
      }
    },
    getWindowPositions: function () {
      return {
        scrollTop: $(global).scrollTop()
      }
    },
    getElementOffset: function ($el) {
      return $el.offset()
    },
    init: function () {
      var $els = $('.js-slidy-stick')

      if ($els.length > 0) {
        sticky.$els = $els

        if (sticky._scrollTimeout === false) {
          $(global).scroll(sticky.onScroll)
          sticky._scrollTimeout = global.setInterval(sticky.checkScroll, 50)
        }

        if (sticky._resizeTimeout === false) {
          $(global).resize(sticky.onResize)
          sticky._resizeTimeout = global.setInterval(sticky.checkResize, 50)
        }
      }
      if (GOVUK.stopScrollingAtFooter) {
        $els.each(function (i, el) {
          var $img = $(el).find('img')
          if ($img.length > 0) {
            var image = new global.Image()
            image.onload = function () {
              GOVUK.stopScrollingAtFooter.addEl($(el), $(el).outerHeight())
            }
            image.src = $img.attr('src')
          } else {
            GOVUK.stopScrollingAtFooter.addEl($(el), $(el).outerHeight())
          }
        })
      }
    },
    onScroll: function () {
      sticky._hasScrolled = true
    },
    onResize: function () {
      sticky._hasResized = true
    },
    checkScroll: function () {
      if (sticky._hasScrolled === true) {
        sticky._hasScrolled = false

        var windowVerticalPosition = sticky.getWindowPositions().scrollTop + ($(window).height() * 0.9);

        var windowDimensions = sticky.getWindowDimensions()

        sticky.$els.each(function (i, el) {
          var $el = $(el)
          var scrolledFrom = $el.data('scrolled-from')
          var bottom = $(window).height() - sticky.getElementOffset($el).top - $el.height();

          if (scrolledFrom && windowVerticalPosition > scrolledFrom) {
            sticky.release($el)
          } else if (windowVerticalPosition >= bottom) {
            sticky.stick($el)
          }
        })
      }
    },
    checkResize: function () {
      if (sticky._hasResized === true) {
        sticky._hasResized = false

        var windowDimensions = sticky.getWindowDimensions()

        sticky.$els.each(function (i, el) {
          var $el = $(el)

          var elResize = $el.hasClass('js-sticky-resize')
          if (elResize) {
            var $shim = $('.shim')
            var $elParent = $el.parent('div')
            var elParentWidth = $elParent.width()
            $shim.css('width', elParentWidth)
            $el.css('width', elParentWidth)
          }
        })
      }
    },
    stick: function ($el) {
      if (!$el.hasClass('slidy-fixed')) {
        $el.data('scrolled-from', sticky.getElementOffset($el).top)
        var height = Math.max($el.height(), 1)
        var width = $el.width()
        $el.before('<div class="shim" style="width: ' + width + 'px; height: ' + height + 'px">&nbsp;</div>')
        $el.css('width', width + 'px').addClass('slidy-fixed')
      }
    },
    release: function ($el) {
      $('.slidy-fixed').each(function (i, el) {
        $el = $(el)
        if ($el.hasClass('slidy-fixed')) {
          $el.data('scrolled-from', false)
          $el.removeClass('slidy-fixed').css('width', '')
          $el.siblings('.shim').remove()
        }
      })
    }
  }
  GOVUK.slidyNav = sticky
  global.GOVUK = GOVUK
})(window)
