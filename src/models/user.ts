import {
  AllowNull,
  Column,
  Model,
  Table,
  HasMany,
  DataType,
  Unique,
} from "sequelize-typescript";

import Server from "./server";
import History from "./history";

export enum Status {
  PENDING = "pending",
  APPROVED = "approved",
}

@Table
export default class User extends Model {
  @AllowNull(false)
  @Unique
  @Column
  username: string;

  @AllowNull(false)
  @Column
  password: string;

  @Column
  firstName: string;

  @Column
  lastName: string;

  @AllowNull(false)
  @Unique
  @Column
  email: string;

  @Column(DataType.ENUM(...Object.values(Status)))
  status: Status;

  @HasMany(() => Server)
  servers: Server[];

  @HasMany(() => History)
  history: History[];
}
