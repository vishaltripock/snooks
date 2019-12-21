

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
    Story_Generator();
});

$("select#storybookOccupation").change(function () {
    occupation = $(this).children("option:selected").val();
    Story_Generator();
});

$("select#storybookHobbies").change(function () {
    hobbies = $(this).children("option:selected").val();
    Story_Generator();
});

$("select#storybookCharacteristics").change(function () {
    characteristics = $(this).children("option:selected").val();
    Story_Generator();
});


function Story_Generator() {

    if (rela_array.indexOf(relationship) != -1) {

        if(characteristics === "Mr./Miss Fix It"){
            characteristics = "Miss Fix It"
        }

        let She_Story = `Your ${relationship} was so many things to our family and their friends. She was ${occupation}
        and her favorite things to do included ${hobbies}. The funniest thing 
        about them was they were ${characteristics}.`

        $("p#person-intro-text").text(She_Story);

    }
    else {

        if(characteristics === "Mr./Miss Fix It"){
            characteristics = "Mr Fix It"
        }

        let He_Story = `Your ${relationship} was so many things to our family and their friends. He was ${occupation}
        and his favorite things to do included ${hobbies}. The funniest thing 
        about them was they were ${characteristics}.`

        $("p#person-intro-text").text(He_Story);

    }

}




