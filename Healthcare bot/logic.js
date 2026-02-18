// This prevents the "Database not found" error by waiting for the file to load
let database = [];

window.onload = () => {
    if (typeof medicalData !== 'undefined') {
        database = medicalData;
        console.log("Database synced successfully.");
    }
};

function sendMessage() {
    const input = document.getElementById("userInput");
    const chatArea = document.getElementById("chatArea");
    if (!input || !chatArea) return;

    const userText = input.value.trim().toLowerCase();
    if (!userText) return;

    // 1. Show User Message
    chatArea.innerHTML += `<div class="bubble user">${input.value}</div>`;
    input.value = "";

    // 2. SCROLL TO BOTTOM
    chatArea.scrollTop = chatArea.scrollHeight;

    setTimeout(() => {
        let response = "";

        // 3. Check if sync happened
        if (database.length === 0) {
            response = "Error: Data file not synced. Please check the file name in HTML.";
        } else {
            let bestMatch = null;
            let highestScore = 0;

            database.forEach(item => {
                let score = 0;
                item.symptoms.forEach(s => {
                    if (userText.includes(s.toLowerCase())) score++;
                });
                if (score > highestScore) {
                    highestScore = score;
                    bestMatch = item;
                }
            });

            if (bestMatch && highestScore > 0) {
                response = `It sounds like <b>${bestMatch.disease}</b>.<br><br>${bestMatch.advice}`;
            } else {
                response = "I'm not sure. Try different symptoms like 'fever' or 'cough'.";
            }
        }

        // 4. Show Bot Response & Scroll Again
        chatArea.innerHTML += `<div class="bubble bot">${response}</div>`;
        chatArea.scrollTop = chatArea.scrollHeight;
    }, 500);
}