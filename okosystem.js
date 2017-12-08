/**
 *
 * Hej THAN 
 * Forhåbentlig er de fleste rettelser i ToggleView funktionen 
 * Hvis der er behov for rettelser ift labels, må du gerne kontaktet mig også i barslen
 * Ligeledes hvis det er besværligt at skal pusle en fane 4 på plads! 
 *
 */


 /**
 
     TODO:
     - Opdaterere explanation og instruktion tekst
     - Lave slutfeedback til opgaven (fane 2+3) - enten i $(".gui_container") eller som en us Msg box Søg :"Du har besvaret alle spørgsmålene"
     - Udarbejde fane 4  
  */
 







/*============================================
=            Initialize variables            =
============================================*/
var state = 0,

    /*----------  hvor meget ubalance er der?  ----------*/
    ubalance_niveau = 0,

    viewArray = [$(".info_labels_container"), $(".lavkonj_labels_container"), $(".hoj_konj_labels_container"), $(".fane4_container")], //, $(".ekspert_container")],
    // state_Array = ["void", "balance_spm", "ubalance_spm"],
    state_Array = ["void", "balance_spm", "ubalance_spm", "indgreb_spm"],  // Tilføjet af THAN d. 06-12-2017
    /*----------  variabler til at tilgå json pba sø state  ----------*/

    svar_array = [],

    /*----------  indeholder korrekte svar  ----------*/

    korrekt_svar,

    // runder = [0, 0, 0]; /*----------  hvilken runde spørgsmål er vi i?  ----------*/
    runder = [0, 0, 0, 0]; // Tilføjet af THAN d. 06-12-2017


/*=====  End of Initialize variables  ======*/


