jQuery(function ($) {
    var group = 'female';

    var constructor = $("#constructor-panel"),
        constructor2 = $("#constructor-adc"),
        loader = $(".pixel-loading");

    constructor.pixel({
        //images: 'https://c8110851.ngrok.io/static/8bit/img/avatarImages/'
        images: 'https://snook-avatar.s3-us-west-2.amazonaws.com/compress/',
        json: 'https://cdn.shopify.com/s/files/1/0291/1689/1269/files/8settings.json?637',
        selected: true,
        startup: {
            layer: 'body',
            group: group
        },
        onLoaded: function () {
            constructor.show();
            constructor2.show();
            loader.hide();
        },
        onLoading: function (loaded, length) {
            constructor2.hide();
            var perc = Math.ceil(100 * loaded / length);

            loader.find('.headline span').text(perc + '%').end()
                .find('.bar').width(perc + '%');
        },
        onLayerSelect: function () {
            // constructor.find('.layers .layer').jScrollPane();
        },
        onGroupSelect: function () {
            var $this = $(this),
                tabs = $this.find('.tabs .tab'),
                visible = tabs;

            tabs.removeClass('first last')
                .filter(':not(.hidden-group)')
                .first().addClass('first').end()
                .last().addClass('last').end()
                .filter(':not(:first)').addClass('not-first');
        }
    });

    $(".download").on('click', function (e) {
        var $self = $(this);

        // var formEle = document.createElement('form');

        // $("#constructor-frame, #constructor-form").remove();

        var data = constructor.pixel('selected');
        //     iframe = $('<iframe />').attr({
        //         src: 'about:blank',
        //         id: 'constructor-frame',
        //         name: 'iframe-' + $.now()
        //     }).hide().on('load', function () {
        //     }),
        //     form = $(formEle).hide()
        //         .attr({
        //             action: $self.data('action'),
        //             target: iframe.attr('name'),
        //             id: 'constructor-form',
        //             method: 'POST'
        //         }),
        //     token = $('<input type="hidden" />').attr({
        //         name: 'csrfmiddlewaretoken',
        //         value: $.cookie('csrftoken')
        //     }),
        //     encoded = $('<input type="hidden" />').attr({
        //         name: 'data',
        //         value: JSON.stringify(data)
        //     }),
        //     gender = $('<input type="hidden" />').attr({
        //         name: 'gender',
        //         value: constructor.pixel('group')
        //     });

        // form.append(token).append(encoded).append(gender);
        // form.add(iframe).appendTo(constructor);
        // form.submit();
        // $self.removeClass('loading');
    });
});