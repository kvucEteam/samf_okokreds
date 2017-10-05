/*============================================
=            Initialize variables            =
============================================*/
var state = 0,

    /*----------  hvor meget ubalance er der?  ----------*/
    ubalance_niveau = 0,

    viewArray = [$(".info_labels_container"), $(".lavkonj_labels_container"), $(".hoj_konj_labels_container")], //, $(".ekspert_container")],
    state_Array = ["void", "balance_spm", "ubalance_spm"],
    /*----------  variabler til at tilgå json pba sø state  ----------*/

    svar_array = [],

    /*----------  indeholder korrekte svar  ----------*/

    korrekt_svar,

    runder = [0, 0, 0]; /*----------  hvilken runde spørgsmål er vi i?  ----------*/


/*=====  End of Initialize variables  ======*/


$(document).ready(function() {
    $("#explanationwrapper").html(explanation(jsonData.userInterface.explanation));
    $('.instr_container').html(instruction(jsonData.userInterface.instruktion));
    $('.fane').click(toggleView);
    poseQuestion(runder[state]);

    generate_labels(state);
    toggleView();


    $(".balance_detalje_label").click(function() {
        var indeks = $(this).index(".balance_detalje_label");
        show_info(indeks);
    });

    $(".gen_label").click(function() {
        //var indeks = $(this).attr("class").
        console.log("HEY HEY HEY");


    });




    $(".genopretning_detalje_label").click(function() {
        var indeks = $(this).index(".genopretning_detalje_label");
        show_info(indeks);
        console.log("click GEN OPR LABEL")
    });

    $(".btn_closeGUI").click(function() {
        console.log("Hej");
        $(".toggle_info").remove();
        $(".spm_togggle_container").slideToggle(500, function() {
            var isVisible = $(".btn_closeGUI").hasClass("glyphicon-chevron-up");

            if (isVisible == true) {

                //$(".gui_container").css("background-color", "#999");
                $(".btn_closeGUI").switchClass("glyphicon-chevron-up", "glyphicon-chevron-down");



            } else {
                $(".gui_container").prepend("<p class='toggle_info'>Quizzen er skjult</p>");
                //$(".gui_container").css("background-color", "white");
                $(".btn_closeGUI").switchClass("glyphicon-chevron-down", "glyphicon-chevron-up");

            }
        });

    });


    viewArray[1].fadeOut(0);
    viewArray[2].fadeOut(0);


    //microhint($(".active").eq(0), "Lær om det økonomiske kredsløb ved at klikke på knapperne.</p><p>Lær om lav- og højkonjunkturer på fanerne.");

});

/*----------  Subsection comment block  ----------*/

