const editButton = $("#editBtn");
const deleteButton = $("#deleteBtn");

const submitButton = $("#submitBtn");
const cancelButton = $("#cancelBtn");

editButton.on("click", toggleInput);
cancelButton.on("click", toggleInput);

function toggleInput(){
   editButton.toggle();
   deleteButton.toggle();

   submitButton.toggle();
   cancelButton.toggle();

   $("#ratingInput").toggle();

   $("#reviewInput").toggle();
   $("#reviewInput").css("height", $("#reviewInput").prop("scrollHeight") + "px");

   $("#rating_old").toggle();
   $("#review_old").toggle();
}