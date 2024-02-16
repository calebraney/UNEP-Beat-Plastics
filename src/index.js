import { attr } from './utilities';
import { checkBreakpoints } from './utilities';
import SplitType from 'split-type';
import Lenis from '@studio-freight/lenis';
import Swiper from 'swiper';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';

document.addEventListener('DOMContentLoaded', function () {
  // Comment out for production
  console.log('Local Script');

  // register gsap plugin
  gsap.registerPlugin(ScrollTrigger);
  gsap.registerPlugin(Flip);

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

  //handle anchor links
  function anchorLinks() {
    const anchorLinks = document.querySelectorAll('[data-scroll-to]');
    if (anchorLinks == null) {
      return;
    }
    anchorLinks.forEach((item) => {
      const targetID = item.getAttribute('data-scroll-to');
      const immediateScroll = attr(false, item.getAttribute('data-scroll-immediate'));
      const target = document.getElementById(targetID);
      if (!target) return;
      item.addEventListener('click', (event) => {
        lenis.scrollTo(target, {
          immediate: immediateScroll,
          duration: 1.85,
          easing: (t) => (t === 1 ? 1 : 1 - Math.pow(2, -10 * t)),
        });
      });
    });
  }
  anchorLinks();

  //////////////////////////////
  //GSAP Animations

  const menu = function (gsapContext) {
    const ANIMATION_ID = 'menu';
    const MENU_WRAP = `[data-ix-menu="wrap"]`;
    const MENU_ITEM = `[data-ix-menu="item"]`;
    // const MENU_LINK = `[data-ix-menu="link"]`;
    // const MENU_SUB_LIST = `[data-ix-menu="sub-list"]`;
    const MENU_NUMBER = 'data-ix-menu-number';
    const ACTIVE_CLASS = 'is-active';
    const OPEN_CLASS = 'is-open';
    const MENU_ANCHORS = '[data-ix-menu="anchor"]';
    const MENU_TARGET_ABOVE = 'data-ix-menu-above';
    const MENU_TARGET_BELOW = 'data-ix-menu-below';

    const menuWrap = document.querySelector(MENU_WRAP);
    const menuItems = gsap.utils.toArray(MENU_ITEM);
    if (menuItems.length === 0 || !menuWrap) return;

    //function to activate menu items
    const activateMenuItem = function (activeItem) {
      //get state of items
      const state = Flip.getState([menuItems], {
        // props: 'rotateX.rotateY,rotateZ',
        nested: true,
        absolute: true,
      });
      menuItems.forEach((item) => {
        //if the item is the active one add the class otherwise remove it
        if (item === activeItem) {
          activeItem.classList.add(ACTIVE_CLASS);
        } else {
          item.classList.remove(ACTIVE_CLASS);
        }
      });
      // animate element
      Flip.from(state, {
        duration: 0.6,
        ease: 'power2.out',
      });
    };
    //handle active classes and gsap flip
    menuItems.forEach((item) => {
      item.addEventListener('click', function (e) {
        activateMenuItem(item);
      });
    });

    // hide and show menu in specific sections
    const anchorItems = gsap.utils.toArray(MENU_ANCHORS);
    anchorItems.forEach((item) => {
      // console.log(item);
      let topTargetNumber = attr(0, item.getAttribute(MENU_TARGET_ABOVE));
      let bottomTargetNumber = attr(0, item.getAttribute(MENU_TARGET_BELOW));
      // console.log(topTargetNumber, bottomTargetNumber);

      //resuable function for the scroll anchors
      const activateTop = function () {
        if (topTargetNumber === 0) {
          // if the enter target is zero open the menu
          menuWrap.classList.remove(OPEN_CLASS);
        } else {
          menuWrap.classList.add(OPEN_CLASS);
          const enterTarget = document.querySelector(`[${MENU_NUMBER}="${topTargetNumber}"]`);
          if (!enterTarget) return;
          activateMenuItem(enterTarget);
        }
      };
      const activateBottom = function () {
        if (bottomTargetNumber === 0) {
          // if the enter target is zero open the menu
          menuWrap.classList.remove(OPEN_CLASS);
        } else {
          menuWrap.classList.add(OPEN_CLASS);
          const enterTarget = document.querySelector(`[${MENU_NUMBER}="${bottomTargetNumber}"]`);
          if (!enterTarget) return;
          activateMenuItem(enterTarget);
        }
      };
      ScrollTrigger.create({
        trigger: item,
        markers: false,
        start: 'center 10%',
        end: 'center 11%',
        onEnter: () => {
          console.log('enter');
          activateBottom();
        },
        onLeave: () => {
          // console.log('leave');
        },
        onEnterBack: () => {
          // console.log('enter back');
          activateTop();
        },
        onLeaveBack: () => {
          // console.log('leave back');
        },
      });
    });
  };
  const parallax = function (gsapContext) {
    //animation ID
    const ANIMATION_ID = 'parallax';
    //elements
    const PARALLAX_WRAP = `[data-ix-parallax="wrap"]`;
    const PARALLAX_SECTION = `[data-ix-parallax="section"]`;
    const PARALLAX_TRIGGER = `[data-ix-parallax="trigger"]`;
    //options
    const PARALLAX_TYPE = 'data-ix-parallax-type';

    const parallaxItems = gsap.utils.toArray(PARALLAX_WRAP);
    parallaxItems.forEach((parallaxItem) => {
      const section = parallaxItem.querySelector(PARALLAX_SECTION);
      const trigger = parallaxItem.querySelector(PARALLAX_TRIGGER);
      if (!parallaxItem || !section || !trigger) return;
      //set default animation type
      let animationType = 'uncover';
      animationType = attr('uncover', parallaxItem.getAttribute(PARALLAX_TYPE));

      //check breakpoints and quit function if set on specific breakpoints
      let runOnBreakpoint = checkBreakpoints(parallaxItem, ANIMATION_ID, gsapContext);
      if (runOnBreakpoint === false) return;

      // animationType = attr('uncover', parallaxItem.getAttribute(PARALLAX_TYPE));
      // default GSAP options for uncover animation
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

  const mouseOver = function (gsapContext) {
    const ANIMATION_ID = 'mouseover';
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
      let runOnBreakpoint = checkBreakpoints(mouseOverItem, ANIMATION_ID, gsapContext);
      if (runOnBreakpoint === false) return;

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

  const hoverActive = function (gsapContext) {
    //elements
    const ANIMATION_ID = 'hoveractive';
    const HOVER_WRAP = '[data-ix-hoveractive="wrap"]';

    // get all links without a no-hover attribute and any other elements with a hover attribute into an array
    const hoverElements = gsap.utils.toArray(HOVER_WRAP);
    const activeClass = 'is-active';
    hoverElements.forEach((item) => {
      if (!item) return;
      //check breakpoints and quit function if set on specific breakpoints
      let runOnBreakpoint = checkBreakpoints(item, ANIMATION_ID, gsapContext);
      if (runOnBreakpoint === false) return;
      //add event listener to item
      item.addEventListener('mouseover', function (e) {
        item.classList.add(activeClass);
      });
      item.addEventListener('mouseleave', function (e) {
        item.classList.remove(activeClass);
      });
    });
  };

  const accordion = function () {
    // select the relevant items from the DOM
    const TITLE = 'accordion';
    //elements
    const ACCORDION_WRAP = '[data-ix-accordion="wrap"]';
    const ACCORDION_ITEM = '[data-ix-accordion="item"]';
    const ACCORDION_TOP = '[data-ix-accordion="top"]';
    const ACCORDION_OPEN = '[data-ix-accordion="open"]';
    const ACCORDION_CLOSE = '[data-ix-accordion="close"]';
    //options
    const OPTION_FIRST_OPEN = 'data-ix-accordion-first-open';
    const OPTION_ONE_ACTIVE = 'data-ix-accordion-one-active';
    const OPTION_KEEP_ONE_OPEN = 'data-ix-accordion-keep-one-open';
    const OPTION_HOVER_OPEN = 'data-ix-accordion-hover';
    const ACTIVE_CLASS = 'is-active';
    const accordionLists = gsap.utils.toArray(ACCORDION_WRAP);

    if (accordionLists.length === 0 || accordionLists === undefined) return;
    accordionLists.forEach((list) => {
      // set up conditions for
      let firstOpen = attr(false, list.getAttribute(OPTION_FIRST_OPEN));
      let oneActive = attr(false, list.getAttribute(OPTION_ONE_ACTIVE));
      let keepOneOpen = attr(false, list.getAttribute(OPTION_KEEP_ONE_OPEN));
      let hoverOnly = attr(false, list.getAttribute(OPTION_HOVER_OPEN));
      //open the first accordion
      const firstItem = list.firstElementChild;
      if (firstOpen) {
        firstItem.classList.add(ACTIVE_CLASS);
        firstItem.querySelector(ACCORDION_OPEN).click();
      }
      if (!hoverOnly) {
        // Add event listener for when accordion lists are clicked
        list.addEventListener('click', function (e) {
          // check if the clicked element was the top of an accordion and get that accordion
          const clickedEl = e.target.closest(ACCORDION_TOP);
          if (!clickedEl) return;
          // get all the accordions within this list and the active item
          const clickedItem = clickedEl.closest(ACCORDION_ITEM);
          const accordionItems = list.querySelectorAll(ACCORDION_ITEM);
          // check if the clicked item is already active
          let clickedItemAlreadyActive = clickedItem.classList.contains(ACTIVE_CLASS);

          // if item is NOT ACTIVE
          if (!clickedItemAlreadyActive) {
            // check if oneActive is True
            if (oneActive) {
              // if one active is true loop through each item
              accordionItems.forEach((item) => {
                //if item is the current item set to Active and Open
                if (item === clickedItem) {
                  item.classList.add(ACTIVE_CLASS);
                  item.querySelector(ACCORDION_OPEN).click();
                }
                //otherwise remove active class and close
                else {
                  item.classList.remove(ACTIVE_CLASS);
                  item.querySelector(ACCORDION_CLOSE).click();
                }
              });
            }
            if (!oneActive) {
              // if one active is false just set the current item to active and open it
              clickedItem.classList.add(ACTIVE_CLASS);
              clickedItem.querySelector(ACCORDION_OPEN).click();
            }
          }

          // if the current item IS ACTIVE and keep one open is false
          if (clickedItemAlreadyActive && !keepOneOpen) {
            // REMOVE the active class from the clicked item
            clickedItem.classList.remove(ACTIVE_CLASS);
            clickedItem.querySelector(ACCORDION_CLOSE).click();
          }
        });
      }
      if (hoverOnly) {
        const accordionItems = list.querySelectorAll(ACCORDION_ITEM);
        accordionItems.forEach((item) => {
          item.addEventListener('mouseover', function () {
            this.classList.add(ACTIVE_CLASS);
            item.querySelector(ACCORDION_OPEN).click();
          });
          item.addEventListener('mouseout', function () {
            this.classList.remove(ACTIVE_CLASS);
            item.querySelector(ACCORDION_CLOSE).click();
          });
        });
      }
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

  let mm = gsap.matchMedia();
  mm.add(
    {
      //This is the conditions object
      isMobile: '(max-width: 767px)',
      isTablet: '(min-width: 768px)  and (max-width: 991px)',
      isDesktop: '(min-width: 992px)',
      reduceMotion: '(prefers-reduced-motion: reduce)',
    },
    (gsapContext) => {
      let { isMobile, isTablet, isDesktop, reduceMotion } = gsapContext.conditions;
      // run animation functions
      hoverActive(gsapContext);
      mouseOver(gsapContext);
      parallax(gsapContext);
      menu(gsapContext);

      if (isDesktop || isTablet) {
        accordion();
      }

      if (isMobile) {
        sourcesSlider();
      }
    }
  );

  //reset gsap on click of reset triggers
  resetGSAPTriggers.forEach(function (item) {
    item.addEventListener('click', function (e) {
      scrollTrigger.refresh();
    });
  });
});
