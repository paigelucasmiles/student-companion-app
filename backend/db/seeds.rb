Tag.destroy_all
Entry.destroy_all
Topic.destroy_all

auth_review = Entry.create(
    name: "Auth Review",
    url: "https://www.youtube.com/watch?v=KL4wGc1Vxm0&feature=youtu.be",
    kind: "video"
)
lean_software_development = Entry.create(
    name: "Lean Software Development",
    url: "https://medium.com/@kyle.coberly/lean-software-development-29c49b5860a3",
    kind: "blog post"
)

linear_gradient = Entry.create(
    name: "Linear Gradient",
    url: "https://developer.mozilla.org/en-US/docs/Web/CSS/linear-gradient",
    kind: "documentation"
)

fe_auth_with_errors = Entry.create(
    name: "Front End Auth w/ Error Messages",
    url: "https://www.youtube.com/watch?v=6PLRvPhDy9U&feature=youtu.be",
    kind: "video"
)

ar_validations = Entry.create(
    name: "ActiveRecord Validations Docs",
    url: "https://guides.rubyonrails.org/active_record_validations.html#validation-helpers",
    kind: "documentation"
)

auth_1 = Entry.create(
    name: "Auth - Part 1",
    url: "https://www.youtube.com/watch?v=A95_w99kIV0&feature=youtu.be",
    kind: "video"
)

auth_2 = Entry.create(
    name: "Auth - Part 2",
    url: "https://youtu.be/PBZKHA2v8YQ",
    kind: "video"
)

auth_3 = Entry.create(
    name: "Auth - Part 3",
    url: "https://youtu.be/KL4wGc1Vxm0",
    kind: "video"
)


auth = Topic.create(
    name: "Auth"
)

project_managment = Topic.create(
    name: "Project Management"
)

rails = Topic.create(
    name: "Rails"
)

agile = Topic.create(
    name: "Agile"
)

javascript = Topic.create(
    name: "JavaScript"
)

css = Topic.create(
    name: "CSS"
)

html = Topic.create(
    name: "HTML"
)

git = Topic.create(
    name: "Git"
)

github = Topic.create(
    name: "GitHub"
)

ruby = Topic.create(
    name: "Ruby"
)

# tag1 = Tag.create(
#     name: "Auth",
#     entry: auth_review,
#     topic: auth
# )

# tag2 = Tag.create(
#     name: "Auth",
#     entry: auth_1,
#     topic: auth
# )

# tag3 = Tag.create(
#     name: "Auth",
#     entry: auth_2,
#     topic: auth
# )

# tag4 = Tag.create(
#     name: "Auth",
#     entry: auth_3,
#     topic: auth
# )

# tag4 = Tag.create(
#     name: "Rails",
#     entry: ar_validations,
#     topic: rails
# )