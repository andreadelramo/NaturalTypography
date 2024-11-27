const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789¿?¡!=.;:<>(),$&%";
const glyphGrid = document.getElementById("glyphGrid");
const highlightedGlyph = document.getElementById("highlightedGlyph");



// LA CUADRÍCULA DE GLIFOS
function createGlyphGrid() {
    characters.split('').forEach(char => {
        const glyphDiv = document.createElement("div");
        glyphDiv.textContent = char;
        glyphDiv.classList.add("glyph");

        glyphDiv.addEventListener("click", () => {
            highlightedGlyph.textContent = char;
            clearHighlight();
            glyphDiv.classList.add("highlight");
        });

        glyphGrid.appendChild(glyphDiv);
    });
}

// LIMPIA EL GLIFO DESTACADO
function clearHighlight() {
    document.querySelectorAll(".glyph").forEach(el => el.classList.remove("highlight"));
}

createGlyphGrid();



//ANIMACIÓN

document.addEventListener("DOMContentLoaded", () => {
    const highlightedGlyph = document.getElementById("highlightedGlyph");
    const glyphClasses = ["default-glif", "glif-ss01", "glif-ss02"];
    let currentGlyphClassIndex = 0;


    // ALTERNANCIA CONTINUA DE CLASES EN EL GLIFO DESTACADO
    function startContinuousClassAnimation() {
        glyphClasses.forEach(cls => highlightedGlyph.classList.remove(cls));
        highlightedGlyph.classList.add(glyphClasses[currentGlyphClassIndex]);

        setInterval(() => {
            highlightedGlyph.classList.remove(glyphClasses[currentGlyphClassIndex]);
            currentGlyphClassIndex = (currentGlyphClassIndex + 1) % glyphClasses.length;
            highlightedGlyph.classList.add(glyphClasses[currentGlyphClassIndex]);
        }, 200);
    }

    startContinuousClassAnimation();
});
