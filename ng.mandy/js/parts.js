
const makeAnimalList = templater(o=>`
   <div class="animallist-item js-animal-jump" data-id="${o.id}">
      <div class="animallist-icon">
         <img src="${o.img}" alt="">
      </div>
      <div class="animallist-description">
         <div class="animallist-name">${o.name}</div>
         <div class="animallist-color"><strong>Color</strong> ${o.color}</div>
         <div class="animallist-favourite_can_flavor"><strong>Favourite Can Flavor</strong> ${o.favourite_can_flavor}</div>
         <div class="animallist-personality"><strong>Personality</strong> ${o.personality}</div>
      </div>
   </div>
   `);

const makeUserProfile = templater(o=>`
   <div class="user-profile-image ">
      <a href="#user-upload-page">
         <img src="${o.img}" alt="">
      </a>
   </div>
   <div style="padding:1em">
      <h2>${o.name}</h2>
      <h3>@${o.username}</h3>
      <h3>${o.email}</h3>
   </div>
   <div class="profile-info2">
      <div class="info-name">MET CAT</div>
      <div class="info-value">21 Cats</div>   
   </div>
   <div class="profile-info2">
      <div class="info-name">MOST MET CAT</div>
      <div class="info-value">Jasper</div>   
   </div>  
   `);

const makeAnimalProfile = pet_times => templater(o=>`
<div class="animal-profile">
   <div class="animal-profile-image flex-stretch display-flex flex-align-center flex-justify-center">
      <img src="${o.img}"  style="width:30%;height:30%;border-radius: 20%;margin-top:0.5em;" class="icon"alt="cat-profile-pic">
   </div>
     <div class="profile-info">
     <div class="info-name1"><strong>${o.name}</strong></div>
     <div class="info-value">Petted<strong> ${pet_times}</strong> Times!</div></div>


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
   <div class="info-name">Activity </div>
    <div class="info-value">${o.description}</div></div>

   
   <div class="profile-info2"><div><a href="#" class="js-animal-delete" data-id="${o.id}">Delete</a></div></div>
</div></div>`);


const makeAnimalPopup = o => `
<div class="display-flex animal-popup" style="flex-wrap:wrap">
   <div class="flex-none">
      <div class="animal-image">
         <img src="${o.img}"  alt="">
      </div>
   </div>
   <div class="flex-none animal-popup-description">
      <h2>${o.name}</h2>
      <h2>${o.favourite_can_flavor}</h2>
   </div>
   <div class="form-button js-animal-jump" data-id="${o.animal_id}" style="width:100%">Visit</div>
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
   <select class="form-select" name="location-add-animal-id" id="location-add-animal-id">`+
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


const drawAnimalList = (a,empty_phrase="No cats yet, you should add some.") => {
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
   <div class="filter" data-field="favourite_can_flavor" data-value="">All</div>
   ${filterList(animals,'favourite_can_flavor')}
   `
}


const makeUploaderImage = (el, name, folder='') => {

   $(el).parent().css({'background-image':`url(${folder+name}`}).addClass('picked')
      .prev().val(folder+name);
}