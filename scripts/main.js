import { data } from "./artList";

(function() {
  "use strict";

  $(document).ready(function() {
    var helpBtn = $(".help");

    for (var artwork in data) {
      createAsset(data[artwork])
    }

    helpBtn.click(function(e) {
      e.preventDefault();
      console.log($("#video_demo")[0]);
      $("#video_demo")[0].style.display = "block";
    });

    function createAsset(currentData) {
      let marker = document.createElement("a-marker");
      marker.setAttribute("type", "barcode");
      marker.setAttribute("value", currentData.id)

      let plane = document.createElement("a-plane")
      plane.setAttribute("id", "canvas_" + currentData.id);
      plane.setAttribute("rotation", "-90 0 0");
      plane.setAttribute("position", "0 0 0");
      plane.setAttribute("width", "5");
      plane.setAttribute("height", "5");
      plane.setAttribute("material", "opacity: 0.8;");
      plane.setAttribute("onclick", "location.href='/static/history2.html'");
      plane.setAttribute("src", "assets/" + currentData.imgAsset);
      plane.setAttribute("scale", currentData.scale);

      marker.appendChild(plane);
      document.getElementById("scene").appendChild(marker);
    }


  //Camera feature check
  function hasGetUserMedia() {
    return !!(
      navigator.getUserMedia ||
      navigator.webkitGetUserMedia ||
      navigator.mozGetUserMedia ||
      navigator.msGetUserMedia
    );
  }

  if (hasGetUserMedia()) {
    // Good to go!
    $("#splashScreen").css("display", "block");
  } else {
    let template = "<p>This feature is not supported in your browser.</p>";
    $("#noMedia").append(template);
    $("#noMedia").css("display", "block");
  }
})();
