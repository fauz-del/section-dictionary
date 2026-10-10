const canvas = document.getElementById("pondCanvas");
const ctx = canvas.getContext("2d");

let rippleParticles = [];

function resize() {
  const dpr = window.devicePixelRatio || 1;
  canvas.width = window.innerWidth * dpr;
  canvas.height = window.innerHeight * dpr;
  canvas.style.width = window.innerWidth + "px";
  canvas.style.height = window.innerHeight + "px";
  ctx.setTransform(1, 0, 0, 1, 0, 0);
  ctx.scale(dpr, dpr);
}

window.addEventListener("resize", resize);
resize();

// --- Ripple Particle System ---
class Ripple {
  constructor(x, y, color) {
    this.x = x;
    this.y = y;
    this.radius = 2;
    this.maxRadius = 45 + Math.random() * 20;
    this.alpha = 0.4;
    this.speed = 0.7;
    this.color = color;
  }

  update() {
    this.radius += this.speed;
    this.alpha -= 0.008;
  }

  draw() {
    ctx.save();
    ctx.beginPath();
    ctx.ellipse(this.x, this.y, this.radius, this.radius * 0.65, 0, 0, Math.PI * 2);
    ctx.strokeStyle = this.color.replace(')', `, ${this.alpha})`).replace('rgb', 'rgba');
    ctx.lineWidth = 1.2;
    ctx.stroke();
    ctx.restore();
  }
}

class Koi {
  constructor(sprite, baseColor, rippleColor, angle, speed) {
    this.sprite = sprite;
    this.color = baseColor;
    this.rippleColor = rippleColor;
    this.angle = angle;
    this.speed = speed;
    this.rippleTimer = 0;
  }

  draw(cx, cy, radius) {
    this.angle += this.speed;

    // Head position tracking for ripple generation
    let headX = cx + Math.cos(this.angle) * radius;
    let headY = cy + Math.sin(this.angle) * radius * 0.65;

    this.rippleTimer++;
    if (this.rippleTimer % 18 === 0) {
      rippleParticles.push(new Ripple(headX, headY, this.rippleColor));
    }

    ctx.font = '6px "JetBrains Mono", monospace';
    ctx.fillStyle = this.color;

    // --- Dynamic Curvature Engine ---
    // Instead of drawing the whole row flat, map every row index to a path angle position offset
    let rowSpacingAngle = 0.011; // Controls how tightly the fish bends along the arc
    let charSpacingX = 3.4;     // Width spacing between individual characters
    let height = this.sprite.length;

    this.sprite.forEach((row, i) => {
      // Calculate the specific slice of the circle this row sits on
      // Subtracting height/2 handles head-to-tail path mapping along the circle
      let segmentAngle = this.angle + (i - height / 2) * rowSpacingAngle;

      // Map the 3D-squashed core center coordinate for this individual row
      let rowX = cx + Math.cos(segmentAngle) * radius;
      let rowY = cy + Math.sin(segmentAngle) * radius * 0.65;

      ctx.save();
      ctx.translate(rowX, rowY);
      
      // Rotate this row dynamically to match the local tangent curve of the ring
      ctx.rotate(segmentAngle);

      // Draw the character row horizontally centered across the arched path segment
      let rowWidthOffset = -(row.length * charSpacingX) / 2;
      
      // To keep columns aligned, we loop over characters individually
      for (let j = 0; j < row.length; j++) {
        let char = row[j];
        if (char !== " ") {
          ctx.fillText(char, rowWidthOffset + (j * charSpacingX), 0);
        }
      }

      ctx.restore();
    });
  }
}

