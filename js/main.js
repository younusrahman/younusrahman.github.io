// ------------------------Bokmark start

function bookmark(title, url) {
  if (window.sidebar) { 
    // Firefox
    window.sidebar.addPanel(title, url, '');
  } 
  else if (window.opera && window.print) 
  { 
    // Opera
    var elem = document.createElement('a');
    elem.setAttribute('href', url);
    elem.setAttribute('title', title);
    elem.setAttribute('rel', 'sidebar');
    elem.click(); //this.title=document.title;
  } 
  else if (document.all) 
  { 
    // ie
    window.external.AddFavorite(url, title);
  }
}
// ------------------------Bokmark end





/*----------------- navigation menu --------------------*/


// (() =>{
  
//   const hamburgerBtn = document.querySelector(".hamburger-btn"),
//   navMenu = document.querySelector(".nav-menu"),
//   closeNavBtn = navMenu.querySelector(".close-nav-menu");

//   hamburgerBtn.addEventListener("click", showNavMenu);
//   closeNavBtn.addEventListener("click", hideNavMenu);

//   function showNavMenu(){
//     navMenu.classList.add("open");
//     bodyScrollingToggle();
//   }
//   function hideNavMenu(){
//     navMenu.classList.remove("open");
//     fadeOutEffect();
//     bodyScrollingToggle();
//   }
//   function fadeOutEffect(){
//   	document.querySelector(".fade-out-effect").classList.add("active");
//   	setTimeout(() =>{
//       document.querySelector(".fade-out-effect").classList.remove("active");
//   	},300)
//   }
//   // attach an event handler to document
//   document.addEventListener("click", (event) =>{
//      if(event.target.classList.contains('link-item')){
//      	/* make sure event.target.hash has a value before overridding default behavior*/
//      	if(event.target.hash !==""){
//      		// prevent default anchor click behavior
//      		event.preventDefault();
//      		const hash = event.target.hash;
//      		// deactivate existing active 'section'
//      		document.querySelector(".section.active").classList.add("hide");
//      		document.querySelector(".section.active").classList.remove("active");
//      		// activate new 'section'
//      		document.querySelector(hash).classList.add("active");
//      		document.querySelector(hash).classList.remove("hide");
//      		/* deactivate existing active navigation menu 'link-item' */
//      		navMenu.querySelector(".active").classList.add("outer-shadow","hover-in-shadow");
//      		navMenu.querySelector(".active").classList.remove("active","inner-shadow");
//      		/* if clicked 'link-item is contained within the navigation menu' */
//      		if(navMenu.classList.contains("open")){
//      		  // activate new navigation menu 'link-item'
//      		  event.target.classList.add("active","inner-shadow");
//      		  event.target.classList.remove("outer-shadow","hover-in-shadow");
//      		  // hide navigation menu
//      		  hideNavMenu();
//      	    }
//      	    else{
//               let navItems = navMenu.querySelectorAll(".link-item");
//               navItems.forEach((item) =>{
//               	if(hash === item.hash){
//               		// activate new navigation menu 'link-item'
//               		item.classList.add("active","inner-shadow");
//      		        item.classList.remove("outer-shadow","hover-in-shadow");
//               	}
//               })
//               fadeOutEffect();
//      	    }
//      	    // add hash (#) to url
//      	    window.location.hash = hash;
//      	}
//      }
//   })

// })();

/*------------ about section tabs ------------------*/

(() =>{
       const aboutSection = document.querySelector(".about-section"),
       tabsContainer = document.querySelector(".about-tabs");

       tabsContainer.addEventListener("click", (event) =>{
       	 /* if event.target contains 'tab-item' class and not contains
       	 'active' class */
       	  if(event.target.classList.contains("tab-item") &&
       	  	!event.target.classList.contains("active")){
             const target = event.target.getAttribute("data-target");
             // deactivate existing active 'tab-item'
             tabsContainer.querySelector(".active").classList.remove("outer-shadow","active");
             // activate new 'tab-item'
             event.target.classList.add("active","outer-shadow");
             // deactivate existing active 'tab-content'
             aboutSection.querySelector(".tab-content.active").classList.remove("active");
             // activate new 'tab-content'
             aboutSection.querySelector(target).classList.add("active");
       	  }
       })
})();

 function bodyScrollingToggle(){
 	document.body.classList.toggle("hidden-scrolling");
 }

