var party = [
    {name: 'Bat', id: 'bat1', hp: 20, maxHp: 20, hudHp: 20, hitAnim: 0},
    {name: 'Slime', id: 'slime', hp: 50, maxHp: 50, hudHp: 50, hitAnim: 0},
    {name: 'Bat', id: 'bat2', hp: 20, maxHp: 20, hudHp: 20, hitAnim: 0}
];

window.onload = function () {
    var list = document.getElementById('party-monsters');
    party.forEach(function (character) {
        var li = document.createElement('li');
            li.innerHTML = character.name + ' (<code>' + character.id + '</code>)';
        li.dataset.charaid = character.id;
        list.appendChild(li);
    });


    var select = document.querySelector('select[name=chara]');
    party.forEach(function (character) {
        var option = document.createElement('option');
        option.innerHTML = character.name;
        option.value = character.id;
        select.appendChild(option);
    });

    var audioSmallHit = document.getElementById("audioSmallHit");
    var audioBigHit = document.getElementById("audioBigHit");
    var audioDie = document.getElementById("audioDie");


    var form = document.querySelector('form[name=killing-machine]');

    var clickedButton = null;

    document.getElementById("smallHit").addEventListener('click', function (event) {
        clickedButton = "smallHit";
    });

    document.getElementById("bigHit").addEventListener('click', function (event) {
        clickedButton = "bigHit";
    });

    form.addEventListener('submit', function (event) {
        event.preventDefault();
        var charaID = form.querySelector('[name=chara]').value;
        var character = findCharById(charaID);
        
        
        if (clickedButton === "smallHit") {
            audioSmallHit.play();
            character.hp -= 5;
        } else if (clickedButton === "bigHit") {
            audioBigHit.play();
            character.hp -= 10;
        }


        character.hitAnim = 1;
        if (character.hp <= 0 ) {
            character.hp = 0; // corrige el valor en caso de que sea negativo.
            var li = list.querySelector('[data-charaid=' + charaID + ']');
            li.classList.add('dead');
            form.querySelector('button[id=smallHit]').disabled = true;
            form.querySelector('button[id=bigHit]').disabled = true;
        }

    });

    function findCharById(charaID) {
        return party.filter(function (char) { return char.id === charaID; })[0];
     }

    var selector = form.querySelector('select[name=chara]');
    selector.addEventListener("change", function  (event){
        var actualCharaID = selector.value;
        var actualLi = list.querySelector('[data-charaid=' + actualCharaID + ']');
        if(actualLi.classList.contains('dead')){
            form.querySelector('button[id=smallHit]').disabled = true;
            form.querySelector('button[id=bigHit]').disabled = true;
        }
        else{
            form.querySelector('button[id=smallHit]').disabled = false;
            form.querySelector('button[id=bigHit]').disabled = false;
        }
    });


    var lastRender = 0;
    var canvas = document.querySelector('canvas');
    var context = canvas.getContext('2d');

    function render() {
        requestAnimationFrame(function (t) {
            // Borra todo...
            context.clearRect(0, 0, 800, 600);
            // ...y repinta.
            
            renderParty(t, t - lastRender);
            //console.log('Delta time:', t - lastRender);
            lastRender = t;

            render();
        });
    }   

    function renderParty(t, deltaTime) {
        renderBackground();
        renderCharacters(t, deltaTime); // pásale t a la función que pinta los enemigos.
        renderUI(deltaTime);
    }
    
    var bgImage = document.getElementById('background');
    function renderBackground() {
        context.drawImage(bgImage, 0, 0)
        }

    var batImage = document.getElementById('batImage');
    var slimeImage = document.getElementById('slimeImage');
    var psychopathImage = document.getElementById('psychopathImage');

    function renderCharacters(t, deltaTime) {
        var charaSpace = 800 / party.length;
        var centerOffset = charaSpace / 2;

        var allDead = true;
        party.forEach(function (char, index) {
            var x = index * charaSpace + centerOffset;
            var y;
            if (char.hudHp < 0) {
                char.hudHp = 0;
                audioDie.play();
            } 

            if (char.name === 'Bat' && char.hudHp > 0) {
                y = 50 * Math.sin(t/100) + 200; // flotando en el aire.
                context.drawImage(batImage, x - 100, y, 200, 200);
                allDead = false;
            } 
            else if (char.name === 'Slime' && char.hudHp > 0) {
                y = 320; // en el suelo 
                context.drawImage(slimeImage, x - 70, y, 150, 110);
                allDead = false
            }
            
            if(char.hitAnim != 0){
                var hitImage = document.getElementById('hitImage');
                hitImage.style.opacity = char.hitAnim;
                if (char.name === 'Bat') context.drawImage(hitImage, x - 50, y + 50, 80, 80);
                else if (char.name === 'Slime') context.drawImage(hitImage, x - 50, y, 80, 80);  
                char.hitAnim -= 0.01 * deltaTime;
                if(char.hitAnim <= 0) char.hitAnim = 0; 
            }
            
        });

        if(allDead) context.drawImage(psychopathImage, 150, 40, 500, 500);
    }

    function renderUI(deltaTime) {
        var width = 100;
        var semiWidth = width / 2;
        var height = 20;
        var semiHeight = height / 2;
        var charaSpace = 800 / party.length;
        var centerOffset = charaSpace / 2;

        var hpBarAnimationSpeed = 0.01;

        party.forEach(function (char, index) {
            var x = index * charaSpace + centerOffset;
            var y = 500;
            if (char.hudHp > 0) {
                var lifeArea = Math.floor(char.hudHp / char.maxHp * width);
                context.fillStyle = 'red';
                context.fillRect(x - semiWidth, y - semiHeight, lifeArea, height);
                context.lineWidth = 3;
                context.strokeStyle = 'black';
                context.strokeRect(x - semiWidth, y - semiHeight, width, height);

                // Animación barra HP
                if(char.hudHp > char.hp){
                    char.hudHp -= hpBarAnimationSpeed * deltaTime;
                }
            }
        }); 
    }

    render();


};



