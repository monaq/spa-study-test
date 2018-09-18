const app = require('./app')
const PORT = process.env.PORT || 3012

app.listen(PORT, () => console.log(`server is running localhost:${PORT}`))
