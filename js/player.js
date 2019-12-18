let testY = null;


class Jumper {
    constructor(ctx, width, height, canvasWidth, canvasHeight) {
        this.ctx = ctx;
        this.width = width;
        this.height = height;

        this.image = new Image();
        this.image.src = "img/Zombies.png"

        //this.image.src = "img/idle_1.png";


        this.posX = canvasWidth / 2 - height / 2;

        this.posY0 = canvasHeight * 0.970 - width;
        this.posY = canvasHeight * 0.970 - width;

        // Movimiento

        this.speedY = 0;
        this.speedX = 0;
        this.grty = 0.5
        this.fall = this.speedY += this.grty

        this.distance = 5
        this.stop = 1

        this.obsFloor = []
    }

    draw() {
        //this.ctx.drawImage(this.image, this.posX, this.posY, this.width, this.height)
        this.ctx.drawImage(this.image, 0+(100*animateCounter), direction, 100, 100, this.posX, this.posY, this.width, this.height);
        testY = this.posY;
    }



    angulo() {
        this.posX += this.distance
        console.log("angulo:", this.posX)
    }


    phases(){

        if(this.posY <= 200 && imFloor == "yes" && phase == 1){
            phase = 2
            console.log("Ya está aquí la phase 2")
            this.animate()
        } else if(this.posY <= 200 && imFloor == "yes" && phase == 2) {
            phase = 3
          
        } else if(this.posY <= 200 && imFloor == "yes" && phase == 3){
            console.log("Victory!")
        } else if(this.posY > h && phase == 3) {
            phase = 2
           
            
        } else if(this.posY > h && phase == 2) {
            phase = 1
           
           
        }


    }



    move() {
        if (keyDown === true) {
            if (key == "left") {
                face = "left"
                this.speedX -= 1
            }
            else if (key == "right") {
                face = "right"
                this.speedX += 1
            }
            else if (key == "jump" && jumpUP == false) {
                jumpUP = true;
                imFloor = "no" // ya no está en la plataforma
                this.speedY -= 30
                if(face === "right"){
                    this.speedX += 20
                } else {
                    this.speedX -= 20
                }
            
            }
        }


        this.speedY += this.grty // Simulo gravedad
        this.posX += this.speedX // Movimiento Lateral
        this.posY += this.speedY // Movimiento Vertical
        // console.log(Math.floor(obsY[0]))
        this.speedX *= 0.9 // Reduce la velocidad progresivamente, Lateral
        this.speedY *= 0.9 // Reduce la velocidad progresivamente, Vertical

        // Detecta si está en la base   

        if (this.floor() == true) {
            this.speedY = 0 - this.grty
        }
        

        // Aquí toca hacer una función que compruebe continuamente sobre qué plataforma está.
        this.floorObs()
        this.collision()
      


        // if (down == true) {
        //     this.speedY =  0 - this.grty
        // }
    }

    animate(){
        this.posY = this.posY + 300
            imFloor = "no"
            console.log(jumpUP)
    }

    floor() {
        if(phase == 1) {

        

        let yBot = Math.floor(this.posY + 105) // le resto 116 para que cuente desde la parte de abajo del Jumper.        

        if (yBot > Math.floor(obsY[0]) && yBot < Math.floor(obsY[0] + 10)) {
            console.log("hola")
            return true
        } else {
            return false
        }

     } else if(this.posY > h && phase == 3) { // Caída y salida por arriba
        this.posY = 0
        phase = 2
        console.log(phase)
        
    } else if(this.posY > h && phase == 2) { // Caída y salida por arriba, vuelta a fase 1
        this.posY = 0
        phase = 1
        console.log(phase)
       
    }

    }

