import os from "os";
import path from "path";
import fs from "file-system";
import figlet from "figlet";
import { createConnection, Connection } from "typeorm";
import { AppConfig } from "./AppConfig";
import {Hitokoto} from "./entity";
import * as entities from "./entity";


export class App {
  debuggable: boolean
  configPath: string
  dbPath: string

  config: AppConfig
  dbConnection: Connection

  constructor() {
    this.setDebuggable();
    this.setPath();
    this.ensurePath();
  }

  private setDebuggable(): void {
    this.debuggable = process.env.NODE_ENV === "development";
  }

  private setPath(): void {
    const platform = os.platform();
    const homeDir = os.homedir();

    switch (platform) {
        case "win32": {
          const projectRoot = path.resolve(homeDir + "/AppData/Local/Phase");
          this.configPath = path.resolve(projectRoot + "/config.json");
          this.dbPath = path.resolve(projectRoot + "/db.sqlite3");
          break;
        }

        case "linux": {
          const projectRoot = path.resolve(homeDir + "/.phase");
          this.configPath = path.resolve(projectRoot + "/config.json");
          this.dbPath = path.resolve(projectRoot + "/db.sqlite3");
          break;
        }

        default: {
          throw "不支持的平台：" + platform;
        }
    }
  }

  private ensurePath(): void {
    fs.mkdirSync(path.dirname(this.configPath));
    fs.mkdirSync(path.dirname(this.dbPath));
  }

  public async start(): Promise<void> {
    await this.initConfig();
    await this.initDB();

    this.printTitle();
    this.greeting();
  }

  private async initConfig(): Promise<void> {
    this.config = await AppConfig.loadFromFile(this.configPath);
  }

  private async initDB(): Promise<void> {
    createConnection({
      type:     "sqlite",
      database: this.dbPath,
      entities: Object.values(entities),
      logging:  this.debuggable,
      synchronize: true
    })
      .then(conn => this.dbConnection = conn)
      .catch(err => console.log(err));
  }

  private printTitle(): void {
    const textArt = (text): string => figlet.textSync(text, "Star Wars");
    console.log(textArt("Phase"));
  }

  private greeting(): void {
    Hitokoto.random();
  }
}
