
  const styleSwitcherToggler = document.querySelector(".style-switcher-toggler");

  styleSwitcherToggler.addEventListener("click", () =>{
 	document.querySelector(".style-switcher").classList.toggle("open");
   
  })
 
  //  hide style - switcher on scroll
  window.addEventListener("scroll", () =>{
  	if(document.querySelector(".style-switcher").classList.contains("open")){
  		document.querySelector(".style-switcher").classList.remove("open");
  	}
  }) 



  /*---------------------- theme colors ----------------------*/
  const alternateStyles = document.querySelectorAll(".alternate-style");

  
  function setActiveStyle(color) {
    localStorage.setItem("color",color);
   	 changeColor();
   } 


//    document.querySelector("#blurred-image-container .img-src").st.addEventListener('load', function() {
//    alert("hello")
// });


  function changeColor(){

    
            alternateStyles.forEach((style) =>{
       if(localStorage.getItem("color") === style.getAttribute("title")){
         style.removeAttribute("disabled");
         
       }
       else{
         style.setAttribute("disabled","true");
       }
     })
  }


//   $("#img-src").on("load", function () {
//     alert("Image has loaded");
//   });







  // checking if 'color' key exists
  if(localStorage.getItem("color") !== null){
     changeColor();
  }


