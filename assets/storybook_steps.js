let productInfo = {};

const endText = "It is hard and sad to think of someone that has passed on. But try to take comfort in all they have left for you. Always know a part of them lives on in you. As long as you share their stories and memories, they can never really be gone.";

// let base_asset_url = "https://27bf4603.ngrok.io";
let base_asset_url = "https://avatar.tripock.com"; 


let She_Story = "";
let He_Story = "";
let book_Title = "";

let StoryPages = document.getElementById("storybook-pages");
let PreviewPages = document.getElementById("preview-container-id");

let occupationStories = "";
let hobbiesStories = "";
let characteristicsStories = "";
let activityArray = "";

let Avatar_Image_URL = "";
let Face_Image_URL = "";
let Activity_Image_URL = "";

$.get(
    "https://cdn.shopify.com/s/files/1/0291/1689/1269/files/activityInfo.json?740",
    function (activityInfo) {
        activityArray = activityInfo;
    },
    "json"
);

$.get(
    "https://cdn.shopify.com/s/files/1/0291/1689/1269/files/occupationStories.json?740",
    function (Stories) {
        occupationStories = Stories;
    },
    "json"
);

$.get(
    "https://cdn.shopify.com/s/files/1/0291/1689/1269/files/hobbiesStories.json?740",
    function (Stories) {
        hobbiesStories = Stories;
    },
    "json"
);

$.get(
    "https://cdn.shopify.com/s/files/1/0291/1689/1269/files/characteristicsStories.json?740",
    function (Stories) {
        characteristicsStories = Stories;
    },
    "json"
);


let relationship = "";
let name = "";
let occupation = "";
let hobbies = "";
let occupationHobby = "";
let activityValue = "";
let characteristics = "";

$("select#storybookRelationships").change(function () {
    relationship = $(this)
        .children("option:selected")
        .val();
    $("span#person_relationship_span").text(relationship);
    $("span#first-page-relationship").text(relationship);
});

$(".person_name_input").keyup(function () {
    name = $(".person_name_input").val();
    $("span#person_name_span").text(name);
    $("span#first-page-name").text(name);
});

$("select#storybookOccupation-Hobby").change(function () {
    occupationHobby = $(this)
        .children("option:selected")
        .val();
    if (occupationStories.hasOwnProperty(occupationHobby)) {
        occupation = occupationHobby;
        hobbies = "";
    }
    else if (hobbiesStories.hasOwnProperty(occupationHobby)) {
        hobbies = occupationHobby;
        occupation = "";
    }
});

$("select#storybookCharacteristics").change(function () {
    characteristics = $(this)
        .children("option:selected")
        .val();
});

function Intro_Generator(currentGender) {
    if (currentGender === "female") {
        if (characteristics === "Mr./Miss Fix It") {
            characteristics = "Miss Fix It";
        }

        She_Story = `Your ${relationship} was so many things to our family and their friends. She was ${occupation} and her favorite things to do included ${hobbies}. The funniest thing about them was there ${characteristics}.`;

        $("p#person-intro-text").text(She_Story);
    } 
    else {
        if (characteristics === "Mr./Miss Fix It") {
            characteristics = "Mr Fix It";
        }
        He_Story = `Your ${relationship} was so many things to our family and their friends. He was ${occupation} and his favorite things to do included ${hobbies}. The funniest thing about them was there ${characteristics}.`;
        $("p#person-intro-text").text(He_Story);
    }
}

function Story_Generator() {

    // Clearing all things on storybook pages before inserting new pages
    // show that it will not contains the old pages
    let StoryPages = document.getElementById("storybook-pages");
    while (StoryPages.firstChild) {
        StoryPages.removeChild(StoryPages.firstChild);
    }

    // Generating Story based on the user selection on the Step 3(Occupation or Hobby)
    if (occupation !== "") {
        let occupationArrays = occupationStories[occupation];
        OccupationStories(occupationArrays);
    }
    else if (hobbies !== "") {
        let hobbiesArrays = hobbiesStories[hobbies].split(".");
        HobbiesStories(hobbiesArrays);
    }

    // let characteristicsArrays = characteristicsStories[characteristics].split(".");
    // CharacteristicsStories(characteristicsArrays);

    //Calling for next Step
    next();
    setTimeout(function(){
        $.LoadingOverlay("hide");
    },5000)
}

function OccupationStories(occupationArrays) {
    Storybook_Page_Maker(occupationArrays);
}

function HobbiesStories(hobbiesArrays) {
    Storybook_Page_Maker(hobbiesArrays);
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
    avatarImage.setAttribute("src", Activity_Image_URL);
    avatarImage.setAttribute("alt", "Person Avatar Image");
    avatarImage.classList.add("story-avatar-image");

    pageAvatar.appendChild(avatarImage);

    let pageTextContainer = document.createElement("div");
    pageTextContainer.classList.add("storybook-page-text-container");
    pageTextContainer.classList.add("half-width");

    pageContainer.appendChild(pageTextContainer);

    let pageText = document.createElement("div");
    pageText.classList.add("storybook-page-text");

    pageTextContainer.appendChild(pageText);

    let textArea = document.createElement("textarea");
    textArea.setAttribute("maxlength", "1000");
    textArea.classList.add("story-page-text");

    textArea.innerText = story_text;
    pageText.appendChild(textArea);

    // Remaining Text
    let RemainingCharLeftDiv = document.createElement("div");
    RemainingCharLeftDiv.classList.add("char-left-message");
    RemainingCharLeftDiv.innerText =
        1000 - story_text.length + " Characters Remaining";

    pageText.appendChild(RemainingCharLeftDiv);

    StoryPages.appendChild(pageContainer);
}

