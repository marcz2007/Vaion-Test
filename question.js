/*
    The goal of this exercise is to take a polygon defined by the points 'points', use the mouse
    events to draw a line that will split the polygon and then draw the two split polygons.
    In the start, you'll have the initial polygon (start.png)
    While dragging the mouse, the polygon should be shown along with the line you're drawing (mouseMove.png)
    After letting go of the mouse, the polygon will be split into two along that line (mouseUp.png)

    The code provided here can be used as a starting point using plain-old-Javascript, but it's fine
    to provide a solution using react/angular/vue/etc if you prefer.
*/


const userPointsStartEnd = [{x: undefined, y: undefined},
    {x: undefined, y: undefined}];

let newLine;
let drawing = false;


function onMouseDown(event) {
    //Add code here
    // alert("clientX: " + event.clientX +" - clientY: " + event.clientY);


    if (userPointsStartEnd[0].x === undefined) {
        userPointsStartEnd[0].x = (event.clientX);
        userPointsStartEnd[0].y = (event.clientY);
        drawing = true;

        newLine = document.createElementNS("http://www.w3.org/2000/svg", "line");
        const userLine = document.getElementById('content');
        var svgElement = document.createElementNS("http://www.w3.org/2000/svg", 'svg');
        svgElement.setAttribute("width", "1000");
        svgElement.setAttribute("height", "1000");
        //newLine.setAttribute('id', 'line2');
        newLine.setAttribute("stroke", "red");
        newLine.setAttribute("width", "1000");
        newLine.setAttribute("height", "1000");
        newLine.setAttribute("x1", userPointsStartEnd[0].x);
        newLine.setAttribute("y1", userPointsStartEnd[0].y);
        newLine.setAttribute("x2", event.clientX);
        newLine.setAttribute("y2", event.clientY);

        svgElement.appendChild(newLine);
        userLine.appendChild(svgElement);
        // alert(userPointsStartEnd[0].x);
    } else {

        userPointsStartEnd[1].x = (event.clientX);
        userPointsStartEnd[1].y = (event.clientY);
        drawing = false;
        //alert(drawing);
        newLine.setAttribute("x2", userPointsStartEnd[1].x);
        newLine.setAttribute("y2", userPointsStartEnd[1].y);


    }


}

function onMouseMove(event) {
    //Add code here

    if (drawing) {

        newLine.setAttribute("x2", event.clientX);
        newLine.setAttribute("y2", event.clientY);

    }


}

const intersectionXYPoint = [{x: undefined, y: undefined},
    {x: undefined, y: undefined}];

//Ref: https://www.geeksforgeeks.org/program-for-point-of-intersection-of-two-lines/
function calculateIntersectionPoint(aX, aY, bX, bY, cX, cY, dX, dY) {

    // AB Line represented as a1x + b1y = c1
    const a1 = bY - aY;
    const b1 = aX - bX;
    const c1 = a1 * (aX) + b1 * aY;

    // CD Line represented as a1x + b1y = c1
    const a2 = dY - cY;
    const b2 = cX - dX;
    const c2 = a2 * (cX) + b2 * cY;

    const determinant = a1 * b2 - a2 * b1;
    if (determinant == 0) {
        // Lines are parallel.
    } else {
        const intersectionX = (b2 * c1 - b1 * c2) / determinant;
        const intersectionY = (a1 * c2 - a2 * c1) / determinant;
        if (intersectionXYPoint[0].x == undefined) {
            intersectionXYPoint[0].x = intersectionX;
            intersectionXYPoint[0].y = intersectionY;
        } else {
            intersectionXYPoint[1].x = intersectionX;
            intersectionXYPoint[1].y = intersectionY;
        }

    }


}

