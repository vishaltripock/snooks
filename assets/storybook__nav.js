function previous(e) {

    const currentStep = $('.storybook__section.stepActive');  //removeClass("stepActive");
    const currentStepIndex = Number($(currentStep).attr("data-storybook-index"));

    $(currentStep).removeClass("stepActive");
    $("#step" + (currentStepIndex - 1)).addClass("stepActive");

}

function next(e) {

    const currentStep = $('.storybook__section.stepActive');
    const currentStepIndex = Number($(currentStep).attr("data-storybook-index"));

    if (InputChecker(currentStepIndex)) {
        $(currentStep).removeClass("stepActive");
        $("#step" + (currentStepIndex + 1)).addClass("stepActive");
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
        let relationshipValue = $("#storybookRelationships").children("option:selected").val();
        console.log(index, relationshipValue);
        if (nameValue === '') {
            return false;
        }
        if (relationshipValue === '') {
            return false;
        }
    }
    else if (index === 2) {
        let photoValue = $("#storybook__photo").val();
        console.log(index, photoValue);
        if (photoValue === '') {
            return false;
        }
    }
    else if (index === 3) {
        let occupationValue = $('#storybookOccupation').children("option:selected").val();
        console.log(index, occupationValue);
        if (occupationValue === '') {
            return false;
        }
    }
    else if (index === 4) {
        let hobbiesValue = $('#storybookHobbies').children("option:selected").val();
        console.log(index, hobbiesValue);
        if (hobbiesValue === '') {
            return false;
        }
    }
    else if (index === 5) {
        let characteristicsValue = $('#storybookCharacteristics').children("option:selected").val();
        console.log(index, characteristicsValue);
        if (characteristicsValue === '') {
            return false;
        }
    }
    return true;
}