function Storybook_Preview() {
    let textareaArrays = document
        .querySelectorAll(".story-page-text")[0]
        .value.split(".");
    let length = textareaArrays.length;

    for (let i = 0; i < length; ++i) {
        let storyPreviewText = textareaArrays[i]
            .replace(/\r?\n|\r|^\s|\s+$/g, "")
            .trim();
        if (storyPreviewText.length > 0 && storyPreviewText !== " ") {
            Preview_Text_Generator(storyPreviewText, i, length);
        }
    }

    Preview_Text_Generator(endText, length, length);
}

function Preview_Text_Generator(Preview_Text_String, index, length) {
    let preview_inner = document.createElement("div");
    preview_inner.classList.add("preview-inner");

    let preview_image_container = document.createElement("div");
    preview_image_container.classList.add("preview-image-container");
    preview_image_container.classList.add("half-width");

    let preview_image_inner = document.createElement("div");
    preview_image_inner.classList.add("preview-image-inner");

    let preview_image_avatar = document.createElement("div");
    preview_image_avatar.classList.add("preview-image-avatar");

    let preview_image_tag = document.createElement("img");

    preview_image_tag.setAttribute("src", Activity_Image_URL);
    preview_image_tag.setAttribute("alt", "Person Avatar Image");

    preview_inner.appendChild(preview_image_container);
    preview_image_container.appendChild(preview_image_inner);
    preview_image_inner.appendChild(preview_image_avatar);

    //Image ---> Not Adding Image for End Text
    if (index !== length) {
        preview_image_avatar.appendChild(preview_image_tag);
    }

    //TEXT
    let preview_text_container = document.createElement("div");
    preview_text_container.classList.add("preview-text-container");

    preview_text_container.classList.add("half-width");
    let preview_text_inner = document.createElement("div");
    preview_text_inner.classList.add("preview-text-inner");

    if (index === 0) {
        let preview_text_headline = document.createElement("div");
        preview_text_headline.classList.add("preview-text-headline");

        let h2Element = document.createElement("h2");
        h2Element.innerText = "Preview Your Book";

        preview_text_headline.appendChild(h2Element);

        let preview_text_intro = document.createElement("div");
        preview_text_intro.classList.add("preview-text-intro");

        let h3Element = document.createElement("h3");
        h3Element.innerText = "INTRO";

        preview_text_intro.appendChild(h3Element);

        preview_text_inner.appendChild(preview_text_headline);
        preview_text_inner.appendChild(preview_text_intro);
    }

    let preview_text_story = document.createElement("div");
    preview_text_story.classList.add("preview-text-story");

    let preview_text_story_inner = document.createElement("div");
    preview_text_story_inner.classList.add("preview-text-story-inner");

    let previewPelement = document.createElement("p");
    previewPelement.innerText = Preview_Text_String; //Text Attaching

    preview_text_story.appendChild(preview_text_story_inner);
    preview_text_story_inner.appendChild(previewPelement);

    preview_text_inner.appendChild(preview_text_story_inner);

    if (index === length) {
        // Making a Product FORM

        //<form action="/cart/add" method="post" enctype="multipart/form-data" id="AddToCartForm">
        let productFormElement = document.createElement("form");
        productFormElement.setAttribute("action", "/cart/add");
        productFormElement.setAttribute("method", "post");
        productFormElement.setAttribute("enctype", "multipart/form-data");
        productFormElement.id = "AddToCartForm";

        let productVariant = document.createElement("input");
        productVariant.setAttribute("name", "id");

        //Change Required
        let productVariantValue = productInfo.product.variant_id;
        console.log(productInfo);
        console.log(productVariantValue);
        productVariant.setAttribute("value", productVariantValue);
        productVariant.id = "productSelect";
        productVariant.hidden = true;

        productFormElement.appendChild(productVariant);

        let productQntyLabel = document.createElement("label");
        productQntyLabel.setAttribute("for", "Quantity");
        productQntyLabel.innerText = "Quantity";
        productQntyLabel.hidden = true;

        productFormElement.appendChild(productQntyLabel);

        let productQntyInput = document.createElement("input");
        productQntyInput.setAttribute("type", "number");
        productQntyInput.setAttribute("name", "quantity");
        productQntyInput.setAttribute("value", "1");
        productQntyInput.setAttribute("min", "1");
        productQntyInput.id = "Quantity";
        productQntyInput.hidden = true;

        productFormElement.appendChild(productQntyInput);

        let preview_add_to_bag_button = document.createElement("div");
        preview_add_to_bag_button.classList.add("preview-add-to-bag-button");

        let previewButton = document.createElement("button");
        previewButton.setAttribute("name", "add");
        previewButton.id = "AddToCart";
        previewButton.classList.add("btn-preview-bag");

        let spanElement = document.createElement("span");
        spanElement.innerText = "ADD BOOK TO BAG";

        previewButton.appendChild(spanElement);
        productFormElement.appendChild(previewButton);

        preview_add_to_bag_button.appendChild(productFormElement);
        preview_text_inner.appendChild(preview_add_to_bag_button);
    }

    preview_text_container.appendChild(preview_text_inner);
    preview_inner.appendChild(preview_text_container);

    //Final Div Enter
    PreviewPages.appendChild(preview_inner);
}

