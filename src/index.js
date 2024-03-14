import { attr, runSplit, checkBreakpoints } from './utilities';
import SplitType from 'split-type';
import Lenis from '@studio-freight/lenis';
import Swiper from 'swiper';
import { Navigation, Pagination, Autoplay, EffectFade } from 'swiper/modules';

document.addEventListener('DOMContentLoaded', function () {
  // Comment out for production
  // console.log('Local Script');

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
    easing: (t) => (t === 1 ? 1 : 1 - Math.pow(2, -10 * t)),
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
  //GSAP Animations - RE-usable

  //resuable timeline creation with option attributes for individual customization per element
  const scrollInTL = function (item) {
    //setting attributes
    const SCROLLIN_TOGGLE_ACTIONS = 'data-ix-scrollin-toggle-actions';
    const SCROLLIN_SCRUB = 'data-ix-scrollin-scrub';
    const SCROLLIN_START = 'data-ix-scrollin-start';
    const SCROLLIN_END = 'data-ix-scrollin-end';
    // default GSAP options
    const settings = {
      scrub: false,
      toggleActions: 'play none none none',
      start: 'top 90%',
      end: 'top 75%',
    };
    //override settings if an attribute is present and a valid type.
    settings.toggleActions = attr(
      settings.toggleActions,
      item.getAttribute(SCROLLIN_TOGGLE_ACTIONS)
    );
    settings.scrub = attr(settings.scrub, item.getAttribute(SCROLLIN_SCRUB));
    settings.start = attr(settings.start, item.getAttribute(SCROLLIN_START));
    settings.end = attr(settings.end, item.getAttribute(SCROLLIN_END));
    const tl = gsap.timeline({
      defaults: {
        duration: 0.6,
        ease: 'power1.out',
      },
      scrollTrigger: {
        trigger: item,
        start: settings.start,
        end: settings.end,
        toggleActions: settings.toggleActions,
        scrub: settings.scrub,
      },
    });
    return tl;
  };

  const scrollInHeading = function () {
    const SCROLLIN_HEADING = '[data-ix-scrollin="heading"]';
    const items = gsap.utils.toArray(SCROLLIN_HEADING);
    items.forEach((item) => {
      const splitText = runSplit(item);
      if (!splitText) return;
      item.style.opacity = 1;
      const tl = scrollInTL(item);
      tl.fromTo(
        splitText.words,
        {
          opacity: 0,
          x: '2rem',
        },
        {
          opacity: 1,
          x: '0rem',
          stagger: { each: 0.2, from: 'start' },
          onComplete: () => {
            splitText.revert();
          },
        }
      );
    });
  };

  const scrollInItem = function () {
    const SCROLLIN_ITEM = '[data-ix-scrollin="item"]';
    const items = gsap.utils.toArray(SCROLLIN_ITEM);
    items.forEach((item) => {
      if (!item) return;
      item.style.opacity = 1;
      const tl = scrollInTL(item);
      tl.fromTo(
        item,
        {
          opacity: 0,
          y: '2rem',
        },
        {
          opacity: 1,
          y: '0rem',
        }
      );
    });
  };

  const scrollInContainer = function () {
    const SCROLLIN_CONTAINER = '[data-ix-scrollin="container"]';
    const items = gsap.utils.toArray(SCROLLIN_CONTAINER);
    items.forEach((item) => {
      if (!item) return;
      const children = gsap.utils.toArray(item.children);
      if (children.length === 0) return;
      children.forEach((child) => {
        const tl = scrollInTL(child);
        tl.fromTo(
          child,
          {
            opacity: 0,
            y: '2rem',
          },
          {
            opacity: 1,
            y: '0rem',
          }
        );
      });
    });
  };

  const scrollInStagger = function () {
    const SCROLLIN_STAGGER = '[data-ix-scrollin="stagger"]';
    const items = gsap.utils.toArray(SCROLLIN_STAGGER);
    items.forEach((item) => {
      const children = gsap.utils.toArray(item.children);
      if (children.length === 0) return;
      const tl = scrollInTL(item);
      tl.fromTo(
        children,
        {
          opacity: 0,
          y: '2rem',
        },
        {
          opacity: 1,
          y: '0rem',
          stagger: { each: 0.1, from: 'start' },
        }
      );
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
    const PARALLAX_AMOUNT = 'data-ix-parallax-amount';

    const parallaxItems = gsap.utils.toArray(PARALLAX_WRAP);
    parallaxItems.forEach((parallaxItem) => {
      const section = parallaxItem.querySelector(PARALLAX_SECTION);
      const trigger = parallaxItem.querySelector(PARALLAX_TRIGGER);
      if (!parallaxItem || !section || !trigger) return;
      //set default animation type
      let animationType = 'uncover';
      animationType = attr('uncover', parallaxItem.getAttribute(PARALLAX_TYPE));
      moveAmount = attr(50, parallaxItem.getAttribute(PARALLAX_AMOUNT));

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
        settings.moveStart = `-${moveAmount}vh`;
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
        onStart: () => {
          ScrollTrigger.refresh();
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

  const scrolling = function (gsapContext) {
    //animation ID
    const ANIMATION_ID = 'scrolling';
    //elements
    const SCROLLING_WRAP = `[data-ix-scrolling="wrap"]`;
    const SCROLLING_TRIGGER = `[data-ix-scrolling="trigger"]`;
    const SCROLLING_LAYER = '[data-ix-scrolling="layer"]';
    //timeline options
    const SCROLLING_START = 'data-ix-scrolling-start';
    const SCROLLING_END = 'data-ix-scrolling-end';
    const SCROLLING_SCRUB = 'data-ix-scrolling-scrub';
    //tween options
    const SCROLLING_POSITION = 'data-ix-scrolling-position'; // sequential by default, use "<" to start tweens together
    const SCROLLING_X_START = 'data-ix-scrolling-x-start';
    const SCROLLING_X_END = 'data-ix-scrolling-x-end';
    const SCROLLING_Y_START = 'data-ix-scrolling-y-start';
    const SCROLLING_Y_END = 'data-ix-scrolling-y-end';
    const SCROLLING_WIDTH_START = 'data-ix-scrolling-width-start';
    const SCROLLING_WIDTH_END = 'data-ix-scrolling-width-end';
    const SCROLLING_HEIGHT_START = 'data-ix-scrolling-height-start';
    const SCROLLING_HEIGHT_END = 'data-ix-scrolling-height-end';
    const SCROLLING_ROTATE_Z_START = 'data-ix-scrolling-rotate-z-start';
    const SCROLLING_ROTATE_Z_END = 'data-ix-scrolling-rotate-z-end';
    const SCROLLING_OPACITY_START = 'data-ix-scrolling-opacity-start';
    const SCROLLING_OPACITY_END = 'data-ix-scrolling-opacity-end';
    const SCROLLING_CLIP_START = 'data-ix-scrolling-clip-start';
    const SCROLLING_CLIP_END = 'data-ix-scrolling-clip-end';

    const scrollingItems = gsap.utils.toArray(SCROLLING_WRAP);
    scrollingItems.forEach((scrollingItem) => {
      const layers = scrollingItem.querySelectorAll(SCROLLING_LAYER);
      // return if items are null
      if (!scrollingItem || layers.length === 0) return;
      // find the target element if one exists, otherwise the parent is the target
      let trigger = scrollingItem.querySelector(SCROLLING_TRIGGER);
      if (!trigger) {
        trigger = scrollingItem;
      }
      //check breakpoints and quit function if set on specific breakpoints
      let runOnBreakpoint = checkBreakpoints(scrollingItem, ANIMATION_ID, gsapContext);
      if (runOnBreakpoint === false) return;
      // default GSAP options for animation
      const tlSettings = {
        scrub: 0.5,
        start: 'top bottom',
        end: 'bottom top',
      };
      // get custom timeline settings or set them at the default
      tlSettings.start = attr(tlSettings.start, scrollingItem.getAttribute(SCROLLING_START));
      tlSettings.end = attr(tlSettings.end, scrollingItem.getAttribute(SCROLLING_END));
      tlSettings.scrub = attr(tlSettings.scrub, scrollingItem.getAttribute(SCROLLING_SCRUB));
      // create timeline
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: trigger,
          start: tlSettings.start,
          end: tlSettings.end,
          scrub: tlSettings.scrub,
          markers: false,
        },
        defaults: {
          duration: 1,
          ease: 'none',
        },
      });
      //////////////////////
      // Adding tweens
      layers.forEach((layer) => {
        if (!layer) return;
        //objects for tween
        const varsFrom = {};
        const varsTo = {};

        //function to process data attributes and return the correct value if set.
        const processAttribute = function (attributeName, defaultValue) {
          const hasAttribute = layer.hasAttribute(attributeName);
          const attributeValue = attr(defaultValue, layer.getAttribute(attributeName));
          // if the attribute has the default value return the attribute value
          // (alternatively, could just include the default value)
          if (hasAttribute) {
            return attributeValue;
          } else {
            return;
          }
        };
        //add properties to vars objects
        varsFrom.x = processAttribute(SCROLLING_X_START, '0%');
        varsTo.x = processAttribute(SCROLLING_X_END, '0%');
        varsFrom.y = processAttribute(SCROLLING_Y_START, '0%');
        varsTo.y = processAttribute(SCROLLING_Y_END, '0%');
        varsFrom.width = processAttribute(SCROLLING_WIDTH_START, '0%');
        varsTo.width = processAttribute(SCROLLING_WIDTH_END, '0%');
        varsFrom.height = processAttribute(SCROLLING_HEIGHT_START, '0%');
        varsTo.height = processAttribute(SCROLLING_HEIGHT_END, '0%');
        varsFrom.rotateZ = processAttribute(SCROLLING_ROTATE_Z_START, 0);
        varsTo.rotateZ = processAttribute(SCROLLING_ROTATE_Z_END, 0);
        varsFrom.opacity = processAttribute(SCROLLING_OPACITY_START, 0);
        varsTo.opacity = processAttribute(SCROLLING_OPACITY_END, 0);
        varsFrom.clipPath = processAttribute(SCROLLING_CLIP_START, 'string');
        varsTo.clipPath = processAttribute(SCROLLING_CLIP_END, 'string');

        // get the position attribute
        const position = attr('<', layer.getAttribute(SCROLLING_POSITION));

        //add tween based on vars objects
        let fromTween = tl.fromTo(layer, varsFrom, varsTo, position);
      });
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
    const MOUSEOVER_X = 'data-ix-mouseover-move-x';
    const MOUSEOVER_Y = 'data-ix-mouseover-move-y';
    const MOUSEOVER_ROTATE_Z = 'data-ix-mouseover-rotate-z';

    // select the items
    const mouseOverItems = gsap.utils.toArray(MOUSEOVER_WRAP);
    mouseOverItems.forEach((mouseOverItem) => {
      const layers = mouseOverItem.querySelectorAll(MOUSEOVER_LAYER);
      // return if items are null
      if (layers.length === 0) return;
      // find the target element if one exists, otherwise the parent is the target
      let target = mouseOverItem.querySelector(MOUSEOVER_TRIGGER);
      if (!target) {
        target = mouseOverItem;
      }
      //check breakpoints and quit function if set on specific breakpoints
      let runOnBreakpoint = checkBreakpoints(mouseOverItem, ANIMATION_ID, gsapContext);
      if (runOnBreakpoint === false) return;
      //handle mouse movement
      const mouseMove = function () {
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
        //////////////////////
        // add a tween for each layer
        layers.forEach((layer) => {
          // get custom move amounts or set them at the default of 10%
          let moveX = attr(10, layer.getAttribute(MOUSEOVER_X));
          let moveY = attr(10, layer.getAttribute(MOUSEOVER_Y));
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
    //animation ID
    const ANIMATION_ID = 'hoveractive';
    //elements
    const HOVER_WRAP = '[data-ix-hoveractive="wrap"]';
    //option for active class and default class
    const HOVER_ACTIVE_CLASS = 'data-ix-hoveractive-class';
    const ACTIVE_CLASS = 'is-active';
    // get all links without a no-hover attribute and any other elements with a hover attribute into an array
    const hoverElements = gsap.utils.toArray(HOVER_WRAP);
    hoverElements.forEach((item) => {
      if (!item) return;
      let activeClass = attr(ACTIVE_CLASS, item.getAttribute(HOVER_ACTIVE_CLASS));
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

  const accordion = function (gsapContext) {
    //animation ID
    const ANIMATION_ID = 'accordion';
    //elements
    const ACCORDION_WRAP = '[data-ix-accordion="wrap"]';
    const ACCORDION_ITEM = '[data-ix-accordion="item"]';
    const ACCORDION_TOP = '[data-ix-accordion="top"]';
    //options
    const OPTION_FIRST_OPEN = 'data-ix-accordion-first-open';
    const OPTION_ONE_ACTIVE = 'data-ix-accordion-one-active';
    const OPTION_KEEP_ONE_OPEN = 'data-ix-accordion-keep-one-open';
    const OPTION_HOVER_OPEN = 'data-ix-accordion-hover';
    const ACTIVE_CLASS = 'is-active';
    const accordionLists = gsap.utils.toArray(ACCORDION_WRAP);

    // utility function to open or close accordions
    const openAccordion = function (item, open = true) {
      //get state of items
      const state = Flip.getState(item, {
        props: 'backgroundColor,margin',
        nested: true,
        absolute: false,
      });
      if (open === true) {
        item.classList.add(ACTIVE_CLASS);
      } else {
        item.classList.remove(ACTIVE_CLASS);
      }
      // animate elements
      Flip.from(state, {
        duration: 0.6,
        ease: 'power1.out',
        onStart: () => {
          item.style.overflow = 'hidden';
        },
        onComplete: () => {
          if (open) {
            item.style.overflow = 'visible';
          }
          ScrollTrigger.refresh();
        },
      });
    };
    ////////////////////////
    // event logic
    if (accordionLists.length === 0 || accordionLists === undefined) return;
    accordionLists.forEach((list) => {
      //check breakpoints and quit function if set on specific breakpoints
      let runOnBreakpoint = checkBreakpoints(list, ANIMATION_ID, gsapContext);
      if (runOnBreakpoint === false) return;
      // set up conditions for
      let firstOpen = attr(false, list.getAttribute(OPTION_FIRST_OPEN));
      let oneActive = attr(false, list.getAttribute(OPTION_ONE_ACTIVE));
      let keepOneOpen = attr(false, list.getAttribute(OPTION_KEEP_ONE_OPEN));
      let hoverOnly = attr(false, list.getAttribute(OPTION_HOVER_OPEN));
      //get the first accordion item and all of the items
      const accordionItems = list.querySelectorAll(ACCORDION_ITEM);
      if (accordionItems.length === 0) return;
      const firstItem = list.firstElementChild;
      if (firstOpen) {
        openAccordion(firstItem);
      }
      if (!hoverOnly) {
        // Add event listener for when accordion lists are clicked
        list.addEventListener('click', function (e) {
          // check if the clicked element was the top of an accordion and get that accordion
          const clickedEl = e.target.closest(ACCORDION_TOP);
          if (!clickedEl) return;
          // get all the accordions within this list and the active item
          const clickedItem = clickedEl.closest(ACCORDION_ITEM);
          // check if the clicked item is already active
          let clickedItemAlreadyActive = clickedItem.classList.contains(ACTIVE_CLASS);
          // if item is NOT ACTIVE
          if (!clickedItemAlreadyActive) {
            // check if oneActive is True
            if (oneActive) {
              // if one active is true loop through each item
              accordionItems.forEach((item) => {
                //if item is the current item Open
                if (item === clickedItem) {
                  openAccordion(item);
                }
                //otherwise remove active class and close
                else {
                  openAccordion(item, false);
                }
              });
            }
            if (!oneActive) {
              // if one active is false just set the current item to active and open it
              openAccordion(clickedItem);
            }
          }
          // if the current item IS ACTIVE and keep one open is false
          if (clickedItemAlreadyActive && !keepOneOpen) {
            openAccordion(clickedItem);
          }
        });
      }
      if (hoverOnly) {
        const accordionItems = list.querySelectorAll(ACCORDION_ITEM);
        accordionItems.forEach((item) => {
          item.addEventListener('mouseover', function () {
            openAccordion(item);
          });
          item.addEventListener('mouseout', function () {
            openAccordion(item, false);
          });
        });
      }
    });
  };

  //////////////////////////////
  //GSAP Animations - Specific

  const menu = function (gsapContext) {
    const ANIMATION_ID = 'menu';
    const MENU_WRAP = `[data-ix-menu="wrap"]`;
    const MENU_ITEM = `[data-ix-menu="item"]`;
    const MENU_LINK = `[data-ix-menu="link"]`;
    const MENU_SUB_LIST = `[data-ix-menu="sub-list"]`;
    const MENU_TEXT_WRAP = `[data-ix-menu="text-wrap"]`;
    const MENU_NUMBER = 'data-ix-menu-number';
    const ACTIVE_CLASS = 'is-active';
    const HOVER_CLASS = 'is-hovered';
    const OPEN_CLASS = 'is-open';
    const MENU_ANCHORS = '[data-ix-menu="anchor"]';
    const MENU_TARGET_ABOVE = 'data-ix-menu-above';
    const MENU_TARGET_BELOW = 'data-ix-menu-below';

    const menuWrap = document.querySelector(MENU_WRAP);
    const menuItems = gsap.utils.toArray(MENU_ITEM);
    const menuLinks = gsap.utils.toArray(MENU_LINK);
    if (menuItems.length === 0 || menuLinks.length === 0 || !menuWrap) return;

    //function to activate menu items
    const activateMenuItem = function (activeItem) {
      // get target of flip
      const flipItems = gsap.utils.toArray([MENU_SUB_LIST]);
      //get state of items
      const state = Flip.getState(flipItems, {
        props: 'margin,height',
        nested: true,
        absolute: true,
      });
      menuItems.forEach((item) => {
        //if the item is the active one add the class otherwise remove it
        if (item === activeItem) {
          item.classList.add(ACTIVE_CLASS);
        } else {
          item.classList.remove(ACTIVE_CLASS);
        }
      });
      // animate element
      Flip.from(state, {
        duration: 0.5,
        ease: 'power1.out',
      });
    };

    //function to hover menu items
    const hoverMenuItem = function (activeItem, active = true) {
      // get target of flip
      const flipItems = gsap.utils.toArray([MENU_LINK, MENU_TEXT_WRAP]);
      //get state of items
      const state = Flip.getState(flipItems, {
        props: 'margin,height',
        nested: true,
        absolute: true,
      });
      if (active) {
        activeItem.classList.add(HOVER_CLASS);
      } else {
        activeItem.classList.remove(HOVER_CLASS);
      }
      // animate element
      Flip.from(state, {
        duration: 0.5,
        ease: 'power1.out',
      });
    };

    //add hover class for menu items when item is hovered
    menuLinks.forEach((link) => {
      link.addEventListener('mouseenter', function (e) {
        hoverMenuItem(link);
      });
      link.addEventListener('mouseleave', function (e) {
        hoverMenuItem(link, false);
      });
    });

    // hide and show menu in specific sections
    const anchorItems = gsap.utils.toArray(MENU_ANCHORS);
    anchorItems.forEach((item) => {
      //get the attribute values for the numbers in question
      let numberTopAttribute = item.firstChild?.getAttribute(MENU_TARGET_ABOVE);
      let numberBotAttribute = item.firstChild?.getAttribute(MENU_TARGET_BELOW);
      // if attributes exist get their numbers
      if (!numberTopAttribute || !numberBotAttribute) return;
      let topTargetNumber = attr(0, numberTopAttribute);
      let bottomTargetNumber = attr(0, numberBotAttribute);

      //resuable function for the scroll anchors
      const activateTop = function () {
        if (topTargetNumber === 0) {
          // if the enter target is zero open the menu
          menuWrap.classList.remove(OPEN_CLASS);
        }
        if (0 < topTargetNumber && topTargetNumber < 6) {
          menuWrap.classList.add(OPEN_CLASS);
          const topTarget = document.querySelector(`[${MENU_NUMBER}="${topTargetNumber}"]`);
          if (!topTarget) return;
          activateMenuItem(topTarget);
        }
      };
      const activateBottom = function () {
        if (bottomTargetNumber === 0) {
          // if the enter target is zero open the menu
          menuWrap.classList.remove(OPEN_CLASS);
        }
        if (0 < bottomTargetNumber && bottomTargetNumber < 6) {
          menuWrap.classList.add(OPEN_CLASS);
          const bottomTarget = document.querySelector(`[${MENU_NUMBER}="${bottomTargetNumber}"]`);
          if (!bottomTarget) return;
          activateMenuItem(bottomTarget);
        }
      };
      ScrollTrigger.create({
        trigger: item,
        markers: false,
        start: 'center 0%',
        end: 'center 1%',
        onEnter: () => {
          activateBottom();
        },
        onEnterBack: () => {
          activateTop();
        },
      });
    });
  };

  const urbanScroll = function () {
    //get elements
    const wrap = document.querySelector('[data-ix-urban="wrap"]');
    const spacer = document.querySelector('[data-ix-urban="spacer"]');
    const content = document.querySelector('[data-ix-urban="content"]');
    const links = gsap.utils.toArray('[data-ix-urban="link"]');
    const background = document.querySelector('[data-ix-urban="background"]');
    const landscapeWrap = document.querySelector('[data-ix-urban="landscape-wrap"]');
    const landscapeFront = document.querySelector('[data-ix-urban="landscape-front"]');
    const landscapeBack = document.querySelector('[data-ix-urban="landscape-back"]');
    //check for elements
    if (
      !wrap ||
      !spacer ||
      !content ||
      !background ||
      !landscapeFront ||
      !landscapeWrap ||
      !landscapeBack ||
      links.length === 0
    )
      return;

    const timeline1 = gsap.timeline({
      scrollTrigger: {
        trigger: content,
        markers: false,
        start: 'top 25%',
        end: 'bottom bottom',
        scrub: true,
      },
      defaults: {
        duration: 1,
        ease: 'none',
      },
      onComplete: () => {
        ScrollTrigger.refresh();
      },
    });
    timeline1.set(wrap, { opacity: 1 });
    timeline1.fromTo(landscapeWrap, { yPercent: 100 }, { yPercent: 0, duration: 0.5 });
    timeline1.fromTo(
      landscapeBack,
      {
        clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
      },
      {
        clipPath: 'polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)',
      }
    );
    timeline1.fromTo(
      landscapeFront,
      {
        clipPath: 'polygon(100% 0%, 100% 0%, 100% 100%, 100% 100%)',
      },
      {
        clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
      },
      '<'
    );
    const timeline2 = gsap.timeline({
      scrollTrigger: {
        trigger: spacer,
        markers: false,
        start: 'top 90%',
        end: 'top 10%',
        scrub: true,
      },
      defaults: {
        duration: 1,
        ease: 'none',
      },
    });
    timeline2.fromTo(
      background,
      {
        y: '100vh',
      },
      {
        y: '0vh',
      }
    );
    timeline2.set(links, {
      pointerEvents: 'auto',
    });
    timeline2.fromTo(
      links,
      {
        yPercent: 50,
        opacity: 0,
      },
      {
        yPercent: 0,
        opacity: 1,
        duration: 0.2,
        stagger: { each: 0.1, from: 'start' },
      }
    );
  };
  //////////////////////////////
  //swiper
  const sourcesSlider = function () {
    const sliderWrap = '.swiper.is-sources';
    const nextButton = '.swiper-next';
    const previousButton = '.swiper-prev';
    const activeClass = 'is-active';
    const disabledClass = 'is-disabled';
    const bulletsWrapClass = '.swiper-bullet-wrapper';

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
          el: element.querySelector(bulletsWrapClass),
          bulletActiveClass: activeClass,
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

  const mapSlider = function () {
    const sliderWrap = '.swiper.is-map';
    const nextButton = '.swiper-next';
    const previousButton = '.swiper-prev';
    const activeClass = 'is-active';
    const disabledClass = 'is-disabled';

    gsap.utils.toArray(sliderWrap).forEach(function (element) {
      nextButtonEl = element.querySelector(nextButton);
      previousButtonEl = element.querySelector(previousButton);
      if (!element || !nextButtonEl || !previousButtonEl) return;
      const swiper = new Swiper(element, {
        modules: [Navigation, Pagination, Autoplay, EffectFade],
        slidesPerView: 1,
        speed: 1000,
        effect: 'fade',
        crossFade: true,
        drag: false,
        followFinger: false,
        freeMode: false,
        updateOnMove: true,
        rewind: true,
        autoplay: {
          autoplay: true,
          delay: 300,
          stopOnLastSlide: true,
          disableOnInteraction: true,
          pauseOnMouseEnter: false,
        },
        pagination: {
          el: element.querySelector('.swiper-bullet-wrapper'),
          bulletActiveClass: activeClass,
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
      menu(gsapContext);
      mapSlider();
      //extra flair animations
      if (!reduceMotion) {
        scrollInHeading(gsapContext);
        scrollInItem(gsapContext);
        scrollInContainer(gsapContext);
        scrollInStagger(gsapContext);
        mouseOver(gsapContext);
        parallax(gsapContext);
        scrolling(gsapContext);
      }
      urbanScroll();
      sourcesSlider();
      // conditional animations

      if (isMobile) {
      }
    }
  );

  //reset gsap on click of reset triggers
  resetGSAPTriggers.forEach(function (item) {
    item.addEventListener('click', function (e) {
      ScrollTrigger.refresh();
    });
  });
});

//on full page load refesh scroll trigger
window.addEventListener('load', (event) => {
  ScrollTrigger.refresh();
});
