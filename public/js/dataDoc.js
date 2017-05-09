// replace data variable with some sort of view engine template data
let data = {
    'map': [{
        'to': 1,
        'from': 3
    }, {
        'to': 3,
        'from': 2
    }],
    'details': {
        2: {
            'name': 'Learn To Print',
            'url': 'http://...'
        },
        1: {
            'name': 'Learn Functions',
            'url': 'http'
        },
        3: {
            'name': 'Learn The Command Line',
            'url': 'httpas'
        }
    }
}
function doctorData(data) {
    data.map.map((edge)=>{
        edge.target = data.details[edge.to].name;
        edge.source = data.details[edge.from].name;
        edge.url = data.details[edge.from].url;
        edge.type = 'suit';
    })
    return data.map;
}
let links = doctorData(data);
