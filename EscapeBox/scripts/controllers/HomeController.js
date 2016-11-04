    (function(){

     var client;

     angular.module('app')
     .controller('homeController', homeController);

     homeController.$inject = ['$scope','$interval'];

     function homeController($scope,$interval) {
       $scope.format = 'mm:ss';
       var timer1 = 3600;

       function formatNumber(n) {return (n<10? '0' : '') + n;}
       client = mows.createClient('ws://192.168.0.100:9001/mqtt')
       client && client.subscribe('t_sub');

       client.on('message', function (topic, message) {
         console.log(message);
         $scope.message = message;
       });

       $scope.shuffle = function(cod) {
        client && client.publish('t_sub', String(cod));
      }

      $scope.tocarSirene = function () {
        $scope.audioSirene.setVolume(0.2);
        $scope.audioSirene.playPause();
      };
      $scope.tocarObjetos = function () {
        $scope.audioObjetos.setVolume(1);
        $scope.audioObjetos.playPause();
      };
      $scope.tocarDescarga = function () {
        $scope.audioDescarga.setVolume(0.2);
        $scope.audioDescarga.playPause();
      };
      $scope.tocarDisjuntor = function () {
        $scope.audioDisjuntor.setVolume(0.2);
        $scope.audioDisjuntor.playPause();
      };


      $scope.minuto = formatNumber(Math.floor(timer1 / 60));
      $scope.segundo = formatNumber(timer1%60);
      $scope.message = 'Home Controller';

      $scope.imprimir = function(arg){
        console.log("ola");
      }


      var stop;
      $scope.startTimer = function() {
              // Don't start a new fight if we are already fighting
              if ( angular.isDefined(stop) ) return;
              
              stop = $interval(function() {
                if (timer1 > 0 ) {
                  timer1 = timer1- 1;
                  $scope.minuto = formatNumber(Math.floor(timer1 / 60));
                  $scope.segundo = formatNumber(timer1%60);
                } else {
                  $scope.stopTimer();
                }
              }, 1000,0);
            };

            $scope.stopTimer = function() {
              if (angular.isDefined(stop)) {
                $interval.cancel(stop);
                stop = undefined;
              }
            };

            $scope.resetTimer = function() {
              $scope.stopTimer();
              timer1 = 3600;
              $scope.minuto = formatNumber(Math.floor(timer1 / 60));
              $scope.segundo = formatNumber(timer1%60);
            };

            $scope.$on('$destroy', function() {
              // Make sure that the interval is destroyed too
              $scope.stopTimer();
            });

           //$scope.sound = ngAudio.load("sounds/sirene.mp3"); // returns NgAudioObject



           $scope.dicas = [{"id":"1","texto":"Dica do Armário"},
           {"id":"2","texto":"Dica do Feijão"},
           {"id":"3","texto":"Dica do Alface"},
           {"id":"4","texto":"Dica do Renatão"},
           {"id":"5","texto":"Dica do Dix"}];
           $scope.alertas = [{"id":"1","texto":"Não é necessário subir nos móveis"},
           {"id":"2","texto":"Não é necessário forçar nenhum objeto"}];

           $scope.acionamentos = [{"id":"1","texto":"Passagem Secreta"},
           {"id":"2","texto":"Giroflex"},
           {"id":"3","texto":"Luz Cela"},
           {"id":"4","texto":"Porta Saída"}];
           $scope.efeitos = [{"id":"1","texto":"Descarga"},
           {"id":"2","texto":"Disjuntor"}];

           $scope.funcao1 = function(dica){
             client && client.publish('t_sub', String(dica.texto));
             $scope.message = dica.id;
             console.log(dica.id);
           };
           $scope.startJogo = function() {
            $scope.startTimer();
            client && client.publish('topicoPrincipal', String('01'));
          };

          $scope.resetarJogo = function() {
            $scope.resetTimer();
            client && client.publish('topicoPrincipal', String('00'));
          };

          $scope.comandoPassagem = function(cod) {
            var msg = '1' + cod; 
            client && client.publish('topicoPrincipal', String(msg));
            $scope.message = cod;
          };

          $scope.comandoSaida = function(cod) {
            var msg = '2' + cod;
            client && client.publish('topicoPrincipal', String(msg));
            $scope.message = cod;
          };

          $scope.comandoGiroflex= function(cod) {
            var msg = '3' + cod;
            client && client.publish('topicoPrincipal', String(msg));
            $scope.message = cod;
          };

          $scope.comandoLuzCela = function(cod) {
            var msg = '4' + cod;
            client && client.publish('topicoPrincipal', String(msg));
            $scope.message = cod;
          };

        }
      })();