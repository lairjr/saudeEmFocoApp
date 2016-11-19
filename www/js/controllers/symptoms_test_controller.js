angular.module('starter.controllers')
.controller('SymptomsTestCtrl', function($scope, $stateParams, $state, $ionicModal, testeSintomasService) {
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

  $scope.slideIndex = 0;

  $scope.changeView = function(index) {
    $scope.slideIndex = index;
  };

  $scope.limparCampos = function(perguntas){
    perguntas[0].label="Sem febre";
    perguntas[1].label="Sem dor";
    perguntas[3].label="Sem dor";
    perguntas[2].label="Sem inchaço";
    for(var i=4;i<13;i++){
      perguntas[i].label=false;
    }
  };

  $scope.teste = function(perguntas) {
    $scope.doencas="";
    var result_teste=testeSintomasService.teste_sintomas(perguntas);
    //aqui serve para retornar quais doenças são as mais prováveis e mandar isso pra view
    for(var i=0;i<result_teste.length;i++){
      if(result_teste.length==1) $scope.doencas+=result_teste[i].nome+",";
      else if(result_teste.length>1 && i<result_teste.length-1)$scope.doencas+=result_teste[i].nome+" e da ";
      else if(result_teste.length>1 && i==result_teste.length-1)$scope.doencas+=result_teste[i].nome+",";
    }

    var state = getResultState(result_teste);
    $state.go(state, { diseases: $scope.doencas });
  };

  var FEW_SYMPTOMS_TEMPLATE = 'has_few_symptoms';
  var SOME_SYMPTOMS_TEMPLATE = 'has_some_symptoms';
  var SYMPTOMS_TEMPLATE = 'has_symptoms';

  function getResultState(testResult) {
    if (testResult[0].Valor < 3) {
      return FEW_SYMPTOMS_TEMPLATE;
    }
    else if (testResult[0].Valor <= 5) {
      return SOME_SYMPTOMS_TEMPLATE;
    }
    return SYMPTOMS_TEMPLATE;
  };
});
