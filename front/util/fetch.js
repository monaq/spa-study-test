import { $ } from 'jquery'
const Fetch = (TYPE = '', URL = '', callback = {}) => {
    return $.ajax({
        type: TYPE,
        url: URL,
        success: data => callback(data)
    })
}

export default Fetch