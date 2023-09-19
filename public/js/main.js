$(document).ready(function () {
  const editButton = $(".button--edit");
  const inputs = $("input.disabled");
  const validateBtn = $("input.hidden")

  inputs.prop("disabled", true);

  editButton.click(function (e) {
    e.preventDefault();
    inputs.prop("disabled", false, !inputs.prop("disabled", true));
    $(this).prop("disabled", true, !$(this).prop("disabled", false));
    inputs.val("");
    validateBtn.toggle();
  });
});
