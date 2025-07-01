const $editButton = $("#view-page .btn.edit");
const $deleteButton = $("#view-page .btn.delete");
const $submitButton = $("#view-page .btn.submit");
const $cancelButton = $("#view-page .btn.cancel");

const $existingRating = $("#view-page .rating span");
const $newRating = $("#view-page .rating input");

const $existingReview = $("#view-page .review");
const $newReview = $("#view-page textarea");

$editButton.on("click", toggleView);
$cancelButton.on("click", toggleView);

function toggleView(){
   $editButton.toggle();
   $deleteButton.toggle();
   $submitButton.toggle();
   $cancelButton.toggle();

   $existingRating.toggle();
   $newRating.toggle();

   $existingReview.toggle();
   $newReview.toggle();
   $newReview.css("height", $newReview.prop("scrollHeight") + "px");
}