// --- Your Original Text Assets ---
const KOI_SPRITE_ONE = [
  "                  -#:", "                 ==-#", "         =+**:=+=", "       *=***+#-::++=", 
  "     -=*+**===+=:++=", "   ---*+-*+=-#*#--", "  *#=#*:=*+_*_+**", "  *#_==_**_*_+_+=", 
  "  ++*==#_==++%_=", "   **=+#==#_+", "    -==**=*_-+", "    =+*+_*_=_", 
  "     -#=+==*=##:", "       ++*_++_#:", "       ==+*_", "        ++_+", 
  "        -**_", "         @##=+", "        =@@@%++", "        :%@@@@=:", 
  "        @@@@%%:", "        :@@#@@@@@:", "        +**:@@#@@@@@@:", "         ++*@@@=@@@@%+++", 
  "           ==*@*= -@@@@@@=*=", "            +- %*%+@@@@@@@*=:", "            :@#==@@@@@@#", "           +*@*+*= @@@@@@@@", 
  "            @@#**@@@@@@@@#", "       *@@#-*@@@@@@# .-++_", "   _#@@@++--@@@@@. .=+.", "  =%+*= @@*= +@@@@@. . +=", 
  "  *+: @@@@=-@@@%=", "  - #@ @%+= @@@@#* . +==+", "  @@@@@@%-@@@@@:-#", "   +==@@@@@%@@@@@@@-:", 
  "    -+#@@@%@#%**@@@@*+", "     **@@@@@@#@#@ @=== -+= +==_", "      #**%@@+@@@@#=- -++= --", "     +@%+=@@*%@@@#+++* . ==+++", 
  "    *@@@@*% %@@%**++*++*#:=+:", "    -#@@@@@@@@@= ---- +++===", "   +-:@ @@@@@@@*_= +*=*+= _", "  ;:--%@@@@@@**", 
  "       =@@@=", "  * %_ ._ * =:"
];

const KOI_SPRITE_TWO = [
  "                                 --", "                                ==", "                               -+**++-=", 
  "                         -*@@@@@=:.--", "                   *@@@@@=--=@ @.:*+", "                 #@@#+.*@@@@%--**", 
  "                -@@**-.+@@@@#*=-", "               -%@%--+. =%@@@%*", "      -=+==%%**%#@%@@@ ...=:+ ... -=#%:", 
  "    =%#+%*#%#*-%#%@#@- ... . : .... -%-", "   =+#%+% %#**-#%*%#@*-:=@+:. - =##*%=", "  ####%=%#*+%*+%*+%@+-:.+. ... ==--@@", 
  " %@@@%##%**+-*@+** .... +* .... @####", "   -=+***+. -@=:.+*%- ...... =+%****=", "            #:%=%@= ...... --==**#@=+-#-#", 
  "            #:.-#%@@- ..... =:.%=%**=-==*#*", "          +@******#@@%*%#%* ... -=*#%*#*==", "        +@@*%*#+==#@@@@@@#+ .... *%*=#@++*+@", "       *@@**+-++**@@@@@@@ ...... -%+%*%*#%#+#", "      #%%****++-#.+@@@@@@ ....... -=**%%@#%-", "       ##+#****..%@@@+=- ........ ===--+#@", "        #+###+-..#***", "        %%*****%..=-*+++", "        =@**#%+. :-*+**", 
  "         #%*+@:@ @..=+*", "         -@#*@:@ @+-..=#", "         @===;@@%...-=", "          -%:+:# #--:", 
  "           #:-*%*", "             -*+=", "              @#+", "              *#**", 
  "              #+* %#", "              %%+#%@:", "              %*##*%**", "              @#*++%%##*-", 
  "              %*%*+#**+%%%", "               =+###***+% =+", "              :%+% %**%%=#=*", 
  "               ==##*@%@*####.#+", "                +@+%*#@##%*%%**", "                -@@=*#**%%%++*-", 
  "                  @%--@#+%*#%#*-", "                   #@+*-***#**", "                    -=@%+#**#:", "                       =@ @*@"
];

// Instantiating matching speeds and shared trajectory to achieve the balanced image state
const fish1 = new Koi(KOI_SPRITE_ONE, "#ff5722", "rgb(255, 140, 100)", 0, 0.005);
const fish2 = new Koi(KOI_SPRITE_TWO, "#ffb74d", "rgb(150, 210, 255)", Math.PI, 0.005);

function animate() {
  ctx.fillStyle = "rgba(17, 17, 17, 0.22)";
  ctx.fillRect(0, 0, window.innerWidth, window.innerHeight);

  let cx = window.innerWidth / 2;
  let cy = window.innerHeight / 2;
  let radius = window.innerWidth < 700 ? 120 : 230;

  // Render pond backdrop animations
  rippleParticles.forEach((ripple, index) => {
    ripple.update();
    ripple.draw();
    if (ripple.alpha <= 0) {
      rippleParticles.splice(index, 1);
    }
  });

  // Render both arched fish structures
  fish1.draw(cx, cy, radius);
  fish2.draw(cx, cy, radius);

  requestAnimationFrame(animate);
}

animate();