/*---------------- portfolio filter and popup -------------------*/ 

(() =>{
     
     const filterContainer = document.querySelector(".portfolio-filter"),
     MessageForNoportfolioItem = document.querySelector("#MessageForNoportfolioItem"),
     portfolioItemsContainer = document.querySelector(".portfolio-items"),
     portfolioItems = document.querySelectorAll(".portfolio-item"),
     popup = document.querySelector(".portfolio-popup"),
     prevBtn = popup.querySelector(".pp-prev"),
     nextBtn = popup.querySelector(".pp-next"),
     closeBtn = popup.querySelector(".pp-close"),
     projectDetailsContainer = popup.querySelector(".pp-details"),
     projectDetailsBtn = popup.querySelector(".pp-project-details-btn");
     let itemIndex, slideIndex, screenshots;

     /* filter portfolio items*/
     filterContainer.addEventListener("click", (event)=>{
       if(event.target.classList.contains("filter-item") && 
       	!event.target.classList.contains("active")){

       	 // deactivate existing active 'filter-item'
       	 filterContainer.querySelector(".active").classList.remove("outer-shadow","active");
       	 // activate new 'filter item'
       	 event.target.classList.add("active","outer-shadow");
       	 const target = event.target.getAttribute("data-target");
         count=0;
       	 portfolioItems.forEach((item) =>{
           if(target === item.getAttribute("data-category") || target === 'all'){
           	  item.classList.remove("hide");
           	  item.classList.add("show");
               count++;
           }
           else{
           	  item.classList.remove("show");
           	  item.classList.add("hide");
           }
       	 })

          if (count == 0){
            MessageForNoportfolioItem.style.display="block";
          }
          else{
            MessageForNoportfolioItem.style.display="none";
          }
          
       }
     })

     portfolioItemsContainer.addEventListener("click", (event) =>{
     	if(event.target.closest(".portfolio-item-inner")){
     	   const portfolioItem = event.target.closest(".portfolio-item-inner").parentElement;
     	   // get the portfolioItem index
     	   itemIndex = Array.from(portfolioItem.parentElement.children).indexOf(portfolioItem);
     	   screenshots = portfolioItems[itemIndex].querySelector(".portfolio-item-img img").getAttribute("data-screenshots");
     	   // convert screenshots into array
     	   screenshots = screenshots.split(",");
     	   if(screenshots.length === 1){
     	   	  prevBtn.style.display="none";
     	   	  nextBtn.style.display="none";
     	   }
     	   else{
     	   	 prevBtn.style.display="block";
     	   	 nextBtn.style.display="block";
     	   }
     	   slideIndex = 0;
     	   popupToggle();
     	   popupSlideshow();
     	   popupDetails();
     	}
     })

     closeBtn.addEventListener("click", () =>{
     	popupToggle();
     	if(projectDetailsContainer.classList.contains("active")){
     		popupDetailsToggle();
     	}
     })

     function popupToggle(){
      // document.getElementsByTagName("body")..style.overflowY = "hidden";
     	popup.classList.toggle("open");
     	bodyScrollingToggle();
     }

     function popupSlideshow(){
     	const imgSrc = screenshots[slideIndex];
     	const popupImg = popup.querySelector(".pp-img");
     	/*activate loader until the popupImg loaded */
     	popup.querySelector(".pp-loader").classList.add("active");
     	popupImg.src=imgSrc;
     	popupImg.onload = () =>{
     	  // deactivate loader after the popupImg loaded
     	  popup.querySelector(".pp-loader").classList.remove("active");
     	}
     	popup.querySelector(".pp-counter").innerHTML = (slideIndex+1) + " of " + screenshots.length;
     }

     // next slide
     nextBtn.addEventListener("click", () =>{
     	if(slideIndex === screenshots.length-1){
     		slideIndex = 0;
     	}
     	else{
     		slideIndex++;
     	}
     	popupSlideshow();
     })

     // prev slide
     prevBtn.addEventListener("click", () =>{
     	if(slideIndex === 0){
     		slideIndex = screenshots.length-1
     	}
     	else{
     		slideIndex--;
     	}
     	popupSlideshow();
     })

     function popupDetails(){
     	 // if portfolio-item-details not exists
     	 if(!portfolioItems[itemIndex].querySelector(".portfolio-item-details")){
            projectDetailsBtn.style.display="none";
            return; /*end function execution*/
     	 }
     	 projectDetailsBtn.style.display="block";
     	// get the project details
     	const details = portfolioItems[itemIndex].querySelector(".portfolio-item-details").innerHTML;
     	// set the project details
     	popup.querySelector(".pp-project-details").innerHTML = details;
     	// get the project title
     	const title = portfolioItems[itemIndex].querySelector(".portfolio-item-title").innerHTML;
     	// set the project title
     	popup.querySelector(".pp-title h2").innerHTML = title;
     	// get the project category
     	const category = portfolioItems[itemIndex].getAttribute("data-category");
     	// set the project category
     	popup.querySelector(".pp-project-category").innerHTML = category.split("-").join(" ");
     }
     
     projectDetailsBtn.addEventListener("click",() =>{
     	popupDetailsToggle();
     
     
     })

     function popupDetailsToggle(){

       
       if(projectDetailsContainer.classList.contains("active")){
       	projectDetailsBtn.querySelector("i").classList.remove("fa-minus");
       	projectDetailsBtn.querySelector("i").classList.add("fa-plus");
         projectDetailsContainer.classList.remove("active");
         projectDetailsContainer.style.maxHeight = 0 + "px"
  
       }
       else{
       	projectDetailsBtn.querySelector("i").classList.remove("fa-plus");
       	projectDetailsBtn.querySelector("i").classList.add("fa-minus");
       	 projectDetailsContainer.classList.add("active");
       	 projectDetailsContainer.style.maxHeight = projectDetailsContainer.scrollHeight + "px";
       	 popup.scrollTo(0,projectDetailsContainer.offsetTop);
       }
     }
   
})();

