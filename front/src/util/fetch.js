const PORT = '3000'
const resourceHost = 'http://localhost:' + PORT
const Fetch = (TYPE = '', URL = '', callback = () => {}) => {

    return $.ajax({
        type: TYPE,
        url: resourceHost + URL,
        success: data => callback(data),
        error: function (xhr, status, error) {
            console.log(error)
        }
    })
}

export default Fetch