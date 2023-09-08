level(**id**, name)

question(**id**, text, tip, #level(id), #quiz(id), #answer(id))

answer(**id**, text, #question(id))

user(**id**, firstname, lastname, emai, password)

quiz(**id**, title, description, #user(id))

tag(**id**, name)

quiz_has_tag(#quiz(id), #tag(id))
