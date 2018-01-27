var Depth = function(settings) {

    this.parent = document.querySelector(settings.parent);
    this.children = this.parent.querySelector(settings.children);
    this.elements = this.children.querySelectorAll('*[data-depth]');
    this.coordinates = {x: 0, y: 0};

    // Add neccesery attributes to movable objects
    var center = this.getCenterCoordinates(this.parent);
    console.log(center);

    // Start mouse tracking on parent element
    this.parent.addEventListener('mousemove', function(e) {

        var coordinates = { x: 0, y: 0 };

        coordinates.x = center.x - e.clientX;
        coordinates.y = center.y - e.clientY;


        this.addAttributes();
        this.move(coordinates.x, coordinates.y);

        // console.log(coordinates);
    }.bind(this));




}

// Adds transform styles
Depth.prototype.addAttributes = function() {

    for(i = 0; i < this.elements.length; i++) {
        this.elements[i].setAttribute('style', 'transform-style: preserve-3d; backface-visibility: hidden;');
    }

}

// Get's the center coordinates of the element
Depth.prototype.getCenterCoordinates = function(element) {

    var coordinates = {x: 0, y: 0 },
        element = element.getBoundingClientRect();

        coordinates.x = element.width / 2;
        coordinates.y = element.height / 2;

    return coordinates;
}

// Adds transform styles
Depth.prototype.move = function(x, y) {

    for(i = 0; i < this.elements.length; i++) {
        this.elements[i].setAttribute('style', 'transform-style: preserve-3d;' +
                                               'backface-visibility: hidden;' +
                                               'transform: translate3d(' + x + '%, ' + y + '%, 0px)');
    }

}
