//https://codepen.io/nfj525/pen/rVBaab

//TODO: group spectrum bands exponentially (use unity for refrence)
//TODO: get spectrum data 2 seconds in advance

//TODO: if (band>threshold){ spawnlaser() }
//TODO: laserMovement
//TODO: import laserSpawnAlgorithm
//TODO: mouse input rotate player
//TODO: laser collision
//TODO: difficulty slider/setting
//TODO: scoring

//TODO: sort/seporate code into diffrent files
//TODO: add some logos and credits

//TODO: hide the lavender easter egg somehow
//TODO: detect the lavender easter egg somehow

//TODO: user login/password
//TODO: rank user by score








window.onload = function() {

    //refrence html
    var file = document.getElementById("thefile");
    var audio = document.getElementById("audio");
    
    file.onchange = function() {

        //get the files
        var files = this.files;
        audio.src = URL.createObjectURL(files[0]);

        //play the audio
        audio.load();
        audio.play();

        //???
        var context = new AudioContext();
        var src = context.createMediaElementSource(audio);
        var analyser = context.createAnalyser();

        //set up canvas
        var canvas = document.getElementById("canvas");
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        var ctx = canvas.getContext("2d");

        //???
        src.connect(analyser);
        analyser.connect(context.destination);

        //???
        analyser.fftSize = 256;

        //sample size?
        var bufferLength = analyser.frequencyBinCount;
        console.log(bufferLength);

        var dataArray = new Uint8Array(bufferLength);

        var WIDTH = canvas.width;
        var HEIGHT = canvas.height;

        //rectangle dimentions
        var barWidth = (WIDTH / bufferLength) * 2.5;
        var barHeight;
        var x = 0;

      function renderFrame() {
        requestAnimationFrame(renderFrame);
  
        x = 0;
  
        analyser.getByteFrequencyData(dataArray);
  
        //black out canvas
        ctx.fillStyle = "#000";
        ctx.fillRect(0, 0, WIDTH, HEIGHT);
  
        for (var i = 0; i < bufferLength; i++) {

          barHeight = dataArray[i];
          
          //set colors
          var r = barHeight + (25 * (i/bufferLength));
          var g = 250 * (i/bufferLength);
          var b = 50;
  
          //draw rectangles
          ctx.fillStyle = "rgb(" + r + "," + g + "," + b + ")";
          ctx.fillRect(x, HEIGHT - barHeight, barWidth, barHeight);
  
          x += barWidth + 1;
        }
      }
  
      audio.play();
      renderFrame();
    };
};