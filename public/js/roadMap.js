$(function() {
    var nodes = {};
    var width = 960,
    height = 500;
    // Compute the distinct nodes from the links.
    links.forEach(function(link) {
        link.source = nodes[link.source] || (nodes[link.source] = {
            name: link.source,
            url: link.sourceUrl,
            x: width/2,
            y: height/2
        });
        link.target = nodes[link.target] || (nodes[link.target] = {
            name: link.target,
            url: link.targetUrl,
            x: width/2,
            y: height/2
        });
    });

    for (var node in nodes) {
        nodes[node].x = width/2;
        nodes[node].y = height/2;
        nodes[node].px = width/2;
        nodes[node].py = height/2;
    }
    console.log(nodes);
    var force = d3.layout.force()
        .nodes(d3.values(nodes))
        .links(links)
        .size([width, height])
        // refactor distance to be dependent on number of nodes
        .linkDistance(120)
        .charge(-500)
        .on('tick', tick)
        .start();
        // .stop();
    var svg = d3.select('#chartDiv').append('svg')
        .attr('width', width)
        .attr('height', height);

        // force.velocityDecay(1)


    // Per-type markers, as they don't inherit styles.
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

    var path = svg.append('g').selectAll('path')
        .data(force.links())
        .enter().append('path')
        .attr('class', function(d) {
            return 'link ' + d.type;
        })
        .attr('marker-end', function(d) {
            return 'url(#' + d.type + ')';
        });

    var circle = svg.append('g').selectAll('circle')
        .data(force.nodes())
        .enter().append('circle')
        .attr('class', function(d) {
            return 'circles _' + d.index;
        })
        .attr('r', 14)
    // .call(force.drag);

    var text = svg.append('g').selectAll('text')
        .data(force.nodes())
        .enter().append('text')
        // .classed('labels', true)
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
    let first = true;
    function tick() {
        if (first) {
            for (var node in nodes) {
                nodes[node].x = width/2;
                nodes[node].y = height/2;
                // nodes[node].px = width/2;
                // nodes[node].py = height/2;
            }
            first = false;
        }
        for (var node in nodes) {
            if (nodes[node].x < width/3) {
                nodes[node].x = width/3;
            }
            if (nodes[node].y < height/3) {
                nodes[node].y = height/3;
            }
            if (nodes[node].x > width*.6) {
                nodes[node].x = width*.6;
            }
            if (nodes[node].y > height*.6) {
                nodes[node].y = height*.6;
            }
        }
        console.log(nodes['Learn Functions']);
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
