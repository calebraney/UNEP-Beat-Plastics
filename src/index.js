import { attr } from './utilities';
import SplitType from 'split-type';
import Lenis from '@studio-freight/lenis';
import Swiper from 'swiper';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';

document.addEventListener('DOMContentLoaded', function () {
  // Comment out for production
  console.log('Local Script Loaded');

  // register gsap plugin
  gsap.registerPlugin(ScrollTrigger);

  //////////////////////////////
  //Global Variables
  const resetGSAPTriggers = document.querySelectorAll('[data-ix-reset]');

  //////////////////////////////
  //LENIS Smoothscroll

  const lenis = new Lenis({
    duration: 1,
    easing: (t) => (t === 1 ? 1 : 1 - Math.pow(2, -10 * t)), // https://easings.net
    touchMultiplier: 1.5,
  });
  // lenis request animation from
  function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
  }
  requestAnimationFrame(raf);

  // Keep lenis and scrolltrigger in sync
  lenis.on('scroll', () => {
    if (!ScrollTrigger) return;
    ScrollTrigger.update();
  });

  //////////////////////////////
  //GSAP Animations
  const parallax = function (isMobile, isTablet, isDesktop) {
    //elements
    const PARALLAX_WRAP = '[data-ix-parallax="wrap"]';
    const PARALLAX_SECTION = '[data-ix-parallax="section"]';
    const PARALLAX_TRIGGER = '[data-ix-parallax="trigger"]';
    //breakpoint options
    const RUN_DESKTOP = 'data-ix-parallax-tablet';
    const RUN_TABLET = 'data-ix-parallax-tablet';
    const RUN_MOBILE = 'data-ix-parallax-mobile';
    //options
    const PARALLAX_TYPE = 'data-ix-parallax-type';

    const parallaxItems = gsap.utils.toArray(PARALLAX_WRAP);
    parallaxItems.forEach((parallaxItem) => {
      const section = parallaxItem.querySelector(PARALLAX_SECTION);
      const trigger = parallaxItem.querySelector(PARALLAX_TRIGGER);
      if (!section || !trigger) return;
      //set default animation type
      let animationType = 'uncover';
      animationType = attr('uncover', parallaxItem.getAttribute(PARALLAX_TYPE));

      //check breakpoints and quit function if set on specific breakpoints
      runMobile = attr(true, parallaxItem.getAttribute(RUN_MOBILE));
      runTablet = attr(true, parallaxItem.getAttribute(RUN_TABLET));
      runDesktop = attr(true, parallaxItem.getAttribute(RUN_DESKTOP));
      if ((runMobile = false && isMobile)) return;
      if ((runTablet = false && isTablet)) return;
      if ((runDesktop = false && isDesktop)) return;

      // animationType = attr('uncover', parallaxItem.getAttribute(PARALLAX_TYPE));
      // default GSAP options
      const settings = {
        scrub: true,
        start: 'top bottom',
        end: 'top top',
        moveStart: '-100vh',
        moveEnd: '0vh',
      };
      //check for animationType of cover
      if (animationType === 'cover') {
        settings.start = 'bottom bottom';
        settings.end = 'bottom top';
        settings.moveStart = '0vh';
        settings.moveEnd = '100vh';
      }
      //check for animationType of parallax
      if (animationType === 'parallax') {
        settings.moveStart = '-50vh';
        settings.moveEnd = '0vh';
      }

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: trigger,
          markers: false,
          start: settings.start,
          end: settings.end,
          scrub: settings.scrub,
        },
        defaults: {
          duration: 1,
          ease: 'none',
        },
      });
      tl.fromTo(
        section,
        {
          y: settings.moveStart,
        },
        {
          y: settings.moveEnd,
        }
      );
    });
  };

  const mouseOver = function (isMobile, isTablet, isDesktop) {
    //elements
    const MOUSEOVER_WRAP = '[data-ix-mouseover="wrap"]';
    const MOUSEOVER_LAYER = '[data-ix-mouseover="layer"]';
    const MOUSEOVER_TRIGGER = '[data-ix-mouseover="trigger"]';
    //options
    const MOUSEOVER_DURATION = 'data-ix-mouseover-duration';
    const MOUSEOVER_EASE = 'data-ix-mouseover-ease';
    const MOUSEOVER_MOVE_X = 'data-ix-mouseover-move-x';
    const MOUSEOVER_MOVE_Y = 'data-ix-mouseover-move-y';
    const MOUSEOVER_ROTATE_Z = 'data-ix-mouseover-rotate-z';
    //breakpoint options
    const RUN_DESKTOP = 'data-ix-parallax-tablet';
    const RUN_TABLET = 'data-ix-parallax-tablet';
    const RUN_MOBILE = 'data-ix-parallax-mobile';

    // select the items
    const mouseOverItems = gsap.utils.toArray(MOUSEOVER_WRAP);
    mouseOverItems.forEach((mouseOverItem) => {
      const layers = mouseOverItem.querySelectorAll(MOUSEOVER_LAYER);
      // return if items are null
      if (layers.length === 0) return;
      // find the target element if one exists, otherwise tge parent is the target
      let target = mouseOverItem.querySelector(MOUSEOVER_TRIGGER);
      if (!target) {
        target = mouseOverItem;
      }

      //check breakpoints and quit function if set on specific breakpoints
      runMobile = attr(true, mouseOverItem.getAttribute(RUN_MOBILE));
      runTablet = attr(true, mouseOverItem.getAttribute(RUN_TABLET));
      runDesktop = attr(true, mouseOverItem.getAttribute(RUN_DESKTOP));
      if ((runMobile = false && isMobile)) return;
      if ((runTablet = false && isTablet)) return;
      if ((runDesktop = false && isDesktop)) return;

      //handle mouse movement
      const mouseMove = function () {
        /////////////////////////
        // Setting up Timeline

        // object that stores the value of the progress so it can be animated
        let initialProgress = { x: 0.5, y: 0.5 };
        let progressObject = { x: initialProgress.x, y: initialProgress.y };
        //create default duration and ease
        let duration = attr(0.5, mouseOverItem.getAttribute(MOUSEOVER_DURATION));
        let ease = attr('power1.out', mouseOverItem.getAttribute(MOUSEOVER_EASE));
        // Create X timeline
        let cursorXTimeline = gsap.timeline({ paused: true, defaults: { ease: 'none' } });
        // Create Y Timeline
        let cursorYTimeline = gsap.timeline({ paused: true, defaults: { ease: 'none' } });
        // For each image add a tween on the timeline

        //////////////////////
        // Adding tweens
        layers.forEach((layer) => {
          // get custom move amounts or set them at the default of 10%
          let moveX = attr(10, layer.getAttribute(MOUSEOVER_MOVE_X));
          let moveY = attr(10, layer.getAttribute(MOUSEOVER_MOVE_Y));
          let rotateZ = attr(0, layer.getAttribute(MOUSEOVER_ROTATE_Z));
          // horizontal timeline
          cursorXTimeline.fromTo(
            layer,
            { xPercent: moveX * -1, rotateZ: rotateZ * -1 },
            { xPercent: moveX, rotateZ: rotateZ },
            0
          );
          //vertical timeline
          cursorYTimeline.fromTo(layer, { yPercent: moveY * -1 }, { yPercent: moveY }, 0);
        });

        //////////////////////
        // Function to update timeline progress based on an inputted value
        function setTimelineProgress(xValue, yValue) {
          // animate the timeline progress value and keep the timeline in sync onUpdate
          gsap.to(progressObject, {
            x: xValue,
            y: yValue,
            ease: ease,
            duration: duration,
            onUpdate: () => {
              cursorXTimeline.progress(progressObject.x);
              cursorYTimeline.progress(progressObject.y);
            },
          });
        }
        //Set the initial progress of the timeline
        setTimelineProgress(initialProgress.x, initialProgress.y);

        //////////////////////
        // Mouse events
        target.addEventListener('mousemove', function (e) {
          // get bounding rect of target
          const rect = target.getBoundingClientRect();
          // current mouse position - left offset of target: normalized with the targets width
          let mousePercentX = gsap.utils.clamp(
            0,
            1,
            gsap.utils.normalize(0, rect.width, e.clientX - rect.left)
          );
          // current mouse position - top offset of target: normalized with the targets height
          let mousePercentY = gsap.utils.clamp(
            0,
            1,
            gsap.utils.normalize(0, rect.height, e.clientY - rect.top)
          );
          // set the timeline progress
          setTimelineProgress(mousePercentX, mousePercentY);
        });
        target.addEventListener('mouseleave', function (e) {
          // on mouse leave set back to default state
          setTimelineProgress(initialProgress.x, initialProgress.y);
        });
      };
      mouseMove();
    });
  };

  const hoverActive = function (isMobile, isTablet, isDesktop) {
    //elements
    const HOVER_WRAP = '[data-ix-hoveractive="wrap"]';
    //breakpoint options
    const RUN_DESKTOP = 'data-ix-parallax-tablet';
    const RUN_TABLET = 'data-ix-parallax-tablet';
    const RUN_MOBILE = 'data-ix-parallax-mobile';
    // get all links without a no-hover attribute and any other elements with a hover attribute into an array
    const hoverElements = gsap.utils.toArray(HOVER_WRAP);
    const activeClass = 'is-active';
    hoverElements.forEach((item) => {
      if (!item) return;
      item.addEventListener('mouseover', function (e) {
        item.classList.add(activeClass);
      });
      item.addEventListener('mouseleave', function (e) {
        item.classList.remove(activeClass);
      });
    });
  };
  //////////////////////////////
  //swiper
  const sourcesSlider = function () {
    const sliderWrap = '.swiper';
    const nextButton = '.swiper-next';
    const previousButton = '.swiper-prev';
    const activeClass = 'is-active';
    const disabledClass = 'is-disabled';

    gsap.utils.toArray(sliderWrap).forEach(function (element) {
      nextButtonEl = element.querySelector(nextButton);
      previousButtonEl = element.querySelector(previousButton);
      if (!element || !nextButtonEl || !previousButtonEl) return;
      const swiper = new Swiper(element, {
        modules: [Navigation, Pagination],
        slidesPerView: 1,
        spaceBetween: '5%',
        speed: 600,
        loop: true,
        drag: false,
        followFinger: false,
        freeMode: false,
        updateOnMove: true,
        rewind: false,
        pagination: {
          el: element.querySelector('.swiper-bullet-wrapper'),
          bulletActiveClass: 'is-active',
          bulletClass: 'swiper-bullet',
          bulletElement: 'button',
          clickable: true,
        },
        navigation: {
          nextEl: nextButtonEl,
          prevEl: previousButtonEl,
          disabledClass: disabledClass,
        },
        slideActiveClass: activeClass,
        slideDuplicateActiveClass: activeClass,
      });
    });
  };

  //////////////////////////////
  //Control Functions on page load
  const gsapInit = function () {
    let mm = gsap.matchMedia();
    mm.add(
      {
        //This is the conditions object
        isMobile: '(max-width: 767px)',
        isTablet: '(min-width: 768px)  and (max-width: 991px)',
        isDesktop: '(min-width: 992px)',
        reduceMotion: '(prefers-reduced-motion: reduce)',
      },
      (context) => {
        let { isMobile, isTablet, isDesktop, reduceMotion } = context.conditions;
        // run animation functions
        hoverActive(isMobile, isTablet, isDesktop);
        mouseOver(isMobile, isTablet, isDesktop);
        parallax(isMobile, isTablet, isDesktop);
        if (isMobile) {
          sourcesSlider();
        }
      }
    );
  };
  gsapInit();

  //reset gsap on click of reset triggers
  resetGSAPTriggers.forEach(function (item) {
    item.addEventListener('click', function (e) {
      scrollTrigger.refresh();
    });
  });
});
