const checkSigninForm = () => {
   let user = $("#signin-username").val();
   let pass = $("#signin-password").val();

   console.log(user,pass)

   if(user == 'user' && pass == 'pass') {
      // logged in
      console.log("success");
      sessionStorage.userId = 3;
   } else {
      // not logged in
      console.log("failure");
      $("#err-msg").css("visibility", "visible");
      sessionStorage.removeItem('userId');

      // DO SOMETHING HERE
   }

   checkUserId();
}


const checkUserId = () => {
   let p = ['#signin-page','#signup-page',''];

   if(sessionStorage.userId === undefined) {
      // not logged in
      if(!p.some(o=>window.location.hash===o))
         $.mobile.navigate("#signin-page");
   } else {
      // logged in
      if(p.some(o=>window.location.hash===o))
         $.mobile.navigate("#recent-page");
   }
}