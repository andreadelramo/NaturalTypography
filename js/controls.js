document.addEventListener("DOMContentLoaded", () => {
    const textColorPicker = document.getElementById("text-color");
    const fontSizeSlider = document.getElementById("font-size");
    const userInput = document.getElementById("user-input");
    const styledText = document.getElementById("styled-text");
    const lowercaseButton = document.getElementById("lowercase-button");
    const uppercaseButton = document.getElementById("uppercase-button");
    const colorContainer = document.getElementById("color-container");
    let isLowercase = true;

    // Aplica estilo a un carácter individual
    function styleCharacter(char) {
        const span = document.createElement("span");
        span.textContent = char;

        if (/[a-zA-Z]/.test(char)) {
            const variants = ["default-glif", "glif-ss01", "glif-ss02"];
            const variantClass = variants[Math.floor(Math.random() * variants.length)];
            span.classList.add(variantClass);
        } else {
            span.classList.add("default-glif");
        }

        span.classList.add("randomized-char");
        return span;
    }

    // Actualiza el contenido estilizado del input
    function updateStyledText() {
        const inputText = userInput.value;
        const previousTextLength = styledText.childNodes.length;

        if (inputText.length > previousTextLength) {
            // Procesa solo los nuevos caracteres
            for (let i = previousTextLength; i < inputText.length; i++) {
                let char = inputText[i];
                if (i === 0 && isLowercase) {
                    char = char.toUpperCase(); // Convierte la primera letra a mayúscula
                }
                const styledChar = styleCharacter(char);
                styledText.appendChild(styledChar);
            }
        } else if (inputText.length < previousTextLength) {
            // Elimina los nodos sobrantes
            for (let i = previousTextLength - 1; i >= inputText.length; i--) {
                styledText.removeChild(styledText.childNodes[i]);
            }
        } else {
            // Si la longitud es igual, actualiza los caracteres
            for (let i = 0; i < inputText.length; i++) {
                let char = inputText[i];
                if (i === 0 && isLowercase) {
                    char = char.toUpperCase();
                }
                styledText.childNodes[i].textContent = char;
            }
        }
    }

    // Actualiza el tamaño de la fuente
    function updateFontSize() {
        const fontSize = `${fontSizeSlider.value}px`;
        styledText.style.fontSize = fontSize;

        const percentage = ((fontSizeSlider.value - fontSizeSlider.min) / (fontSizeSlider.max - fontSizeSlider.min)) * 100;
        fontSizeSlider.style.background = `linear-gradient(to right, var(--border-color-active) ${percentage}%, #c5c5c5 ${percentage}%)`;
    }

    // Actualiza el color del texto
    function updateTextColor() {
        const selectedColor = textColorPicker.value;
        styledText.style.color = selectedColor;

        if (colorContainer) {
            colorContainer.style.backgroundColor = selectedColor;
        }
    }

    // Configura el texto en minúsculas con la primera letra en mayúscula
    function setLowercase() {
        isLowercase = true;
        lowercaseButton.classList.add("active");
        uppercaseButton.classList.remove("active");
        updateStyledText();
    }

    // Configura el texto en mayúsculas
    function setUppercase() {
        isLowercase = false;
        uppercaseButton.classList.add("active");
        lowercaseButton.classList.remove("active");
        updateStyledText();
    }

    // Escuchadores de eventos
    if (userInput) userInput.addEventListener("input", updateStyledText);
    if (fontSizeSlider) fontSizeSlider.addEventListener("input", updateFontSize);
    if (textColorPicker) textColorPicker.addEventListener("input", updateTextColor);
    if (lowercaseButton) lowercaseButton.addEventListener("click", setLowercase);
    if (uppercaseButton) uppercaseButton.addEventListener("click", setUppercase);

    // Inicializaciones
    updateFontSize();
    updateTextColor();
    setLowercase();
});