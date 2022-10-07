import {datubasea} from './datubasea.js'


let indizea = 0
const URLBASE = 'https://covers.openlibrary.org/b/id/'
let izenburua  = document.getElementById('izenburua');
let irudia = document.getElementById('irudia')
let egilea = document.getElementById('egilea')
let isbn = document.getElementById('isbn')
let aurrera = document.getElementById('aurrera')
let atzera = document.getElementById('atzera')
let bilatu=document.getElementById('bilatu')

function eremuakBete(){
    izenburua.value = datubasea[indizea].izenburua
    data.value = datubasea[indizea].data
    egilea.value = datubasea[indizea].egilea
    isbn.value = datubasea[indizea].isbn
    irudia.src = URLBASE + datubasea[indizea].filename 

}
function convertir(book){
   if( Object.keys(book).length!=0 ){
    egilea.value=book[Object.keys(book)].details.authors.map(author=>author.name)
    isbn.value=isbn.value
    data.value=book[Object.keys(book)].details.created.value
    izenburua.value=book[Object.keys(book)].details.title
    irudia.src=book[Object.keys(book)].thumbnail_url.replace("-S","-M")
   }else{
       egilea.value='not found'
       isbn.value='null'
       data.value='null'
       izenburua.value='null'
       irudia.src=''
   }
    

}

async function internetSearch(isbn){
    let info=await fetch('https://openlibrary.org/api/books?bibkeys=ISBN:'+isbn+'&format=json&jscmd=details').then(r=>{return r.json()});
    convertir(info);
}

function kargatu(){

    eremuakBete()

    aurrera.addEventListener('click', (event) => {
        if (indizea < datubasea.length-1)
            indizea++
        else indizea=0
        eremuakBete()
    })
    atzera.addEventListener('click', (event) => {
        if (indizea > 0)
            indizea--
        else indizea=datubasea.length-1
        eremuakBete()
    })
    bilatu.addEventListener('click',(event)=>{
        if(datubasea.findIndex(Element=>Element.isbn==isbn.value)!=-1){
            indizea=datubasea.findIndex(Element=>Element.isbn==isbn.value)
            eremuakBete()
        }else{ 
            internetSearch(isbn.value)
        }
    })


}

window.onload = kargatu;

