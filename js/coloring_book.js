window.addEventListener('load', eventWindowLoaded, false);
var undo_element = $('path[class="colorable"]')[0];
var undo_to_color = "white";

function eventWindowLoaded() {
	add_coloring_book_events();
}

function add_coloring_book_events() {
	// Add click events for colorable portions of drawing
	// Oddly, the selector $('path.colorable') does not work in iBooks reader, although it does in Mobile Safari
	$('path[class="colorable"]').bind("click touchstart", function (event) {
		// Suppress default; helpful on touchscreen devices
		event.preventDefault();
		// Get the current element and color and save it in undo_element and undo_to_color variables
		undo_element = this;
		undo_to_color = $(this).attr("style");
		// Toggle the "Undo" button to make sure it says "Undo" (it might say "Redo")
		$('#undo_redo').attr("value", "Undo");
		// Set the fill of clicked portion of drawing to the color chosen in palette below
		color_chosen = $("#color_chosen").html();
		var style = "fill:" + color_chosen + ";";
		$(this).attr("style", style);
	});

	// Add click events for color palette
	$('.color_choice').bind("click touchstart", function (event) {
		// Get button id, which is the color name 
		color_chosen = $(this).attr("id");
		// Set color_chosen text to the name of color clicked
		$("#color_chosen").html(color_chosen);
	});

	// Add click events for reset button, which reverts the fill of the entire drawing to white
	$('#reset_image').bind("click touchstart", function (event) {
		// Get all the colorable elements and set fill back to white
		$('path[class="colorable"]').attr("fill", "white");
		// Resetting the drawing clears all undo information
		$('#undo_redo').attr("value", "Undo");
		undo_element = $('path[class="colorable"]')[0];
		undo_to_color = "white";
	});

	$('#undo_redo').bind("click touchstart", function (event) {
		// First, save the existing color of the element we're going to undo
		existing_color = $(undo_element).attr("style");
		// Now revert the color back to the undo_to_color
		$(undo_element).attr("style", undo_to_color);
		// Finally, make existing_color the new undo_to_color, to support "Redo" functionality
		undo_to_color = existing_color;
		// If the button is named "Undo", rename it "Redo" and vice versa
		if ($(this).attr("value") == "Undo") {
			$(this).attr("value", "Redo");
		} else {
			$(this).attr("value", "Undo");
		}
	});
}