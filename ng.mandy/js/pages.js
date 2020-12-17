
// go look up async and await
const ListPage = async() => {
   let d = await query({type:'animals_by_user_id',params:[sessionStorage.userId]});

   console.log(d);

   $("#list-page .filter-list").html(makeFilterList(d.result));

   drawAnimalList(d.result);
}


const RecentPage = async() => {
   let d = await query({type:'recent_locations',params:[sessionStorage.userId]});
   //console.log(d);

   let valid_animals = d.result.reduce((r,o)=>{
      o.icon = o.img;
      if(o.lat && o.lng) r.push(o);
      return r;
   },[]);

   // clear animal id
   sessionStorage.animalId = "";

   let map_el = await makeMap("#recent-page .map");

   makeMarkers(map_el,valid_animals);

   map_el.data("markers").forEach((o,i)=>{
      o.addListener("click",function(){
         /*
         // SIMPLE EXAMPLE
         sessionStorage.animalId = valid_animals[i].animal_id;
         $.mobile.navigate("#animal-profile-page")
         */
         
         //INFOWINDOW EXAMPLE
         map_el.data("infoWindow")
            .open(map_el.data("map"),o);
         map_el.data("infoWindow")
            .setContent(makeAnimalPopup(valid_animals[i]));
            
         /*
         // ACTIVE EXAMPLE
         $("#recent-drawer").addClass("active");
         $("#recent-drawer .modal-body")
            .html(makeAnimalPopup(valid_animals[i]));
         */   
      })
   });
}


const UserProfilePage = async() => {
   let d = await query({type:'user_by_id',params:[sessionStorage.userId]});
   if (d.error) {
      console.log(d);
      throw d.error;
   }

   let submitted = await query({type:'animals_by_user_id',params:[sessionStorage.userId]});
   if (submitted.error) {
      console.log(submitted);
      throw submitted.error;
   }

   let met = await query({type:'locations_unique_animals_by_user_id',params:[sessionStorage.userId]});
   if (met.error) {
      console.log(met);
      throw met.error;
   }

   let top = await query({type:'locations_top_animal_by_user_id',params:[sessionStorage.userId]});
   if (top.error) {
      console.log(top);
      throw top.error;
   }
   let freq_name = "";
   let freq_img = "";
   if (top.result.length > 0) {
      let a = await query({type:'animal_by_id',params:[top.result[0].animal_id]});
      if (a.error || a.result.length == 0) {
         console.log(a);
         throw a.error;
      }
      freq_name = a.result[0].name;
      freq_img = a.result[0].img;
   }

   $("#user-profile-page .profile")
      .html(makeUserProfile(submitted.result.length, met.result.length, freq_name, freq_img)(d.result));
}

const UserEditPage = async() => {
   let d = await query({type:'user_by_id',params:[sessionStorage.userId]});

   console.log(d);

   $("#user-edit-form")
      .html(makeUserEditForm(d.result[0]))
}

const UserUploadPage = async() => {
   query({
      type:'user_by_id',
      params:[sessionStorage.userId]
   }).then(d=>{
      makeUploaderImage({
         namespace:'user-upload',
         folder:'',
         name:d.result[0].img
      })
   })
}


const AnimalProfilePage = async() => {
   let d = await query({type:'animal_by_id',params:[sessionStorage.animalId]});
   console.log(d);

   let dl = await query({type:'locations_by_animal_id',params:[sessionStorage.animalId]});
   //console.log(dl);
   console.log(sessionStorage.animalId);
   
   $("#animal-profile-page .profile")
         .html(makeAnimalProfile(dl.result.length)(d.result));

   makeMap("#animal-profile-page .map").then(map_el=>{
      makeMarkers(map_el, dl.result)
   });
}


const AnimalAddPage = async() => {
   $("#animal-add-form")
      .html(makeAnimalAddForm);
}


const AnimalEditPage = async() => {
   let d = await query({type:'animal_by_id',params:[sessionStorage.animalId]});

   console.log(d);

   $("#animal-edit-form")
      .html(makeAnimalEditForm(d.result[0]));
}


const LocationAddPage = async() => {
   let map_el = await makeMap("#location-add-page .map");
   makeMarkers(map_el,[]);

   let map = map_el.data('map');

   let animals = await query({type:'animals_by_user_id',params:[sessionStorage.userId]});
   //console.log(animals.result);

   // clear initial data
   $("#location-add-page #location-add-form")[0].reset();
   $("#location-add-page #recent-drawer").removeClass("active");

   map.addListener("click",function(e){
      //console.log(e);
      console.log(sessionStorage.animalId);
      let posFromClick = {lat:e.latLng.lat(),lng:e.latLng.lng()};
      let posFromCenter = {lat:map.getCenter().lat(),lng:map.getCenter().lng()};
      //console.log(posFromClick,posFromCenter);
      $("#location-add-page #location-add-lat").val(posFromClick.lat);
      $("#location-add-page #location-add-lng").val(posFromClick.lng);

      makeMarkers(map_el,[posFromClick],false);

      let drawer = $("#location-add-page #recent-drawer");
      let dclass = drawer.attr('class');
      if(!dclass.includes("active")) {
         drawer.addClass("active");
         // make take list of animals
         $("#location-add-page #location-met-animal").html(makeAnimalIdOptions(animals.result, sessionStorage.animalId));
      }
   });
}