function onMouseUp(event) {

    const confirmedLineChecker = [];
    const confirmedLineCheckerIndex = [];

    if (userPointsStartEnd[1].x !== undefined) {
        for (let i = 0; i < pointsAllLines.length - 1; i++) {
            if (doIntersect(userPointsStartEnd[0].x, userPointsStartEnd[0].y, userPointsStartEnd[1].x, userPointsStartEnd[1].y, pointsAllLines[i].x, pointsAllLines[i].y, pointsAllLines[i + 1].x, pointsAllLines[i + 1].y)) {
                confirmedLineChecker.push(pointsAllLines[i].x, pointsAllLines[i].y, pointsAllLines[i + 1].x, pointsAllLines[i + 1].y);
                confirmedLineCheckerIndex.push(i + 1);

            }

        }

        for (let j = 0; j < confirmedLineChecker.length; j += 4) {
            calculateIntersectionPoint(userPointsStartEnd[0].x, userPointsStartEnd[0].y, userPointsStartEnd[1].x, userPointsStartEnd[1].y, confirmedLineChecker[j], confirmedLineChecker[j + 1], confirmedLineChecker[j + 2], confirmedLineChecker[j + 3])
        }

        const poly1 = [];
        const poly2 = [];
        poly1.push({
            x: intersectionXYPoint[0].x,
            y: intersectionXYPoint[0].y
        });

        poly1.push({
            x: pointsAllLines[confirmedLineCheckerIndex[0]].x,
            y: pointsAllLines[confirmedLineCheckerIndex[0]].y
        });

        poly2.push({
            x: intersectionXYPoint[1].x,
            y: intersectionXYPoint[1].y
        });

        poly2.push({
            x: pointsAllLines[confirmedLineCheckerIndex[1]].x,
            y: pointsAllLines[confirmedLineCheckerIndex[1]].y
        });

        let l = confirmedLineCheckerIndex[0] + 1;
        let m;
        if (confirmedLineCheckerIndex[1] < 7) {
            m = confirmedLineCheckerIndex[1] + 1;
        } else {
            m = 0;
        }

        while (!confirmedLineCheckerIndex.includes(l)) {

            poly1.push({
                x: pointsAllLines[l].x,
                y: pointsAllLines[l].y
            });

            if (l < pointsAllLines.length - 1) {
                l++;
            } else {
                l = 0;
            }
        }
        ;

        while (!confirmedLineCheckerIndex.includes(m)) {

            poly2.push({
                x: pointsAllLines[m].x,
                y: pointsAllLines[m].y
            });
            if (m < pointsAllLines.length - 1) {
                m++;
            } else {
                m = 0;
            }
        }
        ;

        poly1.push({
            x: intersectionXYPoint[1].x,
            y: intersectionXYPoint[1].y
        });
        poly1.push({
            x: intersectionXYPoint[0].x,
            y: intersectionXYPoint[0].y
        });

        poly2.push({
            x: intersectionXYPoint[0].x,
            y: intersectionXYPoint[0].y
        });
        poly2.push({
            x: intersectionXYPoint[1].x,
            y: intersectionXYPoint[1].y
        });

        clearPoly();
        addPoly(poly1, 'blue');
        addPoly(poly2, 'green');
    }
}

//The orientation depends on whether the expression
// (y2−y1) (x3−x2) − (y3−y2) (x2−x1)
// is positive, negative, or null.
// Ref: http://www.dcs.gla.ac.uk/~pat/52233/slides/Geometry1x1.pdf
function orientation(pX, pY, qX, qY, rX, rY) {
    const orientationValue = (qY - pY) * (rX - qX) -
        (qX - pX) * (rY - qY);

    if (orientationValue === 0) {
        // Colinear Orientation
        return 0;
    } else if (orientationValue > 0) {
        // Clockwise orientation
        return 1;
    } else {
        // Counter clockwise orientation
        return 2;
    }

}

// If colinear, this function checks whether point q lies on line segment PR
function onSegment(pX, pY, qX, qY, rX, rY) {
    if (qX <= Math.max(pX, rX) && qX >= Math.min(pX, rX) &&
        qY <= Math.max(pY, rY) && qY >= Math.min(pY, rY)) {
        return true;
    } else {
        return false;
    }
}

