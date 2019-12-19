$("#storybook__nav--left").click(function (e) {

    $('#storybook__nav--left').show();
    $('#storybook__nav--right').show();

    const currentStep = $('.storybook__section.stepActive');  //removeClass("stepActive");
    const currentStepIndex = Number($(currentStep).attr("data-storybook-index"));

    $(currentStep).removeClass("stepActive");

    if (currentStepIndex == 2) {
        $("#step" + (currentStepIndex - 1)).addClass("stepActive");
        $('#storybook__nav--left').hide();
    }
    else {
        $("#step" + (currentStepIndex - 1)).addClass("stepActive");
    }

})

$("#storybook__nav--right").click(function (e) {

    // Next
    console.log("Hello");

    $('#storybook__nav--left').show();
    $('#storybook__nav--right').show();

    const currentStep = $('.storybook__section.stepActive');
    const currentStepIndex = Number($(currentStep).attr("data-storybook-index"));

    $(currentStep).removeClass("stepActive");

    if (currentStepIndex == 4) {
        $("#step" + (currentStepIndex + 1)).addClass("stepActive");
        $('#storybook__nav--right').hide();
    }
    else {
        $("#step" + (currentStepIndex + 1)).addClass("stepActive");
    }
})
$(document).ready(function () {
    $('#storybook__nav--left').hide();
})