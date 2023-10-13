window.onload = function () {
    var button = document.getElementById('summon');
    var paragraph = document.getElementById('kittens');
    button.addEventListener('click', function () {

        kittens.insertAdjacentHTML("beforeend",'<img src=https://placekitten.com/g/200/200/>');
        /*
        var img = new Image();  
        img.src = 'https://placekitten.com/g/200/200/';
        document.getElementById('kittens').appendChild(img);
        */
    });
};