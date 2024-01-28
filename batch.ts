import { delay } from "./deps.ts";
import { logger } from "./logger.ts";

export class Batch {
  private _total = 0;
  private _percent = 0;
  private current = 0;

  constructor() {
  }

  public get percent(): number {
    return this._percent;
  }

  public get total(): number {
    return this._total;
  }

  public set total(value: number) {
    this._total = value;
    this.reset();
  }

  public reset() {
    this._percent = 0;
  }

  public async run(
    go: () => Promise<boolean>,
  ) {
    const result = await go();

    if (result) {
      this.current++;
      this._percent = this.current * 100 / this._total;
      logger.info("batch: %v", this._percent);
      if (this._percent == 100) {
        this.reset();
      }
    } else {
      const next = new Date();
      next.setMinutes(next.getMinutes() + 1);
      next.setSeconds(5);
      next.setMilliseconds(0);
      await delay(next.getTime() - new Date().getTime());
      await this.run(go);
    }
  }
}

export const batch = new Batch();