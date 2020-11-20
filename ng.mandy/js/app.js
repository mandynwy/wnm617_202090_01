


$(()=>{




   checkUserId();

   // event delegation
   $(document)

   .on("pagecontainerbeforeshow",function(e,ui) {
      // console.log(ui.toPage[0].id)

      // Page Routing
      switch(ui.toPage[0].id) {

         case "recent-page": RecentPage(); break;
         case "list-page": ListPage(); break;

         case "user-profile-page": UserProfilePage(); break;
         case "user-edit-page": UserEditPage(); break;

         case "animal-profile-page": AnimalProfilePage(); break;
         case "animal-edit-page": AnimalEditPage(); break;

         case "location-add-page": LocationAddPage(); break;
      }
   })



   // FORM SUBMITS

   .on("submit","#signin-form",function(e){
      e.preventDefault();
      checkSigninForm();
   })

   .on("submit","#signup-form",function(e){
      e.preventDefault();
      checkSignupForm();
   })





   // FORM SUBMIT CLICKS

   .on("click",'.js-user-edit',function(e){
      checkUserEditForm();
   })
   .on("click",'.js-animal-add',function(e){
      checkAnimalAddForm();
   })
   .on("click",'.js-animal-edit',function(e){
      checkAnimalEditForm();
   })
   .on("click",'.js-location-add',function(e){
      checkLocationAddForm();
   })




   // ANCHOR CLICKS

   .on("click",'.js-logout',function(e){
      sessionStorage.removeItem('userId');
      checkUserId();
   })

   .on("click",'.js-animal-jump',function(e){
      sessionStorage.animalId = $(this).data("id");
      $.mobile.navigate('#animal-profile-page');
   })

   .on("click",'.js-animal-delete',function(e){
      checkAnimalDelete($(this).data("id"));
   })














   .on('click','[data-activate]',function(e){
      let target = $(this).data('activate');
      $(target).addClass("active")
   })
   .on('click','[data-deactivate]',function(e){
      let target = $(this).data('deactivate');
      $(target).removeClass("active")
   })
   .on('click','[data-toggle]',function(e){
      let target = $(this).data('toggle');
      $(target).toggleClass("active")
   })

})