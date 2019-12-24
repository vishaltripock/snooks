
let productInfo = {};

let StoryPages = document.getElementById("storybook-pages");
let PreviewPages = document.getElementById("preview-container-id");

let occupationStories = "";
let hobbiesStories = "";
let characteristicsStories = "";

let Avatar_Image_URL = "";

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
    Intro_Generator();
});

$("select#storybookOccupation").change(function () {
    occupation = $(this)
        .children("option:selected")
        .val();
    Intro_Generator();
});

$("select#storybookHobbies").change(function () {
    hobbies = $(this)
        .children("option:selected")
        .val();
    Intro_Generator();
});

$("select#storybookCharacteristics").change(function () {
    characteristics = $(this)
        .children("option:selected")
        .val();
    Intro_Generator();
});

function Intro_Generator() {
    if (rela_array.indexOf(relationship) != -1) {
        if (characteristics === "Mr./Miss Fix It") {
            characteristics = "Miss Fix It";
        }

        let She_Story = `Your ${relationship} was so many things to our family and their friends. She was ${occupation}
        and her favorite things to do included ${hobbies}. The funniest thing 
        about them was they were ${characteristics}.`;

        $("p#person-intro-text").text(She_Story);
    } else {
        if (characteristics === "Mr./Miss Fix It") {
            characteristics = "Mr Fix It";
        }

        let He_Story = `Your ${relationship} was so many things to our family and their friends. He was ${occupation}
        and his favorite things to do included ${hobbies}. The funniest thing 
        about them was they were ${characteristics}.`;

        $("p#person-intro-text").text(He_Story);
    }
}

function Story_Generator() {
    let occupationArrays = occupationStories[occupation].split(".");
    let hobbiesArrays = hobbiesStories[hobbies].split(".");
    let characteristicsArrays = characteristicsStories[characteristics].split(
        "."
    );

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
    avatarImage.setAttribute(
        "src",
        Avatar_Image_URL
    );
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
    textArea.classList.add("story-page-text");

    textArea.innerText = story_text;

    pageText.appendChild(textArea);
    StoryPages.appendChild(pageContainer);
}

function Storybook_Preview() {
    let textareaArrays = document.querySelectorAll(".story-page-text");
    let avatarImages = document.querySelectorAll(".story-avatar-image");
    let length = textareaArrays.length;

    for (let i = 0; i < length; ++i) {
        Preview_Text_Generator(textareaArrays[i].value, i, length);
    }
}

function Preview_Text_Generator(Preview_Text_String, index, length) {
    let preview_inner = document.createElement("div");
    preview_inner.classList.add("preview-inner");

    //Image

    let preview_image_container = document.createElement("div");
    preview_image_container.classList.add("preview-image-container");
    preview_image_container.classList.add("half-width");

    let preview_image_inner = document.createElement("div");
    preview_image_inner.classList.add("preview-image-inner");

    let preview_image_avatar = document.createElement("div");
    preview_image_avatar.classList.add("preview-image-avatar");

    let preview_image_tag = document.createElement("img");

    preview_image_tag.setAttribute(
        "src",
        Avatar_Image_URL
    );
    preview_image_tag.setAttribute("alt", "Person Avatar Image");

    preview_inner.appendChild(preview_image_container);
    preview_image_container.appendChild(preview_image_inner);
    preview_image_inner.appendChild(preview_image_avatar);
    preview_image_avatar.appendChild(preview_image_tag);

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

    if (index === length - 1) {

        // Making a Product FORM

        //<form action="/cart/add" method="post" enctype="multipart/form-data" id="AddToCartForm">
        let productFormElement = document.createElement("form");
        productFormElement.setAttribute("action", "/cart/add");
        productFormElement.setAttribute("method", "post");
        productFormElement.setAttribute("enctype", "multipart/form-data");
        productFormElement.id = "AddToCartForm";

        /*
        
          <label for="Quantity">quantity</label>
          <input hidden name="id" id="productSelect"  value={variant_id}>
          <input  hidden type="number" id="Quantity" name="quantity" value="1" min="1">
          <button type="submit" name="add" id="AddToCart">Add to cart</button>     
        
        */

        let productVariant = document.createElement("input");
        productVariant.setAttribute("name", "id");
        //Change Required
        let productVariantValue = productInfo.variant.variant_id;
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
        previewButton.setAttribute("type", "submit");
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
    let productFormData = $("#storybook_form").serializeArray();

    let productData = {};

    $.each(productFormData, function (i, field) {
        productData[field.name] = field.value;
    });

    let PreviewPagesContent = document.getElementById("preview-container-id");
    while (PreviewPagesContent.firstChild) {
        PreviewPagesContent.removeChild(PreviewPagesContent.firstChild);
    }

    let textareaArrays = document.querySelectorAll(".story-page-text");
    let avatarImages = document.querySelectorAll(".story-avatar-image");
    let length = textareaArrays.length;

    let productPagesData = [];

    for (let i = 0; i < length; ++i) {
        productPagesData.push({ img: Avatar_Image_URL, pagetext: textareaArrays[i].value });
    }

    productData["page"] = productPagesData;

    $.ajax({
        url: "https://0ac2645b.ngrok.io/products/",
        data: JSON.stringify(productData),
        type: 'POST',
        dataType: 'json',
        contentType: 'application/json',
        complete: function () {

        },
        success: function (data) {
            productInfo = data;
            console.log(productInfo)
            Storybook_Preview();
            next();
        },
        error: function (err) {

        }
    })

}

function ImageUrlGetter() {
    let constructorAvatar = $("#constructor-panel");
    let AvatarConfig = JSON.stringify(constructorAvatar.pixel("selected"));
    let currentGender = constructorAvatar.pixel('group');

    $.post("https://0ac2645b.ngrok.io/constructor/avatar/", { data: AvatarConfig, "gender": currentGender }, function (data, status) {
        Avatar_Image_URL = "https://0ac2645b.ngrok.io" + data["avatar_image"];
        console.log(Avatar_Image_URL);
        next();
    }
    );
}

/* <div class="preview-inner">
        <div class="preview-image-container half-width">
            <div class="preview-image-inner">
                <div class="preview-image-avatar">
                    <img src="{{- 'PersonAvatar.png' | asset_url -}}" alt="Person Avatar Image">
                </div>
            </div>
        </div>
        <div class="preview-text-container half-width">
            <div class="preview-text-inner">
                <div class="preview-text-heading">
                    <h2>Preview Your Book</h2>
                </div>
                <div class="preview-text-intro">
                    <h3>INTRO</h3>
                </div>
                <div class="preview-text-story">
                    <div class="preview-text-story-inner">
                    </div>
                </div>
                <div class="preview-add-to-bag-button">
                    <button type="submit" name="add" id="AddToCart" class="btn-preview-bag"><span>ADD BOOK TO
                            BAG</span></button>
                </div>
            </div>
        </div>
    </div> */






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