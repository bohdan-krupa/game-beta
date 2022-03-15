var x = 0,

	y = 0,

	position_x = 0,

	audit,

	house_audit,

	stance,

	timer_pause_stance,

	timer_sreamer,

	house_width,

	house_height,

	house_left,

	house_right,

	house_top,

	house_bottom;


FreddyResize();

$("body").on("keydown", function(e) {
	if(e.keyCode == 37 || e.keyCode == 65) { // ПСЕВДО ВЛІВО
		x += 3;
		$("#rest").css("left", x);

		AnimConstruct("-300px");

		stance = "right";
	}
	
	if(e.keyCode == 38 || e.keyCode == 87) { // ПСЕВДО ВГОРУ
		y += 3;
		$("#rest").css("top", y);

		AnimConstruct("-100px");

		stance = "down";
	}

	if(e.keyCode == 39 || e.keyCode == 68) { // ПСЕВДО ВПРАВО
		x -= 3;
		$("#rest").css("left", x);

		AnimConstruct("-200px");

		stance = "left";
	}

	if(e.keyCode == 40 || e.keyCode == 83) { // ПСЕВДО ВНИЗ
		y -= 3;
		$("#rest").css("top", y);

		AnimConstruct("0px");

		stance = "up";
	}

	clearTimeout(timer_pause_stance);
})

$("body").on("keyup", function() {
	clearTimeout(timer_pause_stance);

	timer_pause_stance = setTimeout(function() {
		if (stance == "right") $("#object").css("background-position", "-700px -300px");
		if (stance == "down") $("#object").css("background-position", "-700px -100px");
		if (stance == "left") $("#object").css("background-position", "-700px -200px");
		if (stance == "up") $("#object").css("background-position", "-700px 0");
	}, 7000);
});

setInterval(function() {
	audit = false;

	$("#error").css("line-height", innerHeight + "px");

	house_width = parseInt($("#rest").css("width"));
	house_left = parseInt($("#rest").css("left"));
	house_height = parseInt($("#rest").css("height"));
	house_right = parseInt($("#rest").css("right"));
	house_top = parseInt($("#rest").css("top"));
	house_bottom = parseInt($("#rest").css("bottom"));

	if (house_left + house_width >= innerWidth / 2
		&& house_right + house_width >= innerWidth / 2
		&& house_top + house_height >= innerHeight / 2
		&& house_bottom + house_height >= innerHeight / 2) {
		$("#house").css("opacity", 0.6);

		if (!house_audit) {
			house_audit = true;

			timer_sreamer = setTimeout(function() {
				$("#object").hide();
				$("#rest").hide();

				$("#freddy").show();
			}, 5000);
		}
	} else {
		clearTimeout(timer_sreamer);
		house_audit = false;

		$("#house").css("opacity", 1);
	}

}, 140);

$(window).resize(function() {
	FreddyResize();
});


function FreddyResize() {
	$("#freddy")
		.css("width", innerWidth)
		.css("height", innerHeight);
}

function AnimConstruct(position_y) {
	if (!audit) {
		position_x -= 100;
		$("#object").css("background-position", position_x + "px " + position_y);
		if (position_x == -600) position_x = 0;

		audit = true;
	}
}