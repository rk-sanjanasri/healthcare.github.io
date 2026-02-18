function sendMessage() {
    // ... your existing code ...

    // ADD THIS AT THE VERY END OF THE FUNCTION:
    const chatArea = document.getElementById("chatArea");
    chatArea.scrollTop = chatArea.scrollHeight; 
}