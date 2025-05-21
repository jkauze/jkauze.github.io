// Speed: typerSpeed | isTag: Boolean (to not take the html in txt) | text => text to read/show
var i = 0;
var text, isTag;
var speed = 8;
var idhtml = 'console'

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

// Theme Toggling Logic
const bodyElement = document.body; // document.body is generally safe to access early

document.addEventListener('DOMContentLoaded', function() {
    const themeToggleButton = document.getElementById('theme-toggle');
    const console2Element = document.getElementById('console2');

    function applySavedTheme() {
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme === 'light') {
            bodyElement.classList.add('light-mode');
            if (console2Element) {
                console2Element.classList.add('light-mode');
            }
        } else {
            // Default to dark mode if no theme saved or if saved theme is 'dark'
            bodyElement.classList.remove('light-mode');
            if (console2Element) {
                console2Element.classList.remove('light-mode');
            }
        }
    }

    function toggleTheme() {
        bodyElement.classList.toggle('light-mode');
        if (console2Element) {
            console2Element.classList.toggle('light-mode');
        }

        if (bodyElement.classList.contains('light-mode')) {
            localStorage.setItem('theme', 'light');
        } else {
            localStorage.setItem('theme', 'dark');
        }
    }

    // Apply saved theme on initial load
    if (console2Element) { // Ensure console2Element exists before trying to apply themes to it
        applySavedTheme();
    } else {
        // If console2 is critical, might need to wait or use MutationObserver.
        // For now, applySavedTheme has null checks, so body theme will apply.
        // Call it anyway for body, and console2 will be handled if it appears later by toggle.
        applySavedTheme(); 
        console.warn("#console2 element not found during initial theme application. Body theme applied.");
    }

    // Add click listener for the toggle button
    if (themeToggleButton) {
        themeToggleButton.addEventListener('click', toggleTheme);
    } else {
        console.error("Theme toggle button not found.");
    }
});
