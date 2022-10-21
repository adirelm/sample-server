import { AllowNull, Column, HasMany, Model, Table } from "sequelize-typescript";

import History from "./history";

@Table
export default class Server extends Model {
  @AllowNull(false)
  @Column
  name: string;

  @AllowNull(false)
  @Column
  url: string;

  @HasMany(() => History)
  histroy: History[];
}