function generate_labels(state) {
    //console.log(state);
    for (var i = 0; i < jsonData.labels.length; i++) {
        var element = jsonData.labels[i];
        console.log(i + " punkt");
        //viewArray[state].append("<div><img class='gif' src=" + element.pics[state] + "></div>");
        if (jsonData.labels[i].type != "pil") {
            $(".info_labels_container").append("<span class='btn btn btn-info balance_detalje_label info_label gen_label num_" + i + "'>" + element.element + "</span>");
            $(".lavkonj_labels_container").append("<span class='btn btn btn-info balance_detalje_label lav_konj_label gen_label num_" + i + "'>" + element.element + "</span>");
            $(".hoj_konj_labels_container").append("<span class='btn btn btn-info balance_detalje_label hoj_konj_label gen_label num_" + i + "'>" + element.element + "</span>");
            //$(".lavkonj_labels_container").append("<span class='btn btn btn-info balance_detalje_label'>" + element.element + "</span>");

        } else {
            $(".info_labels_container").append("<span class='btn btn-xs btn-default balance_detalje_label info_label btn_pil'" + element.element + "''>" + element.element + "</span>");
            $(".lavkonj_labels_container").append("<span class='btn btn-xs btn-default balance_detalje_label btn_pil lav_konj_label num_" + element.lav_konj_runde + " btn_pil_konj'>" + element.element + "</span>");
            $(".hoj_konj_labels_container").append("<span class='btn btn-xs btn-default balance_detalje_label btn_pil hoj_konj_label num_" + element.lav_konj_runde + " btn_pil_konj''>" + element.element + "</span>");

            if (element.pil == "ned") {
                $(".lav_konj_label").eq(i).prepend("<span class='glyph_wrapper'><span class='glyphicon glyphicon-download'></span></div>");
                $(".hoj_konj_label").eq(i).prepend("<span class='glyph_wrapper'><span class='glyphicon glyphicon-upload'></span></div>");
            } else if (element.pil == "op") {
                $(".lav_konj_label").eq(i).prepend("<span class='glyph_wrapper'><span class='glyphicon glyphicon-upload'></span></div>");
                $(".hoj_konj_label").eq(i).prepend("<span class='glyph_wrapper'><span class='glyphicon glyphicon-download'></span></div>");
            }
        }
        //$(".lav_konj_label").eq(i).css("left", element.balance_pos[0] + "%").css("top", element.balance_pos[1] + "%").css("transform", element.balance_pos[2])
        $(".info_label").eq(i).css("left", element.balance_pos[0] + "%").css("top", element.balance_pos[1] + "%").css("transform", element.balance_pos[2])
        $(".lav_konj_label").eq(i).css("left", element.balance_pos[0] + "%").css("top", element.balance_pos[1] + "%").css("transform", element.balance_pos[2])
        $(".hoj_konj_label").eq(i).css("left", element.balance_pos[0] + "%").css("top", element.balance_pos[1] + "%").css("transform", element.balance_pos[2])

        //$(".lav_konj_label").eq(i).hide();
        //$(".gif").eq(i).css("left", element.balance_pos[0] + "%").css("top", element.balance_pos[1] + "%");

    }
}


/*----------  vis information  ----------*/

function show_info(indeks) {
    console.log("I: " + indeks);
    //$(".container-fluid").append("<div class='info_container'><div class='info_box'><h4>" + jsonData.elementer[indeks].element + "</h4><img class='infopic' src='" + jsonData.elementer[indeks].pic + "'><p>" + jsonData.elementer[indeks].infotekst + "</p></div></div>")
    if (state == 0) {
        UserMsgBox_xclick("body", "<div class='col-xs-12'><img class='img-responsive msbox_pic' src='" + jsonData.labels[indeks].infopic + "'></div><div class='col-xs-12'><h3>" + jsonData.labels[indeks].element + "</h3><p class='broed_info_text'>" + jsonData.labels[indeks].infotekst + "</p></div>");
        //UserMsgBox("body", "<h3>" + jsonData.labels[indeks].element + "</h3><div class='col-xs-8'><img class='img-responsive' src='" + jsonData.labels[indeks].infopic + "'><p></div><div class='col-xs-4>'" + jsonData.labels[indeks].infotekst + "</p></div>");
        tekst_forklaring($('.broed_info_text'), jsonData.forklaringer);
    } else if (state == 1 || state == 2) {

        var konj_indeks = $(".balance_detalje_label").eq(indeks).attr("class").split(' ')[6];
        konj_indeks = konj_indeks.substring(4, 5);

        //var indeks = $(this).attr('class').split(' ')[6];

        console.log("konj_indeks: " + konj_indeks);


        if ($(".balance_detalje_label").eq(indeks).hasClass("gen_label")) {
            //alert("indeks: " + indeks);
            UserMsgBox_xclick("body", "<div class='col-xs-12'><img class='img-responsive msbox_pic' src='" + jsonData.labels[konj_indeks].infopic + "'></div><div class='col-xs-12'><h3>" + jsonData.labels[konj_indeks].element + "</h3><p class='broed_info_text'>" + jsonData.labels[konj_indeks].infotekst + "</p></div>");
            tekst_forklaring($('.broed_info_text'), jsonData.forklaringer);
        } else {
            //alert("NO GEN LEBALE");
            microhint($(".balance_detalje_label").eq(indeks), jsonData.balance_spm[konj_indeks].feedback_true);
        }


        //UserMsgBox_xclick("body", "<div class='col-xs-12'><img class='img-responsive msbox_pic' src='" + jsonData.labels[indeks].infopic + "'></div><div class='col-xs-12'><h3>" + jsonData.labels[indeks].element + "</h3><p class='broed_info_text'>" + jsonData.labels[indeks].infotekst + "</p></div>");
    } else if (state == 3) {
        UserMsgBox_xclick("body", "<h3>" + jsonData.genopretning_labels[indeks].element + "</h3><div class='embed-responsive embed-responsive-16by9'><iframe class='embed-responsive-item' src='https://www.youtube.com/embed/" + jsonData.genopretning_labels[indeks].genopretning_url + "?rel=0' allowfullscreen></iframe></div>");

    }

    //viewArray[state].addClass("blur");


}

