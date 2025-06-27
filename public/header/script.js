const BOOK_API = "https://openlibrary.org/search.json?limit=5&"; // + "q=the+lord+of";
const COVER_API = "https://covers.openlibrary.org/b/id/"; // + "{id}" + "-S.jpg"

const searchFilterOptions = ["All", "Title", "Author", "Subject", "Publisher"];
var dropDownItems = searchFilterOptions;
const dropDownButton = $("#dropDownInput");
const filterItems = $("#filterItems");
const dropDownIcon = $("#dropDown svg");

const textBar = $("#textBar");
const searchSuggestions = $("#searchSuggestions");
const clearButton = $("#clear");
const searchButton = $("#search");

var sendRequest = true;

function updateFilterButtons(){
   $("#dropDown p").text(dropDownItems[0]);
   filterItems.children().remove();

   dropDownItems.slice(1).forEach(item =>{
      const newItem = $("<li>").text(item);
      filterItems.append(newItem);
   });
}
updateFilterButtons();

function toggleDropDown(){
   if(dropDownButton.prop("checked")){
      filterItems.slideDown(100);
      dropDownIcon.css("transform", "rotate(-180deg)");
   }
   else{
      filterItems.slideUp(100);
      dropDownIcon.css("transform", "rotate(0deg)");
   }
}

dropDownButton.on("change", toggleDropDown);

filterItems.on("click", function(event){
   dropDownItems = searchFilterOptions;
   const item = event.target.textContent;
   dropDownItems = dropDownItems.filter(i => i!==item);
   dropDownItems.unshift(item);

   updateFilterButtons();

   dropDownButton.prop("checked", false);
   toggleDropDown();
});

$(document).on("click", function(event){
   if(!event.target.closest("#dropDownWrapper")){
      dropDownButton.prop("checked", false);
      toggleDropDown();
   }
   if(!event.target.closest("#searchWrapper")){
      searchSuggestions.slideUp(200);
   }
});

textBar.on("focus", function(){
   if(textBar.val()){
      clearButton.css("opacity", 1);
      if(searchSuggestions.children().length === 0){
         sendRequest = true;
         handleSuggestions();
      } else{
         searchSuggestions.slideDown(200);
      }
   } else{
      clearButton.css("opacity", 0);
   }
});

var timeOutId;

textBar.on("input",async function(){
   var searchText = textBar.val().trim();
   if(!searchText){
      clearButton.css("opacity", 0);
      sendRequest = false;
      searchSuggestions.slideUp(200);
      await searchSuggestions.empty();
      return;
   } else{
      clearButton.css("opacity", 1);
      sendRequest = true;
   }

   clearTimeout(timeOutId);
   await new Promise(resolve =>{
      timeOutId = setTimeout(resolve, 400); // delay to determine user has stopped typing
   });
   handleSuggestions();
});

async function handleSuggestions(){
   var searchText = textBar.val().trim();
   if(!searchText){
      return;
   }
   searchSuggestions.slideUp(200);
   await searchSuggestions.empty();

   searchText = (searchText.split(" ")).join("+");
   
   try{
      const filterMethod = dropDownItems[0] === "All" ? "q" : dropDownItems[0].toLowerCase();
      if(!sendRequest){
         return;
      }
      const result = await axios.get(BOOK_API + `${filterMethod}=${searchText}`);
      if(!sendRequest){
         return;
      }
      const books_raw_data = result.data.docs;
      if(books_raw_data.length === 0){
         return;
      }
      var books = [];
      books_raw_data.forEach(book =>{
         books.push({
            author_name: book.author_name,
            cover_i: book.cover_i,
            first_publish_year: book.first_publish_year,
            title: book.title,
            key: book.key
         });
      });

      searchSuggestions.slideUp(200);
      await searchSuggestions.empty();

      books.forEach(async (book, index) =>{
         const item = $(`<li id=${index + "-li"}>`).html(`
            <div id="imgContainer">
               <img src="${COVER_API + book.cover_i + "-M.jpg"}">
            </div>
            <div id="info">
               <h1 id="title">${book.title}</h1>
               <p id="author">By: ${book.author_name.slice(0, 3)}</p>
               <p id="year">Year: ${book.first_publish_year}</p>
            </div>
            `);

         searchSuggestions.append(item);
      });
      searchSuggestions.slideDown(100);

      searchSuggestions.children().on("click", {books},clickedSuggestion);
   } catch{}
};

clearButton.on("click", function(){
   textBar.val("");
   searchSuggestions.slideUp(200);
   searchSuggestions.empty();
   clearTimeout(timeOutId);
   sendRequest = false;
   clearButton.css("opacity", 0);
});

function clickedSuggestion(event){ //triggers when a li from suggestions is clicked
   const books = event.data.books;
   const book = books[parseInt(event.target.id)];
   submitNewForm(book);
}

function submitNewForm(data){
   const form = $("<form action='/new' method='GET'></form>");
   
   const input = $("<input type='hidden' name='data'>");
   input.val(JSON.stringify(data));
   form.append(input);

   $("body").append(form);
   form.submit();
}

searchButton.on("click", submitSearchForm);
textBar.on("keypress", function(event){
   if(event.key === "Enter"){
      submitSearchForm();
   }
});

function submitSearchForm(){
   if(!textBar.val().trim()){
      return;
   }
   const form = $("<form action='/search' method='GET'></form>");

   const inputText = $("<input type='hidden' name='text'>");
   inputText.val(textBar.val().trim());
   form.append(inputText);

   const filterInput = $("<input type='hidden' name='filter'>");
   filterInput.val(dropDownItems[0]);
   form.append(filterInput);

   $("body").append(form);
   form.submit();
}