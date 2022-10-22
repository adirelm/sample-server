import {
  AllowNull,
  Column,
  HasMany,
  Model,
  Table,
  DataType,
} from "sequelize-typescript";
import { Status } from "./history";

import History from "./history";

@Table
export default class Server extends Model {
  @AllowNull(false)
  @Column
  name: string;

  @AllowNull(false)
  @Column
  url: string;

  @Column(DataType.ENUM(...Object.values(Status)))
  status: Status;

  @HasMany(() => History)
  histroy: History[];
}
