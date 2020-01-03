(function ($) {
  "use strict";

  $.fn.pixel = function (option) {
    if (typeof option === "string") {
      switch (option) {
        case "selected":
          console.log(this.data("selected")[this.data("selected_group")])
          return this.data("selected")[this.data("selected_group")];
        case "group":
          return this.data("selected_group");
        case "destroy":
          this.data("selected", null).off(".pixel");

          break;
      }
      return this;
    }

    var options = $.extend(
      {},
      $.fn.pixel.defaults,
      typeof option == "object" && option
    );

    // A jQuery Object is set of DOM Elements
    // this.each will call argument function for each "DOM Element(which is equal to this)"
    // .each() return next element "this" when is finish of iterating on current element
    // returning "false" in .each() will stop the iteration process
    // "this" == "DOM Element"
    // "$(this)" == "jQuery Obj of Current Element"
    // "The find(filter) method returns descendant elements of the selected element "
    // " "filter"	Required. A selector expression, element or jQuery object to filter"
    // "search for descendants"

    return this.each(function () {
      var self = this,
        $this = $(this),
        hash_layers = {},
        first_tab_Open = true,
        selected_group = null,
        groups = $this.find(".groups"),
        tabs = $this.find(".tabs"),
        tab = tabs.find(".tab").remove(),
        carousel = $this.find(".carousel"), // whole carousel thing
        carousel_in = carousel.find(".carousel-inner"), // place of items to rotate
        carousel_item = carousel_in
          .find(".item") // item in the carousel
          .removeClass("item")
          .remove(),
        layers = $this.find(".layers"), //defining html elements
        layer = layers.find(".layer").remove(),
        layer_tab = layer.find(".tab").remove(),
        layer_item = layer.find(".item").remove(),
        subtabBar = $this.find(".subtab-bar"),
        subTabContainer = subtabBar.find(".subtab-bar-container").remove(),
        subTabContainerInner = subTabContainer
          .find(".subtab-bar-container-inner")
          .remove(),
        subtabNav = subTabContainerInner.find(".subtabNav").remove(),
        subtabItem = subtabNav.find(".subtab-item").remove(),
        group_length = {
          male: 0,
          female: 0
        },
        elem = null,
        outer = null,
        inner = null,
        subtabItems = null,
        onlyFaceNose = false;

      function setInvisible(elem) {
        elem.css("visibility", "hidden");
      }

      function setVisible(elem) {
        elem.css("visibility", "visible");
      }

      function updateUI() {
        // assignment
        elem = $(".subtabShow");
        outer = elem.find(".subtab-bar-container-inner");

        inner = outer.find(".subtabNav");
        subtabItems = inner.children();

        var leftButton = elem.find("#left-button");

        var maxWidth = outer.outerWidth(true);
        var actualWidth = 0;

        $.each($(inner), function (i, item) {
          actualWidth += $(item).outerWidth(true);
        });

        if (actualWidth <= maxWidth) {
          setVisible(leftButton);
        }
      }

      function openGroup(name) {
        var layers_list = options.json[name],
          v,
          ld;

        // closing currenlty opened layer
        closeLayer();

        // saving for others to use
        selected_group = name;

        // first Tab Open
        first_tab_Open = true;

        // extenal
        $this.data("selected_group", selected_group);

        // reseting hash for layers
        hash_layers = {};
        for (v = layers_list.length; v--;) {
          ld = layers_list[v];
          hash_layers[ld.name] = ld;
        }

        // hiding everything from other groups
        // show anything within current group
        let layersTempVal_1 = layers.find(".layer");
        let layersTempVal_2 = layersTempVal_1.add(tabs.find(".tab"));
        let CarouselFinder = carousel.find(".layer-item, .item");
        let layersTempVal_3 = layersTempVal_2.add(CarouselFinder);
        let layersTempVal_4 = layersTempVal_3.addClass("hidden-group");
        let layersTempVal_5 = layersTempVal_4.filter(".group-" + name);
        let layersTempVal_6 = layersTempVal_5.removeClass("hidden-group");

        // marking link
        groups
          .find(".group-control")
          .removeClass("active")
          .filter("[data-group=" + name + "]")
          .addClass("active");

        // open first layer from this group
        // openLayer(layers_list[layers_list.length - 1].name);

        // Now Body is at length-2 due to backhairs
        openLayer(layers_list[layers_list.length - 2].name);

        // callback
        options.onGroupSelect.call(self, name);
      }

      function closeSubTabs() {
        let AllSubTabGrp = subtabBar.find(
          ".subtab-bar-container.group-" + selected_group
        );
        AllSubTabGrp.removeClass("subtabShow");
        AllSubTabGrp.find(".item").removeClass("showLayerItem");
      }

      function OpenSubTab_Section(name, index) {
        let CurrentLayer = layers
          .find(".layer.group-" + selected_group)
          .filter(".layer-" + name);

        CurrentLayer.find(".item").removeClass("showLayerItem");
        CurrentLayer.find(".item." + (name + index)).addClass("showLayerItem");

        let CurrentSubTab = subtabBar
          .find(".subtab-bar-container.group-" + selected_group)
          .filter(".subtab-bar-container-" + name);
        let CurrentSubTabInner = CurrentSubTab.find(
          ".subtab-bar-container-inner-" + name
        );
        CurrentSubTabInner.find(".subtab-item").removeClass("itemVisited");
        CurrentSubTabInner.find(".subtab-item.item-" + index).addClass(
          "itemVisited"
        );
      }


      function Next_Tab_Open() {

        $(".prev-tab-click").show();
        $(".next-tab-click").show();

        const CurrentGrpTabs = tabs.find(".tab.group-" + selected_group);
        const CurrentGrpActiveTab = CurrentGrpTabs.filter(".active");
        const CurrentTabIndex = $(CurrentGrpActiveTab).data("tabIndex");

        CurrentGrpTabs.removeClass("active");

        const length = group_length[selected_group];
        let NextTabIndex = 0;

        if (CurrentTabIndex === length - 1) {
          NextTabIndex = 0;
        }
        else {
          NextTabIndex = CurrentTabIndex + 1;
        }

        const NextTab = CurrentGrpTabs.filter(".tabIndex" + NextTabIndex);
        const name = $(NextTab).data("layer");

        // This is because "Body is Intital Tab which have index equal to length - 1"
        if (name === "pants" || name === "skirts") {
          $(".next-tab-click").hide();
        }

        NextTab.addClass("active");
        openLayer(name);
      }

      function Prev_Tab_Open() {

        $(".prev-tab-click").show();
        $(".next-tab-click").show();

        const CurrentGrpTabs = tabs.find(".tab.group-" + selected_group);
        const CurrentGrpActiveTab = CurrentGrpTabs.filter(".active");
        const CurrentTabIndex = $(CurrentGrpActiveTab).data("tabIndex");

        CurrentGrpTabs.removeClass("active");
        const length = group_length[selected_group];
        let PrevTabIndex = 0;

        if (CurrentTabIndex === 0) {
          PrevTabIndex = length - 1;
        }
        else {
          PrevTabIndex = CurrentTabIndex - 1;
        }

        const PrevTab = CurrentGrpTabs.filter(".tabIndex" + PrevTabIndex);
        const name = $(PrevTab).data("layer");

        if (name === "body") {
          $(".prev-tab-click").hide();
        }

        PrevTab.addClass("active");
        openLayer(name);

      }

      function markItemActive(name, index) {
        let layersTempVal_1 = layers
          .find(".layer-" + name + ".group-" + selected_group)
          .find(".item")
          .removeClass("active");

        let layersTempVal_2 = layersTempVal_1.eq(index);

        let itemIndex = $(layersTempVal_2).data("index");
        let itemCat = $(layersTempVal_2).data("itemCat");
        let itemValInCat = $(layersTempVal_2).data("itemValInCat");
        let SkinTone = $(layersTempVal_2).data("SkinTone");
        let currentCount = $(layersTempVal_2).data("currentCount");

        layersTempVal_2.addClass("active");

        // mark selected at our storage
        // warn: counting from 1

        console.log("--------------- Mark Item Active -----------------")
        console.log(name)
        console.log(options.selected[selected_group][name]);

        console.log("iiiiiiiii", itemIndex, itemCat, itemValInCat, SkinTone, currentCount);

        options.selected[selected_group][name] = {
          index: itemIndex,
          itemCat: itemCat,
          itemValInCat: itemValInCat,
          SkinTone: SkinTone,
          currentCount: currentCount
        };

        console.log("after---------------", options.selected[selected_group][name]);

      }

      function markCarouselItemActive(name, index) {
        var cname = isLayerOpened(name) ? "active" : "layer-active";

        carousel_in
          .find(".layer-item-" + name + ".group-" + selected_group)
          .removeClass(cname)
          .eq(index)
          .addClass(cname);
      }

      function openLayer(name) {
        if (isLayerOpened(name)) {
          return;
        }

        carousel_in
          .find(
            ".item.group-" +
            selected_group +
            ", .layer-item.layer-item-" +
            name +
            ".group-" +
            selected_group
          )
          .toggleClass("layer-item item")
          .filter(".active, .layer-active")
          .toggleClass("active layer-active");

        var items = carousel_in.find(".item.group-" + selected_group);

        if (!items.filter(".active").length) {
          items.first().addClass("active");
        }

        carousel.data("carousel", null).carousel({ interval: false });

        markLayerActive(name);

        options.onLayerSelect.call(self, name);
      }

      function closeLayer() {
        carousel_in
          .find(".item")
          .toggleClass("layer-item item")
          .filter(".active")
          .toggleClass("active layer-active");

        layers
          .find(".layer.active")
          .add(tabs.find(".tab.active"))
          .removeClass("active");
      }

      function isLayerOpened(name) {
        return layers
          .find(".layer-" + name + ".group-" + selected_group)
          .hasClass("active");
      }

      function markLayerActive(name) {
        var /* group name */ group,
        /* layers list */ layers_list,
        /* layer index */ v,
        /* layer clone */ cl,
        /* layer object */ ld,
        /* previous layer */ p,
        /* item index */ i,
        /* carousel item clone */ icl,
        /* item clone */ il,
        /* item image */ im,
        /* tab clone */ ct,
        /* selected index */ sel,
        /* layers' zIndex */ zIndex = options.zIndex,
        /* subTabBarContainer Clone*/ subTabContainerClone,
        /* subTab Clone */ subTabContainerInnerClone,
        /* subTab Nav Clone */ subtabNavClone,
        /* subTab Nav Item Clone */ subtabItemClone;

        // This points to the anchor tag of ".tab " list element
        var /* if true, use .find+.text, .text otherwise */ par_tab_text = tab.find(
          ".tab-text"
        ).length;


        p = null;
        zIndex = options.zIndex;

        // filling up all the things

        for (let group in options.json) {
          // don't iterate over inherited or smth
          if (!options.json.hasOwnProperty(group)) {
            continue;
          }

          const layers_list = options.json[group];

          // do not interlink groups
          // p ---> previous Layer
          p = null;

          for (let v = layers_list.length; v--;) {
            let ld = layers_list[v];
            let itemSelected = false; // Flag for telling that a image item is selected for intial display
            let intialSelectionCategory =
              ld.name === "body" ||
              ld.name === "face_shapes" ||
              ld.name === "eyebrows" ||
              ld.name === "eyes" ||
              ld.name === "noses" ||
              ld.name === "lips" ||
              ld.name === "hairstyles" ||
              ld.name === "shirts" ||
              ld.name === "pants" ||
              ld.name === "boots" ||
              ld.name === "skirts" ||
              ld.name === "dresses";

            zIndex++;

            // Checking if Feature is Present in Both so we can render only once
            // If, Present in both then we will loop 2 times otherwise only once
            // for resepective gender present


            let presentInBoth = 1;
            if (options.json["male"][v].name === options.json["female"][v].name) {
              presentInBoth = 2;
            }

            if (ld.name === name && layers.find(".layer-" + ld.name).length < presentInBoth) {
              // 2 - cause one will be for male and the other for female

              // filling hash withh all layers
              hash_layers[ld.name] = ld;

              // all the linking things
              if (p) {
                ld.prev = layers_list[v++];
                p.next = ld;
              }

              p = ld;

              // sets selected item
              // sel ---> selected index
              console.log("Layer Name is ", ld.name, " and Group is ", group);
              let sel = options.selected[group][ld.name].index ? options.selected[group][ld.name].index : 0;
              console.log("Sel Wala Index -----------> ", sel);

              // cloning layer element
              // cl ---> tab clone
              let tempVal = layer.clone().data({
                name: ld.name
              });

              let cl = tempVal.addClass(
                "layer layer-" + ld.name + " group-" + group
              );

              // cloning layers' tab element
              if (layer_tab.length) {
                cl.append(layer_tab.clone().text(ld.title));
              }

              if (ld.groups) {

                let categoryCount = ld.count;
                cl.addClass("category");

                let featureName = ld.name;
                let InitialSelection = 1;

                const { selected: { [selected_group]: { [featureName]: { itemCat = 1 } = {} } = {} } = {} } = options;
                InitialSelection = itemCat;

                console.log("Index Wala ---------------> ", itemCat);
                console.log("Initial Selection Wala ----------> ", InitialSelection);
                console.log();
                console.log();
                // console.log(featureName);
                for (let catIdx = 0; catIdx < categoryCount; ++catIdx) {

                  let variationCount = ld.groups[catIdx].count;
                  let CategoryTitle = ld.groups[catIdx].title;
                  let CategoryPath = ld.groups[catIdx].path;
                  let itemCategory = catIdx + 1 <= 9 ? "0" + (catIdx + 1) : catIdx;

                  let subtabItemClone = subtabItem
                    .clone()
                    .addClass("item-" + (catIdx + 1))
                    .text(CategoryTitle);

                  subtabItemClone.data({
                    subTabItemName: ld.name,
                    subTabItemIndex: catIdx + 1
                  });
                  // subtabNavClone.append(subtabItemClone);

                  let DeselectorItemLayer = layer_item
                    .clone()
                    .addClass(
                      ld.name +
                      (catIdx + 1) +
                      " unselector-" +
                      ld.name +
                      "-item"
                    )
                    .data({
                      UnselectorName: ld.name,
                      index: 0,
                      itemCat: -1,
                      itemValInCat: -1,
                      SkinTone: "",
                      currentCount: ""
                    });

                  let deselectImg = options.images + "crossSign" + options.ext;

                  let deselectImgTag = $("<img />").attr("src", deselectImg);

                  cl.append(DeselectorItemLayer.append(deselectImgTag));

                  // let DeselectorItem = carousel_item
                  //   .clone()
                  //   .addClass(
                  //     "layer-item layer-item-" +
                  //     ld.name +
                  //     " group-" +
                  //     group +
                  //     " unselector-" +
                  //     ld.name +
                  //     "-item"
                  //   )
                  //   .data("layer", ld.name)
                  //   .css("zIndex", ld.zIndex || zIndex);

                  // carousel_in.append(DeselectorItem);

                  for (let varIdx = 1; varIdx <= variationCount; ++varIdx) {

                    // Ye Hum Ker Rhe Taaki Hum Usse Choosen SubTabItem ke Number se Visible ker saake
                    let LayerItemName = ld.name + (catIdx + 1);
                    let itemValueInVCategory = String.fromCharCode(96 + varIdx);

                    il = layer_item.clone().data({
                      index: varIdx,
                      itemCat: itemCategory,
                      itemValInCat: itemValueInVCategory,
                      SkinTone: "",
                      currentCount: itemValueInVCategory
                    });

                    il.addClass(LayerItemName);
                    // carousel item clone

                    // Hum yha per carousel_item bna rhe hai her ek image ke liye
                    let iclTempVal_1 = carousel_item
                      .clone()
                      .addClass(
                        "layer-item layer-item-" + ld.name + " group-" + group
                      );

                    let iclTempVal_2 = iclTempVal_1.data({
                      layer: ld.name
                    });

                    icl = iclTempVal_2.css("zIndex", ld.zIndex || zIndex);

                    if (!itemSelected && sel === varIdx && itemCat === itemCategory) {
                      // ye bta rha hai ki ye category ka ek item select ho chuka hai.. taaki hum dubra se isse category
                      // ek item aur select na ker le category section ke ander
                      itemSelected = true;
                      // ye bta rha hai tick konsi image per tick mark rhega category images ke ander
                      il.addClass("active");
                      //ye bta rha hai ki .. kisi perticular category ka ye wala item active rhega jab hum avatar
                      // load karenge first time
                      icl.addClass("layer-active");

                      options.selected[group][ld.name] = {
                        index: sel,
                        itemCat: itemCategory,
                        itemValInCat: itemValueInVCategory,
                        SkinTone: "",
                        currentCount: itemValueInVCategory
                      };

                    }

                    // if (!itemSelected && intialSelectionCategory && sel === varIdx) {

                    //   itemSelected = true;
                    //   il.addClass("active");
                    //   icl.addClass("layer-active");

                    //   options.selected[group][ld.name] = {
                    //     index: sel,
                    //     itemCat: itemCategory,
                    //     itemValInCat: itemValueInVCategory,
                    //     SkinTone: "",
                    //     currentCount: itemValueInVCategory
                    //   };

                    // }
                    // else if (!itemSelected && !intialSelectionCategory && sel === varIdx) {
                    //   itemSelected = true;
                    //   options.selected[group][ld.name] = {
                    //     index: sel,
                    //     itemCat: itemCategory,
                    //     itemValInCat: itemValueInVCategory,
                    //     SkinTone: "",
                    //     currentCount: itemValueInVCategory
                    //   };
                    // }

                    // Image
                    let ImageImg =
                      options.images +
                      group +
                      CategoryPath.replace(
                        "current_count",
                        String.fromCharCode(96 + varIdx)
                      );
                    im = $("<img />").attr("src", ImageImg);

                    // append to layer
                    cl.append(il.append(im));

                    // append to carousel
                    let currentCar = carousel_in
                      .find(".layer-item-" + name + ".group-" + selected_group)
                      .eq(i)
                    currentCar.html(im.clone());
                  }

                  // append layer to layers' element
                  layers.append(cl);
                }
              }
              else {

                let DeselectorItemLayer = layer_item
                  .clone()
                  .addClass(" unselector-" + ld.name + "-item")
                  .data({
                    UnselectorName: ld.name,
                    index: 0,
                    itemCat: -1,
                    itemValInCat: -1,
                    SkinTone: "",
                    currentCount: ""
                  });

                let deselectImg = options.images + "crossSign" + options.ext;
                let deselectImgTag = $("<img />").attr("src", deselectImg);

                cl.append(DeselectorItemLayer.append(deselectImgTag));

                let DeselectorItem = carousel_item
                  .clone()
                  .addClass(
                    "layer-item layer-item-" +
                    ld.name +
                    " group-" +
                    group +
                    " unselector-" +
                    ld.name +
                    "-item"
                  )
                  .data("layer", ld.name)
                  .css("zIndex", ld.zIndex || zIndex);

                // carousel_in.append(DeselectorItem);

                let InitialSelection = "a";

                const { selected: { [selected_group]: { body: { SkinTone = "a" } = {} } = {} } = {} } = options;
                InitialSelection = SkinTone;

                console.log("SkinTone Wala ---------------> ", SkinTone);
                console.log("Initial Selection Wala ----------> ", InitialSelection);
                console.log();
                console.log();

                for (let i = 1; i <= ld.count; i++) {

                  let currentFeaturePath = ld.path;
                  let Current_Count = i <= 9 ? "0" + i : i;
                  let currentTickItem = String.fromCharCode(96 + i);

                  // item clone
                  if (name === "noses" || name === "face_shapes") {
                    const { selected: { [selected_group]: { body: { SkinTone = "a" } = {} } = {} } = {} } = options;
                    currentTickItem = SkinTone
                    il = layer_item.clone().data({
                      index: i,
                      itemCat: 0,
                      itemValInCat: SkinTone,
                      SkinTone: SkinTone,
                      currentCount: Current_Count
                    });
                  } else {
                    il = layer_item.clone().data({
                      index: i,
                      itemCat: 0,
                      itemValInCat: String.fromCharCode(96 + i),
                      SkinTone: String.fromCharCode(96 + i),
                      currentCount: Current_Count
                    });
                  }

                  //Current Count

                  // carousel item clone
                  icl = carousel_item
                    .clone()
                    .addClass(
                      "layer-item layer-item-" + ld.name + " group-" + group
                    )
                    .data({
                      layer: ld.name
                    })
                    .css("zIndex", ld.zIndex || zIndex);

                  if (!itemSelected && intialSelectionCategory && currentTickItem === InitialSelection) {
                    itemSelected = true;
                    il.addClass("active");
                    icl.addClass("layer-active");
                    options.selected[group][ld.name] = {
                      index: sel,
                      itemCat: 0,
                      itemValInCat: InitialSelection,
                      SkinTone: InitialSelection,
                      currentCount: Current_Count
                    };
                  }
                  else if (!itemSelected && !intialSelectionCategory && currentTickItem === InitialSelection) {
                    itemSelected = true;
                    options.selected[group][ld.name] = {
                      index: sel,
                      itemCat: 0,
                      itemValInCat: InitialSelection,
                      SkinTone: InitialSelection,
                      currentCount: Current_Count
                    };
                  }

                  // Image
                  if (currentFeaturePath.indexOf("body_type") !== -1) {
                    currentFeaturePath = currentFeaturePath.replace(/current_count/g, Current_Count);
                    currentFeaturePath = currentFeaturePath.replace("body_type", InitialSelection);
                  }
                  else {
                    currentFeaturePath = currentFeaturePath.replace("current_count", String.fromCharCode(96 + i));
                  }

                  let ImageImg = options.images + group + currentFeaturePath;
                  im = $("<img />").attr("src", ImageImg);

                  // append to layer
                  cl.append(il.append(im));

                  // append to carousel
                  let currentCar = carousel_in
                    .find(".layer-item-" + name + ".group-" + selected_group)
                    .eq(i)
                  currentCar.html(im.clone());
                  // carousel_in.append(icl.html(im.clone()));

                }
                //Loop End HERE
                // append layer to layers' element
                layers.append(cl);
              }
            }
            else if (ld.name !== name) {
              if (onlyFaceNose === false) {
                layers.find(".layer-" + ld.name).remove();
              }
            }
          }
        }

        if (onlyFaceNose === false) {

          let CurrentGrpLayer = layers.find(".layer.group-" + selected_group);

          let CurrentLayer = CurrentGrpLayer.removeClass("active").filter(
            ".layer-" + name
          );

          let AllSubTabGrp = subtabBar.find(
            ".subtab-bar-container.group-" + selected_group
          );
          let CurrentSubTab = AllSubTabGrp.filter(
            ".subtab-bar-container-" + name
          );
          let CurrentSubTabInner = CurrentSubTab.find(
            ".subtab-bar-container-inner-" + name
          );

          if (CurrentLayer.hasClass("category")) {
            if (!CurrentSubTab.hasClass("subtabShow")) {
              AllSubTabGrp.removeClass("subtabShow");
              CurrentSubTab.addClass("subtabShow");
              updateUI();
              //Changes 2 because body is 2nd now
              OpenSubTab_Section(name, 1);
            }
          } else {
            AllSubTabGrp.removeClass("subtabShow");
            CurrentGrpLayer.find(".item").removeClass("showLayerItem");
            CurrentLayer.find(".item").addClass("showLayerItem");
          }

          CurrentLayer.addClass("active");

          if (tabs.length && first_tab_Open) {
            tabs
              .find(".tab.group-" + selected_group)
              .removeClass("active")
              .filter(".tab-" + name)
              .addClass("active");
            first_tab_Open = false;
          }

          var layer1 = hash_layers[name],
            layer_name = $this.find(".layer-name"),
            layer_next = $this.find(".layer-name-next"),
            layer_prev = $this.find(".layer-name-prev");

          layer_name.text(layer1.title);
          layer_next.text(layer1.next && layer1.next.title);
          layer_prev.text(layer1.prev && layer1.prev.title);

          $this
            .toggleClass("has-next", !!layer1.next)
            .toggleClass("has-prev", !!layer1.prev);
        }
      }

      function initConstructor() {
        var /* group name */ group,
        /* layers list */ layers_list,
        /* layer index */ v,
        /* layer clone */ cl,
        /* layer object */ ld,
        /* previous layer */ p,
        /* item index */ i,
        /* carousel item clone */ icl,
        /* item clone */ il,
        /* item image */ im,
        /* tab clone */ ct,
        /* selected index */ sel,
        /* layers' zIndex */ zIndex = options.zIndex,
        /* subTabBarContainer Clone*/ subTabContainerClone,
        /* subTab Clone */ subTabContainerInnerClone,
        /* subTab Nav Clone */ subtabNavClone,
        /* subTab Nav Item Clone */ subtabItemClone;

        // This points to the anchor tag of ".tab " list element
        var /* if true, use .find+.text, .text otherwise */ par_tab_text = tab.find(
          ".tab-text"
        ).length;

        // random
        if (options.selected === true) {
          options.selected = {};

          for (group in options.json) {
            // don't iterate over inherited or smth
            if (!options.json.hasOwnProperty(group)) {
              continue;
            }

            layers_list = options.json[group];

            options.selected[group] = {};

            group_length[group] = layers_list.length;

            for (v = layers_list.length; v--;) {
              ld = layers_list[v];

              if (ld.skeleton) {
                continue;
              }

              options.selected[group][ld.name] = 1;
            }
          }
        }

        // linking object to elements' data
        $this.data("selected", options.selected);

        // filling up all the things
        for (group in options.json) {
          // don't iterate over inherited or smth
          if (!options.json.hasOwnProperty(group)) {
            continue;
          }

          layers_list = options.json[group];

          // do not interlink groups
          // p ---> previous Layer
          p = null;

          for (v = layers_list.length; v--;) {
            ld = layers_list[v];
            let itemSelected = false; // Flag for telling that a image item is selected for intial display
            let intialSelectionCategory =
              ld.name === "body" ||
              ld.name === "face_shapes" ||
              ld.name === "eyebrows" ||
              ld.name === "eyes" ||
              ld.name === "noses" ||
              ld.name === "lips" ||
              ld.name === "hairstyles" ||
              ld.name === "shirts" ||
              ld.name === "pants" ||
              ld.name === "boots" ||
              ld.name === "skirts" ||
              ld.name === "dresses";
            zIndex++;

            subTabContainerClone = subTabContainer
              .clone()
              .addClass("subtab-bar-container-" + ld.name + " group-" + group);
            subTabContainerClone.append(
              '<div id="right-button" style="visibility: hidden;"><a href="#"><</a></div>'
            );
            subTabContainerInnerClone = subTabContainerInner
              .clone()
              .addClass(
                "subtab-bar-container-inner-" + ld.name + " group-" + group
              );

            if (ld.skeleton) {
              // carousel item clone
              icl = carousel_item
                .clone()
                .addClass(
                  "layer-item layer-active layer-item-" +
                  ld.name +
                  " group-" +
                  group
                )
                .css("zIndex", ld.zIndex || zIndex);

              // image
              let ImagePath =
                options.images + group + "/" + ld.name + options.ext;
              im = $("<img />").attr("src", ImageTag);

              // append to carousel
              carousel_in.append(icl.html(ImageTag));
            } else {

              // filling hash withh all layers
              hash_layers[ld.name] = ld;

              // all the linking things
              if (p) {
                ld.prev = p;
                p.next = ld;
              }

              p = ld;

              // sets selected item
              // sel ---> selected index
              sel = options.selected[group][ld.name];

              // cloning layer element

              // cl ---> tab clone
              let tempVal = layer.clone().data({
                name: ld.name
              });

              cl = tempVal.addClass(
                "layer layer-" + ld.name + " group-" + group
              );

              // cloning layers' tab element
              if (layer_tab.length) {
                cl.append(layer_tab.clone().text(ld.title));
              }

              // cloning tab element
              if (tab.length) {
                let tempVal = tab.clone().data({
                  layer: ld.name,
                  tabIndex: v
                });
                ct = tempVal.addClass(
                  "tab-" + ld.name + " group-" + group + " tabIndex" + v
                );

                if (par_tab_text) {
                  let tempCt = ct.find(".tab-text");
                  tempCt.text(ld.title);
                } else {
                  ct.text(ld.title);
                }

                tabs.append(ct);
              }

              if (ld.groups) {

                let categoryCount = ld.count;
                let catIdx = 0; // Category Index
                cl.addClass("category");
                subtabNavClone = subtabNav
                  .clone()
                  .addClass("subtabNav-" + ld.name);

                // console.log(group)
                // console.log(ld.name)

                for (catIdx = 0; catIdx < categoryCount; ++catIdx) {
                  let variationCount = ld.groups[catIdx].count;
                  let varIdx = 0;
                  let CategoryTitle = ld.groups[catIdx].title;
                  let CategoryName = ld.groups[catIdx].name;
                  let CategoryPath = ld.groups[catIdx].path;

                  subtabItemClone = subtabItem
                    .clone()
                    .addClass("item-" + (catIdx + 1))
                    .text(CategoryTitle);

                  // SubTabItem ko hum kuch values de rhe hai, Click event ke during hum usse
                  // usse ker ke srif ho Images visible ker saake jo iske under ayegi
                  subtabItemClone.data({
                    subTabItemName: ld.name,
                    subTabItemIndex: catIdx + 1
                  });
                  subtabNavClone.append(subtabItemClone);

                  /*
                    ye hum deselector bna rha hai ... for deselecting hai item already selected
                    so that.. hume koi item ya dress deselect kerni ho
                  
                  */
                  let DeselectorItemLayer = layer_item.clone().
                    addClass(ld.name + (catIdx + 1) + " unselector-" + ld.name + "-item")
                    .data({
                      UnselectorName: ld.name,
                      index: 0,
                      itemCat: -1,
                      itemValInCat: -1,
                      SkinTone: "",
                      currentCount: ""
                    });

                  let deselectImg = options.images + "crossSign" + options.ext;

                  let deselectImgTag = $("<img />").attr("src", deselectImg);

                  cl.append(DeselectorItemLayer.append(deselectImgTag));

                  let DeselectorItem = carousel_item
                    .clone()
                    .addClass(
                      "layer-item layer-item-" +
                      ld.name +
                      " group-" +
                      group +
                      " unselector-" +
                      ld.name +
                      "-item"
                    )
                    .data("layer", ld.name)
                    .css("zIndex", ld.zIndex || zIndex);

                  carousel_in.append(DeselectorItem);

                  for (varIdx = 1; varIdx <= variationCount; ++varIdx) {
                    // Ye Hum Ker Rhe Taaki Hum Usse Choosen SubTabItem ke Number se Visible ker saake
                    let LayerItemName = ld.name + (catIdx + 1);
                    il = layer_item.clone().data({
                      index: varIdx,
                      itemCat: catIdx + 1 <= 9 ? "0" + (catIdx + 1) : catIdx,
                      itemValInCat: String.fromCharCode(96 + varIdx),
                      SkinTone: "",
                      currentCount: String.fromCharCode(96 + varIdx)
                    });

                    il.addClass(LayerItemName);
                    // carousel item clone

                    // Hum yha per carousel_item bna rhe hai her ek image ke liye
                    let iclTempVal_1 = carousel_item
                      .clone()
                      .addClass(
                        "layer-item layer-item-" + ld.name + " group-" + group
                      );

                    let iclTempVal_2 = iclTempVal_1.data({
                      layer: ld.name
                    });

                    icl = iclTempVal_2.css("zIndex", ld.zIndex || zIndex);

                    if (!itemSelected && intialSelectionCategory) {
                      // ye bta rha hai ki ye category ka ek item select ho chuka hai.. taaki hum dubra se isse category
                      // ek item aur select na ker le category section ke ander
                      itemSelected = true;
                      // ye bta rha hai tick konsi image per tick mark rhega category images ke ander
                      il.addClass("active");
                      //ye bta rha hai ki .. kisi perticular category ka ye wala item active rhega jab hum avatar
                      // load karenge first time
                      icl.addClass("layer-active");

                      options.selected[group][ld.name] = {
                        index: sel,
                        itemCat: catIdx + 1 <= 9 ? "0" + (catIdx + 1) : catIdx,
                        itemValInCat: String.fromCharCode(96 + varIdx),
                        SkinTone: "",
                        currentCount: String.fromCharCode(96 + varIdx)
                      };
                    } else if (!itemSelected && !intialSelectionCategory) {
                      options.selected[group][ld.name] = {
                        index: 0,
                        itemCat: 0,
                        itemValInCat: "",
                        SkinTone: "",
                        currentCount: ""
                      };
                    }

                    // Image
                    let ImageImg = options.images + group + CategoryPath.replace("current_count", String.fromCharCode(96 + varIdx));
                    im = $("<img />").attr("src", ImageImg);

                    // append to layer
                    cl.append(il.append(im));

                    // append to carousel
                    carousel_in.append(icl.html(im.clone()));
                  }

                  // append layer to layers' element
                  // layers.append(cl);
                }

                subTabContainerInnerClone.append(subtabNavClone);
                subTabContainerClone.append(subTabContainerInnerClone);
                subTabContainerClone.append(
                  '<div id="left-button"><a href="#">></a></div>'
                );
                subtabBar.append(subTabContainerClone);
              } else {

                /*ye hum deselector bna rha hai. for deselecting hai item already selected
                so that.. hume koi item ya dress deselect kerni ho*/

                let InitialSelection = "a";

                let DeselectorItemLayer = layer_item
                  .clone()
                  .addClass(" unselector-" + ld.name + "-item")
                  .data({
                    UnselectorName: ld.name,
                    index: 0,
                    itemCat: -1,
                    itemValInCat: -1,
                    SkinTone: "",
                    currentCount: ""
                  });

                let deselectImg = options.images + "crossSign" + options.ext;
                let deselectImgTag = $("<img />").attr("src", deselectImg);

                cl.append(DeselectorItemLayer.append(deselectImgTag));

                let DeselectorItem = carousel_item
                  .clone()
                  .addClass(
                    "layer-item layer-item-" +
                    ld.name +
                    " group-" +
                    group +
                    " unselector-" +
                    ld.name +
                    "-item"
                  )
                  .data("layer", ld.name)
                  .css("zIndex", ld.zIndex || zIndex);

                carousel_in.append(DeselectorItem);

                for (i = 1; i <= ld.count; i++) {

                  let currentFeaturePath = ld.path;
                  let Current_Count = i <= 9 ? "0" + i : i;
                  // item clone
                  il = layer_item.clone().data({
                    index: i,
                    itemCat: i,
                    itemValInCat: String.fromCharCode(96 + i),
                    SkinTone: String.fromCharCode(96 + i),
                    currentCount: Current_Count
                  });

                  //Current Count

                  // carousel item clone
                  icl = carousel_item
                    .clone()
                    .addClass(
                      "layer-item layer-item-" + ld.name + " group-" + group
                    )
                    .data({
                      layer: ld.name
                    })
                    .css("zIndex", ld.zIndex || zIndex);

                  if (!itemSelected && intialSelectionCategory) {
                    itemSelected = true;
                    il.addClass("active");
                    icl.addClass("layer-active");
                    options.selected[group][ld.name] = {
                      index: sel,
                      itemCat: i,
                      itemValInCat: InitialSelection,
                      SkinTone: InitialSelection,
                      currentCount: Current_Count
                    };
                  } else if (!itemSelected && !intialSelectionCategory) {
                    itemSelected = true;
                    options.selected[group][ld.name] = {
                      index: 0,
                      itemCat: 0,
                      itemValInCat: 0,
                      SkinTone: "",
                      currentCount: ""
                    };
                  }

                  // Image
                  if (currentFeaturePath.indexOf("body_type") !== -1) {
                    currentFeaturePath = currentFeaturePath.replace(/current_count/g, Current_Count);
                    currentFeaturePath = currentFeaturePath.replace("body_type", InitialSelection);
                  }
                  else {
                    currentFeaturePath = currentFeaturePath.replace("current_count", String.fromCharCode(96 + i));
                  }

                  let ImageImg = options.images + group + currentFeaturePath;
                  im = $("<img />").attr("src", ImageImg);

                  // append to layer
                  cl.append(il.append(im));

                  // append to carousel
                  carousel_in.append(icl.html(im.clone()));

                }
                //Loop End HERE
                // append layer to layers' element
                // layers.append(cl);
              }
            }
          }
        }

        carousel_in.append($('<div class="mask" />').css("zIndex", ++zIndex));

        document
          .getElementById("female-type")
          .addEventListener("click", function (e) {
            closeSubTabs();
            openGroup(e.target.value);
          });

        document
          .getElementById("male-type")
          .addEventListener("click", function (e) {
            closeSubTabs();
            openGroup(e.target.value);
          });

        $this
          .on("click.pixel", ".layers .item", function (e) {
            var target = $(e.currentTarget),
              layer = target.closest(".layer"),
              name = layer.data("name"),
              index = layer.find(".item").index(target);
            openLayer(name);
            carousel.carousel(index);
          })
          .on(
            "click.pixel",
            ".subtab-bar-container .subtab-bar-container-inner .subtabNav .subtab-item",
            function (e) {
              var target = $(e.currentTarget);
              var name = target.data("subTabItemName");
              var index = target.data("subTabItemIndex");
              OpenSubTab_Section(name, index);
            }
          )
          .on("click.pixel", "#right-button", function (e) {
            // assignment
            elem = $(".subtabShow");
            outer = elem.find(".subtab-bar-container-inner");
            inner = outer.find(".subtabNav");
            subtabItems = inner.children();

            var leftPos = outer.scrollLeft();
            var rightButton = elem.find("#right-button");

            outer.animate(
              {
                scrollLeft: leftPos - 400
              },
              500,
              function () {
                if (outer.scrollLeft() <= 0) {
                  setInvisible(rightButton);
                }
              }
            );
          })
          .on("click.pixel", "#left-button", function (e) {
            elem = $(".subtabShow");
            outer = elem.find(".subtab-bar-container-inner");
            inner = outer.find(".subtabNav");
            subtabItems = inner.children();
            var rightButton = elem.find("#right-button");
            setVisible(rightButton);
            var leftPos = outer.scrollLeft();
            outer.animate(
              {
                scrollLeft: leftPos + 200
              },
              500
            );
          })
          .on("click.pixel", ".prev-tab", function (e) {
            Prev_Tab_Open();
          })
          .on("click.pixel", ".next-tab", function (e) {
            Next_Tab_Open();
          })
          .on("slid.pixel", function (e) {
            var items = carousel_in.find(".item.group-" + selected_group),
              active = items.filter(".active"),
              name = active.data("layer");

            let itemIndex = items.index(active);
            markLayerActive(name);
            markItemActive(name, itemIndex);
            if (name === "body") {
              onlyFaceNose = true;
              markLayerActive("face_shapes");
              markItemActive("face_shapes", 1);
              markLayerActive("noses");
              markItemActive("noses", 1);
              onlyFaceNose = false;
            }
          })
          .on("click.pixel", ".layer-control", function (e) {
            var target = $(e.currentTarget),
              active = layers.find(".layer.active"),
              type = target.data("direction"),
              next = active[type](".layer.group-" + selected_group),
              fallback = type == "next" ? "first" : "last";

            if (!next.length) {
              next = layers.find(".layer.group-" + selected_group)[fallback]();
            }

            openLayer(next.data("name"));
          })
          .on("click.pixel", ".item-control", function (e) {
            var target = $(e.currentTarget);

            carousel.carousel(target.data("direction"));
          })
          .on("click.pixel", ".group-control", function (e) {
            var target = $(e.currentTarget);
            closeSubTabs();
            openGroup(target.data("group"));
          })
          .on("click.pixel", ".layers-regenerate", function (e) {
            var layer, index;
            // find out
            var opened;
            for (layer in hash_layers) {
              if (isLayerOpened(layer)) {
                opened = layer;
                break;
              }
            }

            for (layer in hash_layers) {
              index = Math.floor(hash_layers[layer].count * Math.random());

              index = index === 0 ? index + 1 : index;

              markItemActive(layer, index);
              markCarouselItemActive(layer, index);
            }

            openLayer(opened);
          })
          .on("click.pixel", ".layer-regenerate", function () {
            // regenerate selected for currently active layer
          });
        $(window).resize(function () {
          updateUI();
        });
      }

      $.get(
        options.json,
        function (groups) {
          options.json = groups;

          initConstructor();

          // Hiding the previou Tab for body part which (have index equal to length - 1)
          $(".prev-tab-click").hide();

          $this.waitForImages(function () {
            options.onLoaded.call(self, groups);
            if (options.startup.group in options.json) {
              openGroup(options.startup.group);
            }

            if (options.startup.layer in hash_layers) {
              openLayer(options.startup.layer);
            }
          }, options.onLoading);
        },
        "json"
      );
    });
  };

  $.fn.pixel.defaults = {
    json: null,
    images: null,
    selected: {},
    ext: ".png",
    zIndex: 1,
    onLoaded: $.noop,
    onLoading: $.noop,
    onGroupSelect: $.noop,
    onLayerSelect: $.noop
  };
})(jQuery);

