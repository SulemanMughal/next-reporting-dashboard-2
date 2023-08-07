# from string import Template

# d = {
#     'title': 'This is the title',
#     # 'subtitle': 'And this is the subtitle',
#     # 'list': '\n'.join(['first', 'second', 'third'])
# }



import string

# template_text = string.Template(("Dear ${NAME}, "
#                                  "it was nice to meet you on ${DATE}. "
#                                  "Hope to talk with you and ${SPOUSE} again soon!"))

with open('template.txt', 'r') as f:
    
    # print(f.read())
    src = string.Template((f.read()))
    # print(src)
    result = src.substitute( NAME="Monday")
    print(result)

# print(template_text.substitute(NAME="John", DATE="Monday", SPOUSE="Jane"))