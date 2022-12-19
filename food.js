let main = document.getElementById('main');
let text = document.getElementById('text');
let button = document.getElementById('button');
let grid=document.querySelector('#grid');
let naame=document.querySelector(".name");
let ingredient=document.querySelector("#ingredient");
let forimage=document.querySelector('#container');
let ingredlist=document.querySelector("#modal-content");
let naam=document.querySelector(".naam");
let image=document.querySelector(".image");
let display=document.querySelector("#results")



var search='';

button.addEventListener('click', () => {
  if((text.value)!=""){
  search=text.value;
  text.value="";
  forimage.innerHTML="";
  display.innerHTML="Results for your search: ";
  allfood(search);
  }


  async function allfood(alt) {
    fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${alt}`)
     .then((data) => data.json())
     .then((res) => {
       let use = res.meals;
      //  console.log(res)
       let id=[];
       use.forEach((elt) => {
         forimage.innerHTML+=`
         <div class='toset'>
         <img src='${elt.strMealThumb}' class='random' >
         <h4 class='centre'>${elt.strMeal}<h4>
         <button id="btn" class="${elt.idMeal}">Ingredients</button>
         </div>
         `
         id.push(`${elt.idMeal}`);
 

       });


       let att=document.querySelectorAll("#btn");
       att.forEach((elt)=>{
        elt.addEventListener("click",()=>{

          fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${elt.className}`)
          .then(res=>res.json())
          .then((res)=>{
            let resul=res.meals[0];
            let ingredients=[]
            for(let i=1;i<=20;i++){
                let ing=resul[`strIngredient${i}`]
                if(ing&&ing!=""){
                    ingredients.push(ing)
                    
                }
              }
    
              ingredlist.innerHTML="";
              
              ingredients.forEach((elt)=>{
              ingredlist.innerHTML+=`
              <ul>
              <li class="list">🍴${elt}</li>
              </ul>
              `;
            })
              
    
             
                document.getElementById('modal').style.display = 'flex'
    
    
              
              document.getElementById('modal').onclick = ()=>{
                document.getElementById('modal').style.display = 'none'
    
              }
          }).catch(()=>{
            console.log("Invalid API")
          })


        })
       })



     }).catch(()=>{
       display.innerHTML=`Results for your search: <br> Sorry, we cannot find any item`
     })
 }
 

 



});




 fetch(`https://www.themealdb.com/api/json/v1/1/random.php`)
    .then((reso) => reso.json())
    .then((res) => {


     

        let resul=res.meals[0];
        let ingredients=[]
        for(let i=1;i<=20;i++){
            let ing=resul[`strIngredient${i}`]
            if(ing&&ing!=""){
                ingredients.push(ing)
                
            }
          }

          ingredlist.innerHTML="";
          
          ingredients.forEach((elt)=>{
          ingredlist.innerHTML+=`
          <ul>
          <li class="list">🍴${elt}</li>
          </ul>
          `;
        })

          ingredient.onclick=()=>{
            document.getElementById('modal').style.display = 'flex'


          }
          document.getElementById('modal').onclick = ()=>{
            document.getElementById('modal').style.display = 'none'

          }
          
      image.setAttribute('src', `${res.meals[0].strMealThumb}`);
      image.setAttribute('class', 'ott');

      naam.innerHTML=`${res.meals[0].strMeal}`
      
    })
    .catch(() => {
      console.log('Invalid API');
    });

