// Speed: typerSpeed | isTag: Boolean (to not take the html in txt) | text => text to read/show
var i = 0;
var text, isTag;
var speed = 24;
var idhtml = 'console'
var random = true

// Typer get the .txt to read the content
var Typer = {
    text: null,
    file: "",
    init: function () {
        $.get(Typer.file, function (data) {
            Typer.text = data;
            Typer.text = Typer.text.slice(0, Typer.text.length - 1);
        typeWriter();
        });
    },
}

// set the initial file to read
Typer.file = "jkCV.txt";
Typer.init()

// TypeWriter Effect function
function typeWriter() {
    text = Typer.text.slice(0, ++i);
    if (text === Typer.text) return;
    document.getElementById(idhtml).innerHTML = text;

    var char = text.slice(-1);
    if( char === '<' ) isTag = true;
    if( char === '>' ) isTag = false;

    if (isTag) return typeWriter();
    setTimeout(typeWriter, speed);
}

// Prevent default form and skills Options with prompt
function mySubmitFunction(e) {
    e.preventDefault();
    i = 0
    var texto = document.getElementById('technologies').value
    if (texto == "y" || texto == "Y" || texto == "" || texto == "yes" || texto == "YES" || texto == "Yes") {
        idhtml = 'skillsconsole'
        Typer.file = "skills.txt";
    } else if (texto == "n" || texto == "N" || texto == "no" || texto == "No" || texto == "NO") {
        idhtml = 'skillsconsole'
        Typer.file = "bye.txt";

    } else {
        idhtml = 'skillsconsole'
        Typer.file = "error.txt";
    }
    document.getElementById('technologies').disabled = true
    Typer.init();
}
