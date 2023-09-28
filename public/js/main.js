$(document).ready(function () {
  const editButton = $(".button--edit");
  const answerAddButton = $(".button--add-answer");
  const inputsWithDisabledClass = $("input.disabled");
  let i = 0;

  //
  // Toggle inputs Function
  function toggleInputs() {
    inputsWithDisabledClass.prop("disabled", function (_, value) {
      return !value;
    });
  }

  //
  // PROFILE.EJS && QUESTIONEDIT.EJS
  // Edit inputs Function
  function handleEditClick() {
    toggleInputs();
    editButton.prop("disabled", function (_, value) {
      return !value;
    });
    inputsWithDisabledClass.val("");
    $(".tags__list").hide();
    $(".tags").show();
    $("input.hidden").show();
    editButton.hide();
  }

  //
  // QUESTIONADD.EJS
  // Answer addition Function
  function handleAnswerAddClick() {
    i++;
    $(".hidden").show();
    newInput =
      `<div class="form-group">` +
      `<input class="form-control mb-4" name="answers" type="text" id="answer${i}" placeholder="Oui" required />` +
      `<span class="deleteAnswer material-icons">delete</span>` +
      `<span class="goodAnswer material-icons">done</span>` +
      `</div>`;
    $(".answers__wrapper").append(newInput);
  }

  // Good Answer addition Function
  function handleGoodAnswerClick() {
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
  }

  // Answer deletion Function
  function handleDeleteAnswerClick() {
    $(this).parent().remove();
  }

  // Events Listener
  editButton.click(handleEditClick);
  answerAddButton.click(handleAnswerAddClick);
  $(document).on("click", ".goodAnswer", handleGoodAnswerClick);
  $(document).on("click", ".deleteAnswer", handleDeleteAnswerClick);

  // Disable inputs when page is fully loaded
  toggleInputs();
});
