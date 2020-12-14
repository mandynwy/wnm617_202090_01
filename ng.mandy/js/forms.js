
const checkSignupForm = () => {
   let username = $("#signup-username").val();
   let email = $("#signup-email").val();
   let password = $("#signup-password").val();
   let passwordconfirm = $("#signup-password-confirm").val();

   if(password!=passwordconfirm) {
      throw "Passwords don't match";
      return;
   } else {
      query({type:'insert_user',params:[username,email,password]})
      .then(d=>{
         if(d.error) {
            throw d.error;
         }
         console.log(d);
         $.mobile.navigate("#signin-page");
      })
   }
}

const checkUserEditForm = () => {
   let username = $("#user-edit-username").val();
   let name = $("#user-edit-name").val();
   let email = $("#user-edit-email").val();

   query({
      type:'update_user',
      params:[username,name,email,sessionStorage.userId]
   }).then(d=>{
      if(d.error) {
         throw d.error;
      }
      window.history.go(-2);
   })
}




const checkAnimalAddForm = () => {
   let name = $("#animal-add-name").val();
   let color = $("#animal-add-color").val();
   let favourite_can_flavor = $("#animal-add-favourite_can_flavor").val();
   let personality = $("#animal-add-personality").val();
   let description = $("#animal-add-description").val();
   let image = $("#animal-add-image").val();

   console.log([sessionStorage.userId,name,color,favourite_can_flavor,personality,description,image]);

   query({
      type:'insert_animal',
      params:[sessionStorage.userId,name,color,favourite_can_flavor,personality,description,image]
   }).then(d=>{
      if(d.error) {
         console.log(d)
         throw d.error;
      }

      $("#animal-add-form")[0].reset();

      sessionStorage.animalId = d.id;
      $.mobile.navigate($("#animal-add-destination").val());
   })
}

const checkAnimalEditForm = () => {
   let name = $("#animal-edit-name").val();
   let color = $("#animal-edit-color").val();
   let favourite_can_flavor = $("#animal-edit-favourite_can_flavor").val();
   let personality = $("#animal-edit-personality").val();
   let description = $("#animal-edit-description").val();
   let image = $("#animal-edit-image").val();

   console.log([name,color,favourite_can_flavor,personality,description,image,sessionStorage.animalId]);

   query({
      type:'update_animal',
      params:[name,color,favourite_can_flavor,personality,description,image,sessionStorage.animalId]
   }).then(d=>{
      if(d.error) {
         console.log(d);
         throw d.error;
      }
      window.history.back();
   })
}




const checkLocationAddForm = () => {
   let lat = $("#location-add-lat").val();
   let lng = $("#location-add-lng").val();
   let description = $("#location-add-description").val();

   query({
      type:'insert_location',
      params:[sessionStorage.animalId,+lat,+lng,description]
   }).then(d=>{
      if(d.error) {
         throw d.error;
      }

      $("#location-add-form")[0].reset();

      console.log(d);

      window.history.go(-2);
   })
}






const checkAnimalDelete = id => {
   query({
      type:'delete_animal',
      params:[id]
   }).then(d=>{
      if(d.error) {
         throw d.error;
      }
      window.history.back();
   })
}







const checkSearchForm = async() => {
   let s = $("#list-search-input").val()
   console.log(s);

   let r = await query({
      type:"search_animals",
      params:[s,sessionStorage.userId]
   })

   drawAnimalList(r.result,"Search produced no results.");

   console.log(r)
}



const checkListFilter = async ({field,value}) => {
   let r = value=="" ?
      await query({
         type:'animals_by_user_id',
         params:[sessionStorage.userId]
      }) :
      await query({
         type:'filter_animals',
         params:[field,value,sessionStorage.userId]
      });

   drawAnimalList(r.result,"Search produced no results.");
}








const checkUpload = file => {
   let fd = new FormData();
   fd.append("image",file);

   return fetch('data/api.php',{
      method:'POST',
      body:fd
   }).then(d=>d.json());
}

const checkUserUploadForm = () => {
   let upload = $("#user-upload-image").val()
   if(upload=="") return;

   query({
      type:'update_user_image',
      params:[upload,sessionStorage.userId]
   }).then(d=>{
      if(d.error) {
         throw d.error;
      }
      window.history.back();
   })
}