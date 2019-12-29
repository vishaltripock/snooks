function previous(e) {
  const currentStep = $(".storybook__section.stepActive"); //removeClass("stepActive");
  const currentStepIndex = Number($(currentStep).attr("data-storybook-index"));

  currentStep.removeClass("stepActive stepActiveTransition")
  $("#step" + (currentStepIndex - 1)).addClass("stepActive").outerWidth();
  $("#step" + (currentStepIndex - 1)).addClass('stepActiveTransition');
}

function next(e) {
  const currentStep = $(".storybook__section.stepActive");
  const currentStepIndex = Number($(currentStep).attr("data-storybook-index"));

  if (InputChecker(currentStepIndex)) {
    currentStep.removeClass("stepActive");
    currentStep.removeClass("stepActiveTransition");
    
    $("#step" + (currentStepIndex + 1)).addClass("stepActive").outerWidth();
    $("#step" + (currentStepIndex + 1)).addClass('stepActiveTransition');
  }
}

function nextForImageUrlGetter() {
  ImageUrlGetter();
}

function nextForPreview() {
  Storybook_Product_Maker();
}

function nextForEditStory() {
  Story_Generator();
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
    let occupationValue = $("#storybookOccupation")
      .children("option:selected")
      .val();
    console.log(index, occupationValue);
    if (occupationValue === "") {
      return false;
    }
  } else if (index === 4) {
    let hobbiesValue = $("#storybookHobbies")
      .children("option:selected")
      .val();
    console.log(index, hobbiesValue);
    if (hobbiesValue === "") {
      return false;
    }
  } else if (index === 5) {
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


// Belongs for Previewing the Uploaded Image
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
