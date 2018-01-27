var Depth = function(settings) {

    this.parent = document.querySelector(settings.parent);
    this.children = this.parent.querySelector(settings.children);
    this.elements = this.children.querySelectorAll('*[data-depth]');
    this.coordinates = { x: 0, y: 0 };
    this.intesity = settings.intesity;

    // Add neccesery attributes to movable objects
    var center = this.getCenterCoordinates(this.parent);
    console.log(center);

    // Start mouse tracking on parent element
    this.parent.addEventListener('mousemove', function(e) {

        var coordinates = { x: 0, y: 0 };

        this.coordinates.x = center.x - e.clientX;
        this.coordinates.y = center.y - e.clientY;

        this.setIntensity(settings.intesity);
        this.moveElements();

        console.log(this);
    }.bind(this));




}

// Get's the center coordinates of the element
Depth.prototype.getCenterCoordinates = function(element) {

    var coordinates = {x: 0, y: 0 },
        element = element.getBoundingClientRect();

        coordinates.x = element.width / 2;
        coordinates.y = element.height / 2;

    return coordinates;
}

// Scales down the coordinate
Depth.prototype.setIntensity = function(intesity) {

    this.coordinates.x = this.coordinates.x / intesity;
    this.coordinates.y = this.coordinates.y / intesity;

}

// Adds transform styles
Depth.prototype.moveElements = function() {

    for(i = 0; i < this.elements.length; i++) {

        var depth = this.elements[i].dataset.depth,
            extraMovement = { x: 0, y: 0 };

        extraMovement.x = depth * this.coordinates.x;
        extraMovement.y = depth * this.coordinates.y;

        this.coordinates.x = this.coordinates.x - extraMovement.x;
        this.coordinates.y = this.coordinates.y - extraMovement.y;

        this.elements[i].setAttribute('style', 'transform-style: preserve-3d;' +
                                               'backface-visibility: hidden;' +
                                               'transform: translate3d(' + this.coordinates.x + '%, ' + this.coordinates.y + '%, 0px)');
    }

}
