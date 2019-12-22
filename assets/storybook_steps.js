let StoryPages = document.getElementById("storybook-pages");

let occupationStories = "";
let hobbiesStories = "";
let characteristicsStories = "";

$.get(
    "https://cdn.shopify.com/s/files/1/0278/4172/4556/files/occupationStories.json?3122",
    function (Stories) {
        occupationStories = Stories;
    },
    "json"
);

$.get(
    "https://cdn.shopify.com/s/files/1/0278/4172/4556/files/hobbiesStories.json?3122",
    function (Stories) {
        hobbiesStories = Stories;
    },
    "json"
);

$.get(
    "https://cdn.shopify.com/s/files/1/0278/4172/4556/files/characteristicsStories.json?3122",
    function (Stories) {
        characteristicsStories = Stories;
    },
    "json"
);


let rela_array = ["Grandma", "Aunt", "Mother"];
let relationship = "";
let name = "";
let occupation = "";
let hobbies = "";
let characteristics = "";

$("select#storybookRelationships").change(function () {
    relationship = $(this).children("option:selected").val();
    $("span#person_relationship_span").text(relationship);
    $("span#first-page-relationship").text(relationship);
});

$(".person_name_input").keyup(function () {
    name = $(".person_name_input").val();
    $("span#person_name_span").text(name);
    $("span#first-page-name").text(name);
    Intro_Generator();
});

$("select#storybookOccupation").change(function () {
    occupation = $(this).children("option:selected").val();
    Intro_Generator();
});

$("select#storybookHobbies").change(function () {
    hobbies = $(this).children("option:selected").val();
    Intro_Generator();
});

$("select#storybookCharacteristics").change(function () {
    characteristics = $(this).children("option:selected").val();
    Intro_Generator();
});


function Intro_Generator() {

    if (rela_array.indexOf(relationship) != -1) {

        if (characteristics === "Mr./Miss Fix It") {
            characteristics = "Miss Fix It"
        }

        let She_Story = `Your ${relationship} was so many things to our family and their friends. She was ${occupation}
        and her favorite things to do included ${hobbies}. The funniest thing 
        about them was they were ${characteristics}.`

        $("p#person-intro-text").text(She_Story);

    }
    else {

        if (characteristics === "Mr./Miss Fix It") {
            characteristics = "Mr Fix It"
        }

        let He_Story = `Your ${relationship} was so many things to our family and their friends. He was ${occupation}
        and his favorite things to do included ${hobbies}. The funniest thing 
        about them was they were ${characteristics}.`

        $("p#person-intro-text").text(He_Story);

    }

}


function Story_Generator() {

    let occupationArrays = occupationStories[occupation].split(".");
    let hobbiesArrays = hobbiesStories[hobbies].split(".");
    let characteristicsArrays = characteristicsStories[characteristics].split(".");

    OccupationStories(occupationArrays);
    HobbiesStories(hobbiesArrays);
    CharacteristicsStories(characteristicsArrays);

}

function OccupationStories(occupationArrays) {

    for (let o = 0; o < occupationArrays.length - 1; ++o) {

        let occupation_text = occupationArrays[o];

        Storybook_Page_Maker(occupation_text);

    }

}

function HobbiesStories(hobbiesArrays) {

    for (let h = 0; h < hobbiesArrays.length - 1; ++h) {

        let hobby_text = hobbiesArrays[h];

        Storybook_Page_Maker(hobby_text);

    }

}

function CharacteristicsStories(characteristicsArrays) {

    for (let c = 0; c < characteristicsArrays.length - 1; ++c) {

        let characteristic_text = characteristicsArrays[c];

        Storybook_Page_Maker(characteristic_text);

    }

}

function Storybook_Page_Maker(story_text) {

    let pageContainer = document.createElement("div");
    pageContainer.classList.add("storybook-page-container");

    let pageAvatarContainer = document.createElement("div");
    pageAvatarContainer.classList.add("storybook-page-avatar-container");
    pageAvatarContainer.classList.add("half-width");

    pageContainer.appendChild(pageAvatarContainer);

    let pageAvatar = document.createElement("div");
    pageAvatar.classList.add("storybook-page-avatar");

    pageAvatarContainer.appendChild(pageAvatar);

    let avatarImage = document.createElement("IMG");
    avatarImage.setAttribute("src", "https://cdn.shopify.com/s/files/1/0278/4172/4556/t/5/assets/PersonAvatar.png?3088");
    avatarImage.setAttribute("alt", "Person Avatar Image");
    avatarImage.classList.add("story-avatar-image")

    pageAvatar.appendChild(avatarImage);

    let pageTextContainer = document.createElement("div");
    pageTextContainer.classList.add("storybook-page-text-container");
    pageTextContainer.classList.add("half-width");

    pageContainer.appendChild(pageTextContainer);

    let pageText = document.createElement("div");
    pageText.classList.add("storybook-page-text");

    pageTextContainer.appendChild(pageText);

    let textArea = document.createElement("textarea");
    textArea.classList.add("story-page-text");

    textArea.innerText = story_text;

    pageText.appendChild(textArea);
    StoryPages.appendChild(pageContainer);
}

function Storybook_Preview() {

    let textareaArrays = document.querySelectorAll(".story-page-text");
    let introTexts = document.querySelector(".preview-text-story-inner");

    let newParaCounter = 0;
    let textString = "";

    for (let i = 0; i < textareaArrays.length; ++i) {

        ++newParaCounter;

        textString = textString +  textareaArrays[i].value + ". ";

        if (newParaCounter === 5) {

            let pElement = document.createElement("p");
            pElement.innerText = textString;

            introTexts.appendChild(pElement);

            textString = "";
            newParaCounter = 0;
        }

    }

    if (textString === "" || newParaCounter !== 0) {

        let pElement = document.createElement("p");
        pElement.innerText = textString + ". ";

        introTexts.appendChild(pElement);
    }
}

/* <div class="storybook-page-container">
    <div class="storybook-page-avatar-container half-width">
        <div class="storybook-page-avatar">
            <img src="{{- 'PersonAvatar.png' | asset_url -}}" alt="Person Avatar Image" class="story-avatar-image">
            </div>
        </div>
        <div class="storybook-page-text-container half-width">
            <div class="storybook-page-text">
                <textarea class="story-page-text">
                </textarea>
            </div>
        </div>
    </div> */









