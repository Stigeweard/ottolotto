// replace data variable with some sort of view engine template data
let data = {
    'map': [{
        'to': 1,
        'from': 3
    }, {
        'to': 3,
        'from': 2
    },
    {
        'to': 2,
        'from': 4
    }],
    'details': {
        2: {
            'name': 'Learn To Print',
            'url': 'https://www.google.com/'
        },
        1: {
            'name': 'Learn Functions',
            'url': 'https://www.yahoo.com/'
        },
        3: {
            'name': 'Learn The Command Line',
            'url': 'https://twitter.com/'
        },
        4: {
            'name': 'test',
            'url': 'ded'
        }
    }
}
function doctorData(data) {
    data.map.map((edge)=>{
        edge.target = data.details[edge.to].name;
        edge.source = data.details[edge.from].name;
        edge.sourceUrl = data.details[edge.from].url;
        edge.targetUrl = data.details[edge.to].url;
        edge.type = 'suit';
    })
    return data.map;
}
let links = doctorData(data);