/*------------------- testimonial slider ---------------------*/ 

(() =>{
  
     const sliderContainer = document.querySelector(".testi-slider-container"),
     slides = sliderContainer.querySelectorAll(".testi-item"),
     slideWidth = sliderContainer.offsetWidth,
     prevBtn = document.querySelector(".testi-slider-nav .prev"),
     nextBtn = document.querySelector(".testi-slider-nav .next"),
     activeSlide = sliderContainer.querySelector(".testi-item.active");
     let slideIndex = Array.from(activeSlide.parentElement.children).indexOf(activeSlide);

     // set width of all slides
     slides.forEach((slide) =>{
     	slide.style.width = slideWidth + "px";
     })
     // set width of sliderContainer 
     sliderContainer.style.width = slideWidth * slides.length + "px";

     nextBtn.addEventListener("click", () =>{
     	if(slideIndex === slides.length-1){
     		slideIndex = 0;
     	}
     	else{
     		slideIndex++;
     	}
     	slider();
     })

     prevBtn.addEventListener("click", () =>{
     	if(slideIndex === 0){
     		slideIndex = slides.length-1;
     	}
     	else{
     		slideIndex--;
     	}
     	slider();
     })

     function slider(){
     	// deactivate existing active slide
     	sliderContainer.querySelector(".testi-item.active").classList.remove("active");
     	// activate new slide
     	slides[slideIndex].classList.add("active");
     	sliderContainer.style.marginLeft = - (slideWidth * slideIndex) + "px";
     }
     slider();

})();

/*----------- hide all sections except active --------------*/ 

// (() =>{
  
//    const sections = document.querySelectorAll(".section");
//    sections.forEach((section) =>{
//    	  if(!section.classList.contains("active")){
//    	  	section.classList.add("hide");
//    	  }
//    })

// })();


 document.querySelector(".preloader").style.display="block";
 window.addEventListener("load", () =>{

 	setTimeout(() =>{
     document.querySelector(".preloader").style.display="none";
 	},900)
 })


