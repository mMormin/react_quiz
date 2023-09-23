$(document).ready(function () {
  const editButton = $(".button--edit");
  const tagsList = $(".tags__list");
  const tagsSelect = $(".tags");
  const inputs = $("input.disabled");
  const hiddenInputs = $("input.hidden");
  const hiddenElement = $(".hidden");
  const answersWrapper = $(".answers__wrapper");
  const addAnswerButton = $(".button--add-answer");

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

  let i = 0;
  addAnswerButton.click(function (e) {
    e.preventDefault();
    i++;
    hiddenElement.show();
    newInput =
      `<label class="form-label h4 mb-3" for="answer${i}">Réponse ${i}</label>` +
      `<input class="form-control mb-4" name="answers" type="text" id="answer${i}" placeholder="Je suis la réponse ${i}" required/>`;
    answersWrapper.append(newInput);
  });

  goodAnswerButton.click(function (e) {
    //const input = $(".button--edit");
    if(isTextInput(goodAnswerButton.nextElementSibling())) {
      $(this).attr('name', 'goodAnswer');
    }
  });

});