function doIntersect(p1X, p1Y, q1X, q1Y, p2X, p2Y, q2X, q2Y) {

    const orientation1 = orientation(p1X, p1Y, q1X, q1Y, p2X, p2Y);
    const orientation2 = orientation(p1X, p1Y, q1X, q1Y, q2X, q2Y);
    const orientation3 = orientation(p1X, p1Y, q1X, q1Y, p2X, p2Y);
    const orientation4 = orientation(p1X, p1Y, q1X, q1Y, q2X, q2Y);

    // General case Ref:(https://www.geeksforgeeks.org/check-if-two-given-line-segments-intersect/)
    if (orientation1 !== orientation2 && orientation3 !== orientation4) {
        return true;
    }

    // Special Cases
    // p1, q1 and p2 are colinear and p2 lies on segment p1q1
    if (orientation1 == 0 && onSegment(p1X, p1Y, p2X, p2Y, q1X, q1Y)) {
        return true;
    }
    // p1, q1 and q2 are colinear and q2 lies on segment p1q1
    if (orientation2 == 0 && onSegment(p1X, p1Y, q2X, q2Y, q1X, q1Y)) {
        return true;
    }

    // p2, q2 and p1 are colinear and p1 lies on segment p2q2
    if (orientation3 == 0 && onSegment(p2X, p2Y, p1X, p1Y, q2X, q2Y)) {
        return true;
    }
    // p2, q2 and q1 are colinear and q1 lies on segment p2q2
    if (orientation4 == 0 && onSegment(p2X, p2Y, q1X, q1Y, q2X, q2Y)) {
        return true;
    } else {
        return false;
    }

}

/*
	Code below this line shouldn't need to be changed
*/

//Draws a polygon from the given points and sets a stroke with the specified color
function addPoly(points, color = 'black') {
    if (points.length < 2) {
        console.error("Not enough points");
        return;
    }

    const content = document.getElementById('content');

    var svgElement = document.createElementNS("http://www.w3.org/2000/svg", 'svg');
    var svgPath = document.createElementNS("http://www.w3.org/2000/svg", 'path');
    let path = 'M' + points[0].x + ' ' + points[0].y

    for (const point of points) {
        path += ' L' + point.x + ' ' + point.y;
    }
    path += " Z";
    svgPath.setAttribute('d', path);
    svgPath.setAttribute('stroke', color);

    svgElement.setAttribute('height', "500");
    svgElement.setAttribute('width', "500");
    svgElement.setAttribute('style', 'position: absolute;');
    svgElement.setAttribute('fill', 'transparent');

    svgElement.appendChild(svgPath);
    content.appendChild(svgElement);
}

//Clears the all the drawn polygons
function clearPoly() {
    const content = document.getElementById('content');
    while (content.firstChild) {
        content.removeChild(content.firstChild);
    }
}

//Sets the mouse events needed for the exercise
function setup() {
    this.clearPoly();
    this.addPoly(points);
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mousedown', onMouseDown);
    document.addEventListener('mouseup', onMouseUp);
}

const points = [
    //top left
    {x: 100, y: 100},

    {x: 200, y: 50},
    {x: 300, y: 50},
    {x: 400, y: 200},
    {x: 350, y: 250},
    {x: 200, y: 300},

    // bottom left
    {x: 150, y: 300},
    // y value has to be between the two y points
    // the x value will always take the first option
]


const pointsAllLines = [
    //top left
    {x: 100, y: 100},
    // top middle
    {x: 200, y: 50},
    // top right
    {x: 300, y: 50},
    // bottom right
    {x: 400, y: 200},
    // bottomist right
    {x: 350, y: 250},
    // bottomist left
    {x: 200, y: 300},

    // bottom left
    {x: 150, y: 300},

    // top left
    {x: 100, y: 100}

]

window.onload = () => setup()