$(document).ready(function() {



    // $("#explanationwrapper").html(explanation(jsonData.userInterface.explanation));  // Udkommenteret af THAN d. 06/12-2017
    $('.instr_container').html(instruction(jsonData.userInterface.instruktion));
    $('.fane').click(toggleView);

    //poseQuestion(runder[state]);

    generate_labels(state);
    $(".gui_container").hide();
    toggleView();


    $(".balance_detalje_label").click(function() {
        var indeks = $(this).index(".balance_detalje_label");
        show_info(indeks);
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


    microhint($(".balance_detalje_label").eq(17), "Klik på de forskellige enheder og pile for at undersøge det økonomiske kredsløb")

    //microhint($(".active").eq(0), "Lær om det økonomiske kredsløb ved at klikke på knapperne.</p><p>Lær om lav- og højkonjunkturer på fanerne.");

    rotateCheck();

    // Tilføjet af THAN d. 06-12-2017
    $(document).on('click touchend', ".btn_closeUserMsgBox", function(event) {
        console.log('btn_closeUserMsgBox - CLICKED');
        $('.CloseClass').trigger('click');
    });
});




/*----------  Skift view på Kredsløbet ved klik på fanerne ----------*/

function toggleView() {

    $(".microhint").remove();

    var indeks = $(this).index();

    //alert(indeks + ", state: " + state);

    if (indeks == -1) {
        indeks = state;
    }

    if (state != indeks) {
        state = indeks;

        if (state != 0) {
            poseQuestion();
        }
        //alert("State: "+ state);
    }

    for (i in viewArray) {
        console.log("W - A" + i)
        viewArray[i].fadeOut(0)
    }
    viewArray[state].fadeIn(0);

    //alert("State: " + state);

    if (state == 0) {
        $(".info_labels_container").show();
        $(".bg_image").attr("src", "img/pile_tyndere_banktxt.png");
        $(".gui_container").hide();


    } else if (state == 1) {
        console.log("BGR IMG:" + jsonData.overlays[state - 1][0]);
        $(".bg_image").attr("src", jsonData.overlays[state - 1].overlaypics[runder[state]]);
        if (runder[state] < 1) {
            UserMsgBox_xclick("body", "<div class='col-xs-12'><img class='img-responsive msbox_pic' src='img/images_usmsgbx/konjunkturboelge_LAV.jpg'></div><div class='col-xs-12'><h3>Lavkonjunktur </h3><p class='lavkonjunktur_broedtxt'>Udsving i produktion, forbrug og beskæftigelse er normalt i en markedsøkonomi. Økonomisk vækst i højkonjunkturer afløses af krise og arbejdsløshed i lavkonjunkturer. En økonomisk krise i Danmark kan igangsættes af en global økonomisk krise. <br/>Undersøg i quizzen her, hvordan et fald i efterspørgslen i verdensøkonomien kan påvirke dansk økonomi.</p><span class='btn_closeUserMsgBox btn btn-primary'>Klar til quiz om lavkonjunktur?</span></div>");
            tekst_forklaring($(".lavkonjunktur_broedtxt"), jsonData.forklaringer)
            $(".CloseClass").click(function() {
                $(".forklaring").remove();
                microhint($(".gui_container"), "Besvar spørgsmålene i quizzen, og se hvordan pengestrømmene bevæger sig i en lavkonjunktur.");
            });
        }

        //$(".ekspert_labels_container").hide();
        //$(".bg_image").attr("src", "img/mockup02_infotab.gif");
        $(".gui_container").show();

    } else if (state == 2) {
        $(".bg_image").attr("src", jsonData.overlays[state - 1].overlaypics[runder[state]]);
        if (runder[state] < 1) {
            UserMsgBox_xclick("body", "<div class='col-xs-12'><img class='img-responsive msbox_pic' src='img/images_usmsgbx/konjunkturboelge_HOJ.jpg'></div><div class='col-xs-12'><h3>Højkonjunktur </h3><p class='hojkonjunktur_broedtxt'>Udsving i produktion, forbrug og beskæftigelse er normalt i en markedsøkonomi. Økonomisk vækst i højkonjunkturer afløses af krise og arbejdsløshed i lavkonjunkturer. En økonomisk krise i Danmark kan igangsættes af en global økonomisk krise. <br/>I quizzen kan du undersøge, hvordan en stigning i efterspørgslen i verdensøkonomien kan påvirke dansk økonomi.</p><span class='btn_closeUserMsgBox btn btn-primary'>Klar til quiz om højkonjunktur?</span></div>");
            tekst_forklaring($(".hojkonjunktur_broedtxt"), jsonData.forklaringer)
                //tekst_forklaring($('.broed_info_text'), jsonData.forklaringer);
            $(".CloseClass").click(function() {
                $(".forklaring").remove();
                microhint($(".gui_container"), "Besvar spørgsmålene i quizzen og se hvordan pengestrømmene bevæger sig i en højkonjunktur.");
            });
        }
        //$(".info_labels_container, .ekspert_labels_container").hide();
        //$(".bg_image").attr("src", "img/mockup02_infotab.gif");
        $(".gui_container").show();

        /*=============================================
        =            Her bliver fane 4 initialiseret (info labels skjules)            =
        =============================================*/

    // // UDKOMMENTERET AF THAN d. 06/12-2017
    // } else if (state == 3) {
    //     $(".info_labels_container").hide();
    //     // $(".ekspert_labels_container").show();  // Udkommenteret af THAN d. 06/12-2017. Dette element er ikke i DOM'en.
    //     // $(".bg_image").attr("src", "img/pile_tyndere_banktxt.png");
    //     $(".bg_image").attr("src", "img/images_usmsgbx/konjunkturboelge_FANE4_BG_stiltest.jpg");
    //     $(".gui_container").show();

    // }

    //==============================================================================
    //                  TILFØJET AF THAN d. 06-12-2017
    //==============================================================================
    } else if (state == 3) {  
        $(".bg_image").attr("src", jsonData.overlays[state - 1].overlaypics[runder[state]]);
        if (runder[state] < 1) {
            UserMsgBox_xclick("body", "<div class='col-xs-12'><img class='img-responsive msbox_pic' src='img/indgreb/fane4_politiskeindgreb.jpg'></div><div class='indgreb_broedtxt col-xs-12'><h3>Politiske indgreb i samfundsøkonomien</h3><p>Økonomisk politik omhandler forskellige måder, en regering forsøger at påvirke samfundsøkonomien på. Det vælger en regering ofte ud fra hvilke mål de prioriterer politisk og hvordan den økonomiske konjunktur er. Økonomisk politik er med andre ord forskellige midler til at nå nogle mål med. Her skal du undersøge finanspolitik og strukturpolitik.</p><p>Finanspolitik er betegnelsen for den økonomiske politik, der har til formål at påvirke efterspørgslen i samfundet ved at ændre på statens indtægter og udgifter. Statens indtægter stammer bl.a. fra skatter og afgifter, mens udgifterne går til offentlige investeringer og offentligt forbrug.</p><p>Ved at regulere på enten indtægterne eller udgifterne kan staten påvirke efterspørgslen ved at husholdninger og virksomheder får hhv. større eller mindre forbrugsmuligheder. Ved at påvirke forbrugsmulighederne kan staten dermed påvirke produktion (vækst), import/eksport (betalingsbalance), beskæftigelse og prisudvikling (inflation).</p><p>Finanspolitik vedtages hvert år via finansloven og gennem aftaler i løbet af finansåret. Når der føres strukturpolitik, er formålet, at staten, aktivt går ind og ændrer på samfundsøkonomiens struktur og opbygning. Strukturpolitik er en samlet betegnelse for politikker, der er med til at understøtte formålet, nemlig: Erhvervspolitik, skattepolitik, uddannelses- og forskningspolitik samt arbejdsmarkedspolitik.</p><p>I quizzen skal du undersøge hvilke politiske indgreb en klassisk henholdsvis borgerligt ledet regering og en klassisk socialdemokratisk ledet regering ville vælge i forskellige konjunktursituationer.</p><span class='btn_closeUserMsgBox btn btn-primary'>Klar til quiz om politiske indgreb?</span></div>");
            tekst_forklaring($(".indgreb_broedtxt"), jsonData.forklaringer);      // <-----------  "Ordbog"/wiki fra shared_functions.js
                //tekst_forklaring($('.broed_info_text'), jsonData.forklaringer);
            $(".CloseClass").click(function() {
                $(".forklaring").remove();
                microhint($(".gui_container"), "Hvilket indgreb vil regeringen benytte sig af?");  // Tilføjet af THAN d. 07-12-2017 - Tekst fra TLY mangler.
            });
        }
        //$(".info_labels_container, .ekspert_labels_container").hide();
        //$(".bg_image").attr("src", "img/mockup02_infotab.gif");
        $(".gui_container").show();
    }

    /*=====  End of Section comment block  ======*/

    //
}

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


/*----------  vis information:   ----------*/

function show_info(indeks) {

    $(".microhint").remove();
    console.log("I: " + indeks);
    //$(".container-fluid").append("<div class='info_container'><div class='info_box'><h4>" + jsonData.elementer[indeks].element + "</h4><img class='infopic' src='" + jsonData.elementer[indeks].pic + "'><p>" + jsonData.elementer[indeks].infotekst + "</p></div></div>")
    if (state == 0) {
        UserMsgBox_xclick("body", "<div class='col-xs-12'><img class='img-responsive msbox_pic' src='" + jsonData.labels[indeks].infopic + "'></div><div class='col-xs-12'><h3>" + jsonData.labels[indeks].element + "</h3><p class='broed_info_text'>" + jsonData.labels[indeks].infotekst + "</p></div>");
        //UserMsgBox("body", "<h3>" + jsonData.labels[indeks].element + "</h3><div class='col-xs-8'><img class='img-responsive' src='" + jsonData.labels[indeks].infopic + "'><p></div><div class='col-xs-4>'" + jsonData.labels[indeks].infotekst + "</p></div>");
        tekst_forklaring($('.broed_info_text'), jsonData.forklaringer);
    } else if (state == 1) {

        var konj_indeks = $(".balance_detalje_label").eq(indeks).attr("class").split(' ')[6];
        konj_indeks = konj_indeks.substring(4, 5);

        if ($(".balance_detalje_label").eq(indeks).hasClass("gen_label")) {
            //alert("indeks: " + indeks);
            UserMsgBox_xclick("body", "<div class='col-xs-12'><img class='img-responsive msbox_pic' src='" + jsonData.labels[konj_indeks].infopic + "'></div><div class='col-xs-12'><h3>" + jsonData.labels[konj_indeks].element + "</h3><p class='broed_info_text'>" + jsonData.labels[konj_indeks].infotekst + "</p></div>");
            tekst_forklaring($('.broed_info_text'), jsonData.forklaringer);
        } else {
            //alert("NO GEN LEBALE");
            if (konj_indeks == 0) {
                microhint($(".balance_detalje_label").eq(indeks), jsonData.balance_spm[konj_indeks].spm);
            } else {
                microhint($(".balance_detalje_label").eq(indeks), jsonData.balance_spm[konj_indeks - 1].feedback_true);
            }
        }


        //UserMsgBox_xclick("body", "<div class='col-xs-12'><img class='img-responsive msbox_pic' src='" + jsonData.labels[indeks].infopic + "'></div><div class='col-xs-12'><h3>" + jsonData.labels[indeks].element + "</h3><p class='broed_info_text'>" + jsonData.labels[indeks].infotekst + "</p></div>");
    } else if (state == 2) {
        var konj_indeks = $(".balance_detalje_label").eq(indeks).attr("class").split(' ')[6];
        konj_indeks = konj_indeks.substring(4, 5);

        if ($(".balance_detalje_label").eq(indeks).hasClass("gen_label")) {
            //alert("indeks: " + indeks);
            UserMsgBox_xclick("body", "<div class='col-xs-12'><img class='img-responsive msbox_pic' src='" + jsonData.labels[konj_indeks].infopic + "'></div><div class='col-xs-12'><h3>" + jsonData.labels[konj_indeks].element + "</h3><p class='broed_info_text'>" + jsonData.labels[konj_indeks].infotekst + "</p></div>");
            tekst_forklaring($('.broed_info_text'), jsonData.forklaringer);
        } else {
            //alert("NO GEN LEBALE");
            if (konj_indeks == 0) {
                microhint($(".balance_detalje_label").eq(indeks), jsonData.ubalance_spm[konj_indeks].spm);
            } else {
                microhint($(".balance_detalje_label").eq(indeks), jsonData.ubalance_spm[konj_indeks - 1].feedback);
            }
        }

    //==============================================================================
    //                  TILFØJET AF THAN d. 06-12-2017
    //==============================================================================
    } else if (state == 3) {  // TILFØJET AF THAN d. 06-12-2017
        var konj_indeks = $(".balance_detalje_label").eq(indeks).attr("class").split(' ')[6];
        konj_indeks = konj_indeks.substring(4, 5);

        if ($(".balance_detalje_label").eq(indeks).hasClass("gen_label")) {
            //alert("indeks: " + indeks);
            UserMsgBox_xclick("body", "<div class='col-xs-12'><img class='img-responsive msbox_pic' src='" + jsonData.labels[konj_indeks].infopic + "'></div><div class='col-xs-12'><h3>" + jsonData.labels[konj_indeks].element + "</h3><p class='broed_info_text'>" + jsonData.labels[konj_indeks].infotekst + "</p></div>");
            tekst_forklaring($('.broed_info_text'), jsonData.forklaringer);
        } else {
            //alert("NO GEN LEBALE");
            if (konj_indeks == 0) {
                microhint($(".balance_detalje_label").eq(indeks), jsonData.indgreb_spm[konj_indeks].spm);
            } else {
                microhint($(".balance_detalje_label").eq(indeks), jsonData.indgreb_spm[konj_indeks - 1].feedback);
            }
        }

    }

    //viewArray[state].addClass("blur");
    $(".CloseClass").click(function() {
        $(".forklaring").remove();
    });

}



/*----------  Kør spørgsmål  ----------*/

function poseQuestion() {

    if (state == 1 || state == 2) {  // Tilføjet af THAN d. 07/12-2017 - Ændring af timers i fane 4 ift de øvrige faner efter TLYs ønske - se linje 510.
        setTimeout(function() {
            console.log('poseQuestion - setTimeout 1');
            // if (state == 1 || state == 2) {              // Udkommenteret af THAN d. 07/12-2017
                $(".gui_container").fadeIn(1500);
            // }
        }, 3000);
    }

    if (state == 3) {       // Tilføjet af THAN d. 07/12-2017 - Ændring af timers i fane 4 ift de øvrige faner efter TLYs ønske - se linje 510.
        // setTimeout(function() {
            console.log('poseQuestion - setTimeout 2');
            $(".gui_container").fadeIn(1500);
        // }, 3000);
    }


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

    // if (state != 0 && state != 3) {  // Udkommenteret af THAN d. 06/12-2017
    if (state != 0 && state != 4) {  // Tiføjet af THAN d. 06/12-2017


        $(".spm_numbers").show();

        if (runder[state] < spmData.length) { 

            $(".spm_numbers").html("Spørgsmål " + (runder[state] + 1) + " / " + spmData.length);

            $('.caseText').remove();  // Tilføjet af THAN d. 06-12-2017: Fjern div-tag'et "caseText" i tilfældet for lav- og høj-konjuktur.
            if (typeof(spmData[runder[state]].caseText)!=='undefined') { // Tilføjet af THAN d. 06-12-2017: FR vil have noget case tekst ind i objektet: der tilføjes her et div-tag med klassen "caseText" hvis "caseText" eksistere i JSON-data
                console.log('poseQuestion - "caseText" defined!');
                $(".spm_numbers").after('<div class="caseText">'+spmData[runder[state]].caseText+'</div>');
            }

            $(".spm").html(spmData[runder[state]].spm);

            svar_Array = [];  // <------ THAN d. 06-12-2017: Konventionen er at de forkerte svar kommer ind i svar_Array først (i den rækkefølge de er i JSON), og det rigtige svar kommer ind til sidst.
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

            $('.caseText').remove(); // Tilføjet af THAN d. 07-12-2017: Fjern caseText hvis state == 3 / fane 4

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
            microhint($("body"), "Klik på de forskellige enheder og pile for at undersøge det økonomiske kredsløb");
        } else if (state == 3) {
            $(".spm").html("Her skal du arbejde med fane 4 (Steens quiz)");
        }
        $(".svar").html("");
        $(".btn_tjek").hide();
    }
    $(".radioWrap").shuffle_div_position();
}

/*----------  Tjek svar  ----------*/


function tjek_svar() {

    $(".microhint").remove();
    var checked = $('input[name=radioName]:checked').val();
    var svar = svar_Array[checked];
    console.log("checked: " + checked);
    if (typeof(checked) != "undefined") {
        console.log('tjek_svar - svar_Array: ' + JSON.stringify(svar_Array) + ', checked: ' + checked);
        if (korrekt_svar == svar) {
            console.log("KORREKT")

            feedback(true, checked);

        } else {
            console.log("FORKERT!");
            feedback(false, checked);
        }
    } else {
        microhint($(".gui_container"), "Vælg et svar fra mulighederne herover. Klik derefter på 'Tjek svar'")
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

        if (state == 1 || state == 2) {  // Tilføjet af THAN d. 07-12-2017 - Ændring af timers i fane 4 ift de øvrige faner efter TLYs ønske - se linje 350.
            setTimeout(function() {
                console.log('visuel_feedback - setTimeout');

                $(".bg_image").attr("src", jsonData.overlays[state - 1].overlaypics[runder[state]]);

                poseQuestion();
            }, 1000);
        }

        if (state == 3) {               // Tilføjet af THAN d. 07-12-2017 - Ændring af timers i fane 4 ift de øvrige faner efter TLYs ønske - se linje 350.
            // setTimeout(function() {
                console.log('visuel_feedback - setTimeout');

                $(".bg_image").attr("src", jsonData.overlays[state - 1].overlaypics[runder[state]]);

                poseQuestion();
            // }, 1000);
        }

        //console.log("OL_length: " + $(".ubalance_overlay").length);

        $(".balance_overlay").eq(0).fadeOut(0);
        $(".balance_overlay").eq(1).fadeOut(3000);


        $(".balance_overlay").eq(0).fadeIn(3000, function() {
            $(".balance_overlay").eq(1).remove();

            console.log($(".lav_container").find(".img_overlay").length);


            console.log("State: " + state);
            console.log("IF!");
        });

        $(".ubalance_overlay").eq(1).fadeIn(1500);


    }
}


/*----------  feedback - 1 skridt bring skridt 2 op ved click  ----------*/


function feedback(svar, checked) {
    $(".feedback_container").show();
    /* Hvis vi er i balance mode */

    console.log("BAL: " + jsonData.balance_spm.length + ", U_BAL: " + jsonData.ubalance_spm.length);

    if (state == 1) {
        // alert("state: " + state);
        if (svar == true) {
            $(".feedback_container").html("<h4><span class='label label-success'>Korrekt</span></h4><p class='feedback_txt'>" + jsonData.balance_spm[runder[state]].feedback_true + "</p><div class='btn btn-xs btn-primary ok_btn'>Fortsæt</div>");
            $(".btn_tjek").hide();
        } else {

            $(".feedback_container").html("<h4><span class='label label-danger'>Forkert - prøv igen</span></h4><p class='feedback_txt'>" + jsonData.balance_spm[runder[state]].feedback_true + "</p>");



        }
        /* Hvis vi er i ubalance mode */
    } else if (state == 2) {
        if (svar == true) {
            $(".feedback_container").html("<h4><span class='label label-success'>Korrekt</span></h4><p class='feedback_txt'>" + jsonData.ubalance_spm[runder[state]].feedback + "</p><div class='btn btn-xs btn-primary ok_btn'>Fortsæt</div>");
            $(".btn_tjek").hide();
        } else {
            //alert(jsonData.ubalance_spm[runder[state]].feedback);
            $(".feedback_container").html("<h4><span class='label label-danger'>Forkert - prøv igen</span></h4><p class='feedback_txt'>" + jsonData.ubalance_spm[runder[state]].feedback + "</p>");
        }

        //================================================================
        //                  Tilføjet af THAN d. 06/12-2017
        //================================================================
    } else if (state == 3) {
        if (svar == true) {
            $(".feedback_container").html("<h4><span class='label label-success'>Korrekt</span></h4><p class='feedback_txt'>" + jsonData.indgreb_spm[runder[state]].feedback + "</p><div class='btn btn-xs btn-primary ok_btn'>Fortsæt</div>");
            $(".btn_tjek").hide();
        } else {
            //alert(jsonData.ubalance_spm[runder[state]].feedback);
            // $(".feedback_container").html("<h4><span class='label label-danger'>Forkert - prøv igen</span></h4><p class='feedback_txt'>" + jsonData.indgreb_spm[runder[state]].feedback + "</p>");
            $(".feedback_container").html("<h4><span class='label label-danger'>Forkert - prøv igen</span></h4><p class='feedback_txt'>" + jsonData.indgreb_spm[runder[state]].feedback_false[checked] + "</p>");  // <---- Dette giver mulighed for at give induviduel feedback på forkerte svar på denne opgave efter ønske fra Steen.
        }
    }

    $(".ok_btn").click(function() {

        if (svar == true) {
            console.log("ok BTN - TRUE");
            visuel_feedback();

        }
        $(".microhint").remove();
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
        //$(".hoj_container").html('<img class="img_overlay img-responsive ubalance_overlay" src="img/Ubalance01.png" />');

    } else if (state == 3) { // Tilføjet af THAN d. 07-12-2017 - for at fixe bug på billedet der ellers ville være hvis man genstarter quizzen igen i state == 3.
        $(".bg_image").attr("src", jsonData.overlays[state - 1].overlaypics[runder[state]]);
    }
}
