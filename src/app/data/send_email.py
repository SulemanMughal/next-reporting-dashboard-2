# from string import Template

# d = {
#     'title': 'This is the title',
#     # 'subtitle': 'And this is the subtitle',
#     # 'list': '\n'.join(['first', 'second', 'third'])
# }





# template_text = string.Template(("Dear ${NAME}, "
#                                  "it was nice to meet you on ${DATE}. "
#                                  "Hope to talk with you and ${SPOUSE} again soon!"))

import string
with open('template.txt', 'r') as f:
    src = string.Template((f.read()))
    result = src.substitute( NAME="Monday")
    print(result)

# print(template_text.substitute(NAME="John", DATE="Monday", SPOUSE="Jane"))


# Editions
# Can you find the Flag hidden in the email?
# Format : Neorix{asdfghjk}

# you_got_me

