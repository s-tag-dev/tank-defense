class global {
    constructor() {
        this.width = window.innerWidth;
        this.height = window.innerHeight;
        this.fps = 60;
        this.shooterSize = 120;
        this.bulletWidth = 30;
        this.pipeSize = 20;
        this.pipeWidth = 60;
        this.pipeSpace = 20;
        this.bulletSpeed = 10;
        this.mouseX = this.width / 2 ;
        this.mouseY = this.height / 2 ;     
        this.mouseXPress = this.width / 2 ;
        this.mouseYPress = this.height / 2 ; 
        this.enemyShotSpeed = 5;
        this.enemyShotSize = 2;
        this.giftSize = 40;
        this.spawnChange = 5;
        this.stats = ["start", "running" , "gameover" , "play"];
        this.mousePressed = (e)=>{};
        this.mouseMove = (e)=>{};
        this.keyPress = (e)=>{}
        this.keyDown = (e)=>{}
        this.keyUp = (e)=>{}
        this.init();
    }

    init(){
        let current = this;
        window.addEventListener("mousemove" , (e)=>{
            current.mouseX = e.clientX;
            current.mouseY = e.clientY;
            this.mouseMove(e);
        })        
        window.addEventListener("click" , (e)=>{
            current.mouseXPress = e.clientX;
            current.mouseYPress = e.clientY; 
            this.mousePressed(e);                       
        })        
        window.addEventListener("keyup" , (e)=>{
            this.keyUp(e);
        })      
        window.addEventListener("keydown" , (e)=>{
            this.keyDown(e);
        })        
        window.addEventListener("keypress" , (e)=>{
            this.keyPress(e);
        })        
        
    }
    
}


export {global};


