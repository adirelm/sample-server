import {
  AllowNull,
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from "sequelize-typescript";

import User from "./user";
import Server from "./server";

export enum Status {
  SUCCESS = "success",
  FAILURE = "failure",
}
@Table
export default class History extends Model {
  @AllowNull(false)
  @Column(DataType.ENUM(...Object.values(Status)))
  status: Status;

  @BelongsTo(() => Server)
  server: Server;

  @AllowNull(false)
  @ForeignKey(() => Server)
  @Column
  serverId: number;

  @BelongsTo(() => User)
  user: User;

  @AllowNull(false)
  @ForeignKey(() => User)
  @Column
  userId: number;
}
