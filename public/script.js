let socket = io();
let username;

const isDarkMode = localStorage.getItem('darkMode') === 'true';

if (isDarkMode) {
  $('body').addClass('dark-mode');
}

function toggleDarkMode() {
  const isDarkModeEnabled = $('body').hasClass('dark-mode');
  $('body').toggleClass('dark-mode');
  $('#dark-mode-toggle').parent().toggleClass('dark-mode-toggle-on');
  localStorage.setItem('darkMode', !isDarkModeEnabled);
}

function joinChat() {
  username = $('#username').val();
  if (username.trim() !== '') {
    socket = io();
    socket.emit('join', username);

    $('#username-container').addClass('hide');
    $('#chat-container').removeClass('hide');

    $('#form').submit(function () {
      const message = $('#m').val();
      if (message.trim() !== '') {
        socket.emit('chat message', { username, message });
        $('#m').val('');
      }
      return false;
    });

    socket.on('chat message', function (data) {
      const messageContainer = $('#messages');
      messageContainer.append(`<div class="${data.type}"><strong>${data.username}:</strong> ${data.message}</div>`);
      messageContainer.scrollTop(messageContainer[0].scrollHeight);
    });
  }
}
