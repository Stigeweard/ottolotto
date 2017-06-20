$(function(){
    var nodes = {};
    var width = 960,
    height = 500;

    // enter different strings to seed a different loading animation
    Math.seedrandom('whaaaat');
    //whaaaat

    // Compute the distinct nodes from the links.
    links.forEach(function(link) {
        link.source = nodes[link.source] || (nodes[link.source] = {
            name: link.source,
            url: link.sourceUrl,
            css_class: link.scss,
            x: width/3 + Math.random()*width*1/3,
            y: height/3 + Math.random()*height*1/3
        });
        link.target = nodes[link.target] || (nodes[link.target] = {
            name: link.target,
            url: link.targetUrl,
            css_class: link.tcss,
            x: width/3 + Math.random()*width*1/3,
            y: height/3 + Math.random()*height*1/3
        });
    });

    var force = d3.layout.force()
        .nodes(d3.values(nodes))
        .links(links)
        .size([width, height])
        // refactor distance to be dependent on number of nodes
        .linkDistance(120)
        .charge(-500)
        .on('tick', tick)
        .start();
    var svg = d3.select('#chartDiv').append('svg')
        .attr('width', width)
        .attr('height', height);



    // Per-type markers, as they don't inherit styles.
// arrow
    svg.append('defs').selectAll('marker')
        .data(['suit', 'licensing', 'resolved'])
        .enter().append('marker')
        .attr('id', function(d) {
            return d;
        })
        .attr('viewBox', '0 -5 10 10')
        .attr('refX', 25)
        .attr('refY', -0.5)
        .attr('markerWidth', 6)
        // adjusts arrow
        .attr('markerHeight', 60)
        .attr('orient', 'auto')
        .append('path')
        .attr('d', 'M0,-5L10,0L0,5');

// lines
    var path = svg.append('g').selectAll('path')
        .data(force.links())
        .enter().append('path')
        .attr('class', function(d) {
            return 'link ' + d.type;
        })
        .attr('marker-end', function(d) {
            return 'url(#' + d.type + ')';
        });

// node circles
    var circle = svg.append('g').selectAll('circle')
        .data(force.nodes())
        .enter().append('circle')
        .attr('class', function(d) {
            return 'circles _' + d.index+' ' + d.css_class;
        })
        .attr('r', 14)
        // makes draggable
    // .call(force.drag);

    // var text = svg.append('g').selectAll('foreignObject')
    //     .data(force.nodes())
    //     .enter().append('foreignObject')
    //
    // var label = text.append('xhtml:body')
    //     .html(function(d) {
    //         return `<div class="label">
    //             <div class="arrow-left"></div>
    //             <div class="text-box">
    //                 <span class="lesson-text">${d.name}</span>
    //             </div>
    //         </div>`
    //     })


// text placement
    var text = svg.append('g').selectAll('text')
        .data(force.nodes())
        .enter().append('text')


        .attr('class', function(d) {
            return '_'+d.index;
        })
        //adjusts text placement, adjust size in css
        .attr('x', 24)
        .attr('y', '.31em')
        .text(function(d) {
            return d.name;
        });


    $('.circles').hover(show, hide);

    d3.selectAll('circle').on('click', function(d) {
        window.location = d.url
    });

    function show(e) {
        $('.'+e.target.classList[1]).css('visibility', 'visible');
    }

    function hide(e) {
        $('.'+e.target.classList[1]).css('visibility', 'hidden');
        $('.circles').css('visibility', 'visible');
    }

    // Use elliptical arc path segments to doubly-encode directionality.
    function tick() {
        path.attr('d', linkArc);
        circle.attr('transform', transform);
        text.attr('transform', transform);
    }

    function linkArc(d) {
        var dx = d.target.x - d.source.x,
            dy = d.target.y - d.source.y,
            dr = Math.sqrt((dx * dx + dy * dy) * 15);
        return 'M' + d.source.x + ',' + d.source.y + 'A' + dr + ',' + dr + ' 0 0,1 ' + d.target.x + ',' + d.target.y;
    }

    function transform(d) {
        return 'translate(' + d.x + ',' + d.y + ')';
    }
});
