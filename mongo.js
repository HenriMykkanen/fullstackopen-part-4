const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.log('give password as argument')
  process.exit(1)
}

const password = process.argv[2]
const mongoUrl = `mongodb+srv://entrofernal:${password}@cluster0.hl4mgf4.mongodb.net/fullstackopen-part-4?retryWrites=true&w=majority&appName=Cluster0`

mongoose.set('strictQuery', false)

mongoose.connect(mongoUrl)

const blogSchema = new mongoose.Schema({
  title: String,
  author: String,
  url: String,
  likes: Number,
})

const Blog = mongoose.model('Blog', blogSchema)

// const title = process.argv[3]
// const author = process.argv[4]
// const url = process.argv[5]
// const likes = process.argv[6]

// const blog = new Blog({
//   title,
//   author,
//   url,
//   likes,
// })

if (process.argv.length === 3) {
  Blog.find({}).then((result) => {
    console.log('phonebook:')
    result.forEach((blog) => {
      console.log(`${blog.name} ${blog.number}`)
    })
    mongoose.connection.close()
  })
} else if (process.argv.length === 7) {
  const title = process.argv[3]
  const author = process.argv[4]
  const url = process.argv[5]
  const likes = process.argv[6]

  const blog = new Blog({
    title: title,
    author: author,
    url: url,
    likes: likes,
  })

  blog.save().then(() => {
    console.log(
      `added blogpost with title ${title} and author ${author} to db`,
    )
    mongoose.connection.close()
  })
} else {
  console.log('please provide both name and number to add a new entry')
  process.exit(1)
}
