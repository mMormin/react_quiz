$(document).ready(function () {
  const editButton = $(".button--edit");
  const inputs = $("input.disabled");
  const validateBtn = $("input.hidden")

  inputs.prop("disabled", true);

  editButton.click(function (e) {
    e.preventDefault();
    inputs.prop("disabled", false);
    $(this).prop("disabled", true);
    inputs.val("");
    validateBtn.show();
  });
});
