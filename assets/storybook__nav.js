// Used to Indicating that all Images or Loaded or not
let allImagesLoaded = false;

// Making First Step Active Focus by default
$(".storybook").focus();

function previous(event) {
  // event.preventDefault();
  const currentStep = $(".storybook__section.stepActive"); //removeClass("stepActive");
  const currentStepIndex = Number($(currentStep).attr("data-storybook-index"));

  currentStep.removeClass("stepActive stepActiveTransition");

  $("#step" + (currentStepIndex - 1))
    .addClass("stepActive")
    .outerWidth();

  $("#step" + (currentStepIndex - 1)).addClass("stepActiveTransition");

  // Making First Storybook Div Focus, so that it remains in focus as soon as new step gets Active
  $(".storybook").focus();
}

function next(event) {
  // event.preventDefault();
  const currentStep = $(".storybook__section.stepActive");
  const currentStepIndex = Number($(currentStep).attr("data-storybook-index"));

  if (InputChecker(currentStepIndex)) {
    currentStep.removeClass("stepActive");
    currentStep.removeClass("stepActiveTransition");

    $("#step" + (currentStepIndex + 1))
      .addClass("stepActive")
      .outerWidth();
    $("#step" + (currentStepIndex + 1)).addClass("stepActiveTransition");

    // Making First Storybook Div Focus, so that it remains in focus as soon as new step gets Active
    $(".storybook").focus();
  }
}

function nextForCharacter(event) {
  $.LoadingOverlay("show");

  if (allImagesLoaded === true) {
    // all Images Loaded, setTimeout is used, in case if user choose different gender
    // than the default one(e.g female) than OpenGroup Function is Called in (8biticon.js)
    // which will take some time to loaded, so thats why we are using setTimeout
    setTimeout(function() {
      next(event);
      $.LoadingOverlay("hide");
    }, 5000);
  } else {
    setTimeout(function() {
      next(event);
    }, 5000);
  }
}

function nextForImageUrlGetter(event) {
  $.LoadingOverlay("show", {
    image: "",
    text: "Character Building..."
  });
  ImageUrlGetter(event);
}

function nextForPreview(event) {
  $.LoadingOverlay("show", {
    image: "",
    text: "Generating Storybook Preview..."
  });
  Storybook_Product_Maker(event);
}

function nextForEditStory(event) {
  $.LoadingOverlay("show", {
    image: "",
    text: "Generating Story..."
  });
  Story_Generator(event);
}

function InputChecker(index) {
  if (index === 1) {
    let nameValue = $(".person_name_input").val();
    console.log(index, nameValue);
    let relationshipValue = $("#storybookRelationships")
      .children("option:selected")
      .val();
    console.log(index, relationshipValue);
    if (nameValue === "") {
      return false;
    }
    if (relationshipValue === "") {
      return false;
    }
  } else if (index === 2) {
    let photoValue = $("#storybook__photo").val();
    console.log(index, photoValue);
    if (photoValue === "") {
      return false;
    }
  } else if (index === 3) {
    let occupationHobbyValue = $("#storybookOccupation-Hobby")
      .children("option:selected")
      .val();
    console.log(index, occupationHobbyValue);
    if (occupationHobbyValue === "") {
      return false;
    }
  } else if (index === 4) {
    let characteristicsValue = $("#storybookCharacteristics")
      .children("option:selected")
      .val();
    console.log(index, characteristicsValue);
    if (characteristicsValue === "") {
      return false;
    }
  }
  return true;
}

function LoaderForPrevious(event) {
  $.LoadingOverlay("show");
  setTimeout(function() {
    previous(event);
    $.LoadingOverlay("hide");
  }, 5000);
}
// Belongs for Previewing the Uploaded Images
const reader = new FileReader();
reader.onload = function(e) {
  const userUploadPic = document.getElementById("userUploadPic");
  userUploadPic.setAttribute("src", e.target.result);
};

function readURL(input) {
  if (input.files && input.files[0]) {
    reader.readAsDataURL(input.files[0]);
  }
}

const userUploadInput = document.getElementById("storybook__photo");
userUploadInput.addEventListener("change", function(e) {
  readURL(this);
});

// For the TextArea in Storybook Pages Steps
$("#storybook-pages").on("keyup", ".story-page-text", function() {
  const text_length = $(".story-page-text").val().length;
  const text_remaining = 1000 - text_length;
  $(".char-left-message").text(text_remaining + " Characters Remaining");
});

// On Enter Press
$(".storybook").keydown(function(event) {
  if (event.keyCode === 13) {
    if (!(event.target.nodeName === "TEXTAREA")) {
      event.preventDefault();
      $(
        ".stepActive .storybook__controls .storybook__nav_right-container #storybook__nav--right"
      )[0].click();
    }
  }
});
