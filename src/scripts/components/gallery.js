var galleryModule = (function() {
    const $gallery = document.getElementById('gallery');
    const $slides  = Array.from($gallery.getElementsByClassName('gallery__slide'));

    let $index   = 0;
    let $activeSlide = $slides[$index].classList.add('is-active');


    function Next() {
        $index = ($index + 1) % $slides.length;
        $slides.forEach($slide => $slide.classList.remove('is-active'));
        $activeSlide = $slides[$index];
        $activeSlide.classList.add('is-active');
    }

    return {
        init: function() {
            setInterval(Next, 7000);
        }
    }

})();

export default galleryModule;
