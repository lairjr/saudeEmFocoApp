angular.module('starter.services').service('testeSintomasService', function () {
  var maior=[];

  this.dengue = [
    { sintoma: 'Acima de 39 graus'},
    { sintoma: 'Dor de cabeça'},
    { sintoma: 'Manchas vermelhas no corpo'},
    { sintoma: 'Dor articular moderada'},
    { sintoma: 'Dor muscular intensa'},
    { sintoma: 'Dor atrás dos olhos'},
    { sintoma: 'Cansaço'},
    { sintoma: 'Sangramento'},
    { sintoma: 'Vômito'},
    { sintoma: 'Inchaço moderado'},
    { sintoma: 'Glânglios linfáticos aumentados'}
    ];





   this.zika = [
    { sintoma: 'Abaixo de 39 graus'},
    { sintoma: 'Dor de cabeça'},
    { sintoma: 'Manchas vermelhas no corpo'},
    { sintoma: 'Dor articular moderada'},
    { sintoma: 'Dor muscular moderada'},
    { sintoma: 'Cansaço'},
    { sintoma: 'Conjuntivite'},
    { sintoma: 'Fotofobia'},
    { sintoma: 'Vômito'},
    { sintoma: 'Inchaço moderado'},
    { sintoma: 'Glânglios linfáticos aumentados'}
      ];






      this.chikungunya = [
    { sintoma: 'Acima de 39 graus'},
    { sintoma: 'Dor de cabeça'},
    { sintoma: 'Manchas vermelhas no corpo'},
    { sintoma: 'Dor articular intensa'},
    { sintoma: 'Dor muscular moderada'},
    { sintoma: 'Conjuntivite'},
    { sintoma: 'Inchaço severo'},
    { sintoma: 'Glânglios linfáticos aumentados'}
      ];

  var cont_dengue=0;
  var cont_zika=0;
  var cont_chiku=0;

  this.verifica_sintomas=function(pergunta){

    if(pergunta=='Dor articular intensa' || pergunta=='Inchaço severo' || pergunta=='Dor articular moderada' )cont_dengue++;
    for(var i=0; i<this.dengue.length;i++){

      if(this.dengue[i].sintoma==pergunta){
       if(pergunta=='Acima de 39 graus'|| pergunta=='Dor muscular intensa')       //principal sintoma tem peso maior
        cont_dengue=cont_dengue+2;
       else
        cont_dengue++;
    }}


    if(pergunta=='Dor articular intensa' || pergunta=='Inchaço severo' || pergunta=='Dor muscular intensa')cont_zika++;
    for(var a=0; a<this.zika.length;a++){

      if(this.zika[a].sintoma==pergunta)  {
        if(pergunta=='Manchas vermelhas no corpo')     //principal sintoma tem peso maior
          cont_zika=cont_zika+2;
      else
        cont_zika++;
    }}


    if(pergunta=='Dor muscular intensa' || pergunta=='Inchaço moderado' || pergunta=='Dor articular moderada')cont_chiku++;
    for(var b=0; b<this.chikungunya.length;b++){
      if(this.chikungunya[b].sintoma==pergunta)  {
         if(pergunta=='Acima de 39 graus'|| pergunta=='Dor articular intensa')    //principal sintoma tem peso maior
          cont_chiku=cont_chiku+2;
         else
          cont_chiku++;
    }}



   // console.log('Dengue:'+ cont_dengue);
   // console.log('Zika:' +cont_zika);
   // console.log('Chicungunya:' +cont_chiku);


  }


  this.doencas_provaveis=function(){
    var dengue={
    'nome':'dengue',
    'Valor':cont_dengue
    }
    var zika={
    'nome':'zika',
    'Valor':cont_zika
    }
    var chikungunya={
    'nome':'chikungunya',
    'Valor':cont_chiku
    }

    if(cont_dengue>cont_chiku&&cont_dengue>cont_zika)
     maior.push(dengue);

    else if(cont_dengue==cont_chiku&&cont_dengue>cont_zika){
      maior.push(dengue);
      maior.push(chikungunya);
    }
    else if(cont_dengue>cont_chiku&&cont_dengue==cont_zika){
      maior.push(dengue);
      maior.push(zika);
    }
    ////////////
    else if(cont_chiku>cont_dengue &&cont_chiku>cont_zika)
      maior.push(chikungunya);

    else if(cont_chiku==cont_dengue &&cont_chiku>cont_zika){
      maior.push(chikungunya);
      maior.push(dengue);
    }
    else if(cont_chiku>cont_dengue &&cont_chiku==cont_zika){
      maior.push(chikungunya);
      maior.push(zika);
    }
      //////////

    else if(cont_zika>cont_chiku&&cont_zika>cont_dengue)
      maior.push(zika);

    else if(cont_zika==cont_chiku&&cont_zika>cont_dengue){
      maior.push(zika);
      maior.push(chikungunya);
    }
    else if(cont_zika>cont_chiku&&cont_zika==cont_dengue){
      maior.push(zika);
      maior.push(dengue);
    }
    else if(cont_zika==cont_chiku&&cont_zika==cont_dengue){
      maior.push(zika);
      maior.push(dengue);
      maior.push(chikungunya);
    }
    }




  // An alert dialog
  this.teste_sintomas = function(perguntas){
    maior=[];
    cont_dengue=0;
    cont_zika=0;
    cont_chiku=0;

    for (var i=0; i < perguntas.length; i++) {
      if(perguntas[i].label!=false){
       if(perguntas[i].pergunta=="Febre"||perguntas[i].pergunta=="Dor articular"||perguntas[i].pergunta=="Dor muscular"||perguntas[i].pergunta=="Inchaço articular"){
         this.verifica_sintomas(perguntas[i].label);
       }
      else
        this.verifica_sintomas(perguntas[i].pergunta);
      }
    }
   this.doencas_provaveis();          //retorna as doenças com maior contador
   return maior;
  }
});
