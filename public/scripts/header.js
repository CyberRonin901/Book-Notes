const BOOK_API = "https://openlibrary.org/search.json?limit=5&"; // + "q=the+lord+of+the+rings"; example use
const COVER_API = "https://covers.openlibrary.org/b/id/"; // + "{id}" + "-S.jpg"

const $searchFilter = $("nav select");
const $searchBar = $("input[type='search']");
const $searchSuggestions = $("nav #suggestions");

const $userPic = $("nav img");
const $userOptions = $("nav .user");

var timeOutId;
var books = [];

$searchBar.on("input", showSuggestions);

$searchBar.on("focus", function () {
   if (!$searchBar.val()) return;
   if ($searchSuggestions.children().length === 0) {
      showSuggestions();
   } else {
      $searchSuggestions.slideDown(100);
   }
});

$(document).on("click", function (event) {
   if(!event.target.closest("nav #search-wrapper")) {
      $searchSuggestions.slideUp(200);
   }
   if(event.target.closest("nav #suggestions")) {
      handleAddBookClick(event.target.id);
   }

   if(!event.target.closest("nav .user") && event.target !== $userPic[0]){
      $userOptions.hide();
   } else if(event.target === $userPic[0]){
      $userOptions.toggle();
   } else if(event.target === $("nav .user svg")[0]){
      $userOptions.hide();
   }
});

async function showSuggestions() {
   const searchText = $searchBar.val().trim();
   if (!searchText) {
      $searchSuggestions.slideUp(100);
      await $searchSuggestions.empty();
      return;
   }

   clearTimeout(timeOutId);
   await new Promise(resolve =>{
      timeOutId = setTimeout(resolve, 400); // delay to determine user has stopped typing
   });

   $searchSuggestions.slideUp(100);
   await $searchSuggestions.empty();

   var text = (searchText.split(" ")).join("+");
   const filterMethod = $searchFilter.val();

   const result = await axios.get(BOOK_API + `${filterMethod}=${searchText}`)
                        .catch(e =>{
                           console.log(e);
                           return;
                        });

   const books_raw_data = result.data.docs;
   if (books_raw_data.length === 0) return;

   books = [];
   books_raw_data.forEach(book => {
      books.push({
         author_name: book.author_name,
         cover_i: book.cover_i,
         first_publish_year: book.first_publish_year,
         title: book.title,
         key: book.key
      });
   });
   $searchSuggestions.slideUp(100);
   await $searchSuggestions.empty();

   books.forEach(async (book, index) => {
      const item = $(`<li id=${index + "-of-books"}>`).html(`
            <div>
               <img src="${COVER_API + book.cover_i + "-M.jpg"}">
            </div>
            <div class="details">
               <p class="title">${book.title}</p>
               <p class="author">By: ${book.author_name.slice(0, 3)}</p>
               <p class="year">Year: ${book.first_publish_year}</p>
            </div>
            `);

      $searchSuggestions.append(item);
   });
   $searchSuggestions.slideDown(100);
};

async function handleAddBookClick(id){
   const book = books[parseInt(id)];
   if(!book) return;

   const newForm = $("<form action='/books/new' method='GET' hidden></form>");
   const input = $(`<input type="text" name="data" value="${encodeURIComponent(JSON.stringify(book))}">`);

   newForm.append(input);
   $("body").append(newForm);
   newForm.submit();
}