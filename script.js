const socket = io();

// Elements
const messageHistoryElement = document.getElementById('messageHistory');
const messageInputElement = document.getElementById('messageInput');
const sendButton = document.getElementById('sendButton');

// Display previous messages when connecting
socket.on('messageHistory', (messages) => {
  messages.forEach((message) => {
    displayMessage(message);
  });
});

// Listen for incoming chat messages
socket.on('chatMessage', (message) => {
  displayMessage(message);
});

// Display a message in the chat history
function displayMessage(message) {
  const messageDiv = document.createElement('div');
  messageDiv.textContent = message;
  messageHistoryElement.appendChild(messageDiv);
  messageHistoryElement.scrollTop = messageHistoryElement.scrollHeight; // Scroll to the bottom
}

// Send a message when the "Send" button is clicked
sendButton.addEventListener('click', () => {
  const message = messageInputElement.value.trim();
  if (message) {
    socket.emit('chatMessage', message);
    messageInputElement.value = ''; // Clear input field
  }
});

// Allow pressing "Enter" to send a message
messageInputElement.addEventListener('keydown', (event) => {
  if (event.key === 'Enter') {
    sendButton.click();
  }
});
