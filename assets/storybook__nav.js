function previous(e) {

    // $('#storybook__nav--left').show();
    // $('#storybook__nav--right').show();

    const currentStep = $('.storybook__section.stepActive');  //removeClass("stepActive");
    const currentStepIndex = Number($(currentStep).attr("data-storybook-index"));

    console.log("currentstep on previous", currentStep, currentStepIndex)


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

    // $('#storybook__nav--left').show();
    // $('#storybook__nav--right').show();

    const currentStep = $('.storybook__section.stepActive');
    const currentStepIndex = Number($(currentStep).attr("data-storybook-index"));

    $(currentStep).removeClass("stepActive");
    $("#step" + (currentStepIndex + 1)).addClass("stepActive");

    if (currentStepIndex === 9) {
        Story_Generator();
    }
    else if (currentStepIndex === 8) {
        let StoryPages = document.getElementById("storybook-pages");
        while (StoryPages.firstChild) {
            StoryPages.removeChild(StoryPages.firstChild);
        }
    }

    console.log("currentstep on next", currentStep, currentStepIndex)



    // let stroybookStepsCount = $(".storybook__sections").children().length;
    // console.log("currentstep on next",currentStep,currentStepIndex,stroybookStepsCount)


    // if (currentStepIndex == stroybookStepsCount-1) {
    //     $("#step" + (currentStepIndex + 1)).addClass("stepActive");
    //     // $('#storybook__nav--right').hide();
    // }
    // else {
    //     $("#step" + (currentStepIndex + 1)).addClass("stepActive");
    // }
}
