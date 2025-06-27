const sortOptions = ["Date Modified", "Rating", "Title"];
const orderOptions = ["Descending", "Ascending"];

const sortInput = $("#sortInput");
const orderInput = $("#orderInput");
const sortDropDown = $("#sortDropDown");
const orderDropDown = $("#orderDropDown");

var currentSortList = sortOptions;
var currentOrderList = orderOptions;

function updateSortAndOrder(){
   $("#sortBy p").text(currentSortList[0]);
   $("#orderBy p").text(currentOrderList[0]);
   sortDropDown.children().remove();
   orderDropDown.children().remove();

   currentSortList.slice(1).forEach(item =>{
      const newItem = $("<li>").text(item);
      sortDropDown.append(newItem);
   });
   const orderItem = $("<li>").text(orderOptions[1]);
   orderDropDown.append(orderItem);
}
updateSortAndOrder();

sortInput.on("change", toggleSortDropDown);
orderInput.on("change", toggleOrderDropDown);

function toggleSortDropDown(){
   if(sortInput.prop("checked")){
      sortDropDown.slideDown(50);
      $("#sortBy svg").css("transform", "rotate(180deg)");
   } else{
      sortDropDown.slideUp(50);
      $("#sortBy svg").css("transform", "rotate(0deg)");
   }
}
function toggleOrderDropDown(){
   if(orderInput.prop("checked")){
      orderDropDown.slideDown(50);
      $("#orderBy svg").css("transform", "rotate(180deg)");
   } else{
      orderDropDown.slideUp(50);
      $("#orderBy svg").css("transform", "rotate(0deg)");
   }
}

$(document).on("click", (event)=>{
   if(!event.target.closest("#sortWrapper")){
      sortInput.prop("checked", false);
      toggleSortDropDown();
   }
   if(!event.target.closest("#orderWrapper")){
      orderInput.prop("checked", false);
      toggleOrderDropDown();
   }
});

sortDropDown.on("click", function(event){
   currentSortList = sortOptions;

   const clickedItem = event.target.textContent;
   currentSortList = currentSortList.filter(i => i!= clickedItem);
   currentSortList.unshift(clickedItem);

   updateSortAndOrder();
   sortInput.prop("checked", false);
   toggleSortDropDown();
   sortData();
});

orderDropDown.on("click", function(event){
   currentOrderList.reverse();
   updateSortAndOrder();
   orderInput.prop("checked", false);
   toggleOrderDropDown();
   sortData();
});

sortData();
function sortData(){
   if(currentSortList[0] === "Rating"){
      data.sort((a, b) =>{
         return currentOrderList[0] === "Ascending"
            ? a.rating - b.rating // ascending sort
            : b.rating - a.rating; // descending sort
      });
   } 
   else if(currentSortList[0] === "Date Modified"){
      data.sort((a, b) =>{
         const timeA = Date.parse(a.date_modified);
         const timeB = Date.parse(b.date_modified);
         return currentOrderList[0] === "Ascending"
            ? timeA - timeB // ascending sort
            : timeB - timeA; // descending sort
      });
   }
   else if(currentSortList[0] === "Title"){
      data.sort((a, b)=>{
         const titleA = a.title.toLowerCase();
         const titleB = b.title.toLowerCase();
         return currentOrderList[0] === "Ascending"
            ? titleA.localeCompare(titleB)
            : titleB.localeCompare(titleA);
      });
   }
   showData();
}

async function showData(){
   await $("#AllBooksWrapper").empty();

   data.forEach(book =>{
      const newBook = $(`<div id=${book.id} class='bookWrapper'></div>`);
      newBook.html(`
         <div class="leftContainer">
            <a href=/book/${book.id}>
            <div class="imgWrapper">
               <img src="https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg" loading="lazy">
            </div>
            </a>
            <p class="author">By: ${book.author_name}</p>
            
         </div>
         <div class="rightContainer">
            <a class="title" href=/book/${book.id}>${book.title}</a>
            <p class="year">${book.first_publish_year}</p>
            
            <p class="rating">
               <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-star-fill" viewBox="0 0 16 16">
                  <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>
               </svg> ${book.rating}
            </p>
            <a class="review" href=/book/${book.id}>
               ${book.review.slice(0, 179) + (book.review.length >= 180 ? "..." : "")}
            </a>
         </div>
         `);

      $("#AllBooksWrapper").append(newBook);
   });
}