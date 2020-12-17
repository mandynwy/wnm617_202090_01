
const makeAnimalList = templater(o=>`
   <div class="animallist-item js-animal-jump" data-id="${o.id}">
      <div class="animallist-icon">
         <img src="${o.img}" alt="">
      </div>
      <div class="animallist-description">
         <div class="animallist-name">${o.name}</div>
         <!--<div class="animallist-color"><strong>Color</strong> ${o.color}</div>
         <div class="animallist-favourite_can_flavor"><strong>Favourite Can Flavor</strong> ${o.favourite_can_flavor}</div>-->
         <div class="animallist-personality">${o.personality}</div>
      </div>
   </div>
   `);

const makeUserProfile = (met_cats, seen_cats, freq_name, freq_img) => templater(o=>`
   <div class="user-profile-image ">
      <a href="#user-upload-page">
         <img src="${o.img}" alt="">
      </a>
      <h2>${o.name}</h2>
      <h3>@${o.username}</h3>
   </div>
   <div class="profile-info3">
      <div class="profile-info2">
         <div class="info-name">MET</div>
         <div class="info-value">${met_cats} Cats</div>
      </div>
      <div class="profile-info2">
         <div class="info-name">PET</div>
         <div class="info-value">${seen_cats} Times</div>
      </div>`+
   ((freq_name=="" || freq_img=="") ? ``:`
      <div class="profile-info2">
         <div class="info-name">MOST FREQUENTLY PET</div>
         <div class="info-value">${freq_name}</div>
         <div class="animal-profile-image">
            <img src="${freq_img}" class="icon profile-icon" alt="">
         </div>
      </div>`)+
   `</div>
   `);

const makeAnimalProfile = pet_times => templater(o=>`
<div class="animal-profile">
   <div class="animal-profile-image flex-stretch display-flex flex-align-center flex-justify-center">
      <img src="${o.img}" class="icon profile-icon" alt="">
   </div>
   <div class="profile-info">
   <div class="info-name1"><strong>${o.name}</strong></div>
   <div class="info-value-pet-time">Petted<strong> ${pet_times}</strong> Times!</div></div>


   <div class="profile-info2">
   <div class="info-name">Color</div>
   <div class="info-value">${o.color}</div></div>

   <div class="profile-info2">
   <div class="info-name">Favourite Can Food</div>
    <div class="info-value">${o.favourite_can_flavor}</div></div>

   <div class="profile-info2">
   <div class="info-name">Personality </div>
   <div class="info-value">${o.personality}</div></div>

   <div class="profile-info2">
   <div class="info-name">Description </div>
   <div class="info-value">${o.description}</div></div>

   <div class="profile-info2">
      <a href="#" class="js-animal-delete" data-id="${o.id}">Delete</a>
   </div>
</div>`);


const makeAnimalPopup = o => `
<div class="display-flex animal-popup" style="flex-wrap:wrap">
   <div class="display-flex animal-image">
      <div class="flex-none">
         <img src="${o.img}" alt="">
      </div>
      <div class="display-flex" style="padding-left:1em;padding-top:0.5em;">
         <h2>${o.name}</h2>
      </div>
   </div>
   <div class="flex-none animal-popup-description">
      <textarea id="animal-popup-text-description" class="form-input" data-role="none" style="overflow:auto;height:6em;" disabled>${o.description}</textarea>
   </div>
   <div class="form-button js-animal-jump" data-id="${o.animal_id}" style="width:100%">View Profile</div>
</div>
`;


const FormControl = ({namespace,name,displayname,type,placeholder,value}) => {
   return `<div class="form-control">
   <label for="${namespace}-${name}" class="form-label">${displayname}</label>
   <input id="${namespace}-${name}" type="${type}" class="form-input" data-role="none" placeholder="${placeholder}" value="${value}">
   </div>`;
}

const FormSelect = ({namespace,name,displayname,type,placeholder,value,options}) => {
   return `<div class="form-control">
   <label for="${namespace}-${name}" class="form-label">${displayname}</label>
   <select name="${namespace}-${name}" id="${namespace}-${name}" class="form-select">`+
   options.reduce((str,opt) => `${str}<option value="${opt}"`+(opt==value?` selected`:``)+`>${opt}</option>`, '')+
   `</select>
   </div>`;
}

