$(document).ready(function () {
  const editButton = $(".button--edit");
  const answerAddButton = $(".button--add-answer");
  const disabledInputs = $("input.disabled");
  let i = 0;
  
  if(disabledInputs) {
    disabledInputs.prop("disabled", true);
  }
  
  editButton.click(function (e) {
    e.preventDefault();
    disabledInputs.prop("disabled", false, !disabledInputs.prop("disabled", true));
    $(this).prop("disabled", true, !$(this).prop("disabled", false));
    disabledInputs.val("");
    $(".tags__list").hide();
    $(".tags").show();
    $("input.hidden").show();
    $(this).hide();
  });
  
  answerAddButton.click(function (e) {
    e.preventDefault();
    i++;
    $(".hidden").show();
    newInput =
      `<div class="form-group">` +
      `<label class="form-label h4 mb-3" for="answer${i}">Réponse ${i}</label>` +
      `<input class="form-control mb-4" name="answers" type="text" id="answer${i}" placeholder="Je suis la réponse ${i}" required />` +
      `<span class="deleteAnswer material-icons">delete</span>` +
      `<span class="goodAnswer material-icons">done</span>` +
      `</div>`;
      $(".answers__wrapper").append(newInput);
  });

  $(document).on("click", ".goodAnswer", function (e) {
    e.preventDefault();
    $(this).closest("input").attr("name", "goodAnswer").addClass("goodInput");
  });

  $(document).on("click", ".deleteAnswer", function (e) {
    e.preventDefault();
    $(this).parent().remove();
  });
});
