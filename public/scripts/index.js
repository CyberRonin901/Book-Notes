if($("#home-page").length !== 0){
   const $sort = $("select#sort");
   const $order = $("select#order");
   const $books = $("#home-page .books");

   $sort.on("change", arrangeBooks);
   $order.on("change", arrangeBooks);

   arrangeBooks();

   function arrangeBooks(){
      if($sort.val() === "rating"){
         booksData.sort((a, b) =>{
            return $order.val() === "asc"
               ? a.rating - b.rating // ascending sort
               : b.rating - a.rating; // descending sort
         });
      } 
      else if($sort.val() === "dateModified"){
         booksData.sort((a, b) =>{
            const timeA = Date.parse(a.date_modified);
            const timeB = Date.parse(b.date_modified);
            return $order.val() === "asc"
               ? timeA - timeB // ascending sort
               : timeB - timeA; // descending sort
         });
      }
      else if($sort.val() === "title"){
         booksData.sort((a, b)=>{
            const titleA = a.title.toLowerCase();
            const titleB = b.title.toLowerCase();
            return $order.val() === "asc"
               ? titleA.localeCompare(titleB)
               : titleB.localeCompare(titleA);
         });
      }
      showBooks();
   }

   async function showBooks(){
      await $books.empty();

      booksData.forEach(book =>{
         const newBook = $(`<li></li>`);
         newBook.html(`
            <a href='/books/book/${book.id}' style='display: contents'>
               <div class='left-container'>
                  <div>
                     <img src="https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg" loading="lazy">
                  </div>
                  <p class="author">By: ${book.author_name}</p>
               </div>

               <div class='right-container'>
                  <p class="title">${book.title}</p>
                  <p class="year">${book.first_publish_year}</p>
                  
                  <p class="rating">
                     <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-star-fill" viewBox="0 0 16 16">
                        <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>
                     </svg> ${book.rating}
                  </p>
                  <p class="review">
                     ${book.review.slice(0, 179) + (book.review.length >= 180 ? "..." : "")}
                  </p>
               </div>
            </a>
            `);

         $books.append(newBook);
      });
   }
}