/*----------  Skift view på Søen  ----------*/

function toggleView() {



    var indeks = $(this).index();

    //alert(indeks + ", state: " + state);

    if (indeks == -1) {
        indeks = state;
    }

    if (state != indeks) {
        state = indeks;


        poseQuestion();

        //alert("State: "+ state);
    }

    for (i in viewArray) {
        console.log("W - A" + i)
        viewArray[i].fadeOut(0)
    }
    viewArray[state].fadeIn(0);



    if (state == 0) {
        $(".info_labels_container").show();
        $(".bg_image").attr("src", "img/pile_tyndere_banktxt.png");
        $(".gui_container").hide();


    } else if (state == 1) {
        console.log("BGR IMG:" + jsonData.overlays[state - 1][0]);
        $(".bg_image").attr("src", jsonData.overlays[state - 1].overlaypics[runder[state]]);
        if (runder[state] < 1) {
            UserMsgBox_xclick("body", "<div class='col-xs-12'><img class='img-responsive msbox_pic' src='img/images_usmsgbx/konjunkturboelge_LAV.jpg'></div><div class='col-xs-12'><h3>Lavkonjunktur </h3><p>En økonomisk krise i den globale økonomi gør at efterspørgslen i verden falder og det påvirker blandt andet de danske virksomheder ved at de køber færre dansk producerede varer.</p></div>");
            $(".CloseClass").click(function() {
                microhint($(".gui_container"), "Besvar spørgsmålene i quizzen og se hvordan pengestrømmene bevæger sig i en lavkonjunktur.");
            });
        }

        //$(".ekspert_labels_container").hide();
        //$(".bg_image").attr("src", "img/mockup02_infotab.gif");
        $(".gui_container").show();

    } else if (state == 2) {
        $(".bg_image").attr("src", jsonData.overlays[state - 1].overlaypics[runder[state]]);
        if (runder[state] < 1) {
            UserMsgBox_xclick("body", "<div class='col-xs-12'><img class='img-responsive msbox_pic' src='img/images_usmsgbx/konjunkturboelge_HOJ.jpg'></div><div class='col-xs-12'><h3>Højkonjunktur </h3><div class='col-xs-12'><p>Det går ufattelig godt! Væksten hamrer derudaf og arbejdsløsheden er historisk lav. Måske burde nogen gøre noget førend økonomien løber af sporet?</p></div>");
            $(".CloseClass").click(function() {
                microhint($(".gui_container"), "Besvar spørgsmålene i quizzen og se hvordan pengestrømmene bevæger sig i en højkonjunktur.");
            });
        }
        //$(".info_labels_container, .ekspert_labels_container").hide();
        //$(".bg_image").attr("src", "img/mockup02_infotab.gif");
        $(".gui_container").show();

    } else if (state == 3) {
        $(".info_labels_container").hide();
        $(".ekspert_labels_container").show();
        $(".bg_image").attr("src", "img/mockup02_infotab.gif");
        $(".gui_container").show();

    }
}

/*----------  Kør spørgsmål  ----------*/

