function previous(e) {

    // $('#storybook__nav--left').show();
    // $('#storybook__nav--right').show();

    const currentStep = $('.storybook__section.stepActive');  //removeClass("stepActive");
    const currentStepIndex = Number($(currentStep).attr("data-storybook-index"));

    $(currentStep).removeClass("stepActive");
    $("#step" + (currentStepIndex - 1)).addClass("stepActive");


    // if (currentStepIndex === 2) {
    //     $("#step" + (currentStepIndex - 1)).addClass("stepActive");
    //     // $('#storybook__nav--left').hide();
    // }
    // else {
    //     $("#step" + (currentStepIndex - 1)).addClass("stepActive");
    // }

}

function next(e) {

    const currentStep = $('.storybook__section.stepActive');
    const currentStepIndex = Number($(currentStep).attr("data-storybook-index"));

    $(currentStep).removeClass("stepActive");
    $("#step" + (currentStepIndex + 1)).addClass("stepActive");

    if (currentStepIndex === 9) {
        let StoryPages = document.getElementById("storybook-pages");
        while (StoryPages.firstChild) {
            StoryPages.removeChild(StoryPages.firstChild);
        }
        Story_Generator();
    }

}

function nextForImageUrlGetter(){
    ImageUrlGetter();
}

function nextForPreview(){
    Storybook_Product_Maker();
}

