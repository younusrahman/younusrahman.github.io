

function ConformedSendingMail() {
console.log("heloo")
  var name = $('#Name').val();
  var email = $('#Sender').val();
  var subject = $('#Subject').val();
  var message = $('#Message').val();

  var Body = 'Name: ' + name + '<br>Email: ' + email + '<br>Subject: ' + subject + '<br>Message: ' + message;




  Email.send({
    SecureToken : "66f052f8-5183-482f-9c8f-b069f86b4305",
    To: 'younusrahman@gmail.com',
    From: "yrsoftwaredeveloper@gmail.com",  
    Subject: subject,
    Body: Body}).then(
    message => {
      if (message == 'OK') {
        document.querySelector(".preloader").style.display = "none"
        swal({
          title: "Thank You " + name + " !",
          text: "Your message was successfully delivered!",
          icon: "img/email.gif ",
        })



        document.getElementById("contact-form").reset();

        let checkicons = document.getElementsByClassName('fa-check-circle');
        let inputBorder = document.getElementsByClassName('input_border');
        for(i=0; i < 3; i++ ){
          
          checkicons[i].style.visibility='hidden';
          inputBorder[i].style.borderColor = "white"
            
        }

 



      }
      else {
        document.querySelector(".preloader").style.display = "none"
        swal({
          title: "Sorry " + name + " !",
          text: "Could not send your e-mail!",
          icon: "img/error.gif",
        })

      }
          // emailwait.style.display="none"
    }
  )

}

  // ---------------------------------- Checking filed---------------------------
  const form = document.getElementById('contact-form');
  const name = document.getElementById('Name');
  const email = document.getElementById('Sender');
  const subject = document.getElementById('Subject');
  // const emailwait = document.getElementById('emailSendingWait');

const sendData = (sRate) =>{
  
  if(sRate === 3){

    ConformedSendingMail();
    
  }
}

const SuccessMsg = () =>{
  
  let formCon = document.getElementsByClassName('user-box');
  document.querySelector(".preloader").style.display = "block"

  for(i=1; i < 4; i++ ){
    
    
    if (formCon[i-1].className == "user-box success" ){
    
 
      var sRate = 0 + i;
      sendData(sRate);
    }else {
      document.querySelector(".preloader").style.display = "none"
      return false;
    }
      
  }
}

  function sendmail(){

    const nameVal = name.value.trim();
    const emailVal = email.value.trim();
    const subjectVal = subject.value.trim();




    // --------------name
    if(nameVal === ""){
      setErrorMsg(name, 'Name can not be blank')
    }
    else{
      setSuccessMsg(name)
    }
    // --------------email
    if(emailVal === "" || !emailVal.includes("@") || !emailVal.includes(".") ){
      setErrorMsg(email, 'Invalid email address!')
    }

    else{
      setSuccessMsg(email)
    }
    // --------------subject
    if(subjectVal === ""){
      setErrorMsg(subject, 'Subject can not be blank')
    }
    else{
      // emailwait.style.display="block"
      setSuccessMsg(subject)
    }

 
    SuccessMsg();

  }

  function setErrorMsg(input,errormsgs){
    const formControl = input.parentElement;
    const small = formControl.querySelector('small');
    formControl.className = "user-box error";
    small.innerText = errormsgs;
  }

  function setSuccessMsg(input){
    const formControl = input.parentElement;
    formControl.className =  "user-box success"
  }



  function copyToClipboard(id){

    var text = document.getElementById(id).innerText;
    var elem = document.createElement("textarea");
    document.body.appendChild(elem);
    elem.value = text;
    elem.select();
    document.execCommand("copy");
    document.body.removeChild(elem);
    
    swal({title: "Copied",
          text: "Text has been copied to the clipboard"})
    
    }

  

(() =>{
    
    document.getElementById("contact")
    .addEventListener('click', function(e){

      const mapdiv = document.getElementById("mapdiv")

     const closeBtn = mapdiv.querySelector("i");
    //  console.log(e.target.closest("p")getAttribute('adress'))
      if(e.target.closest("p") != null){

          if(e.target.closest("p").getAttribute('data-target') == "adress")
                {
                  
                      mapdiv.style.visibility = "visible";
                      mapdiv.style.opacity = 1;


                }

                else if(e.target.closest("p").getAttribute('data-target') == "email"){
                  copyToClipboard("copyContactEmail")
                }
          
          
                else if(e.target.closest("p").getAttribute('data-target') == "phone"){
                  copyToClipboard("copyContactPhone")

                }

      }
     
           
       closeBtn.addEventListener("click", () =>{
              mapdiv.style.visibility = "hidden";
              mapdiv.style.opacity = 0;

       })

    
	  // let gottab = e.target.closest(".contact-item-inner")

    // let spantext = e.target.closest("span").innerText

    // if(spantext == "Address")
    // {       console.log("-------inside")
    //       e.target.closest("iframe").style.display = "block"; 
    // }


	 
    // .getElementsByTagName("span")[0])
  
  
  })
})()


// copy text in footer



