 $(document).ready(function() {
     console.log("ready!");
     var js = jsonData.zoom_punkter;
     var HTML_array = [];


     $('.instr_container').html(instruction("Se videoerne hvor to biologer forklarer om hvordan man kan genoprette balancen i en forurenet sø."));
     console.log("break");
     for (var i = 0; i < jsonData.genopretning_labels.length; i++) {

         console.log("i: " + jsonData.genopretning_labels.length);

         //var infowindow = new google.maps.InfoWindow({});

         HTML = '<div class="col-xs-12 fold_ud_objekt"><h3 class="toggle_btn"><span class="toggle_header">'+jsonData.genopretning_labels[i].element+' </span><span class="glyhicontainer"> <span class = "glyphicon glyphicon-chevron-down"> </span> <span class="glyphicon glyphicon-chevron-up"> </span> </span></h3><div class="toggle_container">';

         //HTML += "<img class='img-responsive' src='" + js[i].header_pic + "'>";

         HTML += "<div class='embed-responsive embed-responsive-16by9'><iframe class='embed-responsive-item' src='https://www.youtube.com/embed/" + jsonData.genopretning_labels[i].genopretning_url + "?rel=0' allowfullscreen></iframe></div>";
         console.log("lets make video!");




         HTML += '</div></div>';
         $(".container-fluid").append(HTML);
     }


     $(".toggle_container").slideUp(0);

     $(".glyphicon-chevron-up").hide();

     $(".toggle_btn").click(function() {
         var indeks = $(this).index(".toggle_btn");

         console.log("Indeks: " + indeks)
         if ($(".toggle_container").eq(indeks).is(":hidden")) {
             console.log("hidden");
             $(".toggle_container").eq(indeks).slideDown(400); // do stuff
             $(".glyphicon-chevron-down").eq(indeks).hide();
             $(".glyphicon-chevron-up").eq(indeks).show();
         } else {
             console.log("shown");
             $(".toggle_container").eq(indeks).slideUp(400);
             $(".glyphicon-chevron-up").eq(indeks).hide();
             $(".glyphicon-chevron-down").eq(indeks).show();
         }
     });
$(".toggle_container").eq(0).slideDown(0);
     one_line_footer();

 });
