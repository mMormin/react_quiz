$(document).ready(function () {
  const editButton = $(".button--edit");
  const answerAddButton = $(".button--add-answer");
  const inputsWithDisabledClass = $("input.disabled");
  let i = 0;

  //
  // GLOBAL
  //
  // Disable inputs's prop by class
  if (inputsWithDisabledClass) {
    inputsWithDisabledClass.prop("disabled", true);
  }

  //
  // PROFILE.EJS && QUESTIONEDIT.EJS
  //
  // Allow inputs edition On Click
  editButton.click(function (e) {
    e.preventDefault();
    inputsWithDisabledClass.prop(
      "disabled",
      false,
      !inputsWithDisabledClass.prop("disabled", true)
    );
    $(this).prop("disabled", true, !$(this).prop("disabled", false));
    inputsWithDisabledClass.val("");
    $(".tags__list").hide();
    $(".tags").show();
    $("input.hidden").show();
    $(this).hide();
  });

  //
  // QUESTIONADD.EJS
  //
  // Answer Addition On Click
  answerAddButton.click(function (e) {
    e.preventDefault();
    i++;
    $(".hidden").show();
    newInput =
      `<div class="form-group">` +
      `<input class="form-control mb-4" name="answers" type="text" id="answer${i}" placeholder="Oui" required />` +
      `<span class="deleteAnswer material-icons">delete</span>` +
      `<span class="goodAnswer material-icons">done</span>` +
      `</div>`;
    $(".answers__wrapper").append(newInput);
  });

  // Good Answer Definition On Click
  $(document).on("click", ".goodAnswer", function (e) {
    e.preventDefault();
    const allInputsParents = $(".form-group");
    const allInputs = $(".form-control");
    const thisParent = $(this).parent();
    let thisInput = $(this).siblings("input");

    if (
      allInputsParents.hasClass("validate_answer") &&
      !thisParent.hasClass("validate_answer")
    ) {
      // Good answer is already defined
      allInputsParents.removeClass("validate_answer");
      allInputs.attr("name", "answers").removeClass("goodInput");
      thisParent.addClass("validate_answer");
      thisInput.attr("name", "goodAnswer").addClass("goodInput");
    } else if (thisInput.hasClass("goodInput")) {
      // The Good answer is $(this) Good answer
      thisInput.removeClass("goodInput").attr("name", "answers");
    } else {
      // Good answer Initialization
      thisInput.attr("name", "goodAnswer").addClass("goodInput");
      thisInput.parent().addClass("validate_answer");
    }
  });

  // Answer Deletion On Click
  $(document).on("click", ".deleteAnswer", function (e) {
    e.preventDefault();
    $(this).parent().remove();
  });
});
