import { $ } from 'jquery'
const Fetch = (TYPE = '', URL = '', callback = () => {}) => {
    return $.ajax({
        type: TYPE,
        url: URL,
        success: data => callback(data),
        error: function (xhr, status, error) {
            console.log(error)
        }
    })
}

export default Fetch