function Storybook_Product_Maker() {
    // Remove Everything from Preview Pages
    let PreviewPagesContent = document.getElementById("preview-container-id");
    while (PreviewPagesContent.firstChild) {
        PreviewPagesContent.removeChild(PreviewPagesContent.firstChild);
    }

    let productFormData = $("#storybook_form").serializeArray();
    console.log("Aaa gya DATA -----------> ",productFormData)
    const fileList = $("#storybook__photo").prop("files") || [];

    let userDp;

    if (fileList.length > 0) {
        userDp = fileList[0];
    }

    const formData = new FormData();

    $.each(productFormData, function (i, field) {
        console.log("Field, ----------> ", field.name, "Value ---------> ", field.value)
        if (field.name === "Occupation_Hobby") {
            let fieldName = (occupation !== "" ? "Occupation" : "Hobby");
            formData.append(fieldName, field.value);
        }
        else if (field.name === "PersonName") {
            formData.append(field.name, field.value);
            formData.append("title", field.value);
        }
        else {
            formData.append(field.name, field.value);
        }
    });

    // Book Title Generating
    book_Title = "The Extraordinary Life of " + relationship + " " + name;

    let livingMemoryText = $("#first-page-id").text();
    let introTextValue = $("p#person-intro-text").text();

    livingMemoryText = livingMemoryText
        .replace(/^\n|\n$/g, "")
        .replace("[ \t]+$", "");
    introTextValue = introTextValue.replace(/^\n|\n$/g, "");

    let textareaArrays = document
        .querySelectorAll(".story-page-text")[0]
        .value.split(".");
    let length = textareaArrays.length;
    let productPagesData = [];

    // Adding Book Title Text ---> Image of this will be Activity Generated
    productPagesData.push({ img: Activity_Image_URL, pagetext: book_Title });

    // Adding Living Memory Text ---> Image of this will be set in backend
    productPagesData.push({ img: "", pagetext: livingMemoryText });

    // Adding Intro Text Value ---> No Image for this Section
    productPagesData.push({ img: "", pagetext: introTextValue });

    for (let i = 0; i < length; ++i) {
        // Pages Text Generated through Occupation and Hobbies etc
        // Currently Image is Same as Avatar but, will change intro activity
        let previewPageText = textareaArrays[i]
            .replace(/\r?\n|\r|^\s|\s+$/g, "")
            .trim();
        if (previewPageText.length > 0 && previewPageText.length != " ") {
            productPagesData.push({
                img: Activity_Image_URL,
                pagetext: previewPageText
            });
        }
    }

    // Appending End Text Heres
    productPagesData.push({ img: "", pagetext: endText });

    formData.append("page", JSON.stringify(productPagesData));

    // Adding Images
    if (userDp) {
        formData.append("avatar_pic", userDp, "avatar.png");
    }


    $.ajax({
        url: base_asset_url + "/products/",
        data: formData,
        type: "POST",
        contentType: false,
        processData: false,
        complete: function () { },
        success: function (data) {
            productInfo = data;
            console.log(productInfo);
            console.log(base_asset_url + productInfo.outputPdf);
            Storybook_Preview();
            next();
            $.LoadingOverlay("hide");
        },
        error: function (err) { }
    });
}

function ImageUrlGetter() {
    let constructorAvatar = $("#constructor-panel");
    let AvatarConfig = JSON.stringify(constructorAvatar.pixel("selected"));
    let currentGender = constructorAvatar.pixel("group");

    if(activityArray[currentGender].hasOwnProperty(occupationHobby)){
        activityValue = activityArray[currentGender][occupationHobby];
        console.log(activityValue);
    }
    //Generating Intro Part Baseds on the Gender of the person
    Intro_Generator(currentGender);

    console.log("############# Sending Avatar Data ##############");
    console.log(AvatarConfig);
    console.log("############# Sending Avatar Data ##############");
    $.post(
        base_asset_url + "/constructor/avatar/",
        {
            data: AvatarConfig,
            gender: currentGender,
            activity: activityValue
        },
        function (data, status) {
            Avatar_Image_URL = base_asset_url + data["avatar_image"];
            Face_Image_URL = base_asset_url + data["face_image"];
            Activity_Image_URL = base_asset_url + data["activity_image"];
            console.log(Avatar_Image_URL);
            console.log(Face_Image_URL);
            console.log(Activity_Image_URL);
            next();
            $.LoadingOverlay("hide");
        }
    );
}
