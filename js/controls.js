document.addEventListener("DOMContentLoaded", () => {
    const textColorPicker = document.getElementById("text-color");
    const fontSizeSlider = document.getElementById("font-size");
    const userInput = document.getElementById("user-input");
    const styledText = document.getElementById("styled-text");
    const lowercaseButton = document.getElementById("lowercase-button");
    const uppercaseButton = document.getElementById("uppercase-button");
    const colorContainer = document.getElementById("color-container");
    let isLowercase = true; 
    let cursorColor = 'black'; // color incial



    // ACTUALIZA EL TEXTO RENDERIZADO SIN PERDER ESTILOS
    function updateStyledText() {
        let text = userInput.value.trim();

        if (isLowercase) {
            text = text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
        }

        if (styledText) {
            const currentFontSize = styledText.style.fontSize || `${fontSizeSlider.value}px`;
            const currentColor = styledText.style.color || textColorPicker.value;
            const currentTransform = styledText.style.textTransform || "none";

            styledText.textContent = text;
            styledText.style.fontSize = currentFontSize;
            styledText.style.color = currentColor;
            styledText.style.textTransform = currentTransform;

            if (window.processText) {
                window.processText(styledText);
            }
        }
    }

    // ACTUALIZA EL TAMAÑO DE LA FUENTE
    function updateFontSize() {
        const fontSize = `${fontSizeSlider.value}px`;
        styledText.style.fontSize = fontSize;

        const percentage = ((fontSizeSlider.value - fontSizeSlider.min) / (fontSizeSlider.max - fontSizeSlider.min)) * 100;
        fontSizeSlider.style.background = `linear-gradient(to right, var(--border-color-active) ${percentage}%, #c5c5c5 ${percentage}%)`;
    }

    // ACTUALIZA EL COLOR DEL TEXTO Y EL CURSOR
    function updateTextColor() {
        const selectedColor = textColorPicker.value;
        styledText.style.color = selectedColor;

        if (colorContainer) {
            colorContainer.style.backgroundColor = selectedColor;
        }

        cursorColor = selectedColor;
        if (typeof window.setCursorColor === 'function') {
            window.setCursorColor(cursorColor);
        }
    }

    // APLICA TRANSFORMACIÓN A MINÚSCULAS
    function setLowercase() {
        isLowercase = true;
        styledText.style.textTransform = "none";
        lowercaseButton.classList.add("active");
        uppercaseButton.classList.remove("active");
        updateStyledText();
    }

    // APLICA TRANSFORMACIÓN A MAYÚSCULAS
    function setUppercase() {
        isLowercase = false;
        styledText.style.textTransform = "uppercase";
        uppercaseButton.classList.add("active");
        lowercaseButton.classList.remove("active");
        updateStyledText();
    }



    if (userInput) userInput.addEventListener("input", updateStyledText);
    if (fontSizeSlider) fontSizeSlider.addEventListener("input", updateFontSize);
    if (textColorPicker) textColorPicker.addEventListener("input", updateTextColor);
    if (lowercaseButton) lowercaseButton.addEventListener("click", setLowercase);
    if (uppercaseButton) uppercaseButton.addEventListener("click", setUppercase);

    updateStyledText();
    updateFontSize();
    updateTextColor();
    setLowercase();
});
