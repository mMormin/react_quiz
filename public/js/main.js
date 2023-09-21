$(document).ready(function () {
  const editButton = $(".button--edit");
  const tagsList = $(".tags__list");
  const tagsSelect = $(".tags");
  const inputs = $("input.disabled");
  const validateBtn = $("input.hidden");

  inputs.prop("disabled", true);

  editButton.click(function (e) {
    e.preventDefault();
    inputs.prop("disabled", false, !inputs.prop("disabled", true));
    $(this).prop("disabled", true, !$(this).prop("disabled", false));
    inputs.val("");
    tagsList.hide();
    tagsSelect.show();
    validateBtn.show();
    $(this).hide();
  });
});