const makeAnimalIdOptions = (a,aid) => {
   return `<label class="form-label">Who did you meet?</label>
   <select class="form-select`+
   (aid=="" ? ``:` form-select-none`)+
   `" name="location-add-animal-id" id="location-add-animal-id">`+
   a.reduce((str,opt) => `${str}<option value="${opt.id}"`+(opt.id==aid?` selected`:``)+`>${opt.name}</option>`, '')+
   `</select>`;
}

const makeUserEditForm = o => `
${FormControl({
   namespace:'user-edit',
   name:'username',
   displayname:'Username',
   type:'text',
   placeholder:'Type your user name',
   value:o.username
})}
${FormControl({
   namespace:'user-edit',
   name:'name',
   displayname:'Name',
   type:'text',
   placeholder:'Type your full name',
   value:o.name
})}
${FormControl({
   namespace:'user-edit',
   name:'email',
   displayname:'Email',
   type:'text',
   placeholder:'Type your email',
   value:o.email
})}
`;

const makeAnimalAddForm = `
<input type="hidden" id="animal-add-destination" value="#list-page">
<input type="hidden" id="animal-add-image">
<label class="image-uploader thumbnail">
   <input type="file" data-role="none" id="animal-add-upload">
</label>
${FormControl({
   namespace:'animal-add',
   name:'name',
   displayname:'Name',
   type:'text',
   placeholder:'Type the cat name',
   value:''
})}
${FormControl({
   namespace:'animal-add',
   name:'color',
   displayname:'Color',
   type:'text',
   placeholder:'Type the color',
   value:''
})}
${FormSelect({
   namespace:'animal-add',
   name:'favourite_can_flavor',
   displayname:'Favourite Can Flavor',
   type:'text',
   placeholder:'Type the favourite can flavor',
   value:'Beef',
   options:['Beef','Chicken','Salmon','Tuna']
})}
${FormSelect({
   namespace:'animal-add',
   name:'personality',
   displayname:'Personality',
   type:'text',
   placeholder:'Type the personality',
   value:'Aggressive',
   options:['Aggressive','Chatty','Friendly','Playful','Shy']
})}
<div class="form-control">
   <label for="animal-add-description" class="form-label">Description</label>
   <textarea id="animal-add-description" class="form-input" data-role="none" placeholder="Type a description" style="height:6em"></textarea>
</div>
`;


const makeAnimalEditForm = o => `
<input type="hidden" id="animal-edit-image" value="${o.img}">
<label class="image-uploader thumbnail picked" style="background-image:url('${o.img}')">
   <input type="file" data-role="none" id="animal-edit-input">
</label>
${FormControl({
   namespace:'animal-edit',
   name:'name',
   displayname:'Name',
   type:'text',
   placeholder:'Type the cat name',
   value:o.name
})}
${FormControl({
   namespace:'animal-edit',
   name:'color',
   displayname:'Color',
   type:'text',
   placeholder:'Type the color',
   value:o.color
})}
${FormSelect({
   namespace:'animal-edit',
   name:'favourite_can_flavor',
   displayname:'Favourite Can Flavor',
   type:'text',
   placeholder:'Type the favourite can flavor',
   value:o.favourite_can_flavor,
   options:['Beef','Chicken','Salmon','Tuna']
})}
${FormSelect({
   namespace:'animal-edit',
   name:'personality',
   displayname:'Personality',
   type:'text',
   placeholder:'Type the personality',
   value:o.personality,
   options:['Aggressive','Chatty','Friendly','Playful','Shy']
})}
<div class="form-control">
   <label for="animal-edit-description" class="form-label">Description</label>
   <textarea id="animal-edit-description" class="form-input" data-role="none" placeholder="Type a description" style="height:6em">${o.description}</textarea>
</div>
`;


const drawAnimalList = (a,empty_phrase="<br>No cats yet, you should add some.") => {
   $("#list-page .animallist").html(
      a.length ? makeAnimalList(a) : empty_phrase
   )
}


const capitalize = s => s[0].toUpperCase()+s.substr(1);

const filterList = (animals,type) => {
   let a = [...(new Set(animals.map(o=>o[type])))];
   return templater(o=>`| <div class="filter" data-field="${type}" data-value="${o}">${capitalize(o)}</div>`)(a);
}

const makeFilterList = (animals) => {
   return `
   <div class="filter" data-field="personality" data-value="">All</div>
   ${filterList(animals,'personality')}
   `
}


const makeUploaderImage = (el, name, folder='') => {

   $(el).parent().css({'background-image':`url(${folder+name}`}).addClass('picked')
      .prev().val(folder+name);
}