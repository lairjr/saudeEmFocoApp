angular.module('starter.controllers')
.controller('SymptomsTestCtrl', function($scope, $stateParams, $state, testeSintomasService) {
  $scope.perguntas = [
    { pergunta: 'Febre', label: "Sem febre"},
    { pergunta: 'Dor articular', label:"Sem dor"},
    { pergunta: 'Inchaço articular', label:"Sem inchaço"},
    { pergunta: 'Dor muscular', label:"Sem dor"},
    { pergunta: 'Dor de cabeça', label:false},
    { pergunta: 'Manchas vermelhas no corpo', label:false},
    { pergunta: 'Cansaço', label:false},
    { pergunta: 'Dor atrás dos olhos', label:false},
    { pergunta: 'Glânglios linfáticos aumentados', label:false},
    { pergunta: 'Conjuntivite',  label:false},
    { pergunta: 'Fotofobia',  label:false},
    { pergunta: 'Sangramento', label:false},
    { pergunta: 'Vômito', label:false}
    ];

    $scope.slideIndex=0;

    $scope.changeView = function(index) {
      $scope.slideIndex = index;
    };

    $scope.limparCampos=function(perguntas){
      perguntas[0].label="Sem febre";
      perguntas[1].label="Sem dor";
      perguntas[3].label="Sem dor";
      perguntas[2].label="Sem inchaço";
      for(var i=4;i<13;i++){
        perguntas[i].label=false;
      }

    };
});
