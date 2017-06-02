//TODO:
//  add pretty label
//  add css class thing
//  bonus: add seeded random num


// replace data variable with some sort of view engine template data
var data = {
    'map': [{
            'to': 1,
            'from': 3
        }, {
            'to': 3,
            'from': 2
        },
        {
            'to': 3,
            'from': 4
        },
        {
            'to': 1,
            'from': 4
        }
    ],
    'details': {
        2: {
            'name': 'Learn To Print',
            'url': 'https://www.google.com/',
            'css_class': 'attemptable',
        },
        1: {
            'name': 'Learn Functions',
            'url': 'https://www.yahoo.com/',
            'css_class': 'attemptable',
        },
        3: {
            'name': 'Learn The Command Line',
            'url': 'https://twitter.com/',
            'css_class': 'attemptable',
        },
        4: {
            'name': 'test',
            'url': 'ded',
            'css_class': 'attemptable',
        }
    }
}

function doctorData(data) {
    data.map.map(function(edge) {
        edge.target = data.details[edge.to].name;
        edge.source = data.details[edge.from].name;
        edge.sourceUrl = data.details[edge.from].url;
        edge.targetUrl = data.details[edge.to].url;
        edge.scss = data.details[edge.from].css_class;
        edge.tcss = data.details[edge.to].css_class;
        edge.type = 'suit';
    })
    return data.map;
}
var links = doctorData(data);
