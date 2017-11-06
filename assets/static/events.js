jQuery(document).ready(function($) {

    var BaldfaceEvents = (function() {

        /**
         * --------------
         * CONTENTS
         * --------------
         * _cache
         * _init
         * _setupCache
         * _appEvents
         * _breakpoints
         * _parallaxScene
         * _bookNow
         * _carousel
         * _dragIndicator
         */

        var

        /**
         * A set of re-used elements
         *
         * @var {object} _cache
         * @memberof! BaldfaceEvents
         */

        _cache = {},
        _isParallax = false,
            _sounds = document.getElementsByTagName('audio'),

            /**
             * The initialization method for the main object
             *
             * @function _init
             * @private
             * @memberof! BaldfaceEvents
             */
            _init = function _init() {

                _setupCache();
                _appEvents();

            },

            /**
             * Sets up items within the reusable cache (_cache).
             *
             * @function _setupCache
             * @private
             * @memberof! BaldfaceEvents
             */
            _setupCache = function _setupCache() {

                _cache.hostProtocol = window.location.protocol;
                _cache.hostUrl = _cache.hostProtocol + '//' + window.location.host;

            },

            /**
             * Creates app event handlers
             *
             * @function _appEvents
             * @private
             * @memberof! BaldfaceEvents
             */
            _appEvents = function _appEvents() {

                _breakpoints();
                _strikethrough();
                _bookNow();
                _carousel();
                _dragIndicator();
                _audioToggle();
                _showOnScroll();
                $(window).on('scroll', function() {
                    _showOnScroll();
                    _stickyOnScroll();
                    _colorOnScroll();
                });

            },

            /**
             * Breakpoints
             *
             * @function _breakpoints
             * @private
             * @memberof! BaldfaceEvents
             */
            _breakpoints = function _breakpoints() {


                function AudioFade(element, fadeIn, fadeOut, fadeDuration) {

                    this.element = $(element).get(0);
                    this.fadeIn = fadeIn;
                    this.fadeOut = fadeOut;
                    if (fadeDuration === undefined) {
                        this.fadeDuration = 500;
                    } else {
                        this.fadeDuration = fadeDuration;
                    }

                    if (this.element.hasAttribute("loop")) {
                        this.element.play();
                    } else {
                        var noLoop = true;
                    }
                    this.element.volume = 0;

                    this.init = function() {
                        $(window).scroll(function() {

                            this.element = $(element).get(0);
                            this.fadeIn = fadeIn;
                            this.fadeOut = fadeOut;
                            if (fadeDuration === undefined) {
                                this.fadeDuration = 500;
                            } else {
                                this.fadeDuration = fadeDuration;
                            }

                            if (noLoop === true) {

                                var loopFlag = false;
                                if ($(window).scrollTop() > this.fadeIn && loopFlag === false) {
                                    this.element.play();
                                    this.element.volume = 1;
                                    loopFlag = true;
                                }

                            } else {

                                if ($(window).scrollTop() >= this.fadeIn && $(window).scrollTop() <= this.fadeIn + this.fadeDuration) { //fade in
                                    this.element.volume = ($(window).scrollTop() - this.fadeIn) / this.fadeDuration;
                                } else if ($(window).scrollTop() >= this.fadeOut && $(window).scrollTop() <= this.fadeOut + this.fadeDuration) { //fade out
                                    this.element.volume = 1 - (($(window).scrollTop() - this.fadeOut) / this.fadeDuration);
                                } else if ($(window).scrollTop() > this.fadeIn + this.fadeDuration && $(window).scrollTop() < this.fadeOut) {
                                    if (this.element.volume !== 1) {
                                        this.element.volume = 1;
                                    }
                                } else {
                                    if (this.element.volume !== 0) {
                                        this.element.volume = 0;
                                    }
                                }

                            }
                        });
                    };
                }

                $(window).setBreakpoints({
                    distinct: true,
                    breakpoints: [
                    320,
                    768,
                    960,
                    1380,
                    1800,
                    2650]
                });

                // Enter 320
                $(window).bind('enterBreakpoint320', function() {});

                // Exit 320
                $(window).bind('exitBreakpoint320', function() {});

                // Enter 768
                $(window).bind('enterBreakpoint768', function() {

                    _parallaxScene();

                    var platform = navigator.platform.toLowerCase();
                    if (platform.indexOf('ipad') == -1 || platform.indexOf('iphone') == -1) {
                        document.getElementById('audio__nature').play();
                        var _heli = new AudioFade('#audio__heli', 1, 100, 300).init();
                        var _birds = new AudioFade('#audio__birds', 300, 500, 300).init();
                        var _bikes = new AudioFade('#audio__bikes', 600, 900, 300).init();
                        var _banjo = new AudioFade('#audio__banjo', 1000, 1200, 300).init();
                        var _yoga = new AudioFade('#audio__yoga', 1400, 1700, 300).init();
                        var _water = new AudioFade('#audio__water', 1900, 2200, 300).init();
                    } else {
                        $('.eq').hide();
                    }

                });
                // Exit 768
                $(window).bind('exitBreakpoint768', function() {
                    location.reload();
                });

                // Enter 960
                $(window).bind('enterBreakpoint960', function() {

                    _parallaxScene();

                    // audio elements
                    document.getElementById('audio__nature').play();
                    var _heli = new AudioFade('#audio__heli', 1, 100, 300).init();
                    var _birds = new AudioFade('#audio__birds', 350, 550, 300).init();
                    var _bikes = new AudioFade('#audio__bikes', 900, 1400, 300).init();
                    var _banjo = new AudioFade('#audio__banjo', 1500, 2000, 300).init();
                    var _yoga = new AudioFade('#audio__yoga', 2300, 2600, 300).init();
                    var _water = new AudioFade('#audio__water', 2800, 3400, 300).init();

                });
                // Exit 960
                $(window).bind('exitBreakpoint960', function() {
                    location.reload();
                });

                // Enter 1380
                $(window).bind('enterBreakpoint1380', function() {
                    _parallaxScene();
                    document.getElementById('audio__nature').play();
                    var _heli = new AudioFade('#audio__heli', 1, 150, 300).init();
                    var _birds = new AudioFade('#audio__birds', 450, 750, 300).init();
                    var _bikes = new AudioFade('#audio__bikes', 1250, 1800, 300).init();
                    var _banjo = new AudioFade('#audio__banjo', 2000, 2350, 300).init();
                    var _yoga = new AudioFade('#audio__yoga', 2900, 3500, 300).init();
                    var _water = new AudioFade('#audio__water', 3600, 4600, 300).init();
                });
                // Exit 1380
                $(window).bind('exitBreakpoint1380', function() {
                    location.reload();
                });

                // Enter 1800
                $(window).bind('enterBreakpoint1800', function() {
                    _parallaxScene();
                    document.getElementById('audio__nature').play();
                    var _heli = new AudioFade('#audio__heli', 1, 175, 300).init();
                    var _birds = new AudioFade('#audio__birds', 450, 900, 300).init();
                    var _bikes = new AudioFade('#audio__bikes', 1500, 2400, 300).init();
                    var _banjo = new AudioFade('#audio__banjo', 2600, 3200, 300).init();
                    var _yoga = new AudioFade('#audio__yoga', 4200, 5200, 300).init();
                    var _water = new AudioFade('#audio__water', 5300, 6100, 300).init();
                });
                // Exit 1800
                $(window).bind('exitBreakpoint1800', function() {
                    location.reload();
                });

                // Enter 2650
                $(window).bind('enterBreakpoint2650', function() {
                    _parallaxScene();
                    document.getElementById('audio__nature').play();
                    var _heli = new AudioFade('#audio__heli', 1, 175, 300).init();
                    var _birds = new AudioFade('#audio__birds', 450, 900, 300).init();
                    var _bikes = new AudioFade('#audio__bikes', 1600, 2500, 300).init();
                    var _banjo = new AudioFade('#audio__banjo', 2600, 3200, 300).init();
                    var _yoga = new AudioFade('#audio__yoga', 4200, 5200, 300).init();
                    var _water = new AudioFade('#audio__water', 5300, 6100, 300).init();
                });
                // Exit 2650
                $(window).bind('exitBreakpoint2650', function() {
                    location.reload();
                });


            },

            /**
             * Parallax Scene
             *
             * @function _parallaxScene
             * @private
             * @memberof! BaldfaceEvents
             */
            _parallaxScene = function _parallaxScene() {

                // Helicopter Loop
                var _animationHeli,
                _animationHeliReverse,
                _animationHeliLoop;

                _animationHeliTrip = function() {
                    $('.illustration__heli').removeClass('flipped-state').animate({
                        left: '-25%'
                    },
                    26000, 'linear');
                };
                _animationHeliReverseTrip = function() {
                    $('.illustration__heli').addClass('flipped-state').animate({
                        left: '100%'
                    },
                    26000, 'linear');
                };
                _animationHeliLoop = function() {
                    _animationHeliTrip();
                    setTimeout(function() {
                        _animationHeliReverseTrip()
                    }, 26000);
                };

                _animationHeliLoop();
                setInterval(function() {
                    _animationHeliLoop()
                }, 53000);

                // Birds Loop (On first scroll)
                $(window).on('scroll', function() {}).one('scroll', function() {
                    if ($(window).scrollTop() > 0) {
                        var _animationBirds,
                        _animationBirdsReverse,
                        _animationBirdsLoop;

                        _animationBirdsTrip = function() {
                            $('.illustration__birds').removeClass('flipped-state').animate({
                                left: '100%'
                            },
                            26000, 'linear');
                        };
                        _animationBirdsReverseTrip = function() {
                            $('.illustration__birds').addClass('flipped-state').animate({
                                left: '-25%'
                            },
                            26000, 'linear');
                        };
                        _animationBirdsLoop = function() {
                            _animationBirdsTrip();
                            setTimeout(function() {
                                _animationBirdsReverseTrip()
                            }, 26000);
                        };

                        _animationBirdsLoop();
                        setInterval(function() {
                            _animationBirdsLoop()
                        }, 53000);
                    }
                });

                // Parallax
                function castParallax() {

                    window.addEventListener('scroll', function(event) {

                        var top = this.pageYOffset;
                        var left = this.pageXOffset;

                        var layers = document.getElementsByClassName("parallax");
                        var layer, speed, yPos, xPos;
                        for (var i = 0; i < layers.length; i++) {
                            layer = layers[i];
                            speed = layer.getAttribute('data-speed');
                            var yPos = -(top * speed / 100);
                            var xPos = -(top * speed / 20);
                            var xPosReverse = (top * speed / 20);
                            if ($(layer).hasClass('illustration__clouds--left')) {
                                layer.setAttribute('style', 'transform: translate3d(' + xPos + 'px, ' + yPos + 'px, 0px)');
                            } else if ($(layer).hasClass('illustration__clouds--right')) {
                                layer.setAttribute('style', 'transform: translate3d(' + xPosReverse + 'px, ' + yPos + 'px, 0px)');
                            } else {
                                layer.setAttribute('style', 'transform: translate3d(0px, ' + yPos + 'px, 0px)');
                            }
                        }
                    });


                }

                function dispelParallax() {
                    $("#nonparallax").css('display', 'block');
                    $("#parallax").css('display', 'none');
                }

                function castSmoothScroll() {
                    $.srSmoothscroll({
                        step: 80,
                        speed: 300,
                        ease: 'linear'
                    });
                }

                function startSite() {

                    var platform = navigator.platform.toLowerCase();
                    var userAgent = navigator.userAgent.toLowerCase();

                    if (platform.indexOf('ipad') != -1 || platform.indexOf('iphone') != -1) {
                        dispelParallax();
                    } else if (platform.indexOf('win32') != -1 || platform.indexOf('linux') != -1) {
                        castParallax();
                        if ($.browser.webkit) {
                            castSmoothScroll();
                        }
                    } else {
                        castParallax();
                    }

                }

                startSite();

            },


            /**
             * Strikethrough
             *
             * @function _strikethrough
             * @private
             * @memberof! BaldfaceEvents

             */
            _strikethrough = function _strikethrough() {

                setTimeout(function() {
                    $('.main-title').addClass('strikethrough');
                }, 1400);


            },

            /**
             * Carousel
             *
             * @function _carousel
             * @private
             * @memberof! BaldfaceEvents
             */
            _carousel = function _carousel() {

                $('.carousel-events').slick({
                    autoplay: false,
                    dots: false,
                    arrows: false,
                    speed: 300,
                    centerMode: true,
                    centerPadding: '6.5%',
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    infinite: true,
                    variableWidth: false,
                    prevArrow: '<a href="#" class="slick-prev" aria-label="Previous"></button>',
                    nextArrow: '<a href="#" class="slick-next" aria-label="Next"></button>',
                    customPaging: function(slider, i) {
                        return $('<button type="button" data-role="none" role="button" tabindex="0" />').text(i + 1);
                    }
                });

                // Click to advance next/previous
                $('.slick-slider').on('click', '.slick-slide', function(e) {
                    e.stopPropagation();
                    var index = $(this).data("slick-index");
                    if ($('.slick-slider').slick('slickCurrentSlide') !== index) {
                        $('.slick-slider').slick('slickGoTo', index);
                    }
                });

                //After Change
                $('.slick-slider').on('afterChange', function(event, slick, currentSlide) {
                    $('.carousel-events__drag-indicator').fadeOut('200');
                    setTimeout(function() {
                        $('.carousel-events__drag-indicator').remove();
                    }, 300);
                });

                // Scale Effect
                $('.carousel-events').on('mousedown', function(e) {
                    $('.slick-list').addClass('dragging');
                })
                    .on('mouseup', function(e) {
                    $('.slick-list').removeClass('dragging');
                });

            },


            /**
             * Book Now button
             *
             * @function _bookNow();
             * @private
             * @memberof! BaldfaceGlobal
             */
            _bookNow = function _bookNow() {

                $('.button--swap').on('click', function(e) {
                    var _link = $(this).find('a'),
                        _linkHref = _link.attr('href');
                    window.location = _linkHref;
                });

            },

            /**
             * Drag Indicator
             *
             * @function _dragIndicator
             * @private
             * @memberof! BaldfaceEvents
             */
            _dragIndicator = function _dragIndicator() {

                $('.carousel-events__container').on({
                    mouseenter: function(e) {
                        var _this = $(this);
                        $('.carousel-events__drag-indicator').css('left', e.clientX + 12).css('top', e.clientY + -55);
                        $('.carousel-events__drag-indicator').fadeIn('200');
                    },
                    mousemove: function(e) {
                        var _this = $(this);
                        $('.carousel-events__drag-indicator').css('left', e.clientX + 12).css('top', e.clientY + -55);
                    },
                    mouseleave: function(e) {
                        $('.carousel-events__drag-indicator').fadeOut('100');
                    }
                });

            },

            /**
             * Audio Toggle
             *
             * @function _audioToggle
             * @private
             * @memberof! BaldfaceEvents
             */
            _audioToggle = function _audioToggle() {

                // audio toggle
                var soundOn = true;
                $('.eq').click(function() {
                    if (soundOn) {
                        $('.eq-bar').addClass('global-pause');
                        soundOn = false;
                        for (i = 0; i < _sounds.length; i++) {
                            _sounds[i].pause();
                        }
                    } else {
                        $('.eq-bar').removeClass('global-pause');
                        soundOn = true;
                        for (i = 0; i < _sounds.length; i++) _sounds[i].play();
                    }
                });

            },

            /**
             * Set sticky audio element on scroll
             *
             * @function _stickyOnScroll();
             * @private
             * @memberof! BaldfaceEvents
             */
            _stickyOnScroll = function _stickyOnScroll() {

                var _windowTop = $(window).scrollTop(),
                    _windowHeight = $(window).height();
                _stickyEl = $('.sticky'),
                _container = $('.illustration__container'),
                _containerHeight = $('.illustration__container').outerHeight();

                if (_stickyEl.length && $(window).width() > 768) {

                    // if window not scrolled past header
                    if (_windowTop < 60) {
                        _stickyEl.removeClass('stick');
                        _stickyEl.removeClass('stick-bottom');
                    }

                    // if window scrolled past header
                    if (_windowTop >= 60 && _windowTop < _containerHeight) {
                        _stickyEl.addClass('stick');
                        _stickyEl.removeClass('stick-bottom');
                        $('.eq-bar').removeClass('temp-pause');
                        if (!$('.eq-bar').hasClass('global-pause')) {
                            for (i = 0; i < _sounds.length; i++) {
                                _sounds[i].play();
                            }
                        }
                    }

                    // if element scrolled to end of container
                    if (_windowTop >= _containerHeight) {
                        _stickyEl.removeClass('stick');
                        _stickyEl.addClass('stick-bottom');
                        $('.eq-bar').addClass('temp-pause');
                        for (i = 0; i < _sounds.length; i++) {
                            _sounds[i].pause();
                        }
                    }

                }

            },

            /**
             * Change audio element color on scroll
             *
             * @function _colorOnScroll();
             * @private
             * @memberof! BaldfaceEvents
             */
            _colorOnScroll = function _colorOnScroll() {

                var _windowTop = $(window).scrollTop(),
                    _triggerTop = $('.illustration__mountains--front').offset().top + 80,
                    _eq = $('.eq').find('.eq-bar');

                if (_stickyEl.length) {

                    // if window not scrolled past trigger
                    if (_windowTop >= _triggerTop) {
                        _eq.addClass('light');
                    } else {
                        _eq.removeClass('light');
                    }

                }

            },

            /**
             * Show on scroll
             *
             * @function _showOnScroll
             * @private
             * @memberof! BaldfaceEvents
             */
            _showOnScroll = function _showOnScroll() {

                /* track element location in window */
                $('[data-show="on-scroll"]').each(function(index, element) {
                    var that = $(element),
                        bottom_of_object = that.offset().top + 200,
                        bottom_of_window = $(window).scrollTop() + $(window).height();

                    /* If element in window, fade it it */
                    if (bottom_of_window > bottom_of_object) {
                        that.addClass('in-view');
                    }

                });
            };
        // Kickoff
        _init();

    })();

});