// ---------------------------Right corner arrow 

  // const styleSwitcherToggler = document.querySelector(".style-switcher-toggler");

  // styleSwitcherToggler.addEventListener("click", () =>{
 	// let styleswitcher = document.querySelector(".style-switcher")
  //  styleswitcher.classList.toggle("open");
    
  //  if(styleswitcher.classList.contains("open")){

  //       var shareObj = {
  // url: 'http://www.google.com'
  //     },
  //     shareItem = {
  //         init: function(obj){
  //             if(navigator.share){
  //                 console.log('Web Share API is Supported');
  //                 navigator.share(obj).then(function(){
  //                     console.log('Shared!', obj);
  //                 }).catch(function(error){
  //                     console.log('Not Shared! ', error);
  //                   document.querySelector('#result').innerText = error;
  //                 });
  //             }else{
  //                 console.log('Web Share API is not Supported');
  //             }
  //         }
  //     };
        
  //       shareItem.init(shareObj);




  //  }
 
  // })
 
  // //  hide style - switcher on scroll
  // window.addEventListener("scroll", () =>{
  // 	if(document.querySelector(".style-switcher").classList.contains("open")){
  // 		document.querySelector(".style-switcher").classList.remove("open");
  // 	}
  // }) 


  






function ScrollToTop(){
  window.scrollTo(0,0);
}

  const menu = document.querySelector('#mobile-menu');
const menuLinks = document.querySelector('.navbar__menu')

// Display Mobile Menu
const mobileMenu = (e) => {
    menu.classList.toggle('is-active');
    menuLinks.classList.toggle('active');
 
  };
  
  menu.addEventListener('click', mobileMenu);
  
  // Show active menu when scrolling
  const highlightMenu = () => {
    const elem = document.querySelector('.highlight');
    const aboutMenu = document.querySelector('#about-page');
    const referensMenu = document.querySelector('#testimonialPage');
    const portfolioMenu = document.querySelector('#portfolio-page');
    const contactMenu = document.querySelector('#contact-page');

    var scrollPos = window.scrollY;
    // console.log(scrollPos);
  

    // adds 'highlight' class to my menu items
    if(scrollPos < 614  &&  window.innerWidth){
      // aboutMenu.classList.remove('highlight');
      // referensMenu.classList.remove('highlight');
      // portfolioMenu.classList.remove('highlight');
      // contactMenu.classList.remove('highlight');

    }

    else if ((scrollPos >= 615 &&  scrollPos <= 2570) &&  window.innerWidth > 880) {


      aboutMenu.classList.add('highlight');


      referensMenu.classList.remove('highlight');
      portfolioMenu.classList.remove('highlight');
      contactMenu.classList.remove('highlight');
  
      return;

    } 
    
    else if ((scrollPos >= 2571 &&  scrollPos <= 3813) &&  window.innerWidth > 880) {
      portfolioMenu.classList.add('highlight');


      aboutMenu.classList.remove('highlight');
      referensMenu.classList.remove('highlight');
      contactMenu.classList.remove('highlight');
      return;
  
    }
        else if ((scrollPos >= 3814 &&  scrollPos < 4510) &&  window.innerWidth > 880) {

      referensMenu.classList.add('highlight');

       portfolioMenu.classList.remove('highlight');
       aboutMenu.classList.remove('highlight');
       contactMenu.classList.remove('highlight');
      return;
  
    
    }
    else if (scrollPos >= 4511 &&  window.innerWidth > 880) {

      contactMenu.classList.add('highlight');

      portfolioMenu.classList.remove('highlight');
      aboutMenu.classList.remove('highlight');
      referensMenu.classList.remove('highlight');
      
      return;
    }

    
    else if (window.innerWidth > 960 && scrollPos < 3850) {
      // contactMenu.classList.add('highlight');
  
      
      // homeMenu.classList.remove('highlight');
      // skillsMenu.classList.remove('highlight');
      // aboutMenu.classList.remove('highlight');
      // portfolioMenu.classList.remove('highlight');
  
  
      return;
    }
  
    if ((elem && window.innerWIdth < 960 && scrollPos < 600) || elem) {
      elem.classList.remove('highlight');
    }
  };


  window.addEventListener('scroll', highlightMenu);
  window.addEventListener('click', highlightMenu);

    
//  Close mobile Menu when clicking on a menu item
const hideMobileMenu = () => {
  const menuBars = document.querySelector('.is-active');
  if (window.innerWidth <= 768 && menuBars) {
    menu.classList.toggle('is-active');
    menuLinks.classList.remove('active');
  }
};

menuLinks.addEventListener('click', hideMobileMenu);
  
  
  //Banner effect
  window.addEventListener("scroll", function(){
      var header = document.querySelector(".navbar__container");
      header.classList.toggle("sticky", window.scrollY > 100)
    })



    //   ----------------------------------------------------------------END Navbar -----------------------------------------------
