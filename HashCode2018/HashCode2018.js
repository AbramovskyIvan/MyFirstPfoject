var fs = require('fs');
//var fname = process.argv[2];
var fname = './e_high_bonus.in'

var array = fs.readFileSync(fname).toString().split("\n");
var roads = [];
var cars = [];

var firstLineData = array[0].split(" ");

var rows = Number(firstLineData[0]),
    columns = Number(firstLineData[1]),
    vehicles = Number(firstLineData[2]),
    rides = Number(firstLineData[3]),
    bonus = Number(firstLineData[4]),
    steps = Number(firstLineData[5]);

for (var i = 0; i <= vehicles - 1;  i++) {
  cars[i] = {
    order_id: null,
    free_time: 0,
    orders: []
  }
}

for (var i = 1; i < array.length - 1; i++) {
  arrayElement = array[i].split(" ");
  roads[i - 1] = {
    start_x: arrayElement[0],
    start_y: arrayElement[1],
    finish_x: arrayElement[2],
    finish_y: arrayElement[3],
    start: arrayElement[4],
    end: arrayElement[5],
    len: Math.abs(arrayElement[0] - arrayElement[2]) + Math.abs(arrayElement[1] - arrayElement[3]),
    finished: false
  };
}

function orderCalculation (car, step, ord_ret) {
  var newOrders = [];

  //console.log('INNNNN')
  for (var i = 0; i < roads.length; i++) {
    order = roads[i];
    //console.log(order);
    if (order.finished) {
      newOrders[i] = null;
    } else {
      var carCoords = car.order_id == null ? [0,0] : [roads[car.order_id].finish_x, roads[car.order_id].finish_y];
      var dist = Math.abs(order.start_x - carCoords[0]) + Math.abs(order.start_y - carCoords[1]);
      var temp_points = step + dist <= order.start ? bonus : 0;
      var points = temp_points + order.len;
      var wait = order.start - (step + dist) < 0 ? 0 : order.start - step + dist;
      var endTime = step + dist + wait + order.len;
      points = endTime > order.end ? 0 : points;
      var indicator = points - wait - dist;
      newOrders[i] = indicator;
    }
  }
  console.log(newOrders);
  //var best_order_id = newOrders.indexOf(Math.max(newOrders));
  //console.log(Math.max.apply(null, newOrders));
  var best_order_id = newOrders.indexOf(Math.max.apply(null, newOrders));

  //console.log(best_order_id);
  if (ord_ret) {
    return best_order_id;
  } else {
    return endTime;
  }
  
}

for (var step = 0; step <= steps; step++) {
  for (var i = 0; i <= cars.length - 1; i++) {
    // console.log(step);
    // console.log(cars[i].free_time);
    // console.log("-----------------");
    if (cars[i].free_time == step) {
      var bestId = orderCalculation(cars[i], step, true);
      var cur_free_time = orderCalculation(cars[i], step, false);
      // console.log("-----------------");
      // console.log(bestId);
      // console.log("-----------------");
      cars[i].free_time = cur_free_time;
      cars[i].order_id = bestId;
      try {
        roads[bestId].finished = true;
        cars[i].orders.push(bestId);
      } catch(err) {

      }
    };
  }
}

var fname = './out.out';
// var ress[];
// for (var i = 0; i < cars.length; i++) {
//   ress[i] = cars[i].
// }
// var ress = cars.map((i)->i);

var resultText = "";
for (var i = 0; i < cars.length; i++) {
  resultText = resultText + i + " ";
  resultText = resultText + cars[i].orders.join(" ");
  resultText = resultText + "\n";
}

fs.open(fname, "w+", 0644, function(err, file_handle) {
	if (!err) {
	    fs.write(file_handle, resultText, null, 'ascii', function(err, written) {
	        if (!err) {
	            console.log("Text write succesfully");
	        } else {
	            console.log("Write error!");
	        }
	    });
	} else {
		console.log("Open file error!");
	}
});

console.log(cars)

