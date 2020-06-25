// Griglia 6x6, ad ogni click parte una richiesta AJAX che prende un numero random da 1 a 9.
// Se è <= 5 il quadrato diventa giallo, se è > di 5 il quadrato diventa verde.
// Il numero ottenuto appare al centro del quadrato 
$(document).ready(function() {

// utilizzo handlebars per inserire i quadrati
  var source = $('#entry-template').html();
  var templateFunction = Handlebars.compile(source);


  var boxQuadratino = {
      'classe': 'quadratino'
  }

  var outputHtml = templateFunction(boxQuadratino);
  // creo i 36 quadratini
  for (var i = 0; i < 36; i++) {
      // appendo 36 quadratini tutti uguali
      $('.griglia').append(outputHtml);
  }

// al click sul quadratino
  $('.quadratino').click(function() {

    // creo un variabile come riferimento
    var quadratinoCliccato = $(this);

    // ad ogni click parte una richiesta per generare un numero random
    $.ajax({
      url: 'https://flynn.boolean.careers/exercises/api/random/int',
      method: 'GET',
      success: function (data) {
        var numero = data.response;
        console.log(numero);
        // se il numero e uguale o inferiore a 5 aggiungo classe 'giallo'
        if (numero <= 5) {
          $(quadratinoCliccato).addClass('giallo');
          $(quadratinoCliccato).removeClass('verde');

        }
        else {
          // altrimenti aggiungo classe verde
          $(quadratinoCliccato).addClass('verde');
          $(quadratinoCliccato).removeClass('giallo');
        }
        // vado ad aggiungere il numero al quadratino
        $(quadratinoCliccato).text(numero);

      },
        // in caso di errore
      error:(function() {
        alert("e avvenuto un errore " + errori);
      })

    })
  });



});
