const cl = console.log;


const hideshow = [...document.querySelectorAll('.hideshow')]
const backdrop = document.getElementById('backdrop')
const mfrom = document.getElementById('mform')
const mtitle = document.getElementById('mtitle')
const murl = document.getElementById('murl')
const mdescription = document.getElementById('mdescription')
const mrating = document.getElementById('mrating')
const submitmbtn = document.getElementById('submitmbtn')
const updatembtn = document.getElementById('updatembtn')
const dropdown = document.getElementById('dropdown')
const moviescontainer = document.getElementById('moviescontainer')




const onhideshow = () =>{
    backdrop.classList.toggle('d-none')
    dropdown.classList.toggle('d-none')
}
let moviearr = localStorage.getItem('moviearr') ? JSON.parse(localStorage.getItem('moviearr')) : []
const generateUuid = ()=>{
    return (
      String('xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx')
    ).replace(/[xy]/g, (character) => {
      const random = (Math.random() * 16) | 0;
      const value = character === "x" ? random : (random & 0x3) | 0x8;
      return value.toString(16);
    });
  };
const ratingcolor = (r) => {
    if(r < 3){
        return 'bg-danger'
    }else if(r >= 3 && r <=4){
        return 'bg-warning'
    }else{
        return 'bg-info'
    }
}
const createcols = () => {
    let result = ``
    moviearr.forEach(movie => {
        result += `<div class="col-3" id="${movie.id}">
            <figure>
                <img src="${movie.murl}" alt="movie-img">
                <div class="ratingtitle d-flex justify-content-between px-3">
                    <div class="title">
                        ${movie.mtitle}
                    </div>
<small class="${ratingcolor(movie.mrating)} p-1">${movie.mrating}</small>
                
                </div>
                <div class="description">
                    <div class="editremove d-flex justify-content-between p-2">
                        <i class="fas fa-edit fa-2x text-warning " onclick="onedit(this)"></i>
                        <i class="fas fa-trash fa-2x text-danger" onclick="onremove(this)"></i>
                    </div>
<p> ${movie.mdescription} </p>
                    </div>
            </figure>
        </div>`
        moviescontainer.innerHTML = result
    })
}
createcols()
const onformsubmit = (e) =>{
    e.preventDefault()
    let obj ={
mtitle: mtitle.value,
murl: murl.value,
mdescription: mdescription.value,
mrating: mrating.value,
id: generateUuid()
    }
    mfrom.reset()
    moviearr.unshift(obj)
    localStorage.setItem('moviearr', JSON.stringify(moviearr))
let col = document.createElement('div')
col.className = 'col-3'
col.id = obj.id
col.innerHTML = ` <figure>
                <img src="${obj.murl}" alt="movie-img">
                <div class="ratingtitle d-flex justify-content-between px-3">
                    <div class="title">
                        ${obj.mtitle}
                    </div>
<small class="${ratingcolor(obj.mrating)} p-1">${obj.mrating}</small>
                
                </div>
                <div class="description">
                    <div class="editremove d-flex justify-content-between p-2">
                        <i class="fas fa-edit fa-2x text-warning " onclick="onedit(this)"></i>
                        <i class="fas fa-trash fa-2x text-danger" onclick="onremove(this)"></i>
                    </div>
${obj.mdescription}
                    <p> </p>
                    </div>
            </figure>`
moviescontainer.prepend(col)
backdrop.classList.add('d-none')
dropdown.classList.add('d-none')
}

const onedit = (e) =>{
    let editid = e.closest('.col-3').id
    localStorage.setItem('editid', editid)
    let editobj = moviearr.find(ele => ele.id == editid)
    backdrop.classList.remove('d-none')
dropdown.classList.remove('d-none')
    mtitle.value = editobj.mtitle
    murl.value = editobj.murl
    mdescription.value = editobj.mdescription
    mrating.value = editobj.mrating
    
    submitmbtn.classList.add('d-none')
    updatembtn.classList.remove('d-none')
}
const onupdatem = () => {
    let editid = localStorage.getItem('editid')
    let updateindex = moviearr.findIndex(m => m.id == editid)
    let newobj = {
        mtitle: mtitle.value,
        murl: murl.value,
        mdescription: mdescription.value,
        mrating: mrating.value,
        id: editid
    }
    moviearr[updateindex] = newobj
    localStorage.setItem('moviearr', JSON.stringify(moviearr))
    submitmbtn.classList.remove('d-none')
    updatembtn.classList.add('d-none')
    backdrop.classList.add('d-none')
    dropdown.classList.add('d-none')
    mfrom.reset()
    let div = document.getElementById(editid)
    let img = div.querySelector('img')
    img.setAttribute('src', newobj.murl)
    let title = div.querySelector('.title') 
    title.innerHTML = newobj.mtitle
    let rating  = div.querySelector('small')
    rating.className = `${ratingcolor(newobj.mrating)} p-1`
    rating.innerHTML = newobj.mrating
    let description = div.querySelector('.description').lastElementChild
    description.innerHTML = newobj.mdescription
}
const onremove = (e) =>{
    let removeid = e.closest('.col-3').id 
    let index = moviearr.findIndex(m => m.id == removeid)
    moviearr.splice(index, 1)
    localStorage.setItem('moviearr', JSON.stringify(moviearr))
    document.getElementById(removeid).remove()
}

hideshow.forEach(ele => ele.addEventListener('click', onhideshow))
mfrom.addEventListener('submit', onformsubmit)
updatembtn.addEventListener('click', onupdatem)