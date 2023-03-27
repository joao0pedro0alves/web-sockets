const $roomForm = document.getElementById("room-form");
const $dialog = document.getElementById("alert-dialog");
const $dialogMessageTitle = document.getElementById("dialog-message-title");
const $dialogMessage = document.getElementById("dialog-message");

$roomForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const { username } = Object.fromEntries(formData);

    const isValid = username.length > 3;

    if (isValid) {
        $roomForm.submit();
    } else {
        openAlertMessage(
            "Não foi possível entrar na sala",
            "Usuário inválido"
        );
    }
});

function openAlertMessage(title, message) {
    $dialogMessage.innerHTML = message;
    $dialogMessageTitle.innerHTML = title;

    $dialog.showModal();
}
