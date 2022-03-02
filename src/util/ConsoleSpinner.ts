export default class {
  private interval?: number;

  constructor(private prefix: string = "", private sufix: string = "") { }

  public start() {
    const h = ['|', '/', '-', '\\'];
    let i = 0;

    this.interval = +setInterval(() => {
      i = (i > 3) ? 0 : i;
      console.clear();
      console.log(`${this.prefix}${h[i]}${this.sufix}`);
      i++;
    }, 300);
  }

  public stop() { 
    if(!this.interval){
      console.warn(`loader was inactive`)
    }
    clearInterval(this.interval)
  }



}