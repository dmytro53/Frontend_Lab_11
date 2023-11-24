$(document).ready(function () {
    const words = [
        { word: "Hello", translation: "Привіт" },
        { word: "Always", translation: "Завжди" },
        { word: "Programming", translation: "Програмування" },
        { word: "Laptop", translation: "Ноутбук" },
        { word: "Day", translation: "День" },
        { word: "Sun", translation: "Сонце" },
        { word: "Lesson", translation: "Урок" },
        { word: "History", translation: "Історія" },
        { word: "Task", translation: "Завдання" },
        { word: "Sky", translation: "День" }
    ];
    function rundomWordArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    }
    rundomWordArray(words);
    const totalSteps = words.length;
    let currentCardIndex = 0;
    let correctCount = 0;
    let incorrectCount = 0;
    function resetGame() {
        currentCardIndex = 0;
        correctCount = 0;
        incorrectCount = 0;
        updateStatus();
        displayCurrentCard();
        $("#proficience-level").text("");
        $("#translation-input").prop("disabled", false);
    }
    $("#total-steps").text(totalSteps);
    updateStatus();
    displayCurrentCard();
    function displayCurrentCard() {
        const currentCard = words[currentCardIndex];
        $("#word-card").text(currentCard.word);
        $("#translation-input").val("");
    }
    function checkTranslation() {
        const enteredTranslation = $("#translation-input").val();
        if (enteredTranslation.trim() === "") {
            alert("Please enter the translation before checking.");
            return;
        }
        const correctTranslation = words[currentCardIndex].translation;
        if (enteredTranslation === correctTranslation) {
            correctCount++;
        } else {
            incorrectCount++;
        }
        currentCardIndex++;
        if (currentCardIndex < totalSteps) {
            displayCurrentCard();
        } else {
            showProficiencyLevel();
        }
        updateStatus();
    }
    function updateStatus() {
        $("#current-step").text(currentCardIndex);
        $("#correct-count").text(correctCount);
        $("#incorrect-count").text(incorrectCount);
    }
    function showProficiencyLevel() {
        const proficiencyLevel = calculateProficiencyLevel();
        $("#proficience-level").text(proficiencyLevel);
        $("#check-btn").prop("disabled", true);
        $("#restart-btn").show();
        $("#translation-input").prop("disabled", true).css("cursor", "not-allowed");
    }
    function calculateProficiencyLevel() {
        const percentageCorrect = (correctCount / totalSteps) * 100;
        if (percentageCorrect >= 80) {
            return "Your language proficiency level is: Advanced";
        } else if (percentageCorrect >= 50) {
            return "Your language proficiency level is: Intermediate";
        } else {
            return "Your language proficiency level is: Beginner";
        }
    }
    function checkT() {
        $("#word-card").click(function () {
            checkTranslation();
        });
    }
    checkT();
    $("#translation-input").keydown(function (event) {
        if (event.keyCode === 13) {
            checkTranslation();
        }
    });
    $("#restart-btn").click(function () {
        resetGame();
        $("#check-btn").prop("disabled", false);
        $("#restart-btn").hide();
    });
});