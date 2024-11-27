document.addEventListener("DOMContentLoaded", () => {
    let currentVariant = 0;
    const variants = ["default-glif", "glif-ss01", "glif-ss02"];



    // OBTIENE LA SIGUIENTE CLASE DIFERENTE A LA ANTERIOR
    function getNextVariantClass() {
        currentVariant = (currentVariant + 1) % variants.length;
        return variants[currentVariant];
    }

    // APLICA ESTILO A UN CARÁCTER
    function styleCharacter(char) {
        const span = document.createElement("span");
        span.textContent = char;

        if (/[a-zA-Z]/.test(char)) {
            const variantClass = getNextVariantClass();
            span.classList.add(variantClass);
        } else {
            span.classList.add("default-glif");
        }

        span.classList.add("randomized-char");
        return span;
    }

    // AGRUPAR PALABRAS
    function styleWord(word) {
        const wordContainer = document.createElement("span");
        wordContainer.classList.add("randomized-word");

        for (let char of word) {
            const styledChar = styleCharacter(char);
            wordContainer.appendChild(styledChar);
        }

        return wordContainer;
    }

    // PROCESA EL TEXTO PARA ESTILIZAR PALABRAS Y CARACTERES
    function processText(element) {
        const text = element.textContent.trim();
        element.textContent = ""; // Limpia el contenido original

        const words = text.split(" ");
        words.forEach((word, index) => {
            const styledWord = styleWord(word);
            element.appendChild(styledWord);

            // añadir espacio
            if (index < words.length - 1) {
                const space = document.createTextNode(" ");
                element.appendChild(space);
            }
        });
    }

 
    const glifoTextElements = document.querySelectorAll(".glifo-text");
    glifoTextElements.forEach((element) => processText(element));
    window.processText = processText;
});