    floorObs() {
      
        let l = 1
        let num = 5
        let xIzq = Math.floor(this.posX);
        let xDrc = Math.floor(this.posX + 100)
        let yBot = Math.floor(this.posY + 116) // le resto 116 para que cuente desde la parte de abajo del Jumper.
        let yTop = Math.floor(this.posY) // parte de arriba.

        if(phase == 1){
            l = 1
            num = 6

        } else if (phase == 2) {

            
            l = 6
            l = 8
        } else if (phase == 3){
            l = 8
            l = 15
        }
       

        for (l; l < num; l++) {
            
            if (yBot > Math.floor(obsY[l]) && yBot < Math.floor(obsY[l] + 5)) { // Suelo

                if (xDrc > obsX[l] + obsSize1[l] && xIzq > obsX[l] + obsSize1[l]) { // Si se sale por la drecha, bye bye
                    
                    imFloor = "no"
                    this.fall              
                               
                } else if (xDrc < obsX[l] && xIzq < obsX[l]) { // Si se sale por la izquierda.
                    imFloor = "no"
                    this.fall
                    
                } else {
                    if(this.posY <= 200){
                        imFloor = "yes" // Certifico que está sobre la plataforma superior para el cambio de fase
                    }
                    console.log("hola", l)
                    this.speedY = 0 - this.grty
                }
            } else { 
                this.fall }
                
        }
    

}