function poseQuestion() {

    setTimeout(function() {
        $(".gui_container").fadeIn(1500);
    }, 3000);


    //window.setTimeout($(".gui_container").fadeIn(1500), 25000);


    $(".lav_konj_label, .hoj_konj_label").each(function() {


        var hasPil = $(this).hasClass("btn_pil");

        if (hasPil == true) {
            $(this).hide();
        }


        var indeks = $(this).attr('class').split(' ')[6];


        if (typeof(indeks) !== "undefined") {
            indeks = parseInt(indeks.substring(4, 5));
        }


        console.log("runde:" + runder[state] + ", indeks: " + indeks);
        if (indeks - 1 < runder[state]) {
            $(this).show();
        }
    });

    console.log("posing q");

    $(".feedback_container").hide();
    $(".btn_tjek").show();
    console.log("runder: " + runder);
    var spmData = jsonData[state_Array[state]];

    if (state != 0 && state != 3) {


        $(".spm_numbers").show();

        if (runder[state] < spmData.length) {



            $(".spm_numbers").html("Spørgsmål " + (runder[state] + 1) + " / " + spmData.length);
            $(".spm").html(spmData[runder[state]].spm);

            svar_Array = [];
            var svarHTML = "<div class='answerWrap'>";

            for (var i = 0; i < spmData[runder[state]].forkerte_svar.length; i++) {
                svar_Array.push(spmData[runder[state]].forkerte_svar[i]);
            }
            svar_Array.push(spmData[runder[state]].svar);

            korrekt_svar = spmData[runder[state]].svar;
            //svar_Array = shuffle_Array(svar_Array);

            for (var i = 0; i < svar_Array.length; i++) {
                svarHTML += "<div class='answerChoice radioWrap'><label class='rdo_label'><input name='radioName' type='radio' value='" + i + "'><span class='svar_txt'>" + svar_Array[i] + " </span></label></div>"
            }

            $(".svar").html("</div>" + svarHTML);

            $(".btn_tjek").click(tjek_svar);
        } else {

            if (state == 1) {
                $(".num_0").find(".glyphicon").removeClass("glyphicon-download").addClass("glyphicon-upload");
            } else if (state == 2) {
                $(".num_0").find(".glyphicon").removeClass("glyphicon-upload").addClass("glyphicon-download");
            }




            $(".spm").html("Du har besvaret alle spørgsmålene i quizzen <h4><span class='label_slut label label-success'>Korrekt</span></h4><p>Du kan tage quizzen igen eller undersøge en af de andre faner.");
            $(".svar").html("<div class='btn btn-primary btn_forfra'>Tag quizzen igen</div><div class='Clear'></div>");
            $(".btn_tjek").hide();
            $(".btn_forfra").click(function() {
                genstart_quiz();
            });
        }
    } else {
        $(".spm_numbers").hide(); //html("Spørgsmål " + (runder[state] + 1) + " / " + spmData.length);
        if (state == 0) {
            $(".spm").html("Klik på de forskellige enheder og pile for at undersøge det økonomiske kredsløb");
        } else if (state == 3) {
            $(".spm").html("Klik på de forskellige infopunkter for at se en video de forklarer de forksellige økonomiske politikker");
        }
        $(".svar").html("");
        $(".btn_tjek").hide();
    }
    $(".radioWrap").shuffle_div_position();
}

/*----------  Tjek svar  ----------*/


function tjek_svar() {
    var checked = $('input[name=radioName]:checked').val();
    var svar = svar_Array[checked];
    console.log("checked: " + checked);
    if (typeof(checked) != "undefined") {
        if (korrekt_svar == svar) {
            console.log("KORREKT")

            feedback(true, checked);

        } else {
            console.log("FORKERT!");
            feedback(false, checked);
        }
    }
    console.log("svar: " + korrekt_svar + ", checked:" + $(".svar_txt").eq(checked).html());


}

/*----------  Visuel feedback:    ----------*/

