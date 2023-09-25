$(document).ready(function () {
  const editButton = $(".button--edit");
  const tagsList = $(".tags__list");
  const tagsSelect = $(".tags");
  const inputs = $("input.disabled");
  const hiddenInputs = $("input.hidden");
  const hiddenElement = $(".hidden");
  const answersWrapper = $(".answers__wrapper");
  const addAnswerButton = $(".button--add-answer");
  const goodAnswerButton = $(".goodAnswer");
  let i = 0;

  inputs.prop("disabled", true);

  editButton.click(function (e) {
    e.preventDefault();
    inputs.prop("disabled", false, !inputs.prop("disabled", true));
    $(this).prop("disabled", true, !$(this).prop("disabled", false));
    inputs.val("");
    tagsList.hide();
    tagsSelect.show();
    hiddenInputs.show();
    $(this).hide();
  });

  addAnswerButton.click(function (e) {
    e.preventDefault();
    i++;
    hiddenElement.show();
    newInput =
      `<div class="form-group">` +
      `<label class="form-label h4 mb-3" for="answer${i}">Réponse ${i}</label>` +
      `<input class="form-control mb-4" name="answers" type="text" id="answer${i}" placeholder="Je suis la réponse ${i}" required />` +
      `<span class="goodAnswer material-icons">done</span>` +
      `</div>`;
    answersWrapper.append(newInput);
  });

  $(document).on("click", ".goodAnswer", function (e) {
    e.preventDefault();
    $(this).prev().attr("name", "goodAnswer").addClass("goodInput");
  });
});