    collision() {

       
        let l = 0
        let num = 5
        let xIzq = Math.floor(this.posX); 7
        let xDrc = Math.floor(this.posX + 100)  // le sumo 80 para que me coja 89px más hacia el centro desde la derecha.  
        let yTop = Math.floor(this.posY)
        let yBot = Math.floor(this.posY + 116) // le resto 116 para que cuente desde la parte de abajo del Jumper.

        if(phase == 1){
            l = 1
            num = 6
            console.log(l)

        } else if (phase == 2) {
            l = 7
            l = 10
        } else if (phase == 3){
            l = 8
            l = 15
        }
       
        // Collision TOP
        for (l; l < num; l++) {
            if (yTop < Math.floor(obsY[l] + obsSize2[l]) && yTop > Math.floor(obsY[l])) { // "Techo"

                if (xIzq > obsX[l] && xIzq < obsX[l] + obsSize1[l]) {
                    //console.log(xIzq, "obstáculo:", obsX[l], obsX[l] + obsSize1[l] + 50)
                    //this.speed = 0
                    this.speedY = 0 - this.grty
                    this.speedY += this.grty * 10
                    //console.log(this.grty)
                } else if (xDrc > obsX[l] && xDrc < obsX[l] + obsSize1[l]) {
                    //this.speed = 0
                    this.speedY = 0 - this.grty
                    this.speedY += this.grty * 10
                }
            }
        }

        // Collision Left

        for (let l = 1; l < numObs; l++) {

            if (xDrc <= obsX[l]) {    // Lado Izquierdo
                if (yBot > obsY[l] + 5 && yBot < obsY[l] + obsSize2[l]) {
                    if (xDrc >= obsX[l] - 5) {
                        console.log("hola")
                        this.speedX = 0 - this.grty
                        this.speedX -= this.grty * 10
                    }  else  if (yBot > obsY[l] && yBot < obsY[l] + obsSize2[l]) {
                        if (xDrc >= obsX[l] - 5) {
                            console.log("adios")
                            this.speedX = 0 - this.grty
                            this.speedX -= this.grty * 10
                        }
                    }
                }
            }

            if (xDrc >= obsX[l] +obsSize1[l]) {    // Lado derecho
                if (yBot > obsY[l] + 5 && yBot < obsY[l] + obsSize2[l]) {
                    if (xDrc <= obsX[l] + obsSize1[l] + 5) {
                        console.log(obsX[l], obsX[l] + obsSize1[l] + 5)
                        console.log("hola")
                        this.speedX = 0 - this.grty
                        this.speedX += this.grty * 10

                    }
                }
            }
        }
    }
}

        // for (let i = 0; i < numObs; i++) {

        //     // ## CHOQUE POR ABAJO ##

        //     // 1º Compruebo a la altura de qué elemento está
        //     if (yBot <= obsY[i] ){
        //         console.log("OBSTÁCULO!")
        //       //  this.posY = obsY[i] -116
        //         return true
        //     }
        //     // if(xIzq < obsX[i] || xDrc > obsX[i]+obsSize1[i]){

        // }

        // La idea sería crear una función que todo el rato compruebe si está sobre una
        // plataforma, de manera que si deja de estar, la Vel se ponga positiva y el 
        // bicho caiga hasta que toque una plataforma, y que mientras la Vel o algo
        // similar sea distinto de 0, no se pueda tocar ningún elemento.

        // jump() {
        //     //console.log(jumperJump)
        //    // console.log(this.power)
        //    maxJump(jumperJump)
        //     if(goJump === true){

        //         if(this.speedY < maxJump(jumperJump)){
        //             this.speedY++
        //            console.log( this.speedY)
        //         }  else if (this.speedY >= maxJump(jumperJump)){
        //             jumperJump = []
        //             this.speedY = 0
        //             goJump = false
        //         }



        //     }

        // }
        // // this.collision(this.posY, this.posX)
        //  }




        // down() {
        //     return 0
        // }

        // gravity() {
        //    let x = this.posX;
        //    let y = this.posY;

        //     for (let i = 0; i < numObs; i++) {
        //         if (y <= obsY[i] - 116 && y >= (obsY[i] - 116 + obsSize2[i])) { // Esto sería si golpease por abajo
        //             //this.stop = 1
        //         } else if (y >= obsY[i] - 116 && y <= (obsY[i] - 116 + obsSize2[i])) { // Significa que viene de arriba, cayendo
        //             if (x >= obsX[i] - 90 && x <= (obsX[i] + obsSize1[i])) { // Aquí me mide si cae entre los valores de un cuadro
        //                 this.posY = obsY[i] - 116
        //                 //this.stop = 1 
        //                 this.obsFloor = [obsX[i], obsX[i] + obsSize1[i]] // tamaño de la plataforma
        //             }

        //         }
        //     }

        // }
        // Función para saber cuando deja de estar en la plataforma 

        // collision() {
        //     let xIzq = this.posX + 20; //le sumo 20 para que me coja 20px más hacia el centro del Jumper.
        //     let xDrc = this.posx + 80  // le sumo 80 para que me coja 89px más hacia el centro desde la derecha.
        //     let yBot = this.posY - 166; // le resto 116 para que cuente desde la parte de abajo del Jumper.
        //     let yTop = this.posY // parte de arriba.

        //     for (let i = 0; i < numObs; i++) {

        //     // ## CHOQUE POR ABAJO ##

        //        // 1º Compruebo a la altura de qué elemento está
        //         if(yBot >= obsY[i]) {
        //             console.log("OBSTÁCULO!")
        //             if(xIzq < obsX[i] || xDrc > obsX[i]+obsSize1[i]){
        //                 //this.posY = obsX[i]
        //             }
        //         }
        //         // Compruebo que esté entre el principio y el final de un obs.

        //     }
        // }

        //     if (this.posX + 70 < this.obsFloor[0] || this.posX - 70 > this.obsFloor[1]) {
        //         console.log(this.posX, this.obsFloor[0])
        //         this.stop = 0
        //         //goDown == true
        //         console.log("hola")

        //         this.obsFloor = []
        //         return true
        //     }
        // }





        // Función para potencia de salto

        function maxJump(a) {
            console.log("longitud", a.length)

            if (a.length <= 2) {
                return 15
            } else if (a.length >= 3 && a.length <= 45) {
                return 25
            } else if (a.length >= 56 && a.length <= 80) {
                return 30
            } else if (a.length >= 81) {
                return 35
            }

        }

// Función para saber cuando deja de estar en la plataforma 

