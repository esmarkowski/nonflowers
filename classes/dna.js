class DNA {

    constructor(genes) {
        this.seed = newSeed(); // This function should migrate into DNA
        var randint = (x,y) => (Math.floor(normRand(x,y)))
      

        var PAR = {}
        const clamp = (num, min, max) => Math.min(Math.max(num, min), max);
 
        var flowerShapeMask = (x) => (pow(sin(PI*x),0.2))
        var leafShapeMask = (x) => (pow(sin(PI*x),0.5))
      
        PAR.flowerChance = randChoice([normRand(0,0.08),normRand(0,0.03)])
        PAR.leafChance = randChoice([0, normRand(0,0.1), normRand(0,0.1)])
        PAR.leafType = randChoice([
          [1,randint(2,5)],
          [2,randint(3,7),randint(3,8)],
          [2,randint(3,7),randint(3,8)],
        ])
        var noiseScale = 100; //10
        var flowerShapeNoiseSeed = Math.random()*PI
        var flowerJaggedness = normRand(0.5,8) * noiseScale;
        PAR.flowerShape = (x) => (Noise.noise(x*flowerJaggedness,flowerShapeNoiseSeed)*flowerShapeMask(x))
      
      
        var leafShapeNoiseSeed = Math.random()*PI
        var leafJaggedness = normRand(0.1,40)
        var leafPointyness = normRand(0.5,1.5)
        PAR.leafShape = randChoice([
          (x) => (Noise.noise(x*leafJaggedness,flowerShapeNoiseSeed)*leafShapeMask(x)),
          (x) => (pow(sin(PI*x),leafPointyness))
        ])
      
        var flowerHue0 = (normRand(0,180)-130+360)%360
        var flowerHue1 = Math.floor((flowerHue0 + normRand(-70,70) + 360)%360)
        var flowerValue0 = Math.min(1,normRand(0.5,1.3))
        var flowerValue1 = Math.min(1,normRand(0.5,1.3))
        var flowerSaturation0 = normRand(0,1.1-flowerValue0)
        var flowerSaturation1 = normRand(0,1.1-flowerValue1)
      
        PAR.flowerColor = {min:[flowerHue0,flowerSaturation0,flowerValue0,normRand(0.8,1)],
                           max:[flowerHue1,flowerSaturation1,flowerValue1,normRand(0.5,1)]}


        var saturationWeight = 0.2;

        PAR.flowerColor.min[1] = clamp(PAR.flowerColor.min[1] + saturationWeight, 0, 1);
        PAR.flowerColor.max[1] = clamp(PAR.flowerColor.max[1] + saturationWeight, 0, 1);;

        PAR.leafColor = {min:[normRand(10,200),normRand(0.05,0.4),normRand(0.3,0.7),normRand(0.8,1)],
                         max:[normRand(10,200),normRand(0.05,0.4),normRand(0.3,0.7),normRand(0.8,1)]}
      

        
        var curveCoeff0 = [normRand(-0.5,0.5),normRand(5,10)]
        var curveCoeff1 = [Math.random()*PI, normRand(1,5)]
      
        var curveCoeff2 = [Math.random()*PI,normRand(5,15)]
        var curveCoeff3 = [Math.random()*PI,normRand(1,5)]
        var curveCoeff4 = [Math.random()*0.5,normRand(0.8,1.2)]
      
        PAR.flowerOpenCurve = randChoice([
          (x,op) => (
            (x < 0.1) ? 
              2+op*curveCoeff2[1]
            : Noise.noise(x*10,curveCoeff2[0])),
          (x,op) => (
            (x < curveCoeff4[0]) ? 0 : 10-x*mapval(op,0,1,16,20)*curveCoeff4[1]
          )
        ])
       
        PAR.flowerColorCurve = randChoice([
            (x)=>(sigmoid(x+curveCoeff4[0],curveCoeff4[1])),
            // (x)=>(Noise.noise(x*curveCoeff1[1],curveCoeff1[0])) // this results in see-through
        ])
        // PAR.flowerColorCurve =
        // All calls to random impact the seed of the noise function. To keep the randomness consistent, when 
        // overriding parameters make sure to keep the original call in place and then overwite the variable
        // with the desired parameter on the following line. 
        // 
        // For example, if you wanted to change the leaf shape, you would need to keep the original call to
        //
        // PAR.leafPosition = randChoice([1,2]) // Keep this line to keep the randomness consistent
        // PAR.leafPosition = 2 // This is the new call

        PAR.flowerLength = normRand(5,55) //* (0.1-PAR.flowerChance)*10
        PAR.flowerWidth = normRand(5,30) 
        PAR.flowerPetal = Math.round(mapval(PAR.flowerWidth,5,50,10,3))

        PAR.pedicelLength = normRand(5,30)
      
        PAR.stemWidth = normRand(2,11)
        PAR.stemBend = normRand(2,16)
        PAR.stemLength = normRand(300,400)
        PAR.stemCount = randChoice([2,3,4,5])
      
        PAR.sheathLength = randChoice([0,normRand(50,100)])
        PAR.sheathWidth = normRand(5,15)
        
        PAR.shootCount = normRand(1,7)
        PAR.shootLength = normRand(50,180)

        PAR.leafPosition = randChoice([1,2])
        PAR.leafLength = normRand(30,100)
        PAR.leafWidth = normRand(5,30)

        PAR.innerLength = Math.min(normRand(0,20),PAR.flowerLength*0.8)

        PAR.innerWidth = Math.min(randChoice([0,normRand(1,8)]),PAR.flowerWidth*0.8)
        PAR.innerShape = (x) => (pow(sin(PI*x),1))
        var innerHue = normRand(0,60)
        PAR.innerColor = {min:[innerHue,normRand(0.1,0.7),normRand(0.5,0.9),normRand(0.8,1)],
                          max:[innerHue,normRand(0.1,0.7),normRand(0.5,0.9),normRand(0.5,1)]}
        

        PAR.branchWidth = normRand(0.4,1.3)

        PAR.branchTwist = Math.round(normRand(2,5))
        PAR.branchDepth = randChoice([3,4])
        PAR.branchFork = randChoice([4,5,6,7])
      
        var branchHue = normRand(30,60)
        var branchSaturation = normRand(0.05,0.3)
        var branchValue = normRand(0.7,0.9)

        PAR.branchColor = {min:[branchHue,branchSaturation,branchValue,1],
                           max:[branchHue,branchSaturation,branchValue,1]}

        // if(genes !== undefined) {
          // genes.flowerOpenCurve = PAR.flowerOpenCurve;
          // genes.flowerColorCurve = PAR.flowerColorCurve;
          // this.genes = genes;
          // return 
        // }
        this.genes = {
          ...PAR,
          ...genes
        };
    }

    get flowerColors() {
        return [this.color(this.genes.flowerColor.min).humanName, this.color(this.genes.flowerColor.max).humanName];
    }

    get leafColors() {
        var colorNameSpace = 'web';
        return [this.color(this.genes.leafColor.min, colorNameSpace).humanName, this.color(this.genes.leafColor.max, colorNameSpace).humanName];
    }

    get branchColors() {
        var colorNameSpace = 'web';
        return [this.color(this.genes.branchColor.min, colorNameSpace).humanName, this.color(this.genes.branchColor.max, colorNameSpace).humanName];
    }


    get innerColors() {
        return [this.color(this.genes.innerColor.min).humanName,this.color(this.genes.innerColor.max).humanName];
    }

    color(col) {
        return Color.fromHSLA(col);
    }





}