function visuel_feedback() {

    console.log("visuel feedback, BRO")

    if (runder[state] < jsonData.overlays[state - 1].overlaypics.length) {


        //if (state == 1) {


        $(".gui_container").fadeOut(0);
        runder.splice(state, 1, runder[state] + 1);

        console.log("RUNDER: " + runder)


        setTimeout(function() {

            $(".bg_image").attr("src", jsonData.overlays[state - 1].overlaypics[runder[state]]);

            poseQuestion();
        }, 1000);
        //console.log("OL_length: " + $(".ubalance_overlay").length);

        $(".balance_overlay").eq(0).fadeOut(0);
        $(".balance_overlay").eq(1).fadeOut(3000);


        $(".balance_overlay").eq(0).fadeIn(3000, function() {
            $(".balance_overlay").eq(1).remove();

            console.log($(".lav_container").find(".img_overlay").length);


            console.log("State: " + state);
            console.log("IF!");
        });



        /*} else if (state == 2) {

            $(".gui_container").fadeOut(100);

            viewArray[state].prepend("<img class='ubalance_overlay img_overlay img-responsive' src='" + jsonData.overlays[state - 1].overlaypics[runder[state]] + "'>");
            console.log("OL_length: " + $(".ubalance_overlay").length);

            $(".ubalance_overlay").eq(0).fadeOut(0);
            $(".ubalance_overlay").eq(1).fadeOut(3000);

            $(".ubalance_overlay").eq(0).fadeIn(3000, function() {
                $(".ubalance_overlay").eq(1).remove();

                console.log($(".hoj_container").find(".img_overlay").length);
                runder.splice(state, 1, runder[state] + 1);
                poseQuestion();
            });

        } else {
            runder.splice(state, 1, runder[state] + 1);
            console.log("ELSE!");
            poseQuestion();
        }*/


        $(".ubalance_overlay").eq(1).fadeIn(1500);


    }
}


/*----------  feedback - 1 skridt bring skridt 2 op ved click  ----------*/


function feedback(svar, checked) {
    $(".feedback_container").show();
    /* Hvis vi er i balance mode */

    if (state == 1 || state == 2) {
        // alert("state: " + state);
        if (svar == true) {
            $(".feedback_container").html("<h4><span class='label label-success'>Korrekt</span></h4><p class='feedback_txt'>" + jsonData.balance_spm[runder[state]].feedback_true + "</p><div class='btn btn-xs btn-primary ok_btn'>Fortsæt</div>");
            $(".btn_tjek").hide();
        } else {

            $(".feedback_container").html("<h4><span class='label label-danger'>Forkert - prøv igen</span></h4><p class='feedback_txt'>" + jsonData.balance_spm[runder[state]].feedback_true + "</p>");



        }
        /* Hvis vi er i ubalance mode */
    }
    /*else if (state == 2) {
           if (svar == true) {
               $(".feedback_container").html("<h4><span class='label label-success'>Korrekt</span></h4><p class='feedback_txt'>Klik på fortsæt og se hvordan processen påvirker søen< /p><div class='btn btn-xs btn-primary ok_btn'>Fortsæt</div > ");
                   $(".btn_tjek").hide();
               }
               else {
                   //alert(jsonData.ubalance_spm[runder[state]].feedback);
                   $(".feedback_container").html("<h4><span class='label label-danger'>Forkert - prøv igen</span></h4> <p class='feedback_txt'>" + jsonData.ubalance_spm[runder[state]].feedback_false[checked] + "</p>");
               }
           }*/

    $(".ok_btn").click(function() {

        if (svar == true) {
            console.log("ok BTN - TRUE");
            visuel_feedback();

        }
    });

    tekst_forklaring($('.feedback_txt'), jsonData.forklaringer);
}

/*----------  Genstart quiz - ryd variabler   ----------*/

function genstart_quiz() {
    runder.splice(state, 1, 0);
    poseQuestion();
    if (state == 0) {
        $(".bg_image").attr("src", "img/pile_tyndere_banktxt.png");
        //$(".lav_container").html('<img class="img_overlay img-responsive ubalance_overlay" src="img/balance01.png"  />');
    } else if (state == 1) {
        $(".hoj_container").html('<img class="img_overlay img-responsive ubalance_overlay" src="img/Ubalance01.png" />');
